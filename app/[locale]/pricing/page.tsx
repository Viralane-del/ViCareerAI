"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function PricingPage() {
    const t = useTranslations("Index");
    const [isLoading, setIsLoading] = useState(false);
    // In actual usage, this should come from env or config
    const PRO_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID || "price_1xxxxxx";

    const handleSubscribe = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/stripe/create-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId: PRO_PRICE_ID })
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("Ödeme sayfasına yönlendirilemedi.");
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Ödeme işlemi başlatılamadı";
            toast.error(message || "Ödeme işlemi başlatılamadı (Lütfen Stripe Key'lerinizi .env dosyasına girin)");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                    Kariyeriniz İçin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">En İyi Yatırım</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                    Yapay zeka araçlarımızla rakiplerinizin bir adım önüne geçin.
                    İhtiyacınıza uygun planı seçin ve hemen başlayın.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <Card className="flex flex-col border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                    <CardHeader className="text-center pb-8 pt-10">
                        <CardTitle className="text-2xl mb-2">Başlangıç</CardTitle>
                        <CardDescription className="text-base">Temel CV oluşturma araçları</CardDescription>
                        <div className="mt-6 flex justify-center items-baseline gap-1">
                            <span className="text-5xl font-black">{t("freePrice")}</span>
                            <span className="text-muted-foreground font-medium">{t("lifetime")}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 px-8">
                        <ul className="space-y-4">
                            {[
                                "1 Adet Ücretsiz CV Şablonu (Classic)",
                                "PDF İndirme Sınırı (Aylık 3)",
                                "Standart Destek",
                                "AI İlan Analizi (Yok)",
                                "Yapay Zeka Mektup (Yok)"
                            ].map((feature, i) => (
                                <li key={i} className="flex flex-row items-center gap-3 text-muted-foreground">
                                    <Check className="h-4 w-4 text-zinc-400 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="px-8 pb-10">
                        <Button className="w-full h-12 text-base" variant="outline" onClick={() => window.location.href = "/register"}>
                            Mevcut Planın
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="flex flex-col border-blue-200 dark:border-blue-900 shadow-xl shadow-blue-500/10 relative overflow-hidden scale-100 md:scale-105 z-10">
                    <div className="absolute top-0 inset-x-0 h-1.5 gradient-brand"></div>
                    <div className="absolute top-5 right-5">
                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                            Tavsiye Edilen
                        </span>
                    </div>
                    <CardHeader className="text-center pb-8 pt-10">
                        <CardTitle className="text-2xl mb-2 flex items-center justify-center gap-2">
                            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            Pro
                        </CardTitle>
                        <CardDescription className="text-base text-blue-900/70 dark:text-blue-100/70">Tüm AI araçlarına sınırsız erişim</CardDescription>
                        <div className="mt-6 flex justify-center items-baseline gap-1">
                            <span className="text-5xl font-black text-zinc-900 dark:text-white">{t("proPrice")}</span>
                            <span className="text-muted-foreground font-medium">{t("perMonth")}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 px-8">
                        <ul className="space-y-4">
                            {[
                                "Tüm Premium CV Şablonları (Modern & Minimal)",
                                "Sınırsız PDF İndirme (Filigransız)",
                                "Sınırsız Motivasyon Mektubu (AI Düzenleme)",
                                "İş İlanı Skill Gap Analizi ve Skorlama",
                                "Kişiselleştirilmiş Öğrenme Önerileri"
                            ].map((feature, i) => (
                                <li key={i} className="flex flex-row items-center gap-3 text-zinc-800 dark:text-zinc-200 font-medium">
                                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="px-8 pb-10">
                        <Button
                            className="w-full h-12 text-base gradient-brand text-white shadow-lg shadow-blue-500/25 border-0"
                            onClick={handleSubscribe}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Ödeme Sayfası Açılıyor...
                                </>
                            ) : (
                                "Pro'ya Yükselt"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
