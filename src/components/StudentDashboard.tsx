"use client";

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import GarbageNFT from '../../build/contracts/GarbageNFT.json';
import { useAuth } from '../contexts/AuthContext';

interface Reward {
  id: number;
  tokenURI: string;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

const StudentDashboard: React.FC = () => {
  const { role } = useAuth();

  if (role !== 'user') {
    return <div>Unauthorized. Please login as user.</div>;
  }

  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const [claimableRewards, setClaimableRewards] = useState<Reward[]>([]);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);

          const accounts: string[] = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = GarbageNFT.networks[networkId];
          if (deployedNetwork) {
            const contractInstance = new web3Instance.eth.Contract(
              GarbageNFT.abi,
              deployedNetwork.address
            );
            setContract(contractInstance);
            await loadClaimableRewards(contractInstance, accounts[0]);
          } else {
            console.error("Contract not deployed on the current network.");
          }
        } catch (error) {
          console.error("User denied account access", error);
        }
      }
    };
    init();
  }, []);

  const loadClaimableRewards = async (contractInstance: any, address: string) => {
    try {
      const rewardCounter = await contractInstance.methods.rewardCounter().call();
      const claimable: Reward[] = [];

      for (let i = 1; i <= Number(rewardCounter); i++) {
        const isApproved = await contractInstance.methods.approvedStudents(i, address).call();
        const isClaimed = await contractInstance.methods.claimed(i, address).call();

        if (isApproved && !isClaimed) {
          const tokenURI = await contractInstance.methods.rewardTokenURI(i).call();
          claimable.push({ id: i, tokenURI });
        }
      }
      setClaimableRewards(claimable);
    } catch (error) {
      console.error('Error loading rewards:', error);
    }
  };

  const claimReward = async (rewardId: number) => {
    try {
      // Call our API to claim the reward.
      const response = await fetch('/api/claimReward', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rewardId })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Reward claimed successfully!');
        if (contract && account) {
          await loadClaimableRewards(contract, account);
        }
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      <div className="claimable-rewards">
        <h3>Available Rewards</h3>
        {claimableRewards.length === 0 ? (
          <p>No rewards available to claim</p>
        ) : (
          <ul>
            {claimableRewards.map((reward) => (
              <li key={reward.id}>
                <p>Reward ID: {reward.id}</p>
                <p>Token URI: {reward.tokenURI}</p>
                <button onClick={() => claimReward(reward.id)}>
                  Claim Reward
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;