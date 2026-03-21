"use client";

import { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import {
  FileText,
  Briefcase,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const t = useTranslations("Navigation");

  const navigation = [
    { name: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { name: t("cvHistory"), href: "/cv/history", icon: FileText },
    { name: t("letterHistory"), href: "/cover-letter/history", icon: FileText },
    { name: t("jobs"), href: "/jobs/discover", icon: Briefcase },
    { name: t("settings"), href: "/profile", icon: Settings },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen w-full pt-16 bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r bg-white transition-transform duration-300 ease-in-out dark:bg-zinc-900 lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand transition-transform group-hover:scale-105">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-brand-text">CareerAI</span>
            </Link>
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3 mt-4">
              {t("menuLabel")}
            </div>
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href as "/dashboard" | "/cv/history" | "/cover-letter/history" | "/jobs/discover" | "/profile"}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-muted-foreground hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`} />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                </Link>
              );
            })}
          </nav>

          {/* User & Logout section */}
          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
              {t("logout")}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center border-b bg-white px-4 shadow-sm dark:bg-zinc-900 lg:hidden">
          <button
            className="text-muted-foreground hover:text-foreground p-2 -ml-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-4 flex items-center gap-2 font-bold text-lg">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="gradient-brand-text">CareerAI</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-zinc-50/50 p-4 md:p-8 dark:bg-black/20">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
