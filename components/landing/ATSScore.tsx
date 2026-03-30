"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Sparkles, TrendingUp } from "lucide-react";

interface ATSScoreProps {
  score?: number;
  className?: string;
}

export function ATSScore({ score = 85, className = "" }: ATSScoreProps) {
  // Calculate stroke-dashoffset for the circular progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`glass-card p-8 rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl shadow-blue-500/5 ${className}`}>
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Circular Progress */}
        <div className="relative flex items-center justify-center">
          <svg className="h-40 w-40 transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-zinc-100 dark:text-zinc-800"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#blue-gradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              strokeLinecap="round"
              fill="transparent"
            />
            <defs>
              <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E3A5F" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <motion.span 
               initial={{ opacity: 0, scale: 0.5 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.8 }}
               className="text-4xl font-black gradient-brand-text leading-tight"
             >
               {score}%
             </motion.span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">ATS Match</span>
          </div>
        </div>

        {/* AI Insights */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                <Sparkles className="h-5 w-5" />
             </div>
             <div>
                <h4 className="font-bold text-lg leading-none mb-1">AI Optimization Suggestions</h4>
                <p className="text-xs text-muted-foreground">Based on current Job Market Trends</p>
             </div>
          </div>

          <div className="space-y-3">
             {[
               { icon: CheckCircle2, text: "Strong keyword matching in 'Experience' section.", positive: true },
               { icon: TrendingUp, text: "Formatting is 100% readable by top ATS systems.", positive: true },
               { icon: AlertCircle, text: "Add 'Cloud Architecture' to 'Skills' for a 95% match.", positive: false },
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ x: 20, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 1 + i * 0.15 }}
                 className={`flex items-start gap-3 p-4 rounded-2xl border transition-all hover:translate-x-1 ${
                   item.positive 
                   ? "bg-green-50/30 border-green-100/50 dark:bg-green-950/10 dark:border-green-900/20" 
                   : "bg-blue-50/30 border-blue-100/50 dark:bg-blue-950/10 dark:border-blue-900/20"
                 }`}
               >
                 <item.icon className={`h-5 w-5 shrink-0 ${item.positive ? "text-green-500" : "text-blue-500"}`} />
                 <span className="text-sm font-medium">{item.text}</span>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
