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
    { name: t("applications"), href: "/jobs/tracker", icon: Briefcase },
    { name: t("settings"), href: "/profile", icon: Settings },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen w-full pt-16 bg-[#131315]">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-white/[0.06] bg-[#131315] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand transition-transform group-hover:scale-105">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-brand-text">CareerAI</span>
            </Link>
            <button
              className="lg:hidden text-[#A1A1AA] hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            <div className="text-[10px] font-semibold text-[#A1A1AA]/50 uppercase tracking-[0.2em] mb-4 px-3 mt-4">
              {t("menuLabel")}
            </div>
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href as "/dashboard" | "/cv/history" | "/cover-letter/history" | "/jobs/discover" | "/jobs/tracker" | "/profile"}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#2563EB]/10 text-white ring-1 ring-[#2563EB]/20"
                      : "text-[#A1A1AA] hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-[#2563EB]" : ""}`} />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                </Link>
              );
            })}
          </nav>

          {/* User & Logout section */}
          <div className="border-t border-white/[0.06] p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="h-5 w-5" />
              {t("logout")}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center border-b border-white/[0.06] bg-[#131315] px-4 lg:hidden">
          <button
            className="text-[#A1A1AA] hover:text-white p-2 -ml-2 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-4 flex items-center gap-2 font-bold text-lg">
            <Sparkles className="h-4 w-4 text-[#2563EB]" />
            <span className="gradient-brand-text">CareerAI</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#131315] p-4 md:p-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
