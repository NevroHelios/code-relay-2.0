"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

const HeroLanding = () => {
  useEffect(() => {
    // Initial animation timeline
    const tl = gsap.timeline();

    // Initial letters animation
    tl.to(".letter", {
      duration: 2,
      x: (i) => [-180, -180, 180, 280][i % 4],
      y: (i) => [-100, 200, -240, 240][i % 4],
      scale: (i) => [2.4, 1.2, 1.6, 0.8][i % 4],
      ease: "elastic.out(1, 0.8)",
      stagger: 0.1
    });

    // Modified floating animation
    gsap.to(".letter", {
      duration: "random(4, 6)", // Longer duration
      y: "random(-5, 5)",      // Smaller movement range
      rotation: "random(-2, 2)", // Reduced rotation
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 2, // Start after initial animation
      stagger: {
        amount: 2, // Increased stagger for smoother overall effect
        from: "center" // Float from center outwards
      }
    });

    // Other elements animation
    tl.to(".box", {
      duration: 2,
      y: "-100%",
      ease: "expo.inOut",
    }, "-=1.5")
    .from(".circle-shape, .circle-shape-2, .circle-shape-3", {
      duration: 2,
      scale: 0,
      ease: "elastic.out(1, 0.8)",
      stagger: 0.2
    }, "-=1.5")
    .from(".navbar > div, .site-logo, .showreel", {
      duration: 1.5,
      opacity: 0,
      y: 40,
      ease: "expo.out",
      stagger: 0.1
    }, "-=1");

  }, []);

  return (
    <div className="relative">
      {/* Site Logo */}
      <div className="site-logo fixed left-1/2 -translate-x-1/2 text-5xl uppercase font-bold text-green-500 z-50 
           [text-shadow:_0_0_10px_rgba(34,197,94,0.5)] transition-all hover:scale-105">
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
      <div className="absolute w-screen h-screen flex justify-center items-center bg-[#202217] overflow-hidden">
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
        <div className="blocks flex text-[140px] font-bold uppercase tracking-tighter transform-gpu">
          {'GREEN SYNC'.split('').map((char, i) => (
            <div key={i} 
                 className={`letter ${char === ' ' ? 'w-8' : ''} 
                 text-green-500 hover:text-green-400 
                 [text-shadow:_0_0_15px_rgba(34,197,94,0.6)] 
                 transition-colors cursor-pointer
                 hover:scale-110 duration-300`}>
              {char}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroLanding;