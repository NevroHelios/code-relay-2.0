import { useState } from "react";
import ContributionCard from "@/components/contribution/ContributionCard";

const allContributions = [ // Hardcoded data - replace with API fetch as needed
  { id: 1, type: "Plastic", weight: 2.5, points: 50, date: "2024-03-15" },
  { id: 2, type: "Metal", weight: 1.2, points: 24, date: "2024-03-14" },
  { id: 3, type: "Glass", weight: 3.0, points: 60, date: "2024-03-13" },
  { id: 4, type: "Paper", weight: 1.8, points: 36, date: "2024-03-12" },
  { id: 5, type: "Organic", weight: 4.2, points: 84, date: "2024-03-11" },
];

export default function ContributionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContributions = allContributions.filter((contribution) =>
    contribution.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-3xl font-bold">All Contributions</h2>
        <input
          type="text"
          placeholder="Search contributions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {filteredContributions.length > 0 ? (
        <div className="space-y-4">
          {filteredContributions.map((contribution) => (
            <ContributionCard key={contribution.id} {...contribution} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No contributions found.</p>
      )}
    </div>
  );
}