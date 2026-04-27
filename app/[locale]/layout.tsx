import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CareerAI - Yapay Zeka Destekli CV Oluşturucu",
  description: "Saniyeler içinde ATS uyumlu CV ve motivasyon mektubu oluşturun.",
};

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { children } = props;
  const params = await props.params;
  const { locale } = params;

  if (!routing.locales.includes(locale as "en" | "tr")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} antialiased bg-[#131315] text-white transition-colors duration-200`}
        style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
