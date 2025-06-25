'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@/services/auth';
import { User } from 'firebase/auth';
import CurrencyConverter from "@/components/tools/currency-converter";
import DocumentChecklist from "@/components/tools/document-checklist";
import { Skeleton } from '@/components/ui/skeleton';

export default function ToolsPage() {
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Travel Tools</h1>
        <p className="text-muted-foreground">Essential utilities to help you prepare for your trip.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
        <CurrencyConverter />
        <DocumentChecklist />
      </div>
    </div>
  );
}
