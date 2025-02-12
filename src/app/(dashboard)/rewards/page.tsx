import RewardCard from "@/components/rewards/RewardCard";

const availableRewards = [ // Hardcoded data - replace with API fetch
  { id: 1, name: "$10 Store Credit", points: 100 },
  { id: 2, name: "Eco Tote Bag", points: 200 },
];

export default function RewardsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {availableRewards.map((reward) => (
        <RewardCard key={reward.id} {...reward} />
      ))}
    </div>
  );
}