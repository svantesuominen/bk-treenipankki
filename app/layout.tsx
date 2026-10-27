import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { Header, HeaderFallback } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Treenipankki",
  description: "BK-46 Fotboll rf:n harjoitteet pelaajille ja valmentajille.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#d21f2a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fi" className="h-full">
      <body className="h-full bg-[#8e1520] antialiased">
        <div className="mx-auto flex h-dvh w-full max-w-[430px] flex-col bg-[#d21f2a] shadow-2xl">
          <Suspense fallback={<HeaderFallback />}>
            <Header />
          </Suspense>
          <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
          <Suspense fallback={<div className="h-16 bg-white" />}>
            <BottomNav />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
