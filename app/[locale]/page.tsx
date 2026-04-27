"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import {
  Sparkles, Briefcase,
  Globe
} from "lucide-react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import MobileBottomNav from "@/components/landing/MobileBottomNav";

export default function Home() {
  const tFooter = useTranslations("Footer");

  return (
    <div className="flex min-h-screen flex-col font-sans overflow-x-hidden selection:bg-blue-500/10 bg-background text-on-background">
      <HeroSection />
      <FeaturesSection />
      <MobileBottomNav />


      {/* Footer */}
      <footer className="w-full py-12 bg-[#09090B] border-t border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2 space-y-8">
              <Link href="/" className="flex items-center gap-2 font-bold text-3xl">
                <div className="h-10 w-10 rounded-lg gradient-brand flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="gradient-brand-text">CareerAI</span>
              </Link>
              <p className="text-[#A1A1AA] max-w-xs font-medium leading-relaxed">
                {tFooter("desc")}
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{tFooter("platform")}</h4>
              <nav className="flex flex-col gap-4 text-sm font-medium text-[#A1A1AA]">
                <Link href="#features" className="hover:text-[#2563EB] transition-colors">{tFooter("features")}</Link>
                <Link href="#pricing" className="hover:text-[#2563EB] transition-colors">{tFooter("pricing")}</Link>
                <Link href="/templates" className="hover:text-[#2563EB] transition-colors">{tFooter("templates")}</Link>
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{tFooter("legal")}</h4>
              <nav className="flex flex-col gap-4 text-sm font-medium text-[#A1A1AA]">
                <Link href="/privacy" className="hover:text-[#2563EB] transition-colors">{tFooter("privacy")}</Link>
                <Link href="/terms" className="hover:text-[#2563EB] transition-colors">{tFooter("terms")}</Link>
              </nav>
            </div>
          </div>

          <div className="pt-10 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-medium text-[#A1A1AA] tracking-tight">
              {tFooter("rights", { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-6 text-[#A1A1AA]">
              <Globe className="h-5 w-5 hover:text-[#2563EB] cursor-pointer transition-colors" />
              <Briefcase className="h-5 w-5 hover:text-[#2563EB] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
