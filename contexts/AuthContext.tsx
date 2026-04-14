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

// Client Supabase singleton — créé une seule fois pour toute l'app
const supabase = createClient();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false); // évite les double-appels en race condition

  const loadUserData = useCallback(async (userId: string) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      const [profilRes, adminRes] = await Promise.all([
        supabase.from("profils").select("*").eq("id", userId).single(),
        supabase
          .from("admins")
          .select("user_id")
          .eq("user_id", userId)
          .maybeSingle(),
      ]);

      setProfil(profilRes.data as Profil | null);
      setIsAdmin(!!adminRes.data);

      // Vérif ban (avec timeout de sécurité)
      try {
        const userEmail =
          (await supabase.auth.getUser()).data.user?.email || "";
        if (userEmail) {
          const { checkBannedEmail } = await import("@/app/actions/users");
          const banPromise = checkBannedEmail(userEmail);
          const timeoutPromise = new Promise<boolean>((resolve) =>
            setTimeout(() => resolve(false), 3000),
          );
          const isBanned = await Promise.race([banPromise, timeoutPromise]);
          if (isBanned) {
            await supabase.auth.signOut();
            setUser(null);
            setProfil(null);
            setIsAdmin(false);
            alert("Votre compte a été suspendu.");
            return;
          }
        }
      } catch {
        // ban check optionnel — on continue si ça échoue
      }

      // Sync thème
      if (profilRes.data?.theme_preference) {
        const theme = profilRes.data.theme_preference;
        if (["dark", "light", "grey"].includes(theme)) {
          localStorage.setItem("kmx-theme", theme);
          document.documentElement.setAttribute("data-theme", theme);
        }
      }

      // Achievement login (fire-and-forget)
      import("@/app/actions/achievements")
        .then(({ checkAndUnlockAchievements }) => {
          checkAndUnlockAchievements(userId, "login").catch(() => {});
        })
        .catch(() => {});
    } catch (err) {
      console.error("Erreur chargement données utilisateur:", err);
    } finally {
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!mounted) return;
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          await loadUserData(currentUser.id);
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await loadUserData(currentUser.id);
      } else {
        setProfil(null);
        setIsAdmin(false);
      }
      // setLoading(false) ici aussi au cas où init() n'aurait pas encore terminé
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
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
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("signOut error:", err);
    } finally {
      setUser(null);
      setProfil(null);
      setIsAdmin(false);
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
      options: { redirectTo: `${window.location.origin}/profil` },
    });
    return { error };
  }, []);

  const refreshProfil = useCallback(() => {
    if (user) loadUserData(user.id);
  }, [user, loadUserData]);

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

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
}
