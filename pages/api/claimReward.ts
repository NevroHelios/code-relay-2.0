import { NextApiRequest, NextApiResponse } from 'next';
import Web3 from 'web3';
import GarbageNFT from '../../build/contracts/GarbageNFT.json';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { rewardId } = req.body;
  if (!rewardId) {
    res.status(400).json({ error: 'Missing rewardId parameter' });
    return;
  }

  if (!process.env.SEPOLIA_RPC_URL || !process.env.PRIVATE_KEY) {
    res.status(500).json({ error: 'Missing environment variables.' });
    return;
  }

  const web3 = new Web3(process.env.SEPOLIA_RPC_URL);

  try {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = GarbageNFT.networks[networkId];
    if (!deployedNetwork) {
      return res.status(400).json({ error: "Contract not deployed on the current network." });
    }

    const contract = new web3.eth.Contract(GarbageNFT.abi, deployedNetwork.address);
    const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

    const txMethod = contract.methods.claimReward(rewardId);
    const gas = await txMethod.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = txMethod.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account.address);

    const signedTx = await account.signTransaction({
      to: deployedNetwork.address,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: networkId
    });

    if (!signedTx.rawTransaction) {
      throw new Error('Transaction signing failed');
    }

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.status(200).json({ receipt });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;