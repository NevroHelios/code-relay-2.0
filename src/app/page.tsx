import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const totalContributions = 1245; // Hardcoded statistic
  const totalRewards = 890; // Hardcoded statistic

  return (
    <div className="text-center space-y-8">
      <h1 className="text-4xl font-bold">EcoRewards Platform</h1>
      <div className="flex justify-center gap-8">
        <div className="p-4 border rounded-lg">
          <p className="text-2xl font-bold">{totalContributions}</p>
          <p className="text-muted-foreground">Total Contributions</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-2xl font-bold">{totalRewards}</p>
          <p className="text-muted-foreground">Rewards Claimed</p>
        </div>
      </div>
      <Button asChild>
        <Link href="/login">Get Started</Link>
      </Button>
    </div>
  );
}