"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Sparkles, Share2, Box, Users, Terminal, ArrowRight, Verified } from "lucide-react";
import Image from "next/image";

export default function SkillsPage() {
    return (
        <div className="min-h-screen bg-surface-dim font-body-md text-on-background selection:bg-primary/30">
            <main className="pt-10 pb-32 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Profile Info & AI Score */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <section className="glass-panel rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-2xl">
                                    <Image 
                                        width={96} height={96}
                                        alt="Profile Large" 
                                        className="w-full h-full object-cover" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgRnHIjBMQ8ufBLrjLM22vA9j8dADGjnj-lDcLEaQt61oRYvCDrRxCIKTbp40u3bM1aziQYgFs7OV10g4cfUeN8W2z0F3HHpb3DwqGgteqYAI6wGJ7yQ3ty6PQksm27MvbaJeaVyQf8WQmNCFlU5wtHiAqBbrQGA9kK0_PJSDSyqfwoAMtvmaJHjVPOyngiBLK5s_qhJO2cYTuufaQxyV0z5iTONj7OoQWlvGj8R6R9wOxreBdZ8QqtVYwSk8db3r7DnDJGFC9AwhS"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-primary-container text-white p-1.5 rounded-lg border border-white/20">
                                    <Verified className="w-4 h-4" />
                                </div>
                            </div>
                            <h2 className="font-h2 text-white text-2xl font-semibold">Alex Sterling</h2>
                            <p className="font-body-sm text-zinc-400 mb-6 uppercase tracking-widest text-xs font-medium">Senior Product Engineer</p>
                            
                            <div className="w-full h-px bg-white/10 mb-6"></div>
                            
                            <div className="w-full">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-label-caps text-zinc-500 text-xs font-bold">AI RESUME SCORE</span>
                                    <span className="font-h3 text-blue-500 text-xl font-bold">85<span className="text-sm text-zinc-500">/100</span></span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full glow-blue w-[85%]"></div>
                                </div>
                                <p className="font-body-sm text-zinc-500 mt-3 text-left text-sm">Your resume performs better than 92% of applicants in your field.</p>
                            </div>
                        </section>

                        <section className="glass-panel rounded-3xl p-6">
                            <h3 className="font-h3 text-white mb-4 flex items-center gap-2 font-semibold">
                                <Sparkles className="text-blue-400 w-5 h-5" />
                                AI Insights
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-zinc-300 font-body-sm italic text-sm">"Your Python expertise is exceptional, but consider highlighting more 'Systems Design' projects to unlock Senior Architect roles."</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Radar Chart Visualization */}
                    <div className="md:col-span-8">
                        <section className="glass-panel rounded-3xl p-8 h-full min-h-[500px] flex flex-col">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="font-h2 text-white text-3xl font-semibold">Competency Matrix</h2>
                                    <p className="font-body-md text-zinc-400">Multidimensional analysis of your professional footprint</p>
                                </div>
                                <button className="bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all">
                                    <Share2 className="w-5 h-5 text-zinc-400" />
                                </button>
                            </div>
                            <div className="flex-grow flex items-center justify-center relative rounded-2xl" style={{ backgroundImage: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                                {/* Simulated Radar Chart Visualization */}
                                <div className="relative w-full max-w-md aspect-square flex items-center justify-center mt-12 mb-12">
                                    {/* Background Circles */}
                                    <div className="absolute inset-0 border border-white/5 rounded-full"></div>
                                    <div className="absolute inset-[15%] border border-white/5 rounded-full"></div>
                                    <div className="absolute inset-[30%] border border-white/5 rounded-full"></div>
                                    <div className="absolute inset-[45%] border border-white/5 rounded-full"></div>
                                    
                                    {/* Axes */}
                                    <div className="absolute w-full h-px bg-white/5 rotate-0"></div>
                                    <div className="absolute w-full h-px bg-white/5 rotate-[60deg]"></div>
                                    <div className="absolute w-full h-px bg-white/5 rotate-[120deg]"></div>
                                    
                                    {/* Skill Labels */}
                                    <span className="absolute -top-8 font-label-caps text-blue-400 text-xs font-bold uppercase tracking-wider">Technical Skills</span>
                                    <span className="absolute -bottom-8 font-label-caps text-zinc-500 text-xs font-bold uppercase tracking-wider">Problem Solving</span>
                                    <span className="absolute -left-20 top-1/4 font-label-caps text-zinc-500 text-xs font-bold uppercase tracking-wider">Leadership</span>
                                    <span className="absolute -right-24 top-1/4 font-label-caps text-zinc-500 text-xs font-bold uppercase tracking-wider">Communication</span>
                                    <span className="absolute -left-24 bottom-1/4 font-label-caps text-zinc-500 text-xs font-bold uppercase tracking-wider">Collaboration</span>
                                    <span className="absolute -right-16 bottom-1/4 font-label-caps text-zinc-500 text-xs font-bold uppercase tracking-wider">Adaptability</span>
                                    
                                    {/* The Polygon (SVG) */}
                                    <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(37,99,235,0.3)]" viewBox="0 0 100 100">
                                        <polygon fill="rgba(37, 99, 235, 0.2)" points="50,10 85,35 75,75 50,90 25,75 15,35" stroke="#2563eb" strokeWidth="1.5"></polygon>
                                        <circle cx="50" cy="10" fill="#2563eb" r="1.5"></circle>
                                        <circle cx="85" cy="35" fill="#2563eb" r="1.5"></circle>
                                        <circle cx="75" cy="75" fill="#2563eb" r="1.5"></circle>
                                        <circle cx="50" cy="90" fill="#2563eb" r="1.5"></circle>
                                        <circle cx="25" cy="75" fill="#2563eb" r="1.5"></circle>
                                        <circle cx="15" cy="35" fill="#2563eb" r="1.5"></circle>
                                    </svg>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Bento Skills Suggestions */}
                    <div className="md:col-span-12 mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-h2 text-white text-2xl font-semibold">Recommended Growth</h3>
                            <button className="text-blue-500 font-label-caps text-xs font-bold hover:underline tracking-widest">VIEW ALL SUGGESTIONS</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Suggestion 1 */}
                            <div className="glass-panel rounded-3xl p-6 group hover:border-blue-500/50 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <Box className="w-6 h-6" />
                                    </div>
                                    <span className="font-label-caps text-zinc-500 text-[10px] font-bold tracking-widest">+12% HIRED RATE</span>
                                </div>
                                <h4 className="font-h3 text-white text-lg font-medium mb-2">Cloud Architecture</h4>
                                <p className="font-body-sm text-zinc-400 text-sm mb-6">Master scalable distributed systems and AWS advanced patterns.</p>
                                <div className="flex items-center justify-between text-blue-500 font-mono text-xs tracking-widest uppercase group-hover:gap-2 transition-all">
                                    <span>Start Module</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Suggestion 2 */}
                            <div className="glass-panel rounded-3xl p-6 group hover:border-purple-500/50 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <span className="font-label-caps text-zinc-500 text-[10px] font-bold tracking-widest">+8% HIRED RATE</span>
                                </div>
                                <h4 className="font-h3 text-white text-lg font-medium mb-2">Strategic Leadership</h4>
                                <p className="font-body-sm text-zinc-400 text-sm mb-6">Frameworks for cross-functional alignment and vision setting.</p>
                                <div className="flex items-center justify-between text-purple-500 font-mono text-xs tracking-widest uppercase group-hover:gap-2 transition-all">
                                    <span>Access Workshop</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Suggestion 3 */}
                            <div className="glass-panel rounded-3xl p-6 group hover:border-emerald-500/50 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <Terminal className="w-6 h-6" />
                                    </div>
                                    <span className="font-label-caps text-zinc-500 text-[10px] font-bold tracking-widest">+15% HIRED RATE</span>
                                </div>
                                <h4 className="font-h3 text-white text-lg font-medium mb-2">Advanced Rust</h4>
                                <p className="font-body-sm text-zinc-400 text-sm mb-6">Leverage memory safety for high-performance backend tooling.</p>
                                <div className="flex items-center justify-between text-emerald-500 font-mono text-xs tracking-widest uppercase group-hover:gap-2 transition-all">
                                    <span>Quick Learning</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
