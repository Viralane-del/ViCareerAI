"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, Download, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const stepIcons = [
  { id: 1, icon: Upload, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 2, icon: Cpu, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: 3, icon: Download, color: "text-teal-500", bg: "bg-teal-500/10" }
];

export function ProcessSteps() {
  const t = useTranslations("ProcessSteps");
  
  return (
    <div className="grid gap-12 md:grid-cols-3 relative">
      {/* Decorative connecting lines for desktop */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-px border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 -translate-y-12 -z-10" />

      {stepIcons.map((step, i) => (
        <motion.div
          key={step.id}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
          className="relative group flex flex-col items-center text-center space-y-6 bg-background dark:bg-zinc-950/20 p-8 rounded-[2.5rem] border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:shadow-xl transition-all duration-500"
        >
          {/* Step Number Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500 border border-zinc-200 dark:border-zinc-700">
             {t("step")} {step.id}
          </div>

          <div className={`h-20 w-20 rounded-3xl flex items-center justify-center ${step.bg} ${step.color} transform transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500 shadow-inner`}>
            <step.icon className="h-10 w-10" />
          </div>

          <div className="space-y-3">
             <h3 className="text-xl font-bold tracking-tight">{t(`${step.id}_title`)}</h3>
             <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px] mx-auto">
                {t(`${step.id}_desc`)}
             </p>
          </div>

          {/* Simple Arrow Indicator (Mobile only or mobile-first design) */}
          <div className="md:hidden pt-4">
             <ArrowRight className="h-6 w-6 text-zinc-200 dark:text-zinc-800 rotate-90" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
