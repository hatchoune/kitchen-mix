"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Profil } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [supabase] = useState(() => createClient());

  const loadUserData = useCallback(
    async (userId: string) => {
      try {
        // 1. Récupérer le profil
        const { data: profilData } = await supabase
          .from("profils")
          .select("*")
          .eq("id", userId)
          .single();
        setProfil(profilData as Profil | null);

        // 2. Vérifier si admin
        const { data: adminData } = await supabase
          .from("admins")
          .select("user_id")
          .eq("user_id", userId)
          .maybeSingle();
        setIsAdmin(!!adminData);
        // 2b. Vérifier si banni
        const { checkBannedEmail } = await import("@/app/actions/users");
        const userEmail =
          (await supabase.auth.getUser()).data.user?.email || "";
        if (userEmail) {
          const isBanned = await checkBannedEmail(userEmail);
          if (isBanned) {
            await supabase.auth.signOut();
            setUser(null);
            setProfil(null);
            setIsAdmin(false);
            alert(
              "Votre compte a été suspendu. Contactez l'administration pour plus d'informations.",
            );
            return;
          }
        }

        // 3. Synchroniser le thème depuis le profil
        if (profilData?.theme_preference) {
          const theme = profilData.theme_preference;
          if (["dark", "light", "grey"].includes(theme)) {
            localStorage.setItem("kmx-theme", theme);
            document.documentElement.setAttribute("data-theme", theme);
          }
        }

        // 4. Achievement : connexion (fire-and-forget)
        import("@/app/actions/achievements").then(
          ({ checkAndUnlockAchievements }) => {
            checkAndUnlockAchievements(userId, "login").catch(() => {});
          },
        );
      } catch (err) {
        console.error("Erreur chargement données utilisateur:", err);
      }
    },
    [supabase],
  );

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          // Timeout de sécurité : si loadUserData freeze, on débloquez après 5s
          await Promise.race([
            loadUserData(currentUser.id),
            new Promise<void>((_, reject) =>
              setTimeout(() => reject(new Error("loadUserData timeout")), 5000),
            ),
          ]).catch((err) => console.error("useAuth init:", err));
        }
      } finally {
        setLoading(false); // TOUJOURS appelé, quoi qu'il arrive
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await loadUserData(currentUser.id);
      } else {
        setProfil(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [loadUserData, supabase.auth]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    },
    [supabase],
  );

  const signUp = useCallback(
    async (email: string, password: string, pseudo: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { pseudo } },
      });
      return { error };
    },
    [supabase],
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
  }, [supabase]);

  const signInWithMagicLink = useCallback(
    async (email: string) => {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/profil`,
        },
      });
      return { error };
    },
    [supabase],
  );

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/profil`,
      },
    });
    return { error };
  }, [supabase]);

  const refreshProfil = () => user && loadUserData(user.id);

  return {
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
  };
}
