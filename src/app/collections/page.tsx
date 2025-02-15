"use client";

import { useEffect, useState } from "react";
import { NFT } from "../../types";

export default function Collections() {
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const response = await fetch("/api/nft", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setNfts(data);
    };
    fetchNFTs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          NFT Collections
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div key={nft.tokenURI} className="bg-white rounded-lg shadow p-6">
              <img
                src={nft.tokenURI}
                alt={`NFT ${nft.tokenURI}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Token #{nft.tokenURI}</h2>
                <p className="text-lg font-bold mt-2">{nft.title}</p>
                <p className="text-gray-600 mt-2">{nft.description}</p>
                <p className="text-gray-600 mt-2">Created by: {nft.creator}</p>
                <p className="text-gray-600">
                  Status: {nft.isClaimed ? "Claimed" : "Available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
