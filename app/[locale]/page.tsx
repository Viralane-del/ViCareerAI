"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, FileText, Briefcase, ChevronRight, CheckCircle2, 
  Target, Zap, Globe, ShieldCheck, ArrowRight, Star
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("Index");
  const nav = useTranslations("Navigation");

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex min-h-screen flex-col font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 gradient-hero-bg z-0" />
        <div className="absolute inset-0 grid-pattern z-0 opacity-40" />
        
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[100px] animate-pulse [animation-delay:2s]" />

        <main className="container relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center p-8 text-center sm:p-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur-md dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300 shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span>{t("badge")}</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-8xl leading-none"
          >
            {t.rich("title", {
              span: (chunks) => <span className="gradient-brand-text">{chunks}</span>
            })}
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
          >
            {t("description")}
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-5 sm:flex-row w-full sm:w-auto"
          >
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto h-16 rounded-2xl px-10 text-lg font-semibold gradient-brand text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all">
                {t("ctaPrimary")}
                <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 rounded-2xl px-10 text-lg glass-card border-zinc-200/50 hover:bg-zinc-100/50 dark:border-zinc-800/80 dark:hover:bg-zinc-800/50 font-medium">
                {t("ctaSecondary")}
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 w-12 rounded-full border-4 border-background bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold ring-2 ring-blue-500/10 overflow-hidden shadow-sm relative">
                   <Image 
                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} 
                     alt="user" 
                     fill
                     className="object-cover"
                   />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center leading-tight">
              <div className="flex items-center gap-1 mb-1 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("socialProof")}
              </p>
            </div>
          </motion.div>
        </main>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 bg-zinc-50/50 dark:bg-zinc-950/20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-6">
              {t.rich("featuresTitle", {
                span: (chunks) => <span className="text-blue-600">{chunks}</span>
              })}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("featuresDesc")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                icon: FileText, 
                title: "ATS Uyumlu Şablonlar", 
                desc: "Şirketlerin kullandığı filtrelerden hatasız geçen, profesyoneller tarafından onaylı modern tasarımlar.",
                color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
              },
              { 
                icon: Sparkles, 
                title: "AI İçerik Optimizasyonu", 
                desc: "GPT-4o ile başarılarınızı profesyonel bir dille yazın. Kendinizi ifade etmekte zorlanmaya son.",
                color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600"
              },
              { 
                icon: Target, 
                title: "Akıllı İlan Eşleştirme", 
                desc: "Başvuracağınız ilanı sisteme yükleyin, AI sizin için saniyeler içinde özel CV ve mektup hazırlasın.",
                color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600"
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                className="group p-8 rounded-[2rem] border bg-background hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 border-zinc-200/60 dark:border-zinc-800/60"
              >
                <div className={`mb-8 h-16 w-16 rounded-2xl flex items-center justify-center ${f.color} group-hover:scale-110 transition-transform`}>
                  <f.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 sm:py-32">
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold sm:text-5xl mb-6">{t("pricingTitle")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("pricingDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <motion.div {...fadeInUp} className="relative p-10 rounded-[2.5rem] border bg-background text-left flex flex-col items-start border-zinc-200 dark:border-zinc-800">
              <h3 className="text-2xl font-bold mb-2">Başlangıç (Free)</h3>
              <p className="text-muted-foreground mb-6">Kariyerine ilk adımı atanlar için.</p>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold">$0</span>
                <span className="text-muted-foreground">/ay</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Ayda 2 adet CV oluşturma",
                  "2 adet Motivasyon Mektubu",
                  "3 temel şablon erişimi",
                  "5 iş ilanı analizi"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full">
                <Button variant="outline" className="w-full h-14 rounded-2xl text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 border-2">{nav("register")}</Button>
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              {...fadeInUp} 
              className="relative p-10 rounded-[2.5rem] border bg-zinc-900 text-white text-left flex flex-col items-start overflow-hidden group shadow-2xl shadow-blue-500/10"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="h-40 w-40 text-blue-400" />
              </div>
              <div className="absolute top-6 right-6 bg-blue-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Önerilen</div>
              
              <h3 className="text-2xl font-bold mb-2">Profesyonel (Pro)</h3>
              <p className="text-zinc-400 mb-6">Sınırsız güç ve tüm özellikler.</p>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold">$9.99</span>
                <span className="text-zinc-400">/ay</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Sınırsız CV ve Mektup",
                  "Sınırsız İş İlanı Analizi",
                  "Tüm Premium Şablonlara Erişim",
                  "Gelişmiş ATS ve Skill Gap Analizi",
                  "LinkedIn'den otomatik profil çekme"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full">
                <Button className="w-full h-14 rounded-2xl text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-600/20">Pro'ya Geç</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950/40">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-center mb-16">{t("faqTitle")}</h2>
          <div className="grid gap-6">
            {[
              {
                q: "CV'ler realmente ATS uyumlu mu?",
                a: "Evet, tüm şablonlarımız SAP, Workday ve Lever gibi büyük ATS sistemlerinin standartlarına göre test edilmiştir."
              },
              {
                q: "Üyeliği istediğim zaman iptal edebilir miyim?",
                a: "Kesinlikle. Ayarlar menüsünden tek tıkla aboneliğinizi dilediğiniz ay iptal edebilirsiniz."
              },
              {
                q: "Kendi dilimde CV hazırlayabilir miyim?",
                a: "CareerAI şu an aktif olarak Türkçe ve İngilizce dillerini desteklemektedir, dil ayarını dilediğiniz gibi değiştirebilirsiniz."
              }
            ].map((faq, i) => (
              <motion.div key={i} {...fadeInUp} className="p-8 rounded-2xl border bg-background border-zinc-200/60 dark:border-zinc-800/60">
                <h4 className="text-lg font-bold mb-3">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="relative z-10 p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center shadow-2xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8">{t("ctaFinal")}</h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-12">
              {t("ctaFinalDesc")}
            </p>
            <Link href="/register">
              <Button size="lg" className="h-16 px-12 rounded-2xl text-xl font-bold bg-white text-blue-700 hover:bg-zinc-100 shadow-xl border-0 transition-transform hover:scale-105 active:scale-95">
                {t("ctaFinalButton")}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t py-12 px-6 bg-background">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-2xl">
            <div className="h-8 w-8 rounded-lg gradient-brand flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="gradient-brand-text">CareerAI</span>
          </div>
          
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground">Özellikler</Link>
            <Link href="#pricing" className="hover:text-foreground">Fiyatlandırma</Link>
            <Link href="/privacy" className="hover:text-foreground">Gizlilik</Link>
            <Link href="/terms" className="hover:text-foreground">Şartlar</Link>
          </div>

          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CareerAI. Antigravity tarafından tasarlandı.</p>
        </div>
      </footer>
    </div>
  );
}
