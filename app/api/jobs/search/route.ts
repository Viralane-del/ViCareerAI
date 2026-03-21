import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Mock job postings - in production this would call JSearch/Indeed API
const mockJobListings = [
    {
        id: "j1",
        title: "Frontend Developer",
        company: "Trendyol",
        location: "İstanbul (Hibrit)",
        description: "React, TypeScript ve Next.js deneyimi olan Frontend geliştiriciler arıyoruz.",
        type: "Full-time",
        matchScore: 94,
        skills: ["React", "TypeScript", "Next.js", "TailwindCSS"],
        source: "mock",
        postedAt: "2 gün önce"
    },
    {
        id: "j2",
        title: "React Native Developer",
        company: "Getir",
        location: "Uzaktan",
        description: "Mobil uygulama geliştirme alanında React Native deneyimi olan mühendisler arıyoruz.",
        type: "Full-time",
        matchScore: 88,
        skills: ["React Native", "TypeScript", "Redux", "REST API"],
        source: "mock",
        postedAt: "1 gün önce"
    },
    {
        id: "j3",
        title: "Full Stack Developer",
        company: "Hepsiburada",
        location: "İstanbul",
        description: "Node.js ve React deneyimli, çevik metodolojilere hakim yazılımcılar arıyoruz.",
        type: "Full-time",
        matchScore: 82,
        skills: ["Node.js", "React", "PostgreSQL", "Docker"],
        source: "mock",
        postedAt: "3 gün önce"
    },
    {
        id: "j4",
        title: "Senior UI/UX Developer",
        company: "Insider",
        location: "Uzaktan",
        description: "Design sistemleri ve kullanıcı deneyimi konusunda uzmanlaşmış geliştiriciler.",
        type: "Full-time",
        matchScore: 78,
        skills: ["Figma", "React", "CSS", "A/B Testing"],
        source: "mock",
        postedAt: "5 gün önce"
    },
    {
        id: "j5",
        title: "Next.js Developer",
        company: "Loodos",
        location: "Ankara (Uzaktan)",
        description: "Next.js App Router ile yüksek performanslı web uygulamaları geliştirecek mühendis.",
        type: "Contract",
        matchScore: 90,
        skills: ["Next.js", "Vercel", "TypeScript", "Supabase"],
        source: "mock",
        postedAt: "1 gün önce"
    },
];

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { session: _session } } = await supabase.auth.getSession();

        // TODO: Check Pro plan for external API access
        // For now, return mock data for all users

        const { query } = await req.json();

        const filtered = query
            ? mockJobListings.filter(job =>
                job.title.toLowerCase().includes(query.toLowerCase()) ||
                job.skills.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
                job.company.toLowerCase().includes(query.toLowerCase())
            )
            : mockJobListings;

        return NextResponse.json({ jobs: filtered });
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
