'use client'

import { useState } from 'react'
import { createThirdwebClient } from "thirdweb"
import { createAuth } from "thirdweb/auth"
import { privateKeyToAccount } from "viem/accounts"
import { client } from '@/app/client'
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { useActiveWallet } from "thirdweb/react";
import { useRouter } from 'next/navigation'

export default function Login() {
    const account = useActiveAccount();
    const wallet = useActiveWallet();
    console.log(wallet);
    const router = useRouter()
  
    console.log(account)
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

  
    // if (account) {
    //   router.push('/profile');
    // }

  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <ConnectButton client={client} wallets={wallets} />
      <p>Wallet address: {account?.address}</p>
      <p>
        Wallet balance: {isLoading ? "Loading..." : `${balance?.displayValue} ${balance?.symbol}`}
      </p>
    </div>
  );
}
