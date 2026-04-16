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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Refs pour éviter les race conditions et les re-renders inutiles
  const loadingRef = useRef(false);
  const userIdRef = useRef<string | null>(null);
  const explicitSignOut = useRef(false);

  const loadUserData = useCallback(
    async (userId: string, userEmail?: string) => {
      // Si les données de cet user sont déjà chargées, on skip
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

        // Vérif ban
        try {
          if (userEmail) {
            const banPromise = checkBannedEmail(userEmail);
            const timeoutPromise = new Promise<boolean>((resolve) =>
              setTimeout(() => resolve(false), 3000),
            );
            const isBanned = await Promise.race([banPromise, timeoutPromise]);
            if (isBanned) {
              explicitSignOut.current = true;
              await supabase.auth.signOut();
              setUser(null);
              setProfil(null);
              setIsAdmin(false);
              userIdRef.current = null;
              alert("Votre compte a été suspendu.");
              return;
            }
          }
        } catch {
          // ban check optionnel
        }

        // Sync thème
        if (profilRes.data?.theme_preference) {
          const theme = profilRes.data.theme_preference;
          if (["dark", "light", "grey"].includes(theme)) {
            localStorage.setItem("kmx-theme", theme);
            document.documentElement.setAttribute("data-theme", theme);
          }
        }

        checkAndUnlockAchievements(userId, "login").catch(() => {});
      } catch (err) {
        console.error("Erreur chargement données utilisateur:", err);
      } finally {
        loadingRef.current = false;
      }
    },
    [],
  );

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
        userIdRef.current = currentUser?.id ?? null;
        if (currentUser) {
          await loadUserData(currentUser.id, currentUser.email ?? undefined);
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

      // ────── PROTECTION CLÉ ──────
      // Si on avait un user connecté et que l'event dit "plus de session"
      // MAIS que ce n'est PAS un signOut explicite → IGNORER.
      // C'est le cas quand on switch d'onglet et que le token refresh
      // échoue ou prend trop de temps. Les cookies sont toujours valides.
      if (!currentUser && userIdRef.current && !explicitSignOut.current) {
        // On ignore cet event parasite
        return;
      }

      // Reset le flag après un signOut explicite
      if (explicitSignOut.current && _event === "SIGNED_OUT") {
        explicitSignOut.current = false;
        setUser(null);
        setProfil(null);
        setIsAdmin(false);
        userIdRef.current = null;
        setLoading(false);
        return;
      }

      if (currentUser) {
        // Nouvel user ou reconnexion
        const isNewUser = currentUser.id !== userIdRef.current;
        setUser(currentUser);
        userIdRef.current = currentUser.id;

        if (isNewUser) {
          // Charger les données seulement si c'est un NOUVEAU user
          await loadUserData(currentUser.id, currentUser.email ?? undefined);
        }
      }

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
    explicitSignOut.current = true;
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("signOut error:", err);
      // Forcer le nettoyage même si signOut échoue
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
      options: {
        // On passe par le callback serveur
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/profil`,
      },
    });
    return { error };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // On passe par le callback serveur
        redirectTo: `${window.location.origin}/auth/callback?next=/profil`,
      },
    });
    return { error };
  }, []);

  const refreshProfil = useCallback(() => {
    if (user) {
      loadingRef.current = false; // Forcer le rechargement
      loadUserData(user.id, user.email ?? undefined);
    }
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
}
