'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';
import Web3 from 'web3';
//import GarbageNFT from '@/../build/contracts/Garbage1.json';

interface WindowWithEthereum {
    ethereum?: any;
}

declare let window: WindowWithEthereum;

const AdminDashboard: React.FC = () => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState<string>('');
    const [tokenURI, setTokenURI] = useState<string>('');
    const [studentAddress, setStudentAddress] = useState<string>('');
    const [rewardId, setRewardId] = useState<string>('');

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setWeb3(web3Instance);

                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]);

                    const networkId = await web3Instance.eth.net.getId();
                    const deployedNetwork = GarbageNFT.networks[networkId];
                    const contractInstance = new web3Instance.eth.Contract(
                        GarbageNFT.abi,
                        deployedNetwork && deployedNetwork.address
                    );
                    setContract(contractInstance);
                } catch (error) {
                    console.error("User denied account access");
                }
            }
        };
        init();
    }, []);

    const createReward = async () => {
        if (!contract) return;
        try {
            await contract.methods.createReward(tokenURI).send({ from: account });
            alert('Reward created successfully!');
            setTokenURI('');
        } catch (error) {
            console.error('Error creating reward:', error);
        }
    };

    const approveStudent = async () => {
        if (!contract) return;
        try {
            await contract.methods.approveStudentForReward(rewardId, studentAddress)
                .send({ from: account });
            alert('Student approved successfully!');
            setStudentAddress('');
            setRewardId('');
        } catch (error) {
            console.error('Error approving student:', error);
        }
    };

    const handleTokenURIChange = (e: ChangeEvent<HTMLInputElement>) => setTokenURI(e.target.value);
    const handleRewardIdChange = (e: ChangeEvent<HTMLInputElement>) => setRewardId(e.target.value);
    const handleStudentAddressChange = (e: ChangeEvent<HTMLInputElement>) => setStudentAddress(e.target.value);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-green-600 mb-2">Eco Rewards Dashboard 🌱</h1>
                    <p className="text-gray-600">Create and manage environmental achievement rewards</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Create Reward Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
                        <div className="flex items-center mb-6">
                            <div className="bg-green-100 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-xl font-semibold text-gray-800">Create New Reward</h3>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Token URI
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter token URI..."
                                    value={tokenURI}
                                    onChange={handleTokenURIChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                                />
                            </div>
                            <button 
                                onClick={createReward}
                                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-500 hover:to-green-700 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                                Create Reward 🎉
                            </button>
                        </div>
                    </div>

                    {/* Approve Student Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-100 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-xl font-semibold text-gray-800">Approve Student</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Reward ID
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter reward ID..."
                                    value={rewardId}
                                    onChange={handleRewardIdChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Student Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter student address..."
                                    value={studentAddress}
                                    onChange={handleStudentAddressChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                />
                            </div>
                            <button 
                                onClick={approveStudent}
                                className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-700 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Approve Student 🎓
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;