import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { configureLemonSqueezy } from "@/lib/lemonsqueezy";

export async function POST(req: Request) {
    try {
        configureLemonSqueezy();

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
        const userEmail = user.email!;

        const { variantId } = await req.json();

        if (!variantId) {
            return NextResponse.json({ error: "Variant ID is required" }, { status: 400 });
        }

        const storeId = process.env.LEMONSQUEEZY_STORE_ID;
        if (!storeId) {
             return NextResponse.json({ error: "Store ID is required in env" }, { status: 500 });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        const { data: checkout, error: checkoutError } = await createCheckout(storeId, variantId, {
            checkoutOptions: {
                embed: false,
                media: false,
                logo: true,
            },
            checkoutData: {
                email: userEmail,
                custom: {
                    userId: userId // We receive this in the webhook
                }
            },
            productOptions: {
                redirectUrl: `${appUrl}/tr/dashboard?success=true`,
            }
        });

        if (checkoutError) {
             console.error("LemonSqueezy Checkout Error:", checkoutError);
             return NextResponse.json({ error: "Ödeme sayfası oluşturulamadı." }, { status: 500 });
        }

        if (checkout && checkout.data && checkout.data.attributes.url) {
            return NextResponse.json({ url: checkout.data.attributes.url });
        } else {
             return NextResponse.json({ error: "Checkout URL not returned." }, { status: 500 });
        }

    } catch (error: unknown) {
        console.error("LemonSqueezy Checkout Route Error:", error);
        return NextResponse.json(
            { error: "Sunucu hatası oluştu." },
            { status: 500 }
        );
    }
}
