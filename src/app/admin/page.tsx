"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // corrected import for app directory
import Web3 from 'web3';
import GarbageNFTAbi from '../../../build/contracts/GarbageNFT.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function AdminDashboard() {
  const [tokenURI, setTokenURI] = useState('');
  const router = useRouter();

  const createNFT = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      
      // Create contract instance
      const contract = new web3.eth.Contract(
        GarbageNFTAbi.abi,
        CONTRACT_ADDRESS
      );

      // Call createReward function on the contract
      const result = await contract.methods
        .createReward(tokenURI)
        .send({ from: accounts[0] });

      // Get tokenId from the event logs
      const rewardCreatedEvent = result.events?.RewardCreated;
      if (!rewardCreatedEvent) {
        throw new Error('RewardCreated event not found in transaction result');
      }
      const tokenId = rewardCreatedEvent.returnValues.rewardId;

      // Save to MongoDB
      const response = await fetch('/api/nft/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenId: Number(tokenId),
          tokenURI,
          creator: accounts[0],
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to save NFT metadata: ${errorDetails}`);
      }

      // Redirect to collections page
      router.push('/collections');
    } catch (error) {
      console.error('Error creating NFT:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Create and manage your NFT collection
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <input
            type="text"
            placeholder="Enter image URL"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            onClick={createNFT}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Create NFT
          </button>
        </div>
      </div>
    </div>
  );
}