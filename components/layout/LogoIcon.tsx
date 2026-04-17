"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  LogOut,
  Settings,
  ChevronDown,
  Shield,
  Menu,
  X,
  Home,
  BookOpen,
  Search,
  PlusCircle,
  Heart,
  Calendar,
  Info,
  Bell,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "@/components/ui/Logo";
import NotificationBell from "@/components/layout/NotificationBell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/recettes", label: "Recettes", icon: BookOpen },
  { href: "/recherche", label: "Recherche", icon: Search },
  { href: "/planificateur", label: "Planning", icon: Calendar },
  { href: "/mes-plannings", label: "Mes plannings", icon: Calendar },
  { href: "/soumettre", label: "Proposer", icon: PlusCircle },
  { href: "/favoris", label: "Favoris", icon: Heart },
  { href: "/a-propos", label: "À propos", icon: Info },
];
export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const { isAdmin, user, signOut, profil } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Fermer dropdown clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY < 60) setVisible(true);
        else if (currentY - lastScrollY.current > 10) {
          setVisible(false);
          setUserMenuOpen(false);
          setMobileOpen(false);
        } else if (lastScrollY.current - currentY > 10) setVisible(true);
        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUserMenuOpen(false);
    router.push("/");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Avatar URL
  const avatarUrl = profil?.avatar_url;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/99 backdrop-blur-[1px] border-b border-border transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-accent shrink-0 group"
          >
            <Logo className="h-10 w-auto md:h-12" />
            <span className="hidden sm:inline">Kitchen Mix</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  isActive(link.href)
                    ? "bg-accent/15 text-accent shadow-sm shadow-accent/10"
                    : "bg-background/15 text-foreground/80 hover:text-foreground hover:bg-background/25 backdrop-blur-sm",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Cloche de notifications (uniquement connecté) */}
            {user && <NotificationBell />}

            {/* Admin button */}
            {isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "p-2 rounded-lg transition-colors hidden sm:flex",
                  isActive("/admin")
                    ? "bg-accent/15 text-accent"
                    : "text-accent/60 hover:text-accent hover:bg-accent/10",
                )}
                title="Administration"
              >
                <Shield className="w-5 h-5" />
              </Link>
            )}

            {/* Profile / Login */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-card-hover transition-colors border border-transparent hover:border-border"
                >
                  {/* Avatar ou icône par défaut */}
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={profil?.pseudo || "Avatar"}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      userMenuOpen && "rotate-180",
                    )}
                  />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-xl shadow-2xl py-1 animate-in fade-in zoom-in duration-200 border border-border"
                    style={{ backgroundColor: "var(--color-bg)" }}
                  >
                    <div className="px-4 py-2.5 border-b border-border mb-1">
                      <p className="text-xs text-muted-foreground">
                        Connecté en tant que
                      </p>
                      <p className="text-sm font-bold truncate">
                        {profil?.pseudo || user.email}
                      </p>
                    </div>
                    <Link
                      href="/profil"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      <User className="w-4 h-4" /> Mon Profil
                    </Link>
                    <Link
                      href={`/profil/${user.id}`}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      <User className="w-4 h-4 opacity-50" /> Profil public
                    </Link>
                    <Link
                      href="/parametres"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      <Settings className="w-4 h-4" /> Paramètres
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-accent hover:bg-accent/10 transition-colors"
                      >
                        <Shield className="w-4 h-4" /> Administration
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors border-t border-border mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/connexion" className="btn-primary py-2 px-4 text-sm">
                Connexion
              </Link>
            )}

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-card-hover transition-colors"
              aria-label={mobileOpen ? "Fermer" : "Menu"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-border mt-2 pt-3 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive(link.href)
                    ? "bg-accent/15 text-accent shadow-sm shadow-accent/10"
                    : "bg-background/15 text-foreground/80 hover:text-foreground hover:bg-background/25 backdrop-blur-sm",
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/notifications"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive("/notifications")
                    ? "bg-accent/15 text-accent shadow-sm shadow-accent/10"
                    : "bg-background/15 text-foreground/80 hover:text-foreground hover:bg-background/25 backdrop-blur-sm",
                )}
              >
                <Bell className="w-4 h-4" />
                Notifications
              </Link>
            )}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all",
                  isActive("/admin")
                    ? "bg-accent/15 text-accent shadow-sm shadow-accent/10"
                    : "bg-background/15 text-accent/80 hover:text-accent hover:bg-background/25 backdrop-blur-sm",
                )}
              >
                <Shield className="w-4 h-4" /> Administration
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
