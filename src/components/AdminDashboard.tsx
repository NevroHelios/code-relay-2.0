'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';
import Web3 from 'web3';
import GarbageNFT from '../../build/contracts/GarbageNFT.json';

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
                    await window.ethereum.enable();
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
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="create-reward">
                <h3>Create New Reward</h3>
                <input
                    type="text"
                    placeholder="Token URI"
                    value={tokenURI}
                    onChange={handleTokenURIChange}
                />
                <button onClick={createReward}>Create Reward</button>
            </div>
            
            <div className="approve-student">
                <h3>Approve Student</h3>
                <input
                    type="number"
                    placeholder="Reward ID"
                    value={rewardId}
                    onChange={handleRewardIdChange}
                />
                <input
                    type="text"
                    placeholder="Student Address"
                    value={studentAddress}
                    onChange={handleStudentAddressChange}
                />
                <button onClick={approveStudent}>Approve Student</button>
            </div>
        </div>
    );
};

export default AdminDashboard;