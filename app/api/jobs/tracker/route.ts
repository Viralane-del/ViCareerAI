import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
            cookies: {
                getAll() { return cookieStore.getAll(); },
                setAll() { }
            },
        });

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { data, error } = await supabase
            .from("job_listings")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: false });

        if (error) throw error;
        
        // Map DB statuses to UI statuses
        const mappedData = data.map(job => ({
            id: job.id,
            company: job.company || "Unknown",
            position: job.title || "Unknown",
            location: job.location || "N/A",
            status: mapDbStatusToUi(job.status),
            appliedDate: job.applied_at || "-",
            matchScore: (job.analysis as { match_score?: number })?.match_score || 0
        }));

        return NextResponse.json(mappedData);
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { id, status } = await request.json();
        const cookieStore = await cookies();
        const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
            cookies: {
                getAll() { return cookieStore.getAll(); },
                setAll() { }
            },
        });

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const dbStatus = mapUiStatusToDb(status);

        const { error } = await supabase
            .from("job_listings")
            .update({ status: dbStatus })
            .eq("id", id)
            .eq("user_id", session.user.id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

function mapDbStatusToUi(status: string) {
    switch (status) {
        case 'waiting': return 'Saved';
        case 'applied': return 'Applied';
        case 'interview': return 'Interviewing';
        case 'offer': return 'Offer';
        case 'rejected': return 'Rejected';
        default: return 'Applied';
    }
}

function mapUiStatusToDb(status: string) {
    switch (status) {
        case 'Saved': return 'waiting';
        case 'Applied': return 'applied';
        case 'Interviewing': return 'interview';
        case 'Offer': return 'offer';
        case 'Rejected': return 'rejected';
        default: return 'applied';
    }
}
