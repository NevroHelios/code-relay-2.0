"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "../../components/helpers/isomorphicEffect";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import React Icons

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "#timeline", label: "Timeline" },
  { path: "#events", label: "Events" },
  { path: "#prizes", label: "Prizes" },
  { path: "#faqs", label: "FAQs" },
];



gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("overflow-hidden", !isMenuOpen); // Disable/enable scrolling
  };

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  const hdr = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const anim = gsap.from(hdr.current, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      ScrollTrigger.create({
        start: "top+=160",
        end: "bottom bottom",
        onUpdate: (self) => {
          self.direction === -1 ? anim.play() : anim.reverse();
        },
      });
    }, hdr);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        ref={hdr}
        className="pointer-events-none fixed top-6 z-30 w-full text-white mix-blend-difference md:top-12"
      >
        <div className="container mx-auto px-4 mt-4 md:mt-0 md:px-4">
          <div className="mx-4 flex items-center justify-between">
            <div className="pointer-events-auto px-4">
               <Link href="/" aria-label="Link to home page">
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 611.86 164.12"
                  width={100}
                >
                  <defs></defs>
                  <path
                    class="cls-1"
                    d="M737.07,477.06c-9.8,0-15-6.06-15-17.92V449c0-10.1,1.8-15.66,9.8-23.74l64.2-71.2h-74V313H837.86c8.8,0,13.4,4.8,13.4,14.39v8.33c0,8.59-3,13.64-9,19.95l-72.59,80h81.59v41.4Z"
                    transform="translate(-722.07 -312.95)"
                  />
                  <path
                    class="cls-1"
                    d="M915.26,477.06V419.25L855.67,313h41l36.8,65.39,37-65.39h39.2l-59.4,106.3v57.81Z"
                    transform="translate(-722.07 -312.95)"
                  />
                  <path
                    class="cls-1"
                    d="M1122.66,477.06l-26-41.66h-30.8V397h44.8c9.6,0,16.4-8.34,16.4-21s-6.8-21-16.4-21h-54.8v122h-34.8V313h89.6c29.8,0,51.4,24.74,51.4,61.35,0,25-10.4,44.69-26.6,54.54l32.8,48.22Z"
                    transform="translate(-722.07 -312.95)"
                  />
                  <path
                    class="cls-1"
                    d="M1243.86,477.06c-39.8,0-68.8-33.07-68.8-82.05s29-82.06,68.8-82.06h18.8c39.6,0,68.6,33.07,68.6,82.06s-29,82.05-68.6,82.05Zm21.2-42.41c18.2,0,31.4-16.16,31.4-39.64,0-23.74-13.2-39.9-31.4-39.9h-23.6c-18.2,0-31.6,16.16-31.6,39.9,0,23.48,13.2,39.64,31.6,39.64Z"
                    transform="translate(-722.07 -312.95)"
                  />
                  <polygon
                    class="cls-2"
                    points="605.6 43.85 611.29 82.36 191.78 144.41 186.08 105.91 195.61 104.5 191.69 109.79 208.71 107.27 212.64 101.98 230.69 99.31 226.76 104.6 243.77 102.08 247.7 96.79 265.75 94.12 261.82 99.41 278.83 96.9 282.76 91.61 300.81 88.94 296.88 94.23 313.89 91.71 317.82 86.42 335.87 83.75 331.94 89.04 348.95 86.52 352.88 81.23 370.93 78.56 367 83.86 384.01 81.34 387.94 76.05 405.99 73.38 402.06 78.67 419.07 76.15 423 70.86 441.05 68.19 437.12 73.48 454.13 70.97 458.06 65.68 476.11 63.01 472.18 68.3 489.2 65.78 493.12 60.49 511.17 57.82 507.24 63.11 524.26 60.59 528.18 55.3 546.23 52.64 542.3 57.92 559.33 55.41 563.26 50.12 581.29 47.45 577.37 52.74 594.38 50.22 598.3 44.93 605.6 43.85"
                  />
                  <polygon
                    class="cls-3"
                    points="186.08 105.91 195.61 104.5 191.69 109.79 186.76 110.51 186.08 105.91"
                  />
                  <polygon
                    class="cls-3"
                    points="212.64 101.98 230.69 99.31 226.76 104.6 208.71 107.27 212.64 101.98"
                  />
                  <polygon
                    class="cls-3"
                    points="247.7 96.79 265.75 94.12 261.82 99.41 243.77 102.08 247.7 96.79"
                  />
                  <polygon
                    class="cls-3"
                    points="282.76 91.61 300.81 88.94 296.88 94.23 278.83 96.9 282.76 91.61"
                  />
                  <polygon
                    class="cls-3"
                    points="317.82 86.42 335.87 83.75 331.94 89.04 313.89 91.71 317.82 86.42"
                  />
                  <polygon
                    class="cls-3"
                    points="352.88 81.23 370.93 78.56 367 83.86 348.95 86.52 352.88 81.23"
                  />
                  <polygon
                    class="cls-3"
                    points="387.94 76.05 405.99 73.38 402.06 78.67 384.01 81.34 387.94 76.05"
                  />
                  <polygon
                    class="cls-3"
                    points="423 70.86 441.05 68.19 437.12 73.48 419.07 76.15 423 70.86"
                  />
                  <polygon
                    class="cls-3"
                    points="458.06 65.68 476.11 63.01 472.18 68.3 454.13 70.97 458.06 65.68"
                  />
                  <polygon
                    class="cls-3"
                    points="493.12 60.49 511.17 57.82 507.24 63.11 489.2 65.78 493.12 60.49"
                  />
                  <polygon
                    class="cls-3"
                    points="528.18 55.3 546.23 52.64 542.3 57.92 524.26 60.59 528.18 55.3"
                  />
                  <polygon
                    class="cls-3"
                    points="563.26 50.12 581.29 47.45 577.37 52.74 559.33 55.41 563.26 50.12"
                  />
                  <polygon
                    class="cls-3"
                    points="605.6 43.85 606.28 48.46 594.38 50.22 598.3 44.93 605.6 43.85"
                  />
                  <polygon points="212.64 101.98 208.71 107.27 191.69 109.79 195.61 104.5 212.64 101.98" />
                  <polygon points="247.7 96.79 243.77 102.08 226.76 104.6 230.69 99.31 247.7 96.79" />
                  <polygon points="282.76 91.61 278.83 96.9 261.82 99.41 265.75 94.12 282.76 91.61" />
                  <polygon points="317.82 86.42 313.89 91.71 296.88 94.23 300.81 88.94 317.82 86.42" />
                  <polygon points="352.88 81.23 348.95 86.52 331.94 89.04 335.87 83.75 352.88 81.23" />
                  <polygon points="387.94 76.05 384.01 81.34 367 83.86 370.93 78.56 387.94 76.05" />
                  <polygon points="423 70.86 419.07 76.15 402.06 78.67 405.99 73.38 423 70.86" />
                  <polygon points="458.06 65.68 454.13 70.97 437.12 73.48 441.05 68.19 458.06 65.68" />
                  <polygon points="493.12 60.49 489.2 65.78 472.18 68.3 476.11 63.01 493.12 60.49" />
                  <polygon points="528.18 55.3 524.26 60.59 507.24 63.11 511.17 57.82 528.18 55.3" />
                  <polygon points="563.26 50.12 559.33 55.41 542.3 57.92 546.23 52.64 563.26 50.12" />
                  <polygon points="598.3 44.93 594.38 50.22 577.37 52.74 581.29 47.45 598.3 44.93" />
                  <polygon
                    class="cls-3"
                    points="191.09 139.79 200.63 138.38 196.7 143.67 191.78 144.4 191.09 139.79"
                  />
                  <polygon
                    class="cls-3"
                    points="225.65 135.86 243.7 133.19 239.77 138.48 221.72 141.15 225.65 135.86"
                  />
                  <polygon
                    class="cls-3"
                    points="258.71 129.68 276.76 127.01 272.83 132.3 254.78 134.97 258.71 129.68"
                  />
                  <polygon
                    class="cls-3"
                    points="287.77 125.49 305.82 122.82 301.89 128.11 283.84 130.78 287.77 125.49"
                  />
                  <polygon
                    class="cls-3"
                    points="322.83 120.31 340.88 117.64 336.95 122.93 318.9 125.6 322.83 120.31"
                  />
                  <polygon
                    class="cls-3"
                    points="357.89 115.12 375.94 112.45 372.01 117.74 353.97 120.41 357.89 115.12"
                  />
                  <polygon
                    class="cls-3"
                    points="392.95 109.93 411 107.27 407.07 112.55 389.03 115.22 392.95 109.93"
                  />
                  <polygon
                    class="cls-3"
                    points="428.01 104.75 446.06 102.08 442.13 107.37 424.09 110.04 428.01 104.75"
                  />
                  <polygon
                    class="cls-3"
                    points="463.07 99.56 481.12 96.89 477.19 102.18 459.15 104.85 463.07 99.56"
                  />
                  <polygon
                    class="cls-3"
                    points="498.13 94.38 516.18 91.71 512.26 97 494.21 99.67 498.13 94.38"
                  />
                  <polygon
                    class="cls-3"
                    points="533.2 89.19 551.24 86.52 547.32 91.81 529.27 94.48 533.2 89.19"
                  />
                  <polygon
                    class="cls-3"
                    points="568.27 84 586.3 81.33 582.38 86.63 564.34 89.29 568.27 84"
                  />
                  <polygon
                    class="cls-3"
                    points="610.61 77.74 611.29 82.35 599.39 84.11 603.32 78.82 610.61 77.74"
                  />
                  <polygon points="225.65 135.86 221.72 141.15 204.7 143.67 208.63 138.38 225.65 135.86" />
                  <polygon points="260.71 130.68 256.78 135.97 239.77 138.48 243.7 133.19 260.71 130.68" />
                  <polygon points="287.77 125.49 283.84 130.78 266.83 133.3 270.76 128.01 287.77 125.49" />
                  <polygon points="322.83 120.31 318.9 125.6 301.89 128.11 305.82 122.82 322.83 120.31" />
                  <polygon points="357.89 115.12 353.97 120.41 336.95 122.93 340.88 117.64 357.89 115.12" />
                  <polygon points="392.95 109.93 389.03 115.22 372.01 117.74 375.94 112.45 392.95 109.93" />
                  <polygon points="428.01 104.75 424.09 110.04 407.07 112.55 411 107.27 428.01 104.75" />
                  <polygon points="463.07 99.56 459.15 104.85 442.13 107.37 446.06 102.08 463.07 99.56" />
                  <polygon points="498.13 94.38 494.21 99.67 477.19 102.18 481.12 96.89 498.13 94.38" />
                  <polygon points="533.2 89.19 529.27 94.48 512.26 97 516.18 91.71 533.2 89.19" />
                  <polygon points="568.27 84 564.34 89.29 547.32 91.81 551.24 86.52 568.27 84" />
                  <polygon points="603.32 78.82 599.39 84.11 582.38 86.63 586.3 81.33 603.32 78.82" />
                  <polyline points="230.69 99.31 208.79 137.17 226.76 134.58 247.7 96.79" />
                  <polyline points="263.03 97.74 241.14 135.6 259.11 133.01 280.05 95.22" />
                  <polyline points="297.39 93.44 275.5 131.31 293.47 128.71 314.41 90.92" />
                  <polyline points="544.39 56.63 522.5 94.5 540.47 91.91 561.41 54.12" />
                  <polyline points="577.39 52.63 555.5 90.5 573.47 87.91 594.41 50.12" />
                  <polygon points="195.61 104.5 212.64 101.98 196.7 143.67 191.78 144.4 187.83 117.74 195.61 104.5" />
                  <path
                    d="M1054.27,428.56l-1.09-6.85c-.61-3.87,2.58-7.08,7.55-7.86l9.06-1.44a1.49,1.49,0,0,0,1.41-1.74,1.46,1.46,0,0,0-1.87-1.19L1053,412.06l-.89-5.63,16.62-2.63c5-.79,9,1.34,9.62,5.29s-2.56,7.18-7.53,8l-9.1,1.44c-1,.15-1.57.73-1.43,1.61l.26,1.65,18.91-3,.9,5.66Z"
                    transform="translate(-722.07 -312.95)"
                  />
                  <path
                    d="M1106.15,420.59c-8,1.28-14.61-2.52-15.63-9s4-12.12,12.09-13.39,14.65,2.52,15.68,9S1114.19,419.32,1106.15,420.59Zm-2.61-16.77c-4.06.65-6.39,3.47-5.89,6.64s3.59,5.1,7.65,4.46,6.31-3.45,5.81-6.59S1107.52,403.19,1103.54,403.82Z"
                    transform="translate(-722.07 -312.95)"
                  />
                  <path
                    d="M1131.58,416.33l-1.08-6.85c-.61-3.88,2.58-7.08,7.55-7.87l9.06-1.43a1.49,1.49,0,0,0,1.41-1.74,1.47,1.47,0,0,0-1.87-1.2l-16.33,2.59-.89-5.63,16.61-2.63c5-.8,9,1.34,9.63,5.28s-2.56,7.19-7.53,8l-9.11,1.44c-1,.16-1.56.74-1.42,1.61l.26,1.65,18.91-3,.9,5.67Z"
                    transform="translate(-722.07 -312.95)"
                  />
                  <path
                    d="M1188.07,407.39l-.86-5.4-9.18,1.46c-5.17.81-9.39-1.35-10-5.47l-1.52-9.65,7.22-1.14,1.38,8.74c.23,1.48,1.61,2.23,3.3,2l8-1.27-1.77-11.16,7.18-1.14,1.76,11.16,2.79-.44.85,5.37-2.79.44.86,5.39Z"
                    transform="translate(-722.07 -312.95)"
                  />
                  <polyline points="508.46 61.93 486.57 99.8 504.53 97.2 525.47 59.41" />
                  <polygon
                    class="cls-4"
                    points="592.43 85.14 606.89 52.64 611.29 85.31 592.43 85.14"
                  />
                  <polygon
                    class="cls-3"
                    points="191.09 139.79 610.61 77.74 611.29 82.36 191.78 144.4 191.09 139.79"
                  />
                  <polygon
                    class="cls-3"
                    points="186.08 105.91 186.76 110.51 606.28 48.46 603.32 43.85 186.08 105.91"
                  />
                </svg>
              </Link> 
             
            </div>
            <nav className="pointer-events-auto px-4">
              <ul className="hidden gap-8 md:flex font-bold uppercase">
              {/* { path: "/", labe: "Home" },
  { path: "#timeline", label: "Ttimeline" },
  { path: "#events", label: "Events" },
  { path: "#prizes", label: "Prizes" },
  { path: "#faqs", label: "FAQs" }, */}
                <li>
                  <Link
                    href="/"
                    data-type="button"
                    className="transition-all ease-out hover:text-purple-500"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#timeline"
                    data-type="button"
                    className="transition-all ease-out hover:text-purple-500"
                  >
                    Timeline
                  </Link>
                </li>
                <li>
                  <Link
                    href="#events"
                    data-type="button"
                    className="transition-all ease-out hover:text-purple-500"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="#prizes"
                    data-type="button"
                    className="transition-all ease-out hover:text-purple-500"
                  >
                    Prizes
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faqs"
                    data-type="button"
                    className="transition-all ease-out hover:text-purple-500"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile View */}
      <div className="menu-container relative z-30 md:hidden" ref={container}>
        <div className="menu-bar flex items-center justify-between p-4">
          <div className="menu-logo">
            {/* <Link href={"/"}>NextJS x GSAP</Link> */}
          </div>
          <div className="menu-open cursor-pointer bg-black p-2" onClick={toggleMenu}>
            <FaBars size={24} color="white" /> {/* Use FaBars for the hamburger icon */}
          </div>
        </div>

        {/* Menu Overlay */}
        <div
          className={`menu-overlay fixed inset-0 z-40 bg-black transition-all duration-300 ${
            isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div className="menu-overlay-bar flex justify-between p-4">
            <div className="menu-logo">
              {/* <Link href={"/"}>NextJS x GSAP</Link> */}
            </div>
            <div className="menu-close cursor-pointer" onClick={toggleMenu}>
              <FaTimes size={30} color="white" /> {/* Use FaTimes for the close icon */}
            </div>
          </div>

          <div className="menu-close-icon absolute top-4 right-4 text-white text-2xl cursor-pointer">
            <p onClick={toggleMenu}>&#x2715;</p>
          </div>
          <div className="flex flex-col items-center  justify-center gap-8 mt-8 w-screen  text-white">
            {menuLinks.map((link) => {
              return (
                <div className="menu-link-item" key={link.label}>
                  <div
                    className="menu-link-item-holder text-center text-xl"
                    onClick={toggleMenu}
                  >
                    <Link href={link.path} className="menu-link">
                    
                      {link.label}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Background Overlay
        <div
          className={`menu-bg-overlay fixed inset-0 z-30 bg-black/10 transition-all duration-300 ${
            isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onClick={toggleMenu}
        ></div> */}
      </div>
    </>
  );
}
