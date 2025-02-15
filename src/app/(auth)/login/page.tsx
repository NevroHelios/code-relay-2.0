"use client";

import { useAddress, useWallet, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function Login() {
  const address = useAddress();
  const wallet = useWallet();
  const disconnect = useDisconnect();
  const connectWithMetamask = useMetamask();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push('/profile');
    }
  }, [address, router]);

  const handleLogin = async () => {
    try {
      // await connectWithMetamask();
      window.localStorage.setItem("isWalletConnected", "true");
      router.push('/profile');
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  if (address) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-black/30 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-green-500/20"
        >
          <div className="flex items-center gap-4">
            <div className="animate-spin-slow">
              <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full" />
            </div>
            <p className="text-green-400 text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              Redirecting to profile...
            </p>
          </div>
        </motion.div>
      </motion.div>
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
      className="min-h-screen p-8 flex items-center justify-center relative bg-gradient-to-br from-gray-900 to-black"
    >
      <motion.div variants={itemVariant} className="max-w-2xl">
        <div className="bg-black/40 backdrop-blur-xl rounded-lg shadow-lg p-8 space-y-6 border border-green-500/20">
          <div className="flex flex-row items-center space-x-24">
            <Image
              src="/dummy-user.png"
              alt="User Avatar"
              width={80}
              height={80}
              className="rounded-full border-2 border-green-500/50 hover:border-green-400 transition-colors"
            />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              Welcome Back
            </h1>
          </div>
          <div className="flex flex-col items-center gap-6 mt-10">
            <p className="text-gray-400 text-center max-w-md">
              Connect your wallet to access your NFT collection and manage your digital assets
            </p>
            <button
              onClick={handleLogin}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg 
                hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105
                font-medium flex items-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Connect MetaMask
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}