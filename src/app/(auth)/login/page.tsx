"use client";

import { useState, useEffect } from 'react'
import { createThirdwebClient } from "thirdweb"
import { createAuth } from "thirdweb/auth"
import { privateKeyToAccount } from "viem/accounts"
import { client } from '@/app/client'
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { useActiveWallet } from "thirdweb/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const router = useRouter();
  
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address, // Provide a default address
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

  useEffect(() => {
    if (account) {
      setLoggedIn(true);
      router.push('/profile');
    }
  }, [account, router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome to Eco2</h1>
        <p className="text-gray-600 text-center mb-8">
          Login with your Metamask
        </p>
        <div className="flex flex-col gap-6">
          <ConnectButton client={client} wallets={wallets} />
          <div className="mt-4 ">
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
        </div>
      </div>
    </div>
  );
}
