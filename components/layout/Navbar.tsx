"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

import { useTranslations } from "next-intl";

export default function Navbar() {
    const t = useTranslations("Navigation");
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPro, setIsPro] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const fetchUserAndProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);
            
            if (user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("plan")
                    .eq("id", user.id)
                    .single();
                
                setIsPro(profile?.plan === 'pro');
            }
        };

        fetchUserAndProfile();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
            if (session?.user) {
                fetchUserAndProfile();
            } else {
                setIsPro(false);
            }
        });

        return () => listener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
                    ? "bg-[#09090B]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_10_40px_rgba(37,99,235,0.15)]"
                    : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo & Brand */}
                <div className="flex items-center gap-6 lg:gap-10">
                    <Link href="/" className="flex items-center gap-2.5 group transition-all hover:opacity-90">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-brand shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105 group-active:scale-95">
                            <Sparkles className="h-4.5 w-4.5 text-white" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-xl font-bold tracking-tight gradient-brand-text">CareerAI</span>
                            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#A1A1AA] opacity-70 hidden sm:block">Next-Gen Resume</span>
                        </div>
                        {isLoggedIn && isPro && (
                            <Badge variant="secondary" className="ml-2 bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] font-bold py-0 px-2 h-5 flex items-center gap-1 animate-in fade-in zoom-in duration-500">
                                <Sparkles className="h-2.5 w-2.5" /> PRO
                            </Badge>
                        )}
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {[
                          { name: t("features"), href: "/#features" },
                          { name: t("pricing"), href: "/pricing" }
                        ].map((link) => (
                          <Link 
                            key={link.name} 
                            href={link.href} 
                            className="text-[#A1A1AA] hover:text-white transition-colors text-sm font-bold font-['Space_Grotesk'] tracking-tight"
                          >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563EB] transition-all group-hover/link:w-full rounded-full" />
                          </Link>
                        ))}
                    </nav>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <div className="h-6 w-px bg-white/10 mx-1" />
                    {isLoggedIn ? (
                        <Link href="/dashboard">
                            <Button size="sm" className="h-10 px-5 rounded-lg gradient-brand text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all active:scale-95">
                                <LayoutDashboard className="mr-2 h-4 w-4" /> {t("dashboard")}
                            </Button>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2">
                             <Link href="/login">
                                <Button variant="ghost" className="hidden md:inline-flex text-[#A1A1AA] hover:text-white hover:bg-white/5 font-bold font-['Space_Grotesk'] tracking-tight">
                                  {t("login")}
                                </Button>
                             </Link>
                             <Link href="/register">
                                <Button
                                    size="sm"
                                    className="h-10 px-6 rounded-lg gradient-brand text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
                                >
                                    {t("register")}
                                </Button>
                             </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu & Theme Toggle */}
                <div className="flex md:hidden items-center gap-2">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <button
                        className="rounded-lg p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-90"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {menuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="md:hidden bg-[#09090B]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col gap-2 p-4">
                            {[
                              { name: t("features"), href: "/#features" },
                              { name: t("pricing"), href: "/pricing" }
                            ].map((link) => (
                                <Link 
                                  key={link.name}
                                  href={link.href} 
                                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 font-medium text-sm text-white hover:bg-[#2563EB]/10 hover:border-[#2563EB]/20 transition-colors"
                                  onClick={() => setMenuOpen(false)}
                                >
                                    {link.name}
                                    <Sparkles className="h-4 w-4 text-[#A1A1AA]/30" />
                                </Link>
                            ))}
                            
                            <div className="pt-4 mt-2 flex flex-col gap-3 border-t border-white/5">
                                {isLoggedIn ? (
                                    <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                                        <Button className="w-full h-14 rounded-lg gradient-brand text-white font-semibold text-lg active:scale-95 transition-transform">
                                            <LayoutDashboard className="mr-2 h-5 w-5" /> {t("dashboard")}
                                        </Button>
                                    </Link>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <Link href="/login" onClick={() => setMenuOpen(false)}>
                                            <Button variant="outline" className="w-full h-14 rounded-lg font-semibold text-lg border border-white/10 bg-transparent text-white hover:bg-white/5">{t("login")}</Button>
                                        </Link>
                                        <Link href="/register" onClick={() => setMenuOpen(false)}>
                                            <Button className="w-full h-14 rounded-lg gradient-brand text-white font-semibold text-lg shadow-lg shadow-blue-500/20 active:scale-95 transition-transform">{t("register")}</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
