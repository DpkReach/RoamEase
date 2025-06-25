'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@/services/auth';
import { User } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

function DashboardSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
                <Card key={i}>
                    <Skeleton className="h-48 w-full rounded-t-lg" />
                    <CardHeader>
                        <Skeleton className="h-7 w-1/2" />
                        <Skeleton className="h-16 w-full mt-2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-6 w-1/3 mb-2" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default function DashboardView({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);
  
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-80 mt-2" />
            </div>
        </div>
        <DashboardSkeleton />
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Welcome back, Wanderer!</h1>
        <p className="text-muted-foreground">Get inspired for your next adventure. Here are some popular destinations.</p>
      </div>

      {user && (
        <Suspense fallback={<DashboardSkeleton />}>
          {children}
        </Suspense>
      )}
      
    </div>
  );
}
