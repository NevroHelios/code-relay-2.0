"use client";

import { useEffect, useState } from "react";
import { NFT } from "../../types";
import {
    createThirdwebClient,
    getContract,
    prepareContractCall,
} from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { ThirdwebProvider, useActiveAccount, useSendTransaction } from "thirdweb/react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";

const Collections: React.FC = () => {
    const connectWithMetamask = useMetamask();
    const { mutate: sendTransaction } = useSendTransaction();
    const contractAddress = "0x9C4c3351636086d6087e94f57E46fB71df89e27B";
    const address = useActiveAccount()?.address || useAddress();
    console.log("Address:", address);

    const [nfts, setNfts] = useState<NFT[]>([]);

    // Create the client with your clientId.
    const client = createThirdwebClient({
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
    });

    // Connect to your contract.
    const contract = getContract({
        client,
        chain: sepolia,
        address: contractAddress,
    });
    console.log("Contract:", contract);

    useEffect(() => {
        const fetchNFTs = async () => {
            const response = await fetch("/api/nft", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            console.log("NFTs:", data.nfts);
            setNfts(data.nfts);
        };
        fetchNFTs();
    }, []);

    const claimRewardHandler = async (rewardId: number) => {
        if (!address) {
            await connectWithMetamask();
        }

        try {
            const transaction = prepareContractCall({
                contract,
                method: "function claimReward(string _rewardId, address _claimer)",
                params: [rewardId, address!],
            });
            await sendTransaction(transaction);
            console.log("Transaction prepared:", transaction);
        } catch (error) {
            console.error("Error claiming reward:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    NFT Collections
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nfts.map((nft: NFT) => (
                        <div key={nft.tokenURI} className="bg-white rounded-lg shadow p-6">
                            <img
                                src={nft.tokenURI}
                                alt={nft.tokenURI}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="mt-4 space-y-2">
                                <h2 className="text-xl font-semibold truncate">
                                    Token #{nft.tokenURI}
                                </h2>
                                <p className="text-lg font-bold truncate">{nft.title}</p>
                                <p className="text-gray-600 line-clamp-2">{nft.description}</p>
                                <p className="text-gray-600 truncate">
                                    Created by: {nft.creator}
                                </p>
                                <p className="text-gray-600">
                                    Status:{" "}
                                    <span className={nft.isClaimed ? "text-red-500" : "text-green-500"}>
                                        {nft.isClaimed ? "Claimed" : "Available"}
                                    </span>
                                </p>
                                <p className="text-gray-600">
                                    Valid until:{" "}
                                    {new Date(nft.validity).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <button
                                    onClick={() => claimRewardHandler(nft.tokenURI)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    CLAIM REWARD!
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

function App() {
  return (
    <ThirdwebProvider
      activeChain={sepolia}
      sdkOptions={{
        thirdwebApiKey: process.env.NEXT_PUBLIC_THIRDWEB_API_KEY,
      }}
    >
      <Collections />
    </ThirdwebProvider>
  );
}

export default App;
