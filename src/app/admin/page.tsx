"use client";

import React, { useState, ChangeEvent } from "react";
import {
  ThirdwebProvider,
  useSendTransaction,
  useContract,
  useAccount,
  useConnect,
} from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { metamaskWallet } from "thirdweb/wallets";
import { ethers } from "ethers";
import GarbageNFTAbi from "../../../artifacts/contracts/GarbageNFT.sol/GarbageNFT.json";

const AdminDashboard: React.FC = () => {
  const { address } = useAccount();
  const { connect } = useConnect();
  const contractAddress = "0x9C4c3351636086d6087e94f57E46fB71df89e27B";
  const { contract, isLoading: isContractLoading } = useContract({
    address: contractAddress,
    abi: GarbageNFTAbi.abi,
  });

  const [tokenURI, setTokenURI] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: sendTransaction, isPending: isSending } = useSendTransaction();

  const createReward = async () => {
    if (!contract) {
      alert("Contract not loaded");
      return;
    }
    if (!address) {
      connect(metamaskWallet());
      return;
    }
    setLoading(true);
    try {
      if (!tokenURI || !title || !description || !expiryDate) {
        throw new Error("Please fill in all fields");
      }

      const expiryDateTimestamp = Math.floor(new Date(expiryDate).getTime() / 1000;

      const transaction = prepareContractCall({
        contract,
        method: "function createReward(string _tokenURI, string _title, string _description, uint256 _expiryDate) returns (uint256)",
        params: [tokenURI, title, description, expiryDateTimestamp],
      });

      sendTransaction(transaction, {
        onSuccess: async (tx) => {
          try {
            const receipt = await tx.wait();
            const iface = new ethers.utils.Interface(GarbageNFTAbi.abi);
            let rewardId: number | undefined;

            for (const log of receipt.logs) {
              try {
                const parsedLog = iface.parseLog(log);
                if (parsedLog.name === "RewardCreated") {
                  rewardId = parsedLog.args.rewardId.toNumber();
                  break;
                }
              } catch (error) {
                continue;
              }
            }

            if (typeof rewardId === "undefined") {
              throw new Error("Failed to retrieve rewardId from tx event logs");
            }

            const response = await fetch("/api/nft/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                tokenId: rewardId,
                tokenURI,
                creator: address,
                title,
                description,
                expiryDate: expiryDateTimestamp,
              }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Failed to save NFT in database");
            }

            alert("Reward created successfully!");
            setTokenURI("");
            setTitle("");
            setDescription("");
            setExpiryDate("");
          } catch (error: any) {
            console.error("Error handling transaction success:", error);
            alert(`Error: ${error.message}`);
          } finally {
            setLoading(false);
          }
        },
        onError: (error) => {
          console.error("Transaction failed:", error);
          alert(`Failed to create reward: ${error.message}`);
          setLoading(false);
        },
      });
    } catch (error: any) {
      console.error("Error preparing transaction:", error);
      alert(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  const handleTokenURIChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTokenURI(e.target.value);
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);
  const handleExpiryDateChange = (e: ChangeEvent<HTMLInputElement>) =>
    setExpiryDate(e.target.value);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Eco Rewards Dashboard 🌱
          </h1>
          <p className="text-gray-600">
            Create and manage environmental achievement rewards
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Reward Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="ml-3 text-xl font-semibold text-gray-800">
                Create New Reward
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Token URI (Image URL)
                </label>
                <input
                  type="text"
                  placeholder="Enter token URI..."
                  value={tokenURI}
                  onChange={handleTokenURIChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md mb-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter reward title..."
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md mb-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Enter reward description..."
                  value={description}
                  onChange={handleDescriptionChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md mb-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="datetime-local"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md mb-4"
                />
              </div>
              <button
                onClick={createReward}
                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-500 hover:to-green-700 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                disabled={loading || isContractLoading || isSending}
              >
                {loading || isSending ? "Creating Reward..." : "Create Reward 🎉"}
              </button>
            </div>
          </div>

          {/* Approve Student Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="ml-3 text-xl font-semibold text-gray-800">
                Approve Student
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reward ID
                </label>
                <input
                  type="number"
                  placeholder="Enter reward ID..."
                  className="w-full p-2 border border-gray-300 text-black rounded-md mb-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Address
                </label>
                <input
                  type="text"
                  placeholder="Enter student address..."
                  className="w-full p-2 border border-gray-300 text-black rounded-md mb-4"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-700 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Approve Student 🎓
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThirdwebProvider
      activeChain={sepolia}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_API_KEY}
    >
      <AdminDashboard />
    </ThirdwebProvider>
  );
};

export default App;