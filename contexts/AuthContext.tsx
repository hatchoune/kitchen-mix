"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Profil } from "@/types";
import { checkBannedEmail } from "@/app/actions/users";
import { checkAndUnlockAchievements } from "@/app/actions/achievements";

interface AuthContextValue {
  user: User | null;
  profil: Profil | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    pseudo: string,
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfil: () => void;
  signInWithMagicLink: (email: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const supabase = createClient();

// Log helper (peut être commenté en production)
const log = (...args: unknown[]) => {
  console.log(`[AUTH ${new Date().toISOString().slice(11, 23)}]`, ...args);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadingPromiseRef = useRef<Promise<boolean> | null>(null);
  const userIdRef = useRef<string | null>(null);
  const explicitSignOut = useRef(false);
  const retryTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const loadUserData = useCallback(
    async (userId: string, userEmail?: string): Promise<boolean> => {
      if (loadingPromiseRef.current) {
        log("⏭️ loadUserData déjà en cours, on attend la promesse existante");
        return loadingPromiseRef.current;
      }

      log("🔄 loadUserData START", { userId, userEmail });

      const promise = (async () => {
        try {
          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("TIMEOUT")), 5000),
          );

          const fetchPromise = Promise.all([
            supabase.from("profils").select("*").eq("id", userId).single(),
            supabase
              .from("admins")
              .select("user_id")
              .eq("user_id", userId)
              .maybeSingle(),
          ]);

          const [profilRes, adminRes] = await Promise.race([
            fetchPromise,
            timeoutPromise,
          ]);

          if (profilRes.error) {
            if (profilRes.error.code === "PGRST116") {
              log("⏳ Profil non trouvé (PGRST116), en attente de création...");
              return false;
            }
            log("❌ Erreur Supabase:", profilRes.error);
            throw profilRes.error;
          }

          log("✅ Profil trouvé:", profilRes.data);
          setProfil(profilRes.data as Profil | null);
          setIsAdmin(!!adminRes.data);

          try {
            if (userEmail) {
              const banPromise = checkBannedEmail(userEmail);
              const banTimeout = new Promise<boolean>((resolve) =>
                setTimeout(() => resolve(false), 3000),
              );
              const isBanned = await Promise.race([banPromise, banTimeout]);
              if (isBanned) {
                explicitSignOut.current = true;
                await supabase.auth.signOut();
                setUser(null);
                setProfil(null);
                setIsAdmin(false);
                userIdRef.current = null;
                alert("Votre compte a été suspendu.");
                return true;
              }
            }
          } catch {
            // optionnel
          }

          if (profilRes.data?.theme_preference) {
            const theme = profilRes.data.theme_preference;
            if (["dark", "light", "grey"].includes(theme)) {
              localStorage.setItem("kmx-theme", theme);
              document.documentElement.setAttribute("data-theme", theme);
            }
          }

          checkAndUnlockAchievements(userId, "login").catch(() => {});
          return true;
        } catch (err) {
          if (err instanceof Error && err.message === "TIMEOUT") {
            log("⏰ TIMEOUT dans loadUserData, on abandonne");
          } else {
            log("❌ loadUserData ERROR", err);
          }
          return true;
        } finally {
          loadingPromiseRef.current = null;
          log("🔚 loadUserData END");
        }
      })();

      loadingPromiseRef.current = promise;
      return promise;
    },
    [],
  );

  // Retry automatique si user connecté mais profil manquant
  useEffect(() => {
    log("🔁 Retry effect check", {
      hasUser: !!user,
      hasProfil: !!profil,
      loading,
      loadingPromise: !!loadingPromiseRef.current,
    });

    if (user && !profil && !loading && !loadingPromiseRef.current) {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      log("⏰ Programmation retry dans 800ms");
      retryTimerRef.current = setTimeout(async () => {
        log("⏰ Retry déclenché !");
        const success = await loadUserData(user.id, user.email ?? undefined);
        if (!success) {
          log("⚠️ Retry : profil toujours absent, on force un re-render");
          setProfil(null);
        }
      }, 800);
    }

    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, [user, profil, loading, loadUserData]);

  // Sécurité : si loading reste true plus de 8s, on le force à false
  useEffect(() => {
    if (loading) {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        log("🆘 Safety timeout : loading forcé à false");
        setLoading(false);
      }, 8000);
    } else {
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = null;
      }
    }
    return () => {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, [loading]);

  useEffect(() => {
    let mounted = true;
    log("🚀 AuthProvider mounted");

    const init = async () => {
      log("📡 init: getSession...");
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        log("📡 getSession résultat:", { hasSession: !!session });
        if (!mounted) return;
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        userIdRef.current = currentUser?.id ?? null;
        if (currentUser) {
          await loadUserData(currentUser.id, currentUser.email ?? undefined);
        }
      } catch (err) {
        log("❌ init error", err);
      } finally {
        if (mounted) {
          setLoading(false);
          log("🏁 init terminé, loading=false");
        }
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      log(`🔔 onAuthStateChange: ${_event}`, { hasSession: !!session });
      if (!mounted) return;

      const currentUser = session?.user ?? null;

      // Protection anti-faux-signout (Claude)
      if (!currentUser && userIdRef.current && !explicitSignOut.current) {
        log("🛡️ Faux signout ignoré");
        return;
      }

      if (explicitSignOut.current && _event === "SIGNED_OUT") {
        log("👋 SignOut explicite détecté");
        explicitSignOut.current = false;
        setUser(null);
        setProfil(null);
        setIsAdmin(false);
        userIdRef.current = null;
        setLoading(false);
        return;
      }

      if (currentUser) {
        const isNewUser = currentUser.id !== userIdRef.current;
        log("👤 Utilisateur présent, isNewUser =", isNewUser);
        setUser(currentUser);
        userIdRef.current = currentUser.id;

        if (isNewUser) {
          log("🆕 Nouvel utilisateur détecté, chargement du profil...");
          setLoading(true);
          await loadUserData(currentUser.id, currentUser.email ?? undefined);
          setLoading(false);
        }
      } else {
        log("👻 Session null, reset état");
        setProfil(null);
        setIsAdmin(false);
        userIdRef.current = null;
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      log("💤 AuthProvider unmounted");
    };
  }, [loadUserData]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, pseudo: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { pseudo } },
      });
      return { error };
    },
    [],
  );

  const signOut = useCallback(async () => {
    explicitSignOut.current = true;
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("signOut error:", err);
      setUser(null);
      setProfil(null);
      setIsAdmin(false);
      userIdRef.current = null;
      explicitSignOut.current = false;
    }
  }, []);

  const signInWithMagicLink = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/profil` },
    });
    return { error };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/profil`,
        queryParams: {
          prompt: "select_account", // 🔑 Force le choix du compte Google
        },
      },
    });
    return { error };
  }, []);

  const refreshProfil = useCallback(() => {
    if (user) {
      loadUserData(user.id, user.email ?? undefined);
    }
  }, [user, loadUserData]);

  log("🔄 Render AuthProvider", { user: !!user, profil: !!profil, loading });

  return (
    <AuthContext.Provider
      value={{
        user,
        profil,
        isAdmin,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfil,
        signInWithMagicLink,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
}
