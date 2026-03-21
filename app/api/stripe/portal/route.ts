import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2026-02-25.clover" as any,
});

export async function POST(_req: Request) {
    try {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return cookieStore.getAll(); },
                    setAll() { /* Ignore */ },
                },
            }
        );

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: profile } = await supabase
            .from("profiles")
            .select("stripe_customer_id")
            .eq("id", session.user.id)
            .single();

        if (!profile?.stripe_customer_id) {
            return NextResponse.json({ error: "Kayıtlı Stripe ödeme profili bulunamadı." }, { status: 404 });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: profile.stripe_customer_id,
            return_url: `${appUrl}/tr/dashboard`,
        });

        return NextResponse.json({ url: portalSession.url });
    } catch (error: unknown) {
        console.error("Stripe Portal Error:", error);
        return NextResponse.json(
            { error: "Portal oluşturulamadı, ödeme geçmişi bulunamayabilir." },
            { status: 500 }
        );
    }
}
