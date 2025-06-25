'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@/services/auth';
import { User } from 'firebase/auth';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Landmark, Utensils, Hotel } from 'lucide-react';

export default function DestinationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const slug = params.slug as string;
  const destinationName = slug
    ? slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Destination';

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
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-96 w-full rounded-lg" />
                <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
        <div>
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Map
            </Button>
            <h1 className="text-4xl font-headline font-bold text-foreground">{destinationName}</h1>
            <p className="text-muted-foreground mt-2">Explore the sights, sounds, and tastes of {destinationName}.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
                <Card className="overflow-hidden shadow-lg">
                    <Image 
                        src={`https://placehold.co/800x400.png`}
                        alt={`A scenic view of ${destinationName}`}
                        width={800} 
                        height={400} 
                        className="w-full object-cover"
                        data-ai-hint={destinationName.toLowerCase()}
                    />
                    <CardHeader>
                        <CardTitle className="font-headline">About {destinationName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground/90">
                            Welcome to {destinationName}, a place of wonder and excitement. From its historic landmarks to its vibrant culinary scene, there's something here for every traveler. 
                            This is placeholder text, but imagine it filled with fascinating details about what makes this destination unique.
                        </p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">What to Do</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                            <Landmark className="h-8 w-8 text-accent mt-1" />
                            <div>
                                <h3 className="font-semibold">Visit Historic Landmarks</h3>
                                <p className="text-sm text-muted-foreground">Discover the rich history etched in the city's architecture.</p>
                            </div>
                       </div>
                       <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                            <Utensils className="h-8 w-8 text-accent mt-1" />
                            <div>
                                <h3 className="font-semibold">Savor Local Cuisine</h3>
                                <p className="text-sm text-muted-foreground">Embark on a culinary journey through local markets and restaurants.</p>
                            </div>
                       </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="space-y-8">
                <Card>
                     <CardHeader>
                        <CardTitle className="font-headline">Recommended Stays</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                               <Hotel className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold">The Grand Plaza</h4>
                                <p className="text-sm text-muted-foreground">5-star luxury in the heart of the city.</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                               <Hotel className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold">Cozy Corner B&B</h4>
                                <p className="text-sm text-muted-foreground">Charming and affordable stay.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
