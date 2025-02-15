import { useState } from "react";
import RewardCard from "@/components/rewards/RewardCard";

const availableRewards = [
  { id: 1, name: "$10 Store Credit", points: 100 },
  { id: 2, name: "Eco Tote Bag", points: 200 },
  // You can add more rewards here as needed
];

export default function RewardsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRewards = availableRewards.filter((reward) =>
    reward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-3xl font-bold">Available Rewards</h2>
        <input
          type="text"
          placeholder="Search rewards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {filteredRewards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRewards.map((reward) => (
            <RewardCard key={reward.id} {...reward} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No rewards found.</p>
      )}
    </div>
  );
}