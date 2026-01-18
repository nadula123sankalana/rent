import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "US Cost of Living & Lifestyle Database",
  description:
    "US-first cost of living data, pricing, and lifestyle benchmarks for major American cities.",
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US">
      <body className={inter.className}>
        <div className="min-h-screen">
          <Header />
          <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
