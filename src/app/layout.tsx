import type { Metadata } from "next";
import { Geist, Geist_Mono, Play } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/Header";
import Footer from "@/components/footer";
import { Inter, Montserrat } from 'next/font/google';
import HeroSection from '@/components/hero';
import BackgroundVideo from '@/components/BackgroundVideo';

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const play = Play({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-play"
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${play.variable} ${montserrat.className} antialiased relative`}
      >
        <ThirdwebProvider>
          <BackgroundVideo opacity={0.8} />
          <Navbar />
          <div>
            <HeroSection />
          </div>
          {children}
          
        </ThirdwebProvider>
      </body>
    </html>
  );
}
