import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import OpenAI from "openai";

// Dışarıdan enjecte edilen OpenAI key. Eğer yoksa mock data döneceğiz veya hata vereceğiz.
const openaiApiKey = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
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

        const { rawText, sectionType, targetPosition } = await req.json();

        if (!rawText) {
            return NextResponse.json({ error: "Geliştirilecek metin eksik." }, { status: 400 });
        }

        // Quota check
        const { data: profile } = await supabase.from('profiles').select('plan').eq('id', session.user.id).single();
        if (profile?.plan === 'free') {
            let { data: quota } = await supabase.from('usage_quotas').select('analysis_count').eq('user_id', session.user.id).single();
            if (!quota) {
                await supabase.from('usage_quotas').insert({ user_id: session.user.id });
                quota = { analysis_count: 0 };
            }
            if (quota.analysis_count >= 5) {
                return NextResponse.json({ error: "Ücretsiz plan AI kullanım hakkınızı (5 defa) doldurdunuz. Sınırsız kullanım için Pro plana geçin." }, { status: 403 });
            }
        }

        if (!openaiApiKey) {
            // Mock response if OPENAI_API_KEY is not set (for developmental testing)
            console.warn("OPENAI_API_KEY is not set. Returning mock data.");
            await new Promise(r => setTimeout(r, 1500)); // simulate delay
            
            // Increment quota mock
            if (profile?.plan === 'free') {
                const { data: quota } = await supabase.from('usage_quotas').select('analysis_count').eq('user_id', session.user.id).single();
                if (quota) {
                    await supabase.from('usage_quotas').update({ analysis_count: quota.analysis_count + 1 }).eq('user_id', session.user.id);
                }
            }

            return NextResponse.json({
                suggestions: [
                    `${targetPosition || 'Uzman'} rolüne uygun şekilde yeniden yazıldı: ${rawText} (Versiyon 1)`,
                    `Profesyonel ve etkili bir dille: ${rawText} (Versiyon 2)`,
                    `Kısa ve öz anlatım: ${rawText} (Versiyon 3)`
                ]
            });
        }

        const openai = new OpenAI({ apiKey: openaiApiKey });

        let systemPrompt = "Sen profesyonel bir CV danışmanısın. Kullanıcının girdiği ham metni daha profesyonel, IK tarafında dikkat çekici ve etkili bir dille yeniden yazacaksın. Çıktı olarak SADECE 3 farklı alternatif içeren bir JSON dizisi vereceksin. Her bir dizi elemanı string olacak. Örnek: [\"alternatif 1\", \"alternatif 2\", \"alternatif 3\"]";

        let userPrompt = `Lütfen şu metni profesyonelleştir: "${rawText}"\nBölüm: ${sectionType || 'Bilinmiyor'}\n`;
        if (targetPosition) {
            userPrompt += `Hedef başvuru pozisyonu: ${targetPosition}. Lütfen bu metni bu pozisyona özel olarak vurgularla iyileştir.`;
        }

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "gpt-4o-mini", // Faster and cheaper
            response_format: { type: "json_object" } // Tell OpenAI to ensure JSON
        });

        const resultText = completion.choices[0].message.content || '{"suggestions": []}';
        
        let suggestions: string[] = [];
        try {
            // Because we asked for json_object, it often comes wrapped in an object like {"suggestions": [...]}
            // or we might need to parse an array if the prompt forced it.
            const parsed = JSON.parse(resultText);
            if (Array.isArray(parsed)) {
                suggestions = parsed;
            } else if (parsed.suggestions && Array.isArray(parsed.suggestions)) {
                suggestions = parsed.suggestions;
            } else {
                // fallback
                suggestions = [resultText];
            }
        } catch (e) {
            console.error("Failed to parse JSON", resultText);
            return NextResponse.json({ error: "AI yanıtı işlenemedi." }, { status: 500 });
        }

        // Increment quota
        if (profile?.plan === 'free') {
            const { data: quota } = await supabase.from('usage_quotas').select('analysis_count').eq('user_id', session.user.id).single();
            if (quota) {
                await supabase.from('usage_quotas').update({ analysis_count: quota.analysis_count + 1 }).eq('user_id', session.user.id);
            }
        }

        return NextResponse.json({ suggestions: suggestions.slice(0, 3) });

    } catch (error: any) {
        console.error("AI Suggest API Error:", error);
        return NextResponse.json(
            { error: "İçerik önerisi oluşturulurken bir hata meydana geldi." },
            { status: 500 }
        );
    }
}
