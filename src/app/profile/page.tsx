"use client";

import {
  useActiveAccount,
  useWalletBalance,
  useDisconnect,
} from "thirdweb/react";
import { client } from "@/app/client";
import { sepolia } from "thirdweb/chains";
import { useActiveWallet } from "thirdweb/react";
import styles from "./Profile.module.css";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const disconnect = useDisconnect();
  const router = useRouter();

  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address || "0x0000000000000000000000000000000000000000",
  });

  if (!account) {
    router.push("/login");
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-600">Please connect your wallet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Wallet Profile
        </h2>

        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">Wallet Address</p>
            <p className="text-gray-800 font-medium break-all">
              {account.address}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-gray-800 font-medium">
              {isLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                `${balance?.displayValue} ${balance?.symbol}`
              )}
            </p>
          </div>

          <button
            onClick={() => {
              if (wallet) {
                disconnect.disconnect(wallet);
              }
            }}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
