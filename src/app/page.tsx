import DestinationMap from '@/components/dashboard/destination-map';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Explore destinations and manage your trips.</p>
      </div>
      <DestinationMap />
    </div>
  );
}
