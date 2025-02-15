"use client";

import React, { useState, useEffect } from "react";
import { FaBell, FaShareAlt, FaGlobe, FaBars, FaDiscord, FaTimes } from "react-icons/fa";
import { SiEthereum } from "react-icons/si"; // Add this import
import { navbarItems, dropdownItems } from "@/utilis/navbar";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Preloader from "./Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "@/app/client";
import { sepolia } from "thirdweb/chains";

const Navbar = () => {
  const router = useRouter();
  const account = useActiveAccount();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address || "0x0000000000000000000000000000000000000000",
  });

  useEffect(() => {
    // Navbar container animation
    gsap.from("nav", {
      duration: 1,
      y: -100,
      opacity: 0,
      ease: "power4.out",
    });

    gsap.from(".nav-item", {
      duration: 1,
      y: -50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(".logo", {
      duration: 1,
      scale: 0,
      opacity: 0,
      delay: 0.5,
      ease: "back.out",
    });
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delay: 0.5 // Reduced delay to match new timing
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const handleProfileClick = () => {
    router.push('/'); // Changed from '/profile' to '/'
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed w-full h-16 md:h-24 px-4 md:px-10 flex justify-between items-center 
                   font-sans uppercase font-bold text-green-500 z-50 bg-black/20 backdrop-blur-sm z-[900]"
      ><div className="flex items-center gap-4">
        <div className="site-info w-20 text-sm md:text-xl">
          <Preloader/>
        </div>
        <div className="text-xl ">Green Sync</div></div>
        
        {/* Desktop Menu */}
        <div className="site-menu hidden md:flex items-center">
          
            {/* <a href="/coins" className="menu-item ml-8 md:ml-16 text-sm md:text-xl hover:text-green-400">coins</a> */}
            <a href="/#about" className="menu-item ml-8 md:ml-16 text-sm md:text-xl hover:text-green-400">about</a>
            <a href="/#collections" className="menu-item ml-8 md:ml-16 text-sm md:text-xl hover:text-green-400">collections</a>
          {/* Login Button or Profile Avatar with Balance */}
          {account ? (
            <div className="flex items-center gap-4 mx-8 md:mx-16">
              <div className="flex items-center gap-2 bg-green-900/20 px-3 py-1 rounded-lg">
                <SiEthereum className="text-green-500 text-xl" />
                <span className="text-green-400 font-medium">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    `${Number(balance?.displayValue).toFixed(4)}`
                  )}
                </span>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProfileClick}
                className="cursor-pointer"
              >
                <Image
                  src="/dummy-user.png"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-green-500"
                />
              </motion.div>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-br from-green-950/40 to-green-700/40 
                         backdrop-blur-sm px-4 py-2 rounded-xl hover:from-green-900 hover:to-green-600
                         mx-8 md:mx-16"
            >
              <span className="text-xl">Login</span>
            </motion.button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl cursor-pointer hover:text-green-400 z-50"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed top-0 right-0 w-full h-screen bg-black/95 backdrop-blur-md z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 text-green-500">
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 }
                }}
                transition={{ delay: 0.2 }}
                className="text-2xl hover:text-green-400"
              >
                projects
              </motion.div>
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 }
                }}
                transition={{ delay: 0.3 }}
                className="text-2xl hover:text-green-400"
              >
                about
              </motion.div>
              
              {/* Mobile Login Button or Profile Avatar */}
              {account ? (
                <>
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}
                    transition={{ delay: 0.35 }}
                    className="flex items-center gap-2 bg-green-900/20 px-3 py-1 rounded-lg"
                  >
                    <SiEthereum className="text-green-500 text-xl" />
                    <span className="text-green-400 font-medium">
                      {isLoading ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        `${Number(balance?.displayValue).toFixed(4)}`
                      )}
                    </span>
                  </motion.div>
                  <motion.a
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleProfileClick}
                    className="cursor-pointer"
                    href="/"
                  >
                    <Image
                      src="/dummy-user.png"
                      alt="User Avatar"
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-green-500"
                      
                    />
                  </motion.a>
                </>
              ) : (
                <motion.button
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 }
                  }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-br from-green-950/40 to-green-700/40 
                             backdrop-blur-sm px-6 py-3 rounded-xl hover:from-green-900 hover:to-green-600"
                >
                  <span className="text-lg">Login</span>
                </motion.button>
              )}
              
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 }
                }}
                transition={{ delay: 0.5 }}
                className="text-2xl hover:text-green-400"
              >
                contact
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;