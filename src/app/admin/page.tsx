"use client";

import React, { useState, ChangeEvent } from "react";
import { ThirdwebProvider, useAddress, useContract } from "@thirdweb-dev/react";
import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain, sepolia } from "thirdweb/chains";
import { useActiveAccount, useActiveWallet, useWalletBalance } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { useRouter } from "next/navigation";
import {client} from '@/app/client';

// create the client with your clientId, or secretKey if in a server environment
// const client = createThirdwebClient({
//   clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
// });

// connect to your contract
export const contract = getContract({
  client,
  chain: sepolia,
  address: "0xC64e09FC48F137515598D77398aa38FA02eFDa2b",
});

const AdminDashboard: React.FC = () => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const router = useRouter();

  console.log(wallet);
  console.log(account?.address);

  const { data: balance, isLoading } = useWalletBalance({
      client,
      chain: sepolia,
      address: account?.address || "0x0000000000000000000000000000000000000000",
    });

    if (!account) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-green-600 text-xl font-semibold">
              Please connect your wallet first
            </p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }
  
  const { mutate: sendTransaction } = useSendTransaction();

  // Create Reward States
  // const [tokenURI, setTokenURI] = useState<string>("");
  // const [title, setTitle] = useState<string>("");
  // const [description, setDescription] = useState<string>("");

  // Approve Student States
  const [studentName, setStudentName] = useState<string>("");
  const [durationInDays, setDurationInDays] = useState<number>(0);
  const [approvalTitle, setApprovalTitle] = useState<string>("");
  const [approvalDescription, setApprovalDescription] = useState<string>("");
  const [rewardPoints, setRewardPoints] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  console.log(account?.address);
  console.log(account)
  console.log(balance);
  console.log("bruh")
  const createReward = async () => {};

  const approveStudent = async () => {
    if (!contract) {
      alert("Contract not loaded");
      return;
    }
    // if (!account) {
    //   router.push("/login");
    // }
    setLoading(true);
    try {
      // if (!account) {
      //   router.push("/login");
      // }
      console.log(account?.address);
      if (
        !studentName ||
        !durationInDays ||
        !approvalTitle ||
        !approvalDescription ||
        !rewardPoints
      ) {
        throw new Error("Please fill in all fields");
      }

      // const tx = await contract.call("approveStudentForReward", [
      //   studentAddress,
      //   studentName,
      //   parseInt(durationInDays),
      //   approvalTitle,
      //   approvalDescription,
      //   parseInt(rewardPoints),
      // ]);

      const transaction = prepareContractCall({
        contract,
        method:
          "function approveStudentForReward(address _student, string _name, uint256 _durationInDays, string _title, string _description, uint256 _points)",
        params: [
          account?.address!,
          studentName,
          BigInt(durationInDays),
          approvalTitle,
          approvalDescription,
          BigInt(rewardPoints),
        ],
      });
      sendTransaction(transaction);

      console.log("Approval successful:", transaction);
      alert("Student approved successfully!");

      // Clear form
      setStudentName("");
      setDurationInDays(0);
      setApprovalTitle("");
      setApprovalDescription("");
      setRewardPoints(0);
    } catch (error: any) {
      console.error("Approval failed:", error);
      alert(`Failed to approve student: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setStudentName(e.target.value);
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDurationInDays(parseInt(e.target.value) || 0);
  const handleApprovalTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setApprovalTitle(e.target.value);
  const handleApprovalDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>
    setApprovalDescription(e.target.value);
  const handleRewardPointsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRewardPoints(parseInt(e.target.value) || 0);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
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
          {/* Approve Student Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
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
                  Student Name
                </label>
                <input
                  type="text"
                  placeholder="Enter student name..."
                  value={studentName}
                  onChange={handleStudentNameChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  placeholder="Enter duration in days..."
                  value={durationInDays}
                  onChange={handleDurationChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter approval title..."
                  value={approvalTitle}
                  onChange={handleApprovalTitleChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Enter approval description..."
                  value={approvalDescription}
                  onChange={handleApprovalDescriptionChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reward Points
                </label>
                <input
                  type="number"
                  placeholder="Enter reward points..."
                  value={rewardPoints}
                  onChange={handleRewardPointsChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  required
                />
              </div>
              <button
                onClick={approveStudent}
                className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-700 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={loading || loading}
              >
                {loading ? "Approving Student..." : "Approve Student 🎓"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThirdwebProvider>
      <AdminDashboard />
    </ThirdwebProvider>
  );
}

export default App;
