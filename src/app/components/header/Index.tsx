"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../roundedButton/Index";
import Magnetic from "../magnetic/Index";
import { NavbarLinks } from "@/app/utils/data/Navbar";

export default function Header() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
            ease: "power1.out",
          });
          setIsActive(false);
        },
      },
    });
    gsap.to(header.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(header.current, {
            scale: 0,
          });
        },
        onEnterBack: () => {
          gsap.to(header.current, {
            scale: 1,
          });
        },
      },
    });
  }, []);

  return (
    <div className="w-[100%] z-50 nav">
      <div ref={header} className={styles.header}>
        <div className={styles.nav}>
          {NavbarLinks.map((link, index) => (
            <Magnetic key={index}>
              <div className={styles.el}>
                <a href={link.url}>{link.text}</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
          ))}
        </div>
        <div className={styles.menuSmall}>
          {!isActive && (
            <Magnetic>
              <div
                onClick={() => {
                  setIsActive(!isActive);
                }}
                className={styles.el}
              >
                <p>Menu</p>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
          )}
        </div>
      </div>
      {isActive && (
        <div className={styles.navButton}>
          <Rounded
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={`${styles.button}`}
          >
            <div
              className={`${styles.burger} ${
                isActive ? styles.burgerActive : ""
              }`}
            ></div>
          </Rounded>
        </div>
      )}
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </div>
  );
}
