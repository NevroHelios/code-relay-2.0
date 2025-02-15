"use client";

import React, { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";

const HeroLanding = () => {
  useLayoutEffect(() => {
    // Create timeline for better animation control
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    // Helper function to check screen size
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;

    // Responsive animation values
    const blockAnimations = {
      duration: 2,
      stagger: 0.1,
      ease: "expo.inOut",
    };

    // Initial setup - hide elements
    gsap.set([".block", ".circle-shape", ".circle-shape-2", ".circle-shape-3"], {
      opacity: 0,
      scale: 0,
    });

    // Main animation sequence
    tl.to(".box", {
      duration: 1.5,
      y: "-100%",
      ease: "power4.inOut",
    })
    .from(".block", {
      opacity: 0,
      scale: 0,
      ...blockAnimations,
      x: (i) => {
        if (isMobile) return 0;
        const positions = [-100, -50, 50, 100];
        return positions[i % positions.length];
      },
      y: (i) => {
        if (isMobile) return 50;
        const positions = [-50, 50, -50, 50];
        return positions[i % positions.length];
      },
    })
    .from([".circle-shape", ".circle-shape-2", ".circle-shape-3"], {
      opacity: 0,
      scale: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "elastic.out(1, 0.7)",
    }, "-=1")
    .from([".navbar > div", ".site-logo", ".showreel", ".site-menu > div"], {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=1");

    // Cleanup
    return () => tl.kill();
  }, []);

  return (
    <div className="relative">
      {/* Site Logo */}
      <div className="site-logo fixed left-1/2 -translate-x-1/2 font-[Mak] text-2xl md:text-3xl lg:text-5xl uppercase font-bold text-green-500 z-50 top-4 md:top-8">
        GreenSync
      </div>

      {/* Navbar */}
      <div className="navbar fixed w-full h-16 md:h-24 px-4 md:px-10 flex justify-between items-center font-sans uppercase font-bold text-green-500 z-50">
        <div className="site-info text-sm md:text-xl">Digital / Future</div>
        <div className="site-menu hidden md:flex">
          <div className="menu-item ml-8 lg:ml-16 text-base lg:text-xl hover:text-green-400 transition-colors">projects</div>
          <div className="menu-item ml-8 lg:ml-16 text-base lg:text-xl hover:text-green-400 transition-colors">about</div>
          <div className="menu-item ml-8 lg:ml-16 text-base lg:text-xl hover:text-green-400 transition-colors">contact</div>
        </div>
      </div>

      {/* Showreel */}
      <div className="showreel hidden md:block absolute left-0 bottom-0 p-6 md:p-10 font-sans uppercase text-[#8d785b] underline text-base md:text-lg z-50 hover:text-green-400 transition-colors">
        view showreel
      </div>

      {/* Main Container */}
      <div className="container w-full h-screen flex justify-center items-center bg-[#202217] font-[Mak] overflow-hidden">
        {/* Image Wrapper */}
        <div className="wrapper-img overflow-hidden absolute top-[50%] md:top-[35%] right-[10%] md:right-[18%] w-[80%] md:w-1/2 lg:w-1/3 h-[50vh] md:h-[90vh] -translate-y-1/2">
          <div className="box absolute inset-0 bg-[#202217] z-0"></div>
          <div>
            <img className="image w-full h-full object-cover" src="/hero-img.jpeg" alt="Hero" />
          </div>
        </div>

        {/* Circle Shapes */}
        <div className="circle-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] border-2 border-green-500/20 rounded-full"></div>
        <div className="circle-shape-2 absolute top-[64%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] md:w-[180px] md:h-[180px] lg:w-[240px] lg:h-[240px] bg-green-600/20 rounded-full"></div>
        <div className="circle-shape-3 absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[140px] lg:h-[140px] bg-green-600/20 rounded-full z-20"></div>

        {/* Blocks */}
        <div className="blocks flex flex-wrap justify-center md:flex-nowrap text-[40px] sm:text-[80px] md:text-[100px] lg:text-[140px] text-green-600 font-bold uppercase tracking-tighter transform-gpu px-4">
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