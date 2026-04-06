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
    <div className="grid gap-12 md:grid-cols-3 relative py-20">
      {stepIcons.map((step, i) => (
        <motion.div
          key={step.id}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
          className="relative group flex flex-col items-center text-center space-y-6 bg-white/50 dark:bg-zinc-900/30 p-10 rounded-[3rem] border border-zinc-100/50 dark:border-zinc-800/50 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden"
        >
          {/* Subtle Background Number */}
          <div className="absolute -right-4 -bottom-4 text-9xl font-black text-zinc-100/10 dark:text-zinc-800/20 select-none pointer-events-none group-hover:text-blue-500/5 group-hover:-translate-y-2 transition-all duration-700">
             0{step.id}
          </div>

          <div className={`h-20 w-20 rounded-3xl flex items-center justify-center ${step.bg} ${step.color} transform transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500 shadow-inner relative z-10`}>
            <step.icon className="h-10 w-10" />
          </div>

          <div className="space-y-3 relative z-10">
             <h3 className="text-2xl font-bold tracking-tight">{t(`${step.id}_title`)}</h3>
             <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px] mx-auto font-medium">
                {t(`${step.id}_desc`)}
             </p>
          </div>

          {/* Simple Arrow Indicator (Mobile only) */}
          <div className="md:hidden pt-4 opacity-20">
             <ArrowRight className="h-6 w-6 rotate-90" />
          </div>
        </motion.div>
      ))}
    </div>

  );
}
