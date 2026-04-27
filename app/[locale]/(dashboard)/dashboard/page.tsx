"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Briefcase,
    Zap,
    TrendingUp,
    ChevronRight,
    BrainCircuit,
    Code,
    CheckCircle2,
    Lock,
    Play,
    Share2,
    BookOpen
} from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
    const t = useTranslations("Dashboard");

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto text-[#e5e1e4] bg-[#09090B] min-h-screen">
            
            {/* Left Column: Role & Readiness */}
            <div className="w-full md:w-1/3 space-y-6">
                
                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Senior Frontend Developer
                    </h1>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                        Your specialized path to technical mastery. Follow the roadmap to bridge the gap between mid-level and senior architectural leadership.
                    </p>
                    <Button className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white shadow-md shadow-blue-500/20 rounded-lg py-6 font-medium flex items-center justify-center gap-2 transition-all">
                        <Briefcase className="w-4 h-4" />
                        Resume Analysis
                    </Button>
                </div>

                {/* Match Score */}
                <Card className="bg-[#1c1b1d] border-white/[0.06] rounded-xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A1A1AA]">ROLE SCORE</h3>
                            <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                                <TrendingUp className="w-3 h-3 mr-1" /> +5%
                            </span>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-5xl font-bold text-white tracking-tighter">84</span>
                            <span className="text-[#A1A1AA] text-lg mb-1 font-medium">/100</span>
                        </div>
                        <p className="text-xs text-[#A1A1AA] mt-2">+5% since last assessment</p>
                    </CardContent>
                </Card>

                {/* Readiness Forecast */}
                <Card className="bg-[#1c1b1d] border-white/[0.06] rounded-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A1A1AA]">
                            READINESS FORECAST
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { name: "Architecture", score: 82 },
                            { name: "Optimization", score: 88 },
                            { name: "Leadership", score: 65 },
                        ].map((skill) => (
                            <div key={skill.name} className="space-y-1.5">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-[#e5e1e4]">{skill.name}</span>
                                    <span className="text-white">{skill.score}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#131315] rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-[#2563EB] rounded-full" 
                                        style={{ width: `${skill.score}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="bg-[#2563EB]/[0.02] border-[#2563EB]/20 rounded-xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2563EB]/10 rounded-full blur-2xl"></div>
                    <CardHeader className="pb-2 relative z-10">
                        <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB] flex items-center gap-2">
                            <BrainCircuit className="w-4 h-4" /> AI Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-white/80">Action Priority</h4>
                            <p className="text-sm text-[#A1A1AA] leading-relaxed">
                                Focus on &apos;Web Workers&apos; and &apos;Off-main-thread&apos; patterns to boost your Performance scores.
                            </p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-white/80">Growth Opportunity</h4>
                            <p className="text-sm text-[#A1A1AA] leading-relaxed">
                                Your React knowledge is elite. Try mentoring a junior to unlock the &apos;Leadership&apos; milestone.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Learning Journey */}
                <div className="pt-4">
                    <h3 className="text-lg font-bold text-white mb-6">Learning Journey</h3>
                    <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#2563EB] before:via-[#2563EB]/50 before:to-transparent">
                        
                        {/* Step 1: Completed */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active pb-8">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#09090B] bg-[#2563EB] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(37,99,235,0.5)] relative z-10">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-4 rounded-xl border border-[#2563EB]/30 bg-[#2563EB]/5">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-white text-sm">Mastering React</h4>
                                    <span className="text-[10px] font-mono text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded">LEVEL 4/5</span>
                                </div>
                                <p className="text-xs text-[#A1A1AA]">Advanced hooks, concurrent rendering, and state management architecture.</p>
                            </div>
                        </div>

                        {/* Step 2: Current */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active pb-8">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#09090B] bg-[#09090B] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                                <div className="w-3 h-3 rounded-full bg-[#2563EB] animate-pulse"></div>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-4 rounded-xl border border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-white text-sm">Performance Optimization</h4>
                                </div>
                                <p className="text-xs text-[#A1A1AA] mb-3">Caching, memory leaks, and Core Web Vitals profiling.</p>
                                <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-0 text-xs py-1 h-8">
                                    Continue
                                </Button>
                            </div>
                        </div>

                        {/* Step 3: Locked */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group pb-8">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#09090B] bg-[#1c1b1d] text-[#A1A1AA] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                                <Lock className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-transparent opacity-60">
                                <h4 className="font-bold text-[#e5e1e4] text-sm mb-1">System Design</h4>
                                <p className="text-xs text-[#A1A1AA]">Micro-frontends, scaleable architecture, and CI/CD pipelines.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Right Column: User Info & Skills Analysis */}
            <div className="w-full md:w-2/3 space-y-6">
                
                {/* User Profile Header */}
                <Card className="bg-[#1c1b1d] border-white/[0.06] rounded-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6 relative z-10">
                        <div className="relative">
                            <Image 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXCVj2nVdwSsp-HA24PeGSqKtBFoyT_SFbvQKp_KZmgdyhbdD38bLkGS0e11mMrBIRSPTr1iL5rJJdHMx_goOjz_TiiJInBbT9PeIKvTlyFBiRr5DaDBUtzQhmBI7WDFKWU4Qz8meL4SkqjIzzhHlp7zHpt6E1PYZxNip_xnm64CsWDxCSEEJkRHIHGw8eT7miUqPXLbpcHX1jqtSWXdtlp_hvOqgb4SZVP-5FW0332Jpl8oQLsESkjjDcCS2Vmyihq2MvSWHd6Pk5"
                                width={96}
                                height={96}
                                alt="Alex Sterling"
                                className="rounded-2xl border-2 border-white/10 object-cover"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-[#2563EB] text-white text-[10px] font-bold px-2 py-1 rounded-md">PRO</div>
                        </div>
                        <div className="text-center md:text-left space-y-1">
                            <h2 className="text-2xl font-bold text-white">Alex Sterling</h2>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A1A1AA]">SENIOR PRODUCT MANAGER</p>
                            <p className="text-sm text-emerald-400 mt-2 font-medium">Top 5% Resume Score</p>
                            <p className="text-sm text-[#A1A1AA] max-w-md mt-1">This profile performs better than 95% of applicants in your field.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Competency Matrix (Placeholder for Radar Chart) */}
                <Card className="bg-[#1c1b1d] border-white/[0.06] rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg font-bold text-white">Competency Matrix</CardTitle>
                            <p className="text-sm text-[#A1A1AA]">Multidimensional analysis of your professional footprint.</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-[#A1A1AA] hover:text-white">
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-8">
                        {/* CSS Hexagon / Radar Chart approximation */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* SVG Radar Chart Background */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <polygon points="50,50 80,45 75,75 50,85 25,65 35,40" fill="rgba(37, 99, 235, 0.2)" stroke="#2563EB" strokeWidth="2" />
                                
                                {/* Axis lines */}
                                <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(255,255,255,0.1)" />
                                <line x1="50" y1="50" x2="90" y2="30" stroke="rgba(255,255,255,0.1)" />
                                <line x1="50" y1="50" x2="90" y2="70" stroke="rgba(255,255,255,0.1)" />
                                <line x1="50" y1="50" x2="50" y2="90" stroke="rgba(255,255,255,0.1)" />
                                <line x1="50" y1="50" x2="10" y2="70" stroke="rgba(255,255,255,0.1)" />
                                <line x1="50" y1="50" x2="10" y2="30" stroke="rgba(255,255,255,0.1)" />
                                
                                {/* Data points */}
                                <circle cx="50" cy="50" r="3" fill="#2563EB" />
                                <circle cx="50" cy="50" r="3" fill="#2563EB" />
                                <circle cx="80" cy="45" r="3" fill="#2563EB" />
                                <circle cx="75" cy="75" r="3" fill="#2563EB" />
                                <circle cx="50" cy="85" r="3" fill="#2563EB" />
                                <circle cx="25" cy="65" r="3" fill="#2563EB" />
                                <circle cx="35" cy="40" r="3" fill="#2563EB" />
                            </svg>
                            
                            {/* Labels */}
                            <span className="absolute top-0 text-[10px] font-medium text-[#2563EB]">Technical Skills</span>
                            <span className="absolute bottom-0 text-[10px] font-medium text-[#A1A1AA]">Problem Solving</span>
                            <span className="absolute top-1/4 right-0 translate-x-4 text-[10px] font-medium text-[#A1A1AA]">Communication</span>
                            <span className="absolute bottom-1/4 right-0 translate-x-4 text-[10px] font-medium text-[#A1A1AA]">Leadership</span>
                            <span className="absolute top-1/4 left-0 -translate-x-4 text-[10px] font-medium text-[#A1A1AA]">Adaptability</span>
                            <span className="absolute bottom-1/4 left-0 -translate-x-4 text-[10px] font-medium text-[#A1A1AA]">Collaboration</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Recommended Growth */}
                <Card className="bg-[#1c1b1d] border-white/[0.06] rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/[0.06]">
                        <CardTitle className="text-lg font-bold text-white">Recommended Growth</CardTitle>
                        <Button variant="link" className="text-xs text-[#A1A1AA] hover:text-white p-0">
                            VIEW ALL SUGGESTIONS
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/[0.06]">
                            {/* Item 1 */}
                            <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-sm group-hover:text-[#2563EB] transition-colors">Cloud Architecture</h4>
                                        <p className="text-xs text-[#A1A1AA]">Master scalable distributed systems and AWS advanced patterns.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">+15% HIRING RATE</span>
                                    <span className="text-xs text-[#A1A1AA] flex items-center gap-1 group-hover:text-white transition-colors">START MODULE <ChevronRight className="w-3 h-3" /></span>
                                </div>
                            </div>
                            
                            {/* Item 2 */}
                            <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-sm group-hover:text-purple-400 transition-colors">Strategic Leadership</h4>
                                        <p className="text-xs text-[#A1A1AA]">Frameworks for cross-functional alignment and vision setting.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">+10% HIRING RATE</span>
                                    <span className="text-xs text-[#A1A1AA] flex items-center gap-1 group-hover:text-white transition-colors">ACCESS WORKSHOP <ChevronRight className="w-3 h-3" /></span>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-sm group-hover:text-orange-400 transition-colors">Advanced Rust</h4>
                                        <p className="text-xs text-[#A1A1AA]">Leverage memory safety for high-performance backend tooling.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">+22% HIRING RATE</span>
                                    <span className="text-xs text-[#A1A1AA] flex items-center gap-1 group-hover:text-white transition-colors">BEGIN COURSE <ChevronRight className="w-3 h-3" /></span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

