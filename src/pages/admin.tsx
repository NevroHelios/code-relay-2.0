import { useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [tokenURI, setTokenURI] = useState('');
  const router = useRouter();

  const createNFT = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      
      // Create NFT on blockchain
      // ... contract interaction code ...

      // Save to MongoDB
      await fetch('/api/nft/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenId: 1 /* token ID from contract */,
          tokenURI,
          creator: accounts[0],
        }),
      });

      router.push('/collections');
    } catch (error) {
      console.error('Error creating NFT:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Token URI
              </label>
              <input
                type="text"
                value={tokenURI}
                onChange={(e) => setTokenURI(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={createNFT}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create NFT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}