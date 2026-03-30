"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, GraduationCap, Briefcase, Award, Cpu, Code, MessageSquarePlus } from "lucide-react";

export default function LiveCVPreview() {
  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      {/* Container with a "sheet of paper" look */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row aspect-[1/1.4] md:aspect-auto"
      >
        {/* Left Sidebar (Narrow) or Top Header (Mobile) */}
        <div className="w-full md:w-64 bg-zinc-50 dark:bg-zinc-950/40 p-8 border-b md:border-b-0 md:border-r border-zinc-200/60 dark:border-zinc-800/60">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            {/* Minimalist Profile Picture */}
            <div className="h-24 w-24 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight">Johnathan Doe</h2>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Sr. Solutions Architect</p>
            </div>

            <div className="space-y-3 w-full pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
               {[
                 { icon: Mail, text: "hello@jdoe.design" },
                 { icon: Phone, text: "+1 (555) 123-4567" },
                 { icon: MapPin, text: "San Francisco, CA" },
                 { icon: Globe, text: "jdoe.design" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-xs text-muted-foreground group/info cursor-default">
                    <item.icon className="h-3.5 w-3.5 text-zinc-400 group-hover/info:text-blue-500 transition-colors" />
                    <span className="truncate">{item.text}</span>
                 </div>
               ))}
            </div>

            <div className="w-full pt-6 space-y-4 text-left">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Technical Arsenal</h3>
               <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "Docker", "AWS", "TypeScript", "Python", "GraphQL"].map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 text-[10px] font-medium border border-zinc-200/50 dark:border-zinc-700/50">
                      {skill}
                    </span>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Main Content (Wide) */}
        <div className="flex-1 p-8 md:p-10 space-y-8 overflow-y-auto custom-scrollbar">
           {/* Professional Summary */}
           <section className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquarePlus className="h-4 w-4 text-blue-500" />
                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">Executive Summary</h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Strategic Solutions Architect with 8+ years of experience in designing and implementing scalable cloud-native architectures. 
                Proven track record of reducing infrastructure costs by 35% while improving deployment frequency for Fortune 500 fintech companies.
              </p>
           </section>

           {/* Professional Experience */}
           <section className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-4 w-4 text-blue-500" />
                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">Work Chronicle</h3>
              </div>

              {[
                {
                  role: "Head of Infrastructure",
                  company: "FinTech Global",
                  date: "2021 — PRESENT",
                  desc: "Spearheaded the migration of monolithic architectures to serverless environments using Terraform and AWS Lambda. Managed a team of 15 engineers delivering 99.99% uptime."
                },
                {
                  role: "Senior Cloud Engineer",
                  company: "Streamly Inc",
                  date: "2018 — 2021",
                  desc: "Architected real-time video processing pipelines for 2M concurrent users. Optimized database queries resulting in a 40% reduction in latency."
                }
              ].map((job, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-zinc-100 dark:border-zinc-800 group/job">
                   <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-zinc-100 dark:bg-zinc-800 border-4 border-white dark:border-zinc-900 group-hover/job:border-blue-500 transition-colors" />
                   <div className="flex flex-col md:flex-row md:justify-between items-start mb-2 group-hover/job:-translate-y-0.5 transition-transform">
                      <h4 className="font-bold text-base leading-tight">{job.role}</h4>
                      <span className="text-[10px] font-bold text-blue-500/80 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">{job.date}</span>
                   </div>
                   <p className="text-xs font-medium text-zinc-500 mb-2">{job.company}</p>
                   <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-normal">{job.desc}</p>
                </div>
              ))}
           </section>

           {/* Education */}
           <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-4 w-4 text-blue-500" />
                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">Education</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 hover:border-blue-500/30 transition-all">
                    <h4 className="text-sm font-bold">M.S. Computer Science</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Stanford University · 2018</p>
                 </div>
                 <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 hover:border-blue-500/30 transition-all">
                    <h4 className="text-sm font-bold">B.A. Graphic Design</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">RISD · 2014</p>
                 </div>
              </div>
           </section>
        </div>
      </motion.div>

      {/* Trust Signal / "AI Generated" Tag */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="absolute -top-4 -right-4 z-20"
      >
        <div className="px-4 py-2 bg-zinc-900 text-white dark:bg-blue-600 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 border border-zinc-700">
           <Cpu className="h-3.5 w-3.5" />
           <span>AI GENERATED OUTPUT</span>
        </div>
      </motion.div>

      {/* Background Decorative Element */}
      <div className="absolute -inset-4 bg-blue-500/10 dark:bg-blue-500/5 blur-[60px] rounded-[3rem] -z-10 group-hover:bg-blue-500/20 transition-all duration-700" />
    </div>
  );
}
