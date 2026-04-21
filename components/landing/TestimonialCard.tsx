"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  delay?: number;
}

export function TestimonialCard({ name, role, quote, avatar, delay = 0 }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="group relative h-full bg-white dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-800/50 p-6 md:p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      {/* Decorative Quote Icon */}
      <div className="absolute top-6 right-8 text-blue-500/10 dark:text-blue-500/5 group-hover:text-blue-500/20 transition-colors">
        <Quote className="h-16 w-16 fill-current" />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative h-14 w-14 rounded-2xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden ring-4 ring-white dark:ring-zinc-900 shadow-md">
           <Image
             src={avatar}
             alt={name}
             fill
             className="object-cover transition-transform group-hover:scale-110 duration-500"
           />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-base leading-tight group-hover:text-blue-600 transition-colors">{name}</h4>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground opacity-70 italic">{role}</p>
        </div>
      </div>

      <div className="flex gap-0.5 mb-4 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-current" />
        ))}
      </div>

      <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed font-medium">
        &quot;{quote}&quot;
      </p>

      {/* Trust Badge Indicator */}
      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
         <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
           <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
           VERIFIED SUCCESS
         </span>
      </div>
    </motion.div>
  );
}
