'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@/services/auth';
import { User } from 'firebase/auth';
import PackingListGenerator from "@/components/packing-list/packing-list-generator";
import { Skeleton } from '@/components/ui/skeleton';

export default function PackingListPage() {
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
                <Skeleton className="lg:col-span-1 h-[30rem]" />
                <Skeleton className="lg:col-span-2 h-[30rem]" />
            </div>
        </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">AI Packing List Generator</h1>
        <p className="text-muted-foreground">Tell us about your trip, and we'll generate a personalized packing list for you.</p>
      </div>
      <PackingListGenerator />
    </div>
  );
}
