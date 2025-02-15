"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBell, FaShareAlt, FaGlobe, FaBars, FaDiscord, FaTimes } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";
import { navbarItems, dropdownItems } from "@/utilis/navbar";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Preloader from "./Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAddress, useMetamask, useDisconnect, useBalance, useContract } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider, useActiveAccount } from "thirdweb/react";
import { admins } from "scripts/admins";

const Navbar = () => {
  const router = useRouter();
  const address2 = useAddress();
  const connectWithMetamask = useMetamask();
  const contractAddress = "0x9C4c3351636086d6087e94f57E46fB71df89e27B";
  const { contract, isLoading } = useContract(contractAddress);
  const address1 = useActiveAccount()?.address;
  const address = address1 || address2;
  console.log("Address:", address);
  console.log(contract);
  const { data: balance, isLoading : loading } = useBalance(address, Sepolia);

  const [coinBalance, setCoinBalance] = useState<number>(0);
  const [isAadhaarVerified, setIsAadhaarVerified] = useState<boolean>(false);
  const [username, setusername] = useState<string>("");

  // Auto reconnect on page reload if wallet was previously connected
  useEffect(() => {
    const wasConnected = window.localStorage.getItem("isWalletConnected");
    if (!address && wasConnected === "true") {
      // Automatically reconnect
      connectWithMetamask();
    }
  }, [address, connectWithMetamask]);

  // Example login handler updates localStorage when user logs in
  const handleLogin = async () => {
    try {
      await connectWithMetamask();
      window.localStorage.setItem("isWalletConnected", "true");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  useEffect(() => {
    const fetchCoinBalance = async (address) => {
      try {
        console.log(address);
        const body = {
          walletAddress: address
        }
        const response = await fetch('/api/userfind', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application.json'
          },
          body : JSON.stringify(body)
        });
        const data = await response.json();
        console.log(data);
        if(data.success == true){
          setCoinBalance(data.user.totalPoints);
          setusername(data.user.name);
        }
        
      } catch (error) {
        console.error('Error fetching coin balance:', error);
      }
    };

    if (address) {
      fetchCoinBalance(address);
    }
  }, [address]);

  useEffect(() => {
    // Check Aadhaar verification status
    const checkAadhaarVerification = async () => {
      try {
        const response = await fetch('/api/check-aadhaar-verification');
        const data = await response.json();
        setIsAadhaarVerified(data.isVerified);
      } catch (error) {
        console.error('Error checking Aadhaar verification status:', error);
      }
    };

    checkAadhaarVerification();

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
        delay: 0.5, // Reduced delay to match new timing
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed w-full h-16 md:h-24 px-4 md:px-10 flex justify-between items-center 
                   font-sans uppercase font-bold text-green-500 z-50 bg-black/20 backdrop-blur-sm z-[900]"
      >
        <div className="flex items-center gap-4">
          <div className="site-info w-20 text-sm md:text-xl">
            <Preloader />
          </div>
          <div className="text-xl ">Green Sync</div>
        </div>

        {/* Desktop Menu */}
        <div className="site-menu hidden md:flex items-center">
          {/* <a href="/coins" className="menu-item ml-8 md:ml-16 text-sm md:text-xl hover:text-green-400">coins</a> */}
          <a
            href="/#about"
            className="menu-item ml-8 md:ml-16 text-sm md:text-xl hover:text-green-400"
          >
            about
          </a>
          <a
            href="/#collections"
            className="menu-item ml-8 md:ml-16 text-sm md:text-xl hover:text-green-400"
          >
            collections
          </a>
          {/* Login Button or Profile Avatar with Balance */}
          <div className="flex items-center">
            {address ? (
              <>
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
                <div className="flex items-center gap-2 bg-green-900/20 px-3 py-1 rounded-lg">
                  <span className="text-green-400 font-medium">
                    Coins: {coinBalance}
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
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="flex items-center gap-2 bg-gradient-to-br from-green-950/40 to-green-700/40 
                           backdrop-blur-sm px-4 py-2 rounded-xl hover:from-green-900 hover:to-green-600
                           mx-8 md:mx-16"
              >
                <span className="text-xl">Login</span>
              </motion.button>
            )}
            {isAadhaarVerified && !address && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="flex items-center gap-2 bg-gradient-to-br from-green-950/40 to-green-700/40 
                           backdrop-blur-sm px-4 py-2 rounded-xl hover:from-green-900 hover:to-green-600
                           mx-8 md:mx-16"
              >
                <span className="text-xl">Connect MetaMask</span>
              </motion.button>
            )}
          </div>
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
                  closed: { opacity: 0, y: 20 },
                }}
                transition={{ delay: 0.2 }}
                className="text-2xl hover:text-green-400"
              >
                projects
              </motion.div>
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
                transition={{ delay: 0.3 }}
                className="text-2xl hover:text-green-400"
              >
                about
              </motion.div>

              {/* Mobile Login Button or Profile Avatar */}
              {address ? (
                <>
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 },
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
                  {admins.includes(address) ? (
                    <motion.div
                      variants={{
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: 20 },
                      }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl hover:text-green-400"
                    >
                      Balance : {balance?.displayValue} {balance?.symbol}
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={{
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: 20 },
                      }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl hover:text-green-400"
                    >
                      Coins: {coinBalance}
                    </motion.div>
                  )}
                  <motion.a
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 },
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
                      alt={username}
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-green-500"
                    />
                  </motion.a>
                  <button
                    onClick={() => disconnect()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <motion.button
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogin}
                  className="flex items-center gap-2 bg-gradient-to-br from-green-950/40 to-green-700/40 
                             backdrop-blur-sm px-6 py-3 rounded-xl hover:from-green-900 hover:to-green-600"
                >
                  <span className="text-lg">Login</span>
                </motion.button>
              )}

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
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

export default function Finalnavbar(){
  return(
    <ThirdwebProvider>
      <Navbar/>
    </ThirdwebProvider>
  )
}


