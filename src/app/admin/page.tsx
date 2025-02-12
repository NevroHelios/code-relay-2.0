// Updated component to capture title and description

'use client'

import React, { useState, ChangeEvent, useEffect } from 'react';
import Web3 from 'web3';
import GarbageNFT from '@/../build/contracts/GarbageNFT.json';

interface WindowWithEthereum {
  ethereum?: any;
}
declare let window: WindowWithEthereum;

const AdminDashboard: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const [tokenURI, setTokenURI] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [studentAddress, setStudentAddress] = useState<string>('');
  const [rewardId, setRewardId] = useState<string>('');

  useEffect(() => {

    const verifyContract = async () => {
  try {
    if (!web3) {
      throw new Error("Web3 is not initialized");
    }
    if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
      throw new Error("Contract address is not defined in environment variables");
    }
    // Check contract bytecode
    const code = await web3.eth.getCode(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
    console.log("Contract bytecode exists:", code !== '0x');

    // Check if we can call basic contract methods
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    console.log("Contract name:", name);
    console.log("Contract symbol:", symbol);

    // Check contract owner
    const owner = await contract.methods.owner().call();
    console.log("Contract owner:", owner);

    return true;
  } catch (error) {
    console.error("Contract verification failed:", error);
    return false;
  }
    };
    

    const init = async () => {
      let provider = window.ethereum;
      if (!provider) {
        console.log("window.ethereum not found, falling back to Hardhat provider at http://127.0.0.1:8545");
        provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      } else {
        console.log("window.ethereum detected:", provider);
      }
      const web3Instance = new Web3(provider);
      console.log("Web3 instance created:", web3Instance);
      try {
          if (window.ethereum) {
            // Request account access if needed
            await window.ethereum.request({ 
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x7A69' }], // 31337 in hex
            });
            await window.ethereum.enable();
          }
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        console.log("Fetched accounts:", accounts);
        if (accounts.length === 0) {
          console.error("No accounts detected");
          return;
        }
        setAccount(accounts[0]);
        const networkId = await web3Instance.eth.net.getId();
        console.log("Detected networkId:", networkId);
        let contractAddress;
        if (GarbageNFT.networks[networkId] && GarbageNFT.networks[networkId].address) {
          contractAddress = GarbageNFT.networks[networkId].address;
          console.log("Contract found in GarbageNFT.networks for networkId", networkId, "Address:", contractAddress);
        } else if (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
          contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
          console.log("Using contract address from .env:", contractAddress);
        } else {
          console.error("Contract not deployed on the current network.");
          return;
        }
        const contractInstance = new web3Instance.eth.Contract(
          GarbageNFT.abi,
          contractAddress
        );
        console.log("Contract instance created:", contractInstance);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error during initialization:", error);
      }
      if (contract) {
        await verifyContract();
      }
    };
    init();
  }, []);

  const createReward = async () => {
  if (!contract || !account) {
    console.error("Contract or account not initialized");
    return;
  }

  try {
    // 1. Basic input validation
    if (!tokenURI || !title || !description) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Step 1: Input validation passed");

    // 2. Check account balance
    const balance = await web3.eth.getBalance(account);
    console.log("Account balance:", web3.utils.fromWei(balance, 'ether'), "ETH");

    // 3. Get current reward counter
    const currentCounter = await contract.methods.rewardCounter().call();
    console.log("Current reward counter:", currentCounter);

    // 4. Prepare transaction parameters
    const createRewardMethod = contract.methods.createReward(tokenURI, title, description);

    // 5. Estimate gas with detailed error handling
    let gasEstimate;
    try {
      gasEstimate = await createRewardMethod.estimateGas({
        from: account
      });
      console.log("Gas estimate:", gasEstimate);
    } catch (gasError: any) {
      console.error("Gas estimation failed:", gasError);
      try {
        await contract.methods.createReward(tokenURI, title, description).call({
          from: account
        });
      } catch (callError: any) {
        console.error("Simulation call failed:", callError);
      }
      throw new Error(`Gas estimation failed: ${gasError.message}`);
    }

    // 6. Send transaction with specific parameters
    const tx = await createRewardMethod.send({
      from: account,
      gas: Math.floor(gasEstimate * 1.2),
      gasPrice: await web3.eth.getGasPrice()
    });

    console.log("Transaction successful:", tx);

    // 7. Verify that the reward was created (the counter gets updated)
    const newCounter = await contract.methods.rewardCounter().call();
    console.log("New reward counter:", newCounter);

    // 8. Optionally store transaction details in MongoDB via API call
    try {
      const response = await fetch('/api/nft/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: newCounter,
          tokenURI,
          creator: account,
          title,
          description,
          transactionHash: tx.transactionHash
        })
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Reward stored in DB:", data);
    } catch (apiError) {
      console.error("Error saving reward on backend:", apiError);
    }

    alert('Reward created successfully!');
    setTokenURI('');
    setTitle('');
    setDescription('');

  } catch (error: any) {
    console.error('Transaction failed:', error);
    let errorMessage = 'Error creating reward: ';
    if (error.message.includes('revert')) {
      errorMessage += 'Transaction reverted. Check if you have owner permissions or valid input.';
    } else if (error.message.includes('gas')) {
      errorMessage += 'Gas estimation failed. The transaction might be invalid.';
    } else {
      errorMessage += error.message;
    }
    alert(errorMessage);
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
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
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
                  value={studentAddress}
                  onChange={handleStudentAddressChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md mb-4"
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