"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

const HeroLanding = () => {
  useEffect(() => {
    // GSAP animations
    gsap.to(".block-1", {
      duration: 2,
      x: -180,
      y: -100,
      scale: 2.4,
      ease: "expo.inOut",
    });
    gsap.to(".block-2", {
      duration: 2,
      x: -180,
      y: 200,
      scale: 1.2,
      ease: "expo.inOut",
    });
    gsap.to(".block-3", {
      duration: 2,
      x: 180,
      y: -240,
      scale: 1.6,
      ease: "expo.inOut",
    });
    gsap.to(".block-4", {
      duration: 2,
      x: 280,
      y: 240,
      scale: 0.8,
      ease: "expo.inOut",
    });
    gsap.to(".box", {
      duration: 2.4,
      y: "-100%",
      ease: "expo.inOut",
    });
    gsap.from(".circle-shape", {
      duration: 2.4,
      scale: 0,
      ease: "expo.inOut",
    });
    gsap.from(".circle-shape-2", {
      duration: 2.4,
      scale: 0,
      ease: "expo.inOut",
    });
    gsap.from(".circle-shape-3", {
      duration: 2.4,
      scale: 0,
      ease: "expo.inOut",
    });
    gsap.from(".navbar > div", {
      duration: 1.6,
      opacity: 0,
      y: 60,
      ease: "expo.inOut",
      delay: 0.6,
    });
    gsap.from(".site-logo", {
      duration: 1.6,
      opacity: 0,
      y: 40,
      ease: "expo.inOut",
      delay: 0.6,
    });
    gsap.from(".showreel", {
      duration: 1.6,
      opacity: 0,
      y: 40,
      ease: "expo.inOut",
      delay: 0.6,
    });
    gsap.from(".site-menu > div", {
      duration: 1,
      opacity: 0,
      y: 60,
      ease: "power2.out",
      stagger: 0.2,
    });
  }, []);

  return (
    <div className="relative">
      {/* Site Logo */}
      <div className="site-logo fixed left-1/2 -translate-x-1/2 font-[Mak] text-5xl uppercase font-bold text-green-500 z-50">
        GreenSync
      </div>

      {/* Navbar */}
      <div className="navbar fixed w-full h-24 px-10 flex justify-between items-center font-sans uppercase font-bold text-green-500 z-50">
        <div className="site-info text-xl">Digital / Future</div>
        <div className="site-menu flex">
          <div className="menu-item ml-16 text-xl hover:text-green-400">projects</div>
          <div className="menu-item ml-16 text-xl hover:text-green-400">about</div>
          <div className="menu-item ml-16 text-xl hover:text-green-400">contact</div>
        </div>
      </div>

      {/* Showreel */}
      <div className="showreel absolute left-0 bottom-0 p-10 font-sans uppercase text-[#8d785b] underline text-lg z-50">
        view showreel
      </div>

      {/* Main Container */}
      <div className="container w-full h-screen flex justify-center items-center bg-[#202217] font-[Mak] overflow-hidden">
        {/* Image Wrapper */}
        <div className="wrapper-img overflow-hidden absolute top-[35%] right-[18%] w-1/3 h-[90vh]">
          <div className="box absolute inset-0 bg-[#202217] z-0"></div>
          <div>
            <img className="image w-full h-full object-cover" src="/hero-img.jpeg" alt="Hero" />
          </div>
        </div>

        {/* Circle Shapes */}
        <div className="circle-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-green-500/20 rounded-full"></div>
        <div className="circle-shape-2 absolute top-[64%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-green-600/20 rounded-full"></div>
        <div className="circle-shape-3 absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] bg-green-600/20 rounded-full z-20"></div>

        {/* Blocks */}
        <div className="blocks flex text-[140px] text-green-600 font-bold uppercase tracking-tighter transform-gpu">
          <div className="block-1 block hover:scale-105 transition-transform">G</div>
          <div className="block-2 block hover:scale-105 transition-transform">R</div>
          <div className="block-3 block hover:scale-105 transition-transform">E</div>
          <div className="block-4 block hover:scale-105 transition-transform">E</div>
          <div className="block-1 block hover:scale-105 transition-transform">N</div>
          <div className="block-2 block hover:scale-105 transition-transform">&nbsp;</div>
          <div className="block-3 block hover:scale-105 transition-transform">S</div>
          <div className="block-4 block hover:scale-105 transition-transform">Y</div>
          <div className="block-4 block hover:scale-105 transition-transform">N</div>
          <div className="block-4 block hover:scale-105 transition-transform">C</div>
        </div>
      </div>
    </div>
  );
};

export default HeroLanding;