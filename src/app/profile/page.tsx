"use client";

import { useActiveAccount, useWalletBalance } from "thirdweb/react";

import { client } from '@/app/client';
import { sepolia } from "thirdweb/chains";
import { useActiveWallet, useDisconnect } from "thirdweb/react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-green-600 text-xl font-semibold">Please connect your wallet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-green-800">Wallet Profile</h1>
            <button
              onClick={() => wallet && disconnect.disconnect(wallet)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium mb-1">Wallet Address</p>
              <p className="text-gray-700 font-mono break-all">{account.address}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium mb-1">Balance</p>
              <p className="text-gray-700 text-xl font-semibold">
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
    </div>
  );
}
