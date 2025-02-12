import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Leaderboard from '@/components/Leaderboard';
import RecentContributions from '@/components/contribution/RecentContributions';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Cleanups</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentContributions />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Leaderboard />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <MetricItem label="Total Cleanups" value="24" />
            <MetricItem label="Points Earned" value="1,240" />
            <MetricItem label="NFTs Collected" value="3" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}