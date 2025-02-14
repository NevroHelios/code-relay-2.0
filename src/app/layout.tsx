import type { Metadata } from "next";
import { Geist, Geist_Mono, Play } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const play = Play({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-play",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${play.variable} antialiased`}
      >
        {/* {" "} */}

        <ThirdwebProvider>
          {" "}
          <Navbar />
          {children}
          {/* <Footer /> */}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
