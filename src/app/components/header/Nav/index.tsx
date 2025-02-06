import React, { useState } from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { menuSlide } from "../animation";
import Link from "./link/Index";
import Curve from "./curve/Index";

const navItems = [
  {
    title: "HOME",
    href: "/",
  },
  {
    title: "TEAM",
    href: "/teams",
  }, 
  {
    title: "EGNITION",
    href: "/Egnition",
  },
  {
    title: "E-SUMMIT",
    href: "/Esummit",
  },
  {
    title:"SPONSORS",
    href:"/sponsors",
  }
];

export default function Index() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => {
            return (
              <Link
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              ></Link>
            );
          })}
        </div>
      </div>
      <Curve />
    </motion.div>
  );
}
