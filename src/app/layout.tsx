import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import Preloader from "@/components/Preloader"; // Import Preloader
import SmoothScroll from "@/components/SmoothScroll"; // Import Lenis

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Chayan Neogi | Portfolio",
  description: "Electronics Engineer & Full-Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed native 'scroll-smooth' because Lenis handles it much better now
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#050505] text-gray-200 antialiased selection:bg-blue-600 selection:text-white relative`}>
        
        {/* 1. Preloader fires first, covering everything */}
        <Preloader />

        {/* 2. Lenis wraps your app for fluid scrolling */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
        
        {/* 3. Your Global Chatbot */}
        <Chatbot />
        
      </body>
    </html>
  );
}