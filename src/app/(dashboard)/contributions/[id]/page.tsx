import { notFound } from "next/navigation";
import ContributionCard from "@/components/contribution/ContributionCard";

const mockContributions = [ // Hardcoded data - replace with API fetch
  { id: 1, type: "Plastic", weight: 2.5, points: 50, status: "Verified", date: "2024-03-15", location: "New York, USA" },
  { id: 2, type: "Paper", weight: 1.8, points: 36, status: "Pending", date: "2024-03-14", location: "San Francisco, USA" },
];

export default function ContributionDetailPage({ params }: { params: { id: string } }) {
  const contribution = mockContributions.find((c) => c.id === Number(params.id));

  if (!contribution) {
    notFound(); // Show 404 if contribution is not found
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Contribution Details</h1>
      <ContributionCard {...contribution} />
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Location</h3>
          <p className="text-muted-foreground">{contribution.location}</p> // Hardcoded location
        </div>
        <div>
          <h3 className="text-lg font-semibold">Status</h3>
          <p className="text-muted-foreground">{contribution.status}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Date</h3>
          <p className="text-muted-foreground">{contribution.date}</p>
        </div>
      </div>
    </div>
  );
}