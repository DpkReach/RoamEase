'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@/services/auth';
import { User } from 'firebase/auth';
import DestinationMap from '@/components/dashboard/destination-map';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Backpack, Calendar, Wrench } from 'lucide-react';
import Link from 'next/link';

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
        <div className="flex justify-between items-center">
            <div>
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-80 mt-2" />
            </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-40 rounded-lg" />
            <Skeleton className="h-40 rounded-lg" />
            <Skeleton className="h-40 rounded-lg" />
        </div>
        <Skeleton className="h-[45rem] w-full rounded-lg" />
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Welcome back, Wanderer!</h1>
        <p className="text-muted-foreground">Here's your travel dashboard. Ready for your next adventure?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline"><Calendar className="text-accent h-7 w-7" /> Upcoming Itinerary</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">You have a trip to Paris coming up soon. View and manage your daily plans.</p>
          </CardContent>
          <CardFooter>
            <Link href="/itinerary" passHref className="w-full">
                <Button className="w-full">View Itinerary <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline"><Backpack className="text-accent h-7 w-7" /> AI Packing List</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">Let our AI generate a smart, personalized packing list for your trip.</p>
          </CardContent>
          <CardFooter>
            <Link href="/packing-list" passHref className="w-full">
                <Button className="w-full">Create List <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline"><Wrench className="text-accent h-7 w-7" /> Travel Tools</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">Access the currency converter and document checklist.</p>
          </CardContent>
          <CardFooter>
            <Link href="/tools" passHref className="w-full">
                <Button className="w-full">Use Tools <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      <DestinationMap />
    </div>
  );
}
