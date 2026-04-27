"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronRight, Check, Loader2, Lock, TrendingUp, BrainCircuit, Zap } from "lucide-react";

export default function RoadmapPage() {
    return (
        <div className="min-h-screen bg-surface-dim selection:bg-primary-container selection:text-white">
            <main className="max-w-7xl mx-auto px-6 py-10 pb-32">
                {/* Hero Section */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="font-h1 text-4xl text-on-background mb-2">Senior Frontend Developer</h1>
                            <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">Your specialized path to technical mastery. Follow the roadmap to bridge the gap between mid-level and senior architectural leadership.</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-primary-container text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 glow-blue active:scale-95 duration-200">
                                <Zap className="w-5 h-5" />
                                Resume Analysis
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Metrics Bento Grid */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <TrendingUp className="w-16 h-16 text-white" />
                            </div>
                            <p className="font-label-caps text-xs text-on-surface-variant uppercase mb-2 font-bold tracking-widest">Skills Score</p>
                            <div className="flex items-baseline gap-2">
                                <span className="font-display text-5xl font-bold text-blue-500">84</span>
                                <span className="font-h3 text-xl text-on-surface-variant">/100</span>
                            </div>
                            <div className="mt-4 w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full w-[84%] rounded-full"></div>
                            </div>
                            <p className="mt-4 text-sm text-on-surface-variant">+5% since last assessment</p>
                        </div>

                        <div className="glass-panel p-6 rounded-3xl border-t-2 border-t-blue-500/50">
                            <p className="font-label-caps text-xs text-on-surface-variant uppercase mb-4 font-bold tracking-widest">Readiness Forecast</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Architecture</span>
                                    <span className="text-blue-500 font-mono text-sm">92%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Optimization</span>
                                    <span className="text-on-surface-variant font-mono text-sm">68%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Leadership</span>
                                    <span className="text-on-surface-variant font-mono text-sm">45%</span>
                                </div>
                            </div>
                        </div>

                        {/* AI Recommendations */}
                        <div className="glass-level-2 p-6 rounded-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <BrainCircuit className="text-blue-400 w-5 h-5" />
                                <h3 className="font-h3 text-xl text-white font-semibold">AI Insights</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-sm font-medium text-blue-400 mb-1">Critical Priority</p>
                                    <p className="text-sm text-zinc-300">Focus on 'Web Workers' and 'Off-main-thread' patterns to boost your Optimization score.</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-sm font-medium text-zinc-400 mb-1">Growth Opportunity</p>
                                    <p className="text-sm text-zinc-300">Your React knowledge is elite. Try mentoring a junior to unlock the 'Leadership' milestone.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interactive Roadmap */}
                    <div className="lg:col-span-8">
                        <div className="glass-panel p-8 rounded-3xl relative">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="font-h2 text-3xl font-semibold text-white">Learning Journey</h2>
                                <span className="bg-blue-500/10 text-blue-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Level 4/6</span>
                            </div>
                            
                            <div className="relative pl-12 space-y-12">
                                {/* Roadmap Vertical Line */}
                                <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-gradient-to-b from-blue-500 via-blue-500/50 to-white/10 rounded-full"></div>
                                
                                {/* Step 1: Completed */}
                                <div className="relative">
                                    <div className="absolute -left-[45px] top-1 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center border-4 border-zinc-950 z-10 shadow-lg shadow-blue-500/20">
                                        <Check className="text-white w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                                        <div>
                                            <h4 className="font-h3 text-xl font-medium text-white mb-1">Mastering React</h4>
                                            <p className="text-zinc-400 text-sm">Advanced hooks, concurrent rendering, and state management architectures.</p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-xs font-mono text-blue-500 uppercase font-bold">Completed</span>
                                            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                                <ChevronRight className="w-4 h-4 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: In Progress */}
                                <div className="relative">
                                    <div className="absolute -left-[45px] top-1 w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center border-4 border-blue-600 z-10 shadow-lg shadow-blue-500/40">
                                        <Loader2 className="text-blue-500 w-5 h-5 animate-spin" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 ring-2 ring-blue-500/30">
                                        <div className="w-full">
                                            <h4 className="font-h3 text-xl font-medium text-white mb-1">Performance Optimization</h4>
                                            <p className="text-zinc-400 text-sm">Bundle analysis, tree-shaking, memory leaks, and Core Web Vitals profiling.</p>
                                            <div className="mt-4 flex items-center gap-4 w-full max-w-sm">
                                                <div className="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-blue-600 h-full w-[65%]"></div>
                                                </div>
                                                <span className="text-xs font-mono text-zinc-400">65%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0 mt-4 md:mt-0">
                                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold active:scale-95 transition-all glow-blue">Continue</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3: Locked */}
                                <div className="relative opacity-50 grayscale">
                                    <div className="absolute -left-[45px] top-1 w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border-4 border-zinc-950 z-10">
                                        <Lock className="text-zinc-500 w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div>
                                            <h4 className="font-h3 text-xl font-medium text-zinc-400 mb-1">System Design</h4>
                                            <p className="text-zinc-500 text-sm">Micro-frontends, module federation, and scalable infrastructure patterns.</p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-xs font-mono text-zinc-600 uppercase font-bold">Locked</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4: Locked */}
                                <div className="relative opacity-50 grayscale">
                                    <div className="absolute -left-[45px] top-1 w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border-4 border-zinc-950 z-10">
                                        <Lock className="text-zinc-500 w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div>
                                            <h4 className="font-h3 text-xl font-medium text-zinc-400 mb-1">Technical Leadership</h4>
                                            <p className="text-zinc-500 text-sm">Strategic decision making, team mentorship, and architectural reviews.</p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-xs font-mono text-zinc-600 uppercase font-bold">Locked</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
