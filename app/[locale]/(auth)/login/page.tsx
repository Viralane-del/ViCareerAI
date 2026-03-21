"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleEmailLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(error.message);
            setIsLoading(false);
            return;
        }

        toast.success("Giriş başarılı!");
        router.push("/dashboard");
        setIsLoading(false);
    }

    async function handleGoogleLogin() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/callback`,
            },
        });
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold">Tekrar Hoş Geldiniz</CardTitle>
                    <CardDescription>Hesabınıza giriş yapmak için e-posta bilginizi girin</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-posta</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Şifre</Label>
                                <Link href="#" className="text-sm text-blue-600 hover:underline">
                                    Şifrenizi mi unuttunuz?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Giriş Yap"}
                        </Button>
                    </form>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">veya</span>
                        </div>
                    </div>

                    <Button variant="outline" type="button" className="w-full" onClick={handleGoogleLogin}>
                        Google ile devam et
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
                    <p>
                        Hesabınız yok mu?{" "}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Kayıt Ol
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
