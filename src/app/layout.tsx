import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nazrul Reddit",
  description: "A clone of Reddit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        inter.className,
        "bg-white text-slate-900 antialiased light "
      )}
    >
      <body className="pt-12 min-h-screen bg-slate-50 antialiased">
        <Navbar />
        <div className="w-full px-8 max-w-7xl mx-auto h-full pt-12">
          {children}
        </div>
      </body>
    </html>
  );
}
