'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@/services/auth';
import { User } from 'firebase/auth';
import DestinationMap from '@/components/dashboard/destination-map';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);
  
  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-9 w-1/4" />
          <Skeleton className="h-5 w-1/2 mt-2" />
        </div>
        <Skeleton className="h-[35rem] w-full" />
      </div>
    );
  }
  
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
