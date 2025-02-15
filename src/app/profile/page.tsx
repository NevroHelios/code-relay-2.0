"use client";

import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { useActiveWallet, useDisconnect } from "thirdweb/react";
import { client } from "@/app/client";
import { sepolia } from "thirdweb/chains";
import { motion } from "framer-motion"; // Import motion for animations

export default function Profile() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const disconnect = useDisconnect();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address || "0x0000000000000000000000000000000000000000",
  });

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-green-600 text-xl font-semibold">
            Please connect your wallet
          </p>
        </div>
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
      className="min-h-screen p-8 flex items-center justify-center"
    >
      <motion.div variants={itemVariant} className="max-w-2xl">
        <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 space-y-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-green-200">
              Wallet Profile
            </h1>
            <button
              onClick={() => wallet && disconnect.disconnect(wallet)}
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
                {account.address}
              </p>
            </div>

            <div className="bg-transparent p-4 rounded-lg">
              <p className="text-sm text-green-200 font-medium mb-1">Balance</p>
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
      </motion.div>
    </motion.div>
  );
}
