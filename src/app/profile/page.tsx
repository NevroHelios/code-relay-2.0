"use client";

import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from '@/app/client';
import { sepolia } from "thirdweb/chains";
import { useActiveWallet } from "thirdweb/react";

export default function Profile() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  console.log(wallet);

  console.log(account)
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address || "0x0000000000000000000000000000000000000000", // Provide a default address
  });

  if (!account) {
    return <p>Please connect your wallet</p>;
  }

  return (
    <div>
      <p>Wallet address: {account.address}</p>
      <p>
        Wallet balance: {isLoading ? "Loading..." : `${balance?.displayValue} ${balance?.symbol}`}
      </p>
    </div>
  );
}
