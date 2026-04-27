"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Send, Pause, Sparkles, BrainCircuit, Activity, ChevronLeft, Image as ImageIcon, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function AIInterviewPage() {
    const [isRecording, setIsRecording] = useState(false);

    return (
        <div className="min-h-screen bg-[#09090B] text-[#e5e1e4] flex flex-col items-center justify-center p-4 py-8">
            
            {/* Header */}
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <Link href="/dashboard" className="text-[#A1A1AA] hover:text-white transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <div className="flex items-center gap-2 text-white font-bold">
                    <Sparkles className="w-5 h-5 text-[#2563EB]" />
                    ViCareer AI
                </div>
                <div className="w-6 h-6"></div> {/* Spacer for center alignment */}
            </div>

            {/* Main Interview Container */}
            <div className="w-full max-w-md space-y-6">
                
                {/* Avatar / Video area */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel border border-white/10 flex items-center justify-center bg-[#131315]">
                    {/* Placeholder for 3D AI Avatar */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20"></div>
                    <Image 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwYocT5yDfRzW3qaficDXXtyMTt9M8ZrHNkwxSB03ob_ApNWafgEUsdjr_pgvsSLfGt8OUENFXzCLjB1mBq2C0oJ_8FskaRUXY6Y8m0LDyk7gFo1pllpblX6rKvmpk3DHKB4sH0EYT9esfm6GVHu2vUKK6wFLPcSDfP2bWymW0mzWc8vDtVastZWiMVtUmi0iv_eyv3FkaisoEQvOLbMiQqknln4m-NbEARDeI3BrQ08xgm_jEMv8vezVzg2S50q9zLer0TmGtdDns" 
                        alt="AI Avatar" 
                        width={300} 
                        height={300} 
                        className="object-contain w-3/4 h-3/4 mix-blend-screen opacity-80"
                    />
                    
                    {/* Active Speaker Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
                        <div className="w-1 h-3 bg-[#2563EB] rounded-full animate-[bounce_1s_infinite]"></div>
                        <div className="w-1 h-4 bg-[#2563EB] rounded-full animate-[bounce_1.2s_infinite]"></div>
                        <div className="w-1 h-2 bg-[#2563EB] rounded-full animate-[bounce_0.8s_infinite]"></div>
                        <div className="w-1 h-5 bg-[#2563EB] rounded-full animate-[bounce_1.5s_infinite]"></div>
                        <div className="w-1 h-3 bg-[#2563EB] rounded-full animate-[bounce_1.1s_infinite]"></div>
                    </div>
                </div>

                {/* Question Area */}
                <div className="text-center space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">QUESTION 03 / 10</p>
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                        "Tell me about a challenging project you managed. What were the obstacles, and how did you overcome them?"
                    </h2>
                </div>

                {/* Live Analysis */}
                <Card className="bg-[#1c1b1d] border-white/[0.06] rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-xl pointer-events-none"></div>
                    <CardContent className="p-6 space-y-6 relative z-10">
                        <div className="flex items-start justify-between">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Activity className="w-4 h-4 text-[#2563EB]" />
                                Live Analysis
                            </h3>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Circular Score */}
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2563EB" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.85)} strokeLinecap="round" />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className="text-xl font-bold text-white">85</span>
                                    <span className="text-[10px] text-[#A1A1AA]">%</span>
                                </div>
                            </div>
                            
                            {/* Live Feedback Points */}
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-xs text-[#e5e1e4]">Strong start</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-xs text-[#e5e1e4]">Clear articulation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-orange-400 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                                    </div>
                                    <span className="text-xs text-[#e5e1e4]">Pacing slightly fast</span>
                                </div>
                            </div>
                        </div>

                        {/* Metrics Bars */}
                        <div className="space-y-4 pt-2">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-[#A1A1AA] uppercase tracking-wider">TECHNICAL ACCURACY</span>
                                    <span className="text-emerald-400">92%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#131315] rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-[#A1A1AA] uppercase tracking-wider">FLUENCY</span>
                                    <span className="text-blue-400">88%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#131315] rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '88%' }}></div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-[#A1A1AA] uppercase tracking-wider">CONFIDENCE</span>
                                    <span className="text-purple-400">76%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#131315] rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-400 rounded-full" style={{ width: '76%' }}></div>
                                </div>
                            </div>
                            <div className="pt-2 flex justify-between items-center border-t border-white/[0.06]">
                                <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">TONE</span>
                                <span className="text-xs text-white bg-white/10 px-2 py-1 rounded-md">Professional</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Controls Area */}
                <div className="pt-6 space-y-4">
                    {/* User text input (simulated) */}
                    <div className="w-full bg-[#1c1b1d] border border-white/[0.06] rounded-xl p-4 flex items-center gap-3">
                        <div className="flex-1 text-sm text-[#A1A1AA]">
                            "In my previous role at TechFlow, I led a cross-functional team of eight to migrate our entire infrastructure to..."
                        </div>
                        <div className="w-1 h-4 bg-[#2563EB] animate-pulse"></div>
                    </div>

                    <div className="flex flex-col items-center gap-3 pt-2">
                        <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest">TAP TO RECORD ANSWER</p>
                        <button 
                            onClick={() => setIsRecording(!isRecording)}
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                                isRecording 
                                ? 'bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] scale-110' 
                                : 'bg-[#2563EB] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105'
                            }`}
                        >
                            {isRecording ? <Pause className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
