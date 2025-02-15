"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";

const HeroLanding = () => {
  const [isInitialOpacity, setIsInitialOpacity] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();
    const isMobile = window.innerWidth < 768;
    
    // Make logo visible immediately
    gsap.set(".site-logo", {
      opacity: 1,
      y: 0
    });

    // Initial letters animation with responsive values
    tl.to(".letter", {
      delay: 0.5, // Add slight delay for other animations
      duration: 2,
      x: (i) => {
        const values = isMobile ? 
          [-90, -90, 90, 140] : 
          [-180, -180, 180, 280];
        return values[i % 4];
      },
      y: (i) => {
        const values = isMobile ? 
          [-50, 100, -120, 120] : 
          [-100, 200, -240, 240];
        return values[i % 4];
      },
      scale: (i) => {
        const values = isMobile ? 
          [1.8, 1.0, 1.2, 0.6] : 
          [2.4, 1.2, 1.6, 0.8];
        return values[i % 4];
      },
      ease: "elastic.out(1, 0.8)",
      stagger: 0.1
    });

    // Set opacity after 5 seconds
    setTimeout(() => {
      setIsInitialOpacity(false);
    }, 3000);

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

    // Other elements animation (excluding site-logo)
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
    .from(".navbar > div, .showreel", { // Removed site-logo from this animation
      duration: 1.5,
      opacity: 0,
      y: 40,
      ease: "expo.out",
      stagger: 0.1
    }, "-=1");

  }, []);

  return (
    <div className="relative">
      <video
        playsInline
        autoPlay={true}
        loop={true}
        muted={true}
        className="fixed top-0 left-0 w-screen h-full object-cover z-[-1] flex items-center justify-center opacity-80"
      >
        <source
          src="https://res.cloudinary.com/dlrlet9fg/video/upload/v1739583312/vecteezy_green-particle-wave-background-the-green-particles-glow_11386772_1_1_1_g3syxt.mp4"
          type="video/mp4"
        />
      </video>
      
      {/* Site Logo - Added initial opacity */}
      {/* <div className="site-logo fixed left-1/2 -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
           uppercase font-bold text-green-500 z-50 top-4 md:top-8
           [text-shadow:_0_0_10px_rgba(34,197,94,0.5)] transition-all hover:scale-105 opacity-100">
        GreenSync
      </div> */}

      {/* Showreel */}
      {/* <div className="showreel absolute left-0 bottom-0 p-4 md:p-10 font-sans uppercase text-[#8d785b] 
           underline text-sm md:text-lg z-50">
        view showreel
      </div> */}

      {/* Main Container */}
      <div className="absolute w-screen h-screen flex justify-center items-center  overflow-hidden">
        {/* Image Wrapper */}
        <div className="wrapper-img overflow-hidden absolute top-[45%] md:top-[35%] right-[10%] md:right-[18%] 
             w-[80%] md:w-1/3 h-[50vh] md:h-[90vh]">
          {/* <div className="box absolute inset-0 bg-[#202217] z-0"></div> */}
      
          <div>
            {/* <img className="image w-full h-full object-cover" src="/hero-img.jpeg" alt="Hero" /> */}
          </div>
        </div>

        {/* Circle Shapes - Adjusted sizes for mobile */}
        <div className="circle-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
             w-[300px] h-[300px] md:w-[800px] md:h-[800px] border-2 border-green-500/20 rounded-full"></div>
        <div className="circle-shape-2 absolute top-[64%] left-[80%] -translate-x-1/2 -translate-y-1/2 
             w-[120px] h-[120px] md:w-[240px] md:h-[240px] bg-green-600/20 rounded-full"></div>
        <div className="circle-shape-3 absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 
             w-[70px] h-[70px] md:w-[140px] md:h-[140px] bg-green-600/20 rounded-full z-20"></div>

        {/* Blocks */}
        <div className="blocks flex text-[40px] sm:text-[60px] md:text-[100px] lg:text-[140px] 
             font-bold uppercase tracking-tighter transform-gpu px-4">
          {'GREEN SYNC'.split('').map((char, i) => (
            <div key={i} 
                 className={`letter ${char === ' ' ? 'w-2 sm:w-4 md:w-6 lg:w-8' : ''} 
                 ${isInitialOpacity ? 'text-green-500' : 'text-green-500/5'}
                 hover:text-green-400 
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