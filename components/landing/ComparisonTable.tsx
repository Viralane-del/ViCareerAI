"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function ComparisonTable() {
  const t = useTranslations("Comparison");
  
  const comparisonFeatures = [
    { feature: t("f1"), us: true, them: false },
    { feature: t("f2"), us: true, them: false },
    { feature: t("f3"), us: true, them: true }, // Generic AI can analyze text
    { feature: t("f4"), us: true, them: false },
    { feature: t("f5"), us: true, them: false },
    { feature: t("f6"), us: true, them: false },
    { feature: t("f7"), us: true, them: false }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto rounded-[2.5rem] border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-950/20 backdrop-blur-md shadow-2xl overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <div className="min-w-[600px] grid grid-cols-[1.5fr,1fr,1fr] gap-px bg-zinc-100 dark:bg-zinc-800/60">
        {/* Header Row */}
        <div className="bg-zinc-50/50 dark:bg-zinc-900/50 p-6 font-bold text-sm tracking-tight text-zinc-400 uppercase">{t("headerFocus")}</div>
        <div className="bg-blue-600 p-6 flex flex-col items-center justify-center gap-2 group">
           <Sparkles className="h-5 w-5 text-white animate-pulse" />
           <span className="text-white font-black text-sm uppercase tracking-widest">{t("headerUs")}</span>
        </div>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/50 p-6 flex flex-col items-center justify-center font-bold text-sm text-zinc-400 uppercase">{t("headerThem")}</div>

        {/* Feature Rows */}
        {comparisonFeatures.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="contents group/row"
          >
            {/* Feature Label */}
            <div className="bg-white dark:bg-zinc-950/40 p-6 text-sm font-semibold text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-900 group-hover/row:bg-blue-50/20 transition-colors">
              {item.feature}
            </div>
            
            {/* Our Status */}
            <div className="bg-blue-50/30 dark:bg-blue-900/10 p-6 flex items-center justify-center border-b border-zinc-100 dark:border-zinc-900">
               <motion.div
                 initial={{ scale: 0 }}
                 whileInView={{ scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 + 0.3 }}
                 className="h-8 w-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-inner"
               >
                 <Check className="h-4 w-4 text-green-500 stroke-[4px]" />
               </motion.div>
            </div>

            {/* Their Status */}
            <div className="bg-white dark:bg-zinc-950/40 p-6 flex items-center justify-center border-b border-zinc-100 dark:border-zinc-900 group-hover/row:bg-zinc-100/30 transition-colors">
               {item.them ? (
                 <Check className="h-4 w-4 text-zinc-300 stroke-[2px]" />
               ) : (
                 <X className="h-4 w-4 text-red-500/30 stroke-[2px]" />
               )}
            </div>
          </motion.div>
        ))}
        </div>
      </div>
    </div>
  );
}
