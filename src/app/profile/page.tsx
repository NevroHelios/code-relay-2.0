"use client";

import { useAddress, useDisconnect, useBalance, useWallet } from "@thirdweb-dev/react";
import { sepolia } from "@thirdweb-dev/chains";
import { motion } from "framer-motion"; // Import motion for animations
import Link from "next/link";
import Image from "next/image"; // Import Image component for the avatar
import { SiEthereum } from "react-icons/si"; // Add this import at the top

export default function Profile() {
  const address = useAddress();
  const wallet = useWallet();
  const disconnect = useDisconnect();
  const { data: balance, isLoading } = useBalance(address, sepolia);

  if (!address) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Link href={'/login'} className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-green-600 text-xl font-semibold">
            Please connect your wallet
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
      {/* Dummy User Avatar */}
      

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
              UserName
            </h1>
        </div>
          <div className="flex justify-between items-center mt-10 mb-8">
            
            <h1 className="text-3xl font-bold text-green-200">
              Wallet Profile
            </h1>
            <button
              onClick={() => wallet && disconnect()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-transparent p-4 rounded-lg">
              <p className="text-sm text-green-200 font-medium mb-1">
                Wallet Address
              </p>
              <p className="text-green-200 font-mono break-all">
                {address}
              </p>
            </div>

            <div className="bg-transparent p-4 rounded-lg">
              <p className="text-sm text-green-200 font-medium mb-1">Balance</p>
              <div className="flex items-center gap-2">
                <SiEthereum className="text-green-500 text-2xl" />
                <p className="text-green-200 text-xl font-semibold">
                  {isLoading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    `${balance?.displayValue} ${balance?.symbol}`
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}