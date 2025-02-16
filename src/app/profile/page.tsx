"use client";

import { useAddress, useBalance, useWallet, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SiEthereum } from "react-icons/si";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useEffect} from 'react';

export default function Profile() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const { data: balance, isLoading } = useBalance(address, Sepolia);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const connectWithMetamask = useMetamask();
  const [coinBalance, setCoinBalance] = useState<number>(0);

  const handleDisconnect = async () => {
    try {
      setIsLoggingOut(true);
      
      // Clear local storage
      // window.localStorage.removeItem("isWalletConnected");
      
      // Disconnect wallet
      await disconnect();
      
      // Small delay to ensure everything is cleared
      setTimeout(() => {
        setIsLoggingOut(false);
        // Redirect to root instead of login
        router.push('/');
        // Force reload to clear any remaining state
        router.refresh();
      }, 1000);

    } catch (error) {
      console.error("Failed to disconnect:", error);
      setIsLoggingOut(false);
    }
  };

  if (!address) {
     connectWithMetamask();
  }

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
              src="/dummy-user.png"
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
              onClick={handleDisconnect}
              disabled={isLoggingOut}
              className={`px-4 py-2 ${
              isLoggingOut 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
              } text-white rounded-lg transition-colors flex items-center gap-2`}
            >
              {isLoggingOut ? (
              <>
              <span className="animate-spin">↻</span>
              Disconnecting...
              </>
              ) : (
              'Disconnect'
              )}
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
              <p className="text-sm text-green-200 font-medium mb-1">Coins</p>

              <div className="flex items-center gap-2">
                {/* Green Token Logo */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#22C55E" /> {/* Green circle */}
                <path
                  d="M12 6L14 10L18 11L15 14L16 18L12 16L8 18L9 14L6 11L10 10L12 6Z"
                  fill="#FFFFFF"
                /> {/* Star shape inside the circle */}
              </svg>

              {/* Coin Balance Text */}
              <span className="text-green-400 font-medium">Coins: {coinBalance}</span>
                <SiEthereum className="text-green-500 text-2xl hidden" />
                <p className="text-green-200 text-xl font-semibold hidden">
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