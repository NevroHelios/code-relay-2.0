"use client";

import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

// connect to your contract
const contract = getContract({
  client,
  chain: sepolia,
  address: "0x43f687CA6877a51236f64006c6A1df5DAEcB4B31",
});

function ApprovedDashboard() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getApprovedStudents() view returns ((string name, address walletid, string[] rewards, uint256 totalRewardPoints)[])",
    params: [],
  });

  const { data: allrewards, isPending: isPendingrewards } = useReadContract({
    contract,
    method:
      "function rewards(uint256) view returns (address student, string id, string title, string description, bool claimed, uint256 deadline, uint256 durationInDays, uint256 claimedAt, uint256 points)",
    params: [BigInt(0)],
  });

  console.log(data);
  console.log(allrewards);

  return (
    <div>{isPending ? <p>Loading...</p> : <div>{allrewards[6]}</div>}</div>
  );
}

function App() {
  return (
    <ThirdwebProvider>
      <ApprovedDashboard />
    </ThirdwebProvider>
  );
}

export default App;
