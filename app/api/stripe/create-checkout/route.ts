import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2026-02-25.clover" as any,
});

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return cookieStore.getAll(); },
                    setAll(_cookiesToSet) { /* Ignore */ },
                },
            }
        );

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = user.id;
        const userEmail = user.email;

        const { priceId } = await req.json();

        if (!priceId) {
            return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        const stripeSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            customer_email: userEmail,
            metadata: {
                userId,
            },
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${appUrl}/tr/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/tr/pricing`,
        });

        return NextResponse.json({ url: stripeSession.url });
    } catch (error: unknown) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json(
            { error: "Ödeme sayfası oluşturulamadı, API anahtarlarınızı kontrol edin." },
            { status: 500 }
        );
    }
}
