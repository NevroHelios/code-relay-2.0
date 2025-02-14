"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function HomePage() {
  useEffect(() => {
    gsap.from(".nav-item", {
      duration: 1,
      y: -50,
      opacity: 0,
      stagger: 0.2,
    });
    gsap.from(".hero-title", {
      duration: 1.2,
      y: 50,
      opacity: 0,
      delay: 0.5,
    });
    gsap.from(".hero-desc", {
      duration: 1.2,
      y: 50,
      opacity: 0,
      delay: 0.7,
    });
    gsap.from(".hero-btn", {
      duration: 1.2,
      scale: 0,
      opacity: 0,
      delay: 0.9,
    });
  }, []);

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/img/bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="text-white text-3xl font-bold">Naymur w</div>
        <ul className="hidden md:flex space-x-6 text-white">
          <li className="nav-item">
            <Link href="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/about">About us</Link>
          </li>
          <li className="nav-item">
            <Link href="/services">Services</Link>
          </li>
          <li className="nav-item">
            <Link href="/contact">Contact us</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="hero-title text-white text-6xl font-bold leading-tight">
          MODELING AGENCY
        </h1>
        <p className="hero-desc mt-4 text-white text-xl max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
          exercitationem repellendus veniam vero adipisci nobis fuga architecto
          aspernatur aliquam provident!
        </p>
        <Link href="/explore">
          <a className="hero-btn mt-8 inline-block border-4 border-white rounded-full px-8 py-4 text-2xl text-white transition hover:bg-white hover:text-black">
            Explore now
          </a>
        </Link>
      </div>
    </section>
  );
}
