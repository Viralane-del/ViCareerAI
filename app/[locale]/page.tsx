"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, Briefcase, ChevronRight, CheckCircle2, 
  Zap, Globe, ShieldCheck, ArrowRight, Cpu, Shield, Clock
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// New Components
import { ATSScore } from "@/components/landing/ATSScore";
import LiveCVPreview from "@/components/landing/LiveCVPreview";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { TestimonialCard } from "@/components/landing/TestimonialCard";

export default function Home() {
  const t = useTranslations("Index");
  const tPricing = useTranslations("Pricing");
  const tFooter = useTranslations("Footer");
  const tTestimonial = useTranslations("Testimonials");
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
    }
  };

  const tATS = useTranslations("ATS");
  
  return (
    <div className="flex min-h-screen flex-col font-sans overflow-x-hidden selection:bg-blue-500/10 bg-background text-on-background">
      {/* Hero Section */}
      <section ref={targetRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ai-gradient opacity-50 blur-[120px] pointer-events-none" />

        <motion.main 
          style={{ opacity, scale }}
          className="container relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center p-6 text-center sm:p-12 h-full"
        >
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-blue-500/20 text-blue-400 text-sm font-mono"
          >
            <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="tracking-wide uppercase">{t("badge")}</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 max-w-5xl font-h1 text-4xl sm:text-6xl md:text-8xl lg:text-[80px] leading-[1.1] tracking-tighter text-white"
          >
            {t.rich("title", {
              span: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 block mt-2">{chunks}</span>
            })}
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-14 max-w-3xl font-body-lg text-lg sm:text-xl md:text-2xl text-zinc-400"
          >
            {t("description")}
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4 justify-center"
          >
            <Link href="/register">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2">
                {t("ctaPrimary")} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="#features">
              <button className="px-8 py-4 glass-panel text-white font-bold rounded-xl hover:bg-white/5 active:scale-95 transition-all duration-200">
                {t("ctaSecondary")}
              </button>
            </Link>
          </motion.div>

          {/* Hero Content ends here */}
        </motion.main>
      </section>


      {/* 2. LIVE PREVIEW SECTION (The "A-HA" moment) */}
      <section className="py-16 md:py-24 relative">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-20">
               <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-white">
                  {t("previewTitle")}
               </motion.h2>
               <motion.p {...fadeInUp} transition={{ delay: 0.1 }} className="text-base md:text-xl text-[#A1A1AA] max-w-2xl mx-auto">
                  {t("previewDesc")}
               </motion.p>
            </div>
            
            <LiveCVPreview />

            <div className="mt-20 flex flex-col items-center gap-6">
               <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-12 w-12 md:h-14 md:w-14 rounded-lg border-4 border-[#131315] bg-[#1c1b1d] flex items-center justify-center text-xs font-bold ring-1 ring-white/5 overflow-hidden shadow-2xl relative">
                       <Image 
                         src={`https://api.dicebear.com/7.x/avataaars/svg?seed=success${i}`} 
                         alt="user" 
                         fill
                         className="object-cover"
                       />
                    </div>
                  ))}
               </div>
               <p className="text-xs md:text-sm font-semibold text-[#A1A1AA]/60 uppercase tracking-[0.2em]">
                  {t("socialProof")}
               </p>
            </div>
         </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="features" className="py-24 px-6 relative bg-[#0e0e10]">
         <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="font-h1 text-4xl sm:text-5xl text-white">
                {t.rich("howItWorksTitle", {
                  span: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{chunks}</span>
                })}
              </h2>
              <p className="font-body-lg text-lg text-zinc-400">
                {t("howItWorksDesc")}
              </p>
            </div>

            <ProcessSteps />
         </div>
      </section>

      {/* 4. ATS & AI DIFFERENTIATION */}
      <section className="py-32 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] md:h-[600px] md:w-[600px] bg-[#2563EB]/5 rounded-full blur-[120px] pointer-events-none" />
         
         <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
               <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-white">
                       {t("atsTitle")}
                    </h2>
                    <p className="text-base md:text-xl text-[#A1A1AA] leading-relaxed">
                       {t("atsDesc")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                     {[
                       { icon: Cpu, title: tATS("kw_title"), desc: tATS("kw_desc") },
                       { icon: Clock, title: tATS("time_title"), desc: tATS("time_desc") },
                       { icon: Shield, title: tATS("shield_title"), desc: tATS("shield_desc") },
                       { icon: CheckCircle2, title: tATS("check_title"), desc: tATS("check_desc") }
                     ].map((item, i) => (
                       <motion.div 
                         key={i}
                         initial={{ opacity: 0, x: -20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: i * 0.1 }}
                         className="flex gap-4"
                       >
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB] shrink-0">
                             <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                             <h4 className="font-semibold text-base text-white">{item.title}</h4>
                             <p className="text-xs text-[#A1A1AA]">{item.desc}</p>
                          </div>
                       </motion.div>
                     ))}
                  </div>
               </div>

               <ATSScore />
            </div>
         </div>
      </section>

      {/* 5. COMPARISON SECTION */}
      <section className="py-24 bg-background">
         <div className="container mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <div className="mb-20">
               <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-white">{t("comparisonTitle")}</h2>
               <p className="text-base md:text-xl text-[#A1A1AA] max-w-2xl mx-auto font-medium">
                  {t("comparisonDesc")}
               </p>
            </div>
            
            <ComparisonTable />
         </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-20 md:py-32 relative">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-24">
               <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-white">{t("testimonialsTitle")}</h2>
               <p className="text-base md:text-xl text-[#A1A1AA] max-w-2xl mx-auto font-medium">
                  {t("testimonialsDesc")}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
               <TestimonialCard 
                 name={tTestimonial("t1_name")}
                 role={tTestimonial("t1_role")}
                 quote={tTestimonial("t1_quote")}
                 avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                 delay={0.1}
               />
               <TestimonialCard 
                 name={tTestimonial("t2_name")}
                 role={tTestimonial("t2_role")}
                 quote={tTestimonial("t2_quote")}
                 avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
                 delay={0.2}
               />
               <TestimonialCard 
                 name={tTestimonial("t3_name")}
                 role={tTestimonial("t3_role")}
                 quote={tTestimonial("t3_quote")}
                 avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
                 delay={0.3}
               />
            </div>
         </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section id="pricing" className="py-24 bg-background text-white relative overflow-hidden">
        {/* Background decorative ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full -translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-8">{t("pricingTitle")}</h2>
            <p className="text-base md:text-xl text-[#A1A1AA] max-w-2xl mx-auto font-medium">
              {t("pricingDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div {...fadeInUp} className="relative p-6 md:p-12 rounded-lg border border-white/[0.06] bg-[#1c1b1d] text-left flex flex-col items-start group hover:border-[#2563EB]/30 transition-all duration-500 shadow-xl">
              <div className="mb-8 space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{tPricing("essential")}</h3>
                <p className="text-[#A1A1AA] font-semibold uppercase tracking-widest text-[10px]">{tPricing("kickstart")}</p>
              </div>
              <div className="mb-10 flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-bold tracking-tighter">{t("freePrice")}</span>
                <span className="text-base md:text-lg text-[#A1A1AA] font-semibold">{t("perMonth")}</span>
              </div>
              <ul className="space-y-5 mb-14 flex-1 w-full">
                {[
                  tPricing("f1"),
                  tPricing("f2"),
                  tPricing("f3"),
                  tPricing("f4")
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#A1A1AA] font-medium pb-4 border-b border-white/[0.06] last:border-0">
                    <div className="h-6 w-6 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full">
                <Button variant="outline" className="w-full h-14 md:h-16 rounded-lg text-lg font-bold bg-transparent text-white border-white/20 hover:bg-white/5 transition-all">
                  {tPricing("getStarted")}
                </Button>
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              {...fadeInUp} 
              className="relative p-6 md:p-12 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white text-left flex flex-col items-start overflow-hidden group shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-[1.02] transition-transform duration-500"
            >
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Sparkles className="h-60 w-60 text-white" />
              </div>
              <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/20 backdrop-blur-md text-[10px] font-bold px-4 py-2 rounded-lg uppercase tracking-widest border border-white/20">{tPricing("mostPopular")}</div>
              
              <div className="mb-8 space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{tPricing("pro")}</h3>
                <p className="text-blue-200 font-semibold uppercase tracking-widest text-[10px]">{tPricing("proSubtitle")}</p>
              </div>
              <div className="mb-10 flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-bold tracking-tighter">{t("proPrice")}</span>
                <span className="text-base md:text-lg text-blue-200 font-semibold">{t("perMonth")}</span>
              </div>
              <ul className="space-y-5 mb-14 flex-1 w-full">
                {[
                  tPricing("p1"),
                  tPricing("p2"),
                  tPricing("p3"),
                  tPricing("p4"),
                  tPricing("p5")
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-medium pb-4 border-b border-white/10 last:border-0 border-dashed">
                    <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-white shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full">
                <Button className="w-full h-14 md:h-16 rounded-lg text-lg font-bold bg-white text-[#2563EB] hover:bg-zinc-100 shadow-2xl">
                   {tPricing("upgrade")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-24 bg-[#0e0e10]">
        <div className="container mx-auto max-w-4xl px-6">
           <div className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-white">{t("faqTitle")}</h2>
              <div className="h-1 w-24 bg-[#2563EB] mx-auto rounded-full" />
           </div>
          <div className="grid gap-4">
            {[
              {
                q: t("faq1q"),
                a: t("faq1a"),
                video: t("faq1video")
              },
              {
                q: t("faq2q"),
                a: t("faq2a"),
                video: t("faq2video")
              },
              {
                q: t("faq3q"),
                a: t("faq3a"),
                video: t("faq3video")
              }
            ].map((faq, i) => (
              <motion.div key={i} {...fadeInUp} className="p-6 md:p-10 rounded-lg border border-white/[0.06] bg-[#131315] hover:border-[#2563EB]/30 transition-all group">
                <h4 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-4 text-white">
                   <div className="h-8 w-8 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="h-4 w-4" />
                   </div>
                   {faq.q}
                </h4>
                <div className="pl-12">
                  <p className="text-[#A1A1AA] leading-relaxed font-medium">{faq.a}</p>
                  
                  {faq.video && faq.video !== "" && (
                    <div className="mt-6 relative rounded-lg overflow-hidden border border-white/[0.06] shadow-lg group-hover:border-[#2563EB]/30 transition-colors bg-[#1c1b1d] aspect-video">
                      <video 
                        src={faq.video} 
                        controls 
                        className="absolute inset-0 w-full h-full object-cover"
                        preload="metadata"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="py-20 md:py-32 relative px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-10 p-8 md:p-24 lg:p-32 rounded-lg bg-[#2563EB] text-white text-center shadow-[0_30px_100px_rgba(37,99,235,0.3)] overflow-hidden"
          >
            {/* Background design elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none grid-pattern" />
            <div className="absolute top-0 left-0 h-64 w-64 bg-white blur-[100px] opacity-10 -translate-x-1/2 -translate-y-1/2" />
            
            <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-8 lg:mb-10 leading-[1.1] md:leading-[0.9]">
               {t("ctaFinal")}
            </motion.h2>
            <motion.p {...fadeInUp} transition={{ delay: 0.1 }} className="text-base md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 lg:mb-16 font-medium leading-relaxed">
              {t("ctaFinalDesc")}
            </motion.p>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Link href="/register">
                <Button size="lg" className="h-14 md:h-20 px-8 md:px-16 rounded-lg text-lg md:text-2xl font-bold bg-white text-[#131315] hover:bg-zinc-100 transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl w-full sm:w-auto">
                  {t("ctaFinalButton")}
                  <ArrowRight className="ml-2 md:ml-3 h-6 w-6 md:h-8 md:w-8" />
                </Button>
              </Link>
            </motion.div>
            
            <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200">
               <span className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-white" /> {t("secureCheckout")}</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-white" /> {t("privacy")}</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-white" /> {t("aiPowered")}</span>
            </div>
          </motion.div>
        </div>
      </section>

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
