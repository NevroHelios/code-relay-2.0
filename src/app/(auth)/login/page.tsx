"use client";

import { useState, useEffect } from "react";
import { createThirdwebClient } from "thirdweb";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "viem/accounts";
import { client } from "@/app/client";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { useActiveWallet } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import motion for animations

export default function Login() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const router = useRouter();

  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address,
  });

  const wallets = [
    inAppWallet({
      auth: {
        options: [
          "google",
          "email",
          "passkey",
          "phone",
          "github",
          "facebook",
          "apple",
        ],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
  ];

  const [loggedIn, setLoggedIn] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    if (account) {
      setWalletConnected(true);
      setLoggedIn(true);
      router.push("/profile");
    }
  }, [account, router]);

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
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariant}
      className="flex items-center justify-center min-h-screen"
    >
      <motion.div
        variants={itemVariant}
        className="p-8 mt-14 bg-black bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-green-600 text-center mb-4">
          Welcome to GreenSync
        </h1>
        <p className="text-green-600 text-center mb-8">
          Login with your Metamask
        </p>
        <div className="flex flex-col gap-6">
          <ConnectButton client={client} wallets={wallets} />
          {walletConnected && (
            <div className="mt-4">
              <p className="text-green-700 font-semibold">
                Wallet address:{" "}
                <span className="font-semibold">{account?.address}</span>
              </p>
              <p className="text-green-600 font-semibold">
                Wallet balance:{" "}
                {isLoading
                  ? "Loading..."
                  : `${balance?.displayValue} ${balance?.symbol}`}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}