import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover" as any,
});

export async function POST(req: Request) {
    const payload = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
        if (!webhookSecret) throw new Error("Webhook secret is missing");
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Webhook signature verification failed";
        console.error(errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Handle the event
    // We need to bypass regular cookie based auth for webhooks 
    // since they come from Stripe servers, not the user browser.
    const supabaseAdmin = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                getAll() { return [] },
                setAll() { /* IGNORE */ },
            },
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.userId;
                const customerId = session.customer as string;

                console.log(`🔔 Checkout completed for user ${userId}`);

                if (userId && customerId) {
                    // Grant Pro Status
                    const { error } = await supabaseAdmin
                        .from("profiles")
                        .update({
                            stripe_customer_id: customerId,
                            subscription_status: "active",
                            plan: "pro",
                        })
                        .eq("id", userId);
                    
                    if (error) console.error(`❌ Error updating profile for user ${userId}:`, error);
                }
                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;
                const status = subscription.status;

                console.log(`🔔 Subscription updated for customer ${customerId}. Status: ${status}`);

                // Update status in DB
                // Mapping Stripe status to our DB status if needed, 
                // but usually "active", "past_due", "unpaid", "canceled" are used directly.
                const { error } = await supabaseAdmin
                    .from("profiles")
                    .update({
                        subscription_status: status,
                        plan: status === "active" ? "pro" : "free", // Downgrade if not active (optional logic)
                    })
                    .eq("stripe_customer_id", customerId);

                if (error) console.error(`❌ Error updating subscription for customer ${customerId}:`, error);
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                console.log(`🔔 Subscription deleted for customer ${customerId}`);

                // Revoke Pro Status
                const { error } = await supabaseAdmin
                    .from("profiles")
                    .update({
                        subscription_status: "canceled",
                        plan: "free",
                    })
                    .eq("stripe_customer_id", customerId);
                
                if (error) console.error(`❌ Error revoking pro status for customer ${customerId}:`, error);
                break;
            }

            case "invoice.payment_failed": {
                const invoice = event.data.object as Stripe.Invoice;
                const customerId = invoice.customer as string;

                console.log(`⚠️ Payment failed for customer ${customerId}`);

                // Optionally notify user or mark as past_due
                await supabaseAdmin
                    .from("profiles")
                    .update({
                        subscription_status: "past_due",
                    })
                    .eq("stripe_customer_id", customerId);
                break;
            }

            default:
                console.log(`ℹ️ Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("❌ Webhook processing error:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
