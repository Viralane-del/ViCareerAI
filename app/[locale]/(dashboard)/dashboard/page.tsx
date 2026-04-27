"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FileText, Briefcase, PlusCircle, FileSearch, ArrowRight, Sparkles
} from "lucide-react";

interface QuotaData {
    cv_count: number;
    letter_count: number;
    analysis_count: number;
}

export default function DashboardPage() {
    const t = useTranslations("Dashboard");
    const [quota, setQuota] = useState<QuotaData | null>(null);
    const [userName, setUserName] = useState("Kullanıcı");
    const [plan, setPlan] = useState("free");

    useEffect(() => {
        Promise.all([
            fetch("/api/profile").then(r => r.ok ? r.json() : null),
            fetch("/api/quota").then(r => r.ok ? r.json() : null),
        ]).then(([profileData, quotaData]) => {
            if (profileData) {
                setUserName(profileData.full_name || profileData.email?.split("@")[0] || "Kullanıcı");
                setPlan(profileData.plan || "free");
            }
            if (quotaData) setQuota(quotaData);
        }).catch(() => {});
    }, []);

    const maxCv = plan === "pro" ? "∞" : "2";
    const maxLetter = plan === "pro" ? "∞" : "5";
    const maxAnalysis = plan === "pro" ? "∞" : "10";

    const stats = [
        { title: t("stats.cvs"), value: quota ? `${quota.cv_count}/${maxCv}` : "...", desc: t("stats.thisMonth"), icon: FileText, color: "text-blue-500" },
        { title: t("stats.letters"), value: quota ? `${quota.letter_count}/${maxLetter}` : "...", desc: t("stats.thisMonth"), icon: FileText, color: "text-purple-500" },
        { title: t("stats.analysis"), value: quota ? `${quota.analysis_count}/${maxAnalysis}` : "...", desc: t("stats.used"), icon: FileSearch, color: "text-teal-500" },
        { title: t("stats.plan"), value: plan === "pro" ? t("stats.pro") : t("stats.free"), desc: plan === "pro" ? "Sınırsız erişim" : "Kısıtlı erişim", icon: Briefcase, color: plan === "pro" ? "text-yellow-500" : "text-orange-500" },
    ];

    const quickLinks = [
        { href: "/cv/history", label: t("quickAccess.cvs"), icon: FileText },
        { href: "/cover-letter/new", label: t("quickAccess.letter"), icon: PlusCircle },
        { href: "/jobs/tracker", label: t("quickAccess.applications"), icon: Briefcase },
        { href: "/jobs/discover", label: t("quickAccess.find"), icon: FileSearch },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto p-4 md:p-8">

            {/* Welcome & Quick Actions */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t("welcome", { name: userName })}</h1>
                    <p className="text-[#A1A1AA] mt-1">{t("todayGoal")}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link href="/cv/new">
                        <Button className="gradient-brand text-white shadow-md shadow-blue-500/20 rounded-lg">
                            <PlusCircle className="mr-2 h-4 w-4" /> {t("newCv")}
                        </Button>
                    </Link>
                    <Link href="/cover-letter/new">
                        <Button variant="outline" className="border-white/[0.06] bg-[#1c1b1d] text-white hover:bg-white/5 rounded-lg">
                            {t("writeLetter")}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow bg-[#1c1b1d] border-white/[0.06] rounded-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-[#A1A1AA] mt-1">{stat.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">

                {/* Quick navigation links */}
                <Card className="col-span-1 lg:col-span-3 bg-[#1c1b1d] border-white/[0.06] rounded-lg">
                    <CardHeader>
                        <CardTitle>{t("quickAccess.title")}</CardTitle>
                        <CardDescription className="text-[#A1A1AA]">{t("quickAccess.desc")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            {quickLinks.map(link => (
                                <Link key={link.href} href={link.href as "/cv/history" | "/cover-letter/new" | "/jobs/tracker" | "/jobs/discover"}>
                                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-[#131315] border-white/[0.06] hover:bg-[#2563EB]/10 hover:border-[#2563EB]/30 transition-all group cursor-pointer">
                                        <link.icon className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors" />
                                        <span className="text-sm font-medium group-hover:text-[#2563EB] text-[#A1A1AA] group-hover:text-white transition-colors">{link.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* AI Features promo */}
                <Card className="col-span-1 lg:col-span-4 bg-[#2563EB]/5 border-[#2563EB]/20 rounded-lg backdrop-blur-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Sparkles className="h-5 w-5 text-[#2563EB]" />
                                    {t("aiTools.title")}
                                </CardTitle>
                                <CardDescription className="text-blue-200 mt-1">
                                    {t("aiTools.desc")}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2.5 text-sm text-blue-100">
                            {[
                                t("aiTools.feature1"),
                                t("aiTools.feature2"),
                                t("aiTools.feature3"),
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#2563EB] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/jobs/discover">
                            <Button className="mt-5 w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white border-0 rounded-lg" size="sm">
                                {t("aiTools.button")} <ArrowRight className="ml-2 h-3.5 w-3.5" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
