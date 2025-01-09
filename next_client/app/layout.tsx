import type { Metadata } from "next";
import { Inter, Azeret_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "next-themes";

const interSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const geistMono = Azeret_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "NFT Real Estate Platform",
    description: "Blockchain-powered real estate transactions",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${interSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex min-h-screen flex-col">
                        <Navigation />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
