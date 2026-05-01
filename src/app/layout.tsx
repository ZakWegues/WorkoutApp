import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { InstallBanner } from "@/components/pwa/InstallBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkoutApp",
  description: "Seu parceiro de treinos",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        <QueryProvider>
          <InstallBanner />
          <div className="mx-auto max-w-[430px] min-h-screen relative shadow-2xl shadow-black/50 bg-[#0a0a0a]">
            {children}
          </div>
          <Toaster theme="dark" position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
