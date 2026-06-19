import type { Metadata } from "next";
import { Geist_Mono, Inter, Roboto_Slab } from "next/font/google";
import { cn } from "~/lib/utils";
import "./globals.css";
import { ThemeProvider } from "~/integrations/themes/theme-provider";
import { TooltipProvider } from "~/shadcn/ui/tooltip";
import { Toaster } from "~/shadcn/ui/sonner";

const robotoSlabHeading = Roboto_Slab({
    subsets: ["latin"],
    variable: "--font-roboto-slab"
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "svaLekha",
    description: "Svalekha is a personal financial journal that transforms everyday transactions into meaningful financial insights. It's an expense tracking platform with categories, tags, budgets, analytics, and insights."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(inter.variable, robotoSlabHeading.variable, geistMono.variable)}
            suppressHydrationWarning
        >
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        {children}
                        <Toaster />
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
