"use client";

import { useAddress, useWallet, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import motion for animations
import Link from "next/link";
import Image from "next/image"; // Import Image component for the avatar

export default function Login() {
  const address = useAddress();
  const wallet = useWallet();
  const disconnect = useDisconnect();
  const connectWithMetamask = useMetamask();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await connectWithMetamask();
      window.localStorage.setItem("isWalletConnected", "true");
      router.push('/profile');
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  if (address) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Link href={'/profile'} className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-green-600 text-xl font-semibold">
            Wallet already connected. Go to profile.
          </p>
        </Link>
      </div>
    );
  }

  const containerVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariant}
      className="min-h-screen p-8 flex items-center justify-center relative"
    >
      <motion.div variants={itemVariant} className="max-w-2xl">
        <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 space-y-6">
          <div className="flex flex-row items-center space-x-24">
            <Image
              src="/dummy-user.png" // Replace with your dummy avatar image path
              alt="User Avatar"
              width={80}
              height={80}
              className="rounded-full border-2 border-green-500"
            />
            <h1 className="text-3xl font-bold text-green-200">
              Login
            </h1>
          </div>
          <div className="flex justify-between items-center mt-10 mb-8">
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Connect MetaMask
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}