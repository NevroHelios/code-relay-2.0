import ContributionCard from "@/components/contribution/ContributionCard";

const allContributions = [ // Hardcoded data - replace with API fetch
  { id: 1, type: "Plastic", weight: 2.5, points: 50, date: "2024-03-15" },
  { id: 2, type: "Metal", weight: 1.2, points: 24, date: "2024-03-14" },
];

export default function ContributionsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">All Contributions</h2>
      {allContributions.map((contribution) => (
        <ContributionCard key={contribution.id} {...contribution} />
      ))}
    </div>
  );
}