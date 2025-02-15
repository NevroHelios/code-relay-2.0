<<<<<<< HEAD
import type { Metadata } from "next";
import { Geist, Geist_Mono, Play } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter, Montserrat } from 'next/font/google';
import HeroSection from '@/components/hero';
=======
"use client"
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThirdwebProvider } from '@thirdweb-dev/react';
>>>>>>> 63e54fb27683981893f5e12fe47f0d24b58be9b2

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
<<<<<<< HEAD
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${play.variable} ${montserrat.className} antialiased`}
      >
        <ThirdwebProvider>
        <Navbar/>
        <div className="z-[-1]">
        <HeroSection /></div>
          {children}
          
=======
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <ThirdwebProvider>
          {children}
>>>>>>> 63e54fb27683981893f5e12fe47f0d24b58be9b2
        </ThirdwebProvider>
      </body>
    </html>
  );
}
