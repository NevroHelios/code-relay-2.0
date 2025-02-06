"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/app/lib/utils";
import Hero from "@/app/components/animation/Hero";
import HeroImage from "@/app/components/animation/HeroImage";
import About from "@/app/components/animation//About";
import AboutImage from "@/app/components/animation/AboutImage";
import Footer from "@/app/components/animation/Footer";
import Lenis from "lenis";

export default function BOXSECTION() {
  const container = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main ref={container}>
      <Hero className="hero" />
      <HeroImage className="hero-img" />
      <About className="about" />
      <AboutImage className={cn("about-img")} />
      <Footer className="footer" />
    </main>
  );
}
