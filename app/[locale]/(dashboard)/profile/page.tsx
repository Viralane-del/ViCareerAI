"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { User, Lock, Crown, ShieldAlert, Save, Loader2 } from "lucide-react";

export default function ProfilePage() {
    const t = useTranslations("Index");
    const [profile, setProfile] = useState({ fullName: "", email: "" });
    const [plan, setPlan] = useState("free");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/profile")
            .then(r => r.json())
            .then(data => {
                if (data?.email) {
                    setProfile({
                        fullName: data.full_name || "",
                        email: data.email || "",
                    });
                    setPlan(data.plan || "free");
                }
            })
            .catch((_err) => {})
            .finally(() => setIsLoading(false));
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ full_name: profile.fullName }),
            });
            if (res.ok) {
                toast.success("Profil bilgileri güncellendi!");
            } else {
                toast.error("Güncelleme başarısız.");
            }
        } catch (_err) {
            toast.error("Bir hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordReset = async () => {
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: profile.email }),
            });
            if (res.ok) {
                toast.success("Şifre sıfırlama e-postası gönderildi!");
            } else {
                toast.error("E-posta gönderilemedi.");
            }
        } catch (_err) {
            toast.error("Bir hata oluştu.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto p-4 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Hesap Ayarları</h1>
                <p className="text-muted-foreground mt-1">Profilinizi ve hesap bilgilerinizi yönetin.</p>
            </div>

            {/* Profile Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <User className="h-4 w-4 text-blue-500" />
                        Kişisel Bilgiler
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Ad Soyad</Label>
                        <Input id="fullName" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input id="email" type="email" value={profile.email} disabled className="opacity-60" />
                        <p className="text-xs text-muted-foreground">E-posta adresi değiştirilemez.</p>
                    </div>
                    <Button className="gradient-brand text-white border-0" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Kaydet
                    </Button>
                </CardContent>
            </Card>

            {/* Plan Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        Plan Bilgisi
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-semibold">{plan === "pro" ? "Pro Plan" : "Ücretsiz Plan"}</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {plan === "pro" ? "Sınırsız CV, mektup ve analiz" : "Aylık 2 CV, 2 mektup, 5 ilan analizi"}
                            </p>
                        </div>
                        <Badge variant={plan === "pro" ? "default" : "secondary"} className={plan === "pro" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-0" : ""}>
                            {plan === "pro" ? "✨ Pro" : "Ücretsiz"}
                        </Badge>
                    </div>
                    {plan !== "pro" && (
                        <Button className="w-full gradient-brand text-white border-0 h-11">
                            <Crown className="mr-2 h-4 w-4" />
                            Pro Plana Yükselt — {t("proPrice")}
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* Password */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Lock className="h-4 w-4 text-zinc-500" />
                        Şifre Değiştir
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" onClick={handlePasswordReset}>
                        Şifre Sıfırlama E-postası Gönder
                    </Button>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-destructive">
                        <ShieldAlert className="h-4 w-4" />
                        Tehlikeli Bölge
                    </CardTitle>
                    <CardDescription>Bu işlemler geri alınamaz.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" className="w-full" onClick={() => toast.error("Hesap silme işlemi yakında eklenecek.")}>
                        Hesabı Kalıcı Olarak Sil
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
