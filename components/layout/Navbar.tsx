"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { createClient } from "@/lib/supabase/client";

import { useTranslations } from "next-intl";

export default function Navbar() {
    const t = useTranslations("Navigation");
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setIsLoggedIn(!!data.user);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                    ? "glass-card shadow-lg shadow-blue-500/5"
                    : "bg-transparent py-2"
                }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand transition-transform group-hover:scale-105">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="gradient-brand-text">CareerAI</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        {t("features")}
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        {t("pricing")}
                    </Link>
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    {isLoggedIn ? (
                        <Link href="/dashboard">
                            <Button size="sm" className="gradient-brand text-white shadow-lg shadow-blue-500/20">
                                <LayoutDashboard className="mr-2 h-4 w-4" /> {t("dashboard")}
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm">{t("login")}</Button>
                            </Link>
                            <Link href="/register">
                                <Button
                                    size="sm"
                                    className="gradient-brand text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:opacity-90 transition-all"
                                >
                                    {t("register")}
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger & Theme Toggle */}
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />
                    <button
                        className="rounded-lg p-2 hover:bg-muted transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menü"
                    >
                        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden glass-card border-t overflow-hidden"
                    >
                        <div className="flex flex-col gap-1 p-4">
                            <Link href="/#features" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted" onClick={() => setMenuOpen(false)}>
                                {t("features")}
                            </Link>
                            <Link href="/pricing" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted" onClick={() => setMenuOpen(false)}>
                                {t("pricing")}
                            </Link>
                            
                            <div className="mt-3 flex flex-col gap-2 border-t pt-3">
                                {isLoggedIn ? (
                                    <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                                        <Button className="w-full gradient-brand text-white">
                                            <LayoutDashboard className="mr-2 h-4 w-4" /> {t("dashboard")}
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setMenuOpen(false)}>
                                            <Button variant="outline" className="w-full">{t("login")}</Button>
                                        </Link>
                                        <Link href="/register" onClick={() => setMenuOpen(false)}>
                                            <Button className="w-full gradient-brand text-white">{t("register")}</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
