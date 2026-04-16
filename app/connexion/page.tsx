"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, UserIcon, Wand2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "@/lib/validation";

type Tab = "login" | "register";

function ConnexionContent() {
  const [tab, setTab] = useState<Tab>("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const {
    user,
    loading,
    signIn,
    signUp,
    signInWithMagicLink,
    signInWithGoogle,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/profil";

  // Formulaires séparés
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", pseudo: "" },
  });

  useEffect(() => {
    if (!loading && user) router.push(redirectTo);
  }, [user, loading, router, redirectTo]);

  const handleLogin = async (data: LoginFormData) => {
    setError("");
    setSubmitting(true);
    const { error } = await signIn(data.email, data.password);
    if (error) setError(error.message);
    setSubmitting(false);
  };

  const handleRegister = async (data: RegisterFormData) => {
    setError("");
    setSuccess("");
    setSubmitting(true);
    const { error } = await signUp(data.email, data.password, data.pseudo);
    if (error) setError(error.message);
    else setSuccess("Vérifiez votre email pour confirmer votre compte !");
    setSubmitting(false);
  };

  const handleMagicLink = async () => {
    const email =
      loginForm.getValues("email") || registerForm.getValues("email");
    if (!email) {
      setError("Entrez votre email d'abord.");
      return;
    }
    setError("");
    setSubmitting(true);
    const { error } = await signInWithMagicLink(email);
    if (error) setError(error.message);
    else setSuccess("Un lien magique a été envoyé !");
    setSubmitting(false);
  };

  const handleGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto space-y-4 pt-20">
        <div className="skeleton h-12 w-32 rounded-xl mx-auto" />
        <div className="skeleton h-80 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto pt-12 space-y-8">
      <div className="text-center space-y-2">
        <Logo className="w-14 h-auto mx-auto" />
        <h1 className="font-display font-bold text-2xl">Kitchen Mix</h1>
      </div>

      <div className="flex rounded-xl bg-card border border-border p-1">
        <button
          onClick={() => {
            setTab("login");
            setError("");
            setSuccess("");
            loginForm.reset();
          }}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors",
            tab === "login" ? "bg-accent text-black" : "text-muted-foreground",
          )}
        >
          Se connecter
        </button>
        <button
          onClick={() => {
            setTab("register");
            setError("");
            setSuccess("");
            registerForm.reset();
          }}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors",
            tab === "register"
              ? "bg-accent text-black"
              : "text-muted-foreground",
          )}
        >
          Créer un compte
        </button>
      </div>

      <div className="glass-card p-6 space-y-5">
        {tab === "login" && (
          <form
            onSubmit={loginForm.handleSubmit(handleLogin)}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  {...loginForm.register("email")}
                  placeholder="votre@email.com"
                  className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
              {loginForm.formState.errors.email && (
                <p className="text-xs text-error">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showLoginPassword ? "text" : "password"}
                  {...loginForm.register("password")}
                  placeholder="••••••••"
                  className="w-full bg-card border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showLoginPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <p className="text-xs text-error">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>
            {error && (
              <p className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-accent text-black font-display font-bold text-sm hover:bg-accent-hover disabled:opacity-50"
            >
              {submitting ? "..." : "Se connecter"}
            </button>
          </form>
        )}
        {tab === "register" && (
          <form
            onSubmit={registerForm.handleSubmit(handleRegister)}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Pseudo</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  {...registerForm.register("pseudo")}
                  placeholder="Votre pseudo"
                  className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
              {registerForm.formState.errors.pseudo && (
                <p className="text-xs text-error">
                  {registerForm.formState.errors.pseudo.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  {...registerForm.register("email")}
                  placeholder="votre@email.com"
                  className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
              {registerForm.formState.errors.email && (
                <p className="text-xs text-error">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showRegisterPassword ? "text" : "password"}
                  {...registerForm.register("password")}
                  placeholder="••••••••"
                  className="w-full bg-card border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowRegisterPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showRegisterPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {registerForm.formState.errors.password && (
                <p className="text-xs text-error">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>
            {error && (
              <p className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-sage bg-sage/10 px-3 py-2 rounded-lg">
                {success}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-accent text-black font-display font-bold text-sm hover:bg-accent-hover disabled:opacity-50"
            >
              {submitting ? "..." : "Créer mon compte"}
            </button>
          </form>
        )}

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        {/* Un seul bouton Google pour les deux usages */}
        <button
          onClick={handleGoogle}
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm hover:bg-card-hover"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            ...
          </svg>
          Continuer avec Google
        </button>
        <button
          onClick={handleMagicLink}
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm hover:bg-card-hover"
        >
          <Wand2 className="w-4 h-4" /> Magic Link par email
        </button>
      </div>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense
      fallback={<div className="flex justify-center py-20">Chargement...</div>}
    >
      <ConnexionContent />
    </Suspense>
  );
}
