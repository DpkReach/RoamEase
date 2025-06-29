'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@/services/auth';
import { User } from 'firebase/auth';
import ItineraryBuilder from "@/components/itinerary/itinerary-builder";
import { Skeleton } from '@/components/ui/skeleton';

export default function ItineraryPage() {
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <Skeleton className="lg:col-span-1 h-96" />
            <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Itinerary Builder</h1>
        <p className="text-muted-foreground">Plan your trip day by day. Drag and drop activities to organize your schedule.</p>
      </div>
      <ItineraryBuilder />
    </div>
  );
}
