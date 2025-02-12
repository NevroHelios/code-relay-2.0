import { ContributionCard } from '@/components/contribution/ContributionCard';
import { getPendingContributions } from '@/lib/api/contributions';

export default async function VerificationPage() {
  const pendingContributions = await getPendingContributions();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pending Verifications</h1>
        <span className="badge badge-info">
          {pendingContributions.length} pending
        </span>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pendingContributions.map(contribution => (
          <ContributionCard 
            key={contribution.id}
            contribution={contribution}
            showActions
          />
        ))}
      </div>
    </div>
  );
}