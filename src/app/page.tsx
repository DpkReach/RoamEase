'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { onAuthStateChanged } from '@/services/auth';
import { User } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateCountryGuide } from '@/app/actions';
import type { GenerateCountryGuideOutput } from '@/ai/flows/country-guide-generator';
import { AlertCircle, Pin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CountryGuide extends GenerateCountryGuideOutput {
  country: string;
}

const countries = [
  'France', 'Japan', 'Brazil', 'Egypt', 'Australia', 'Canada', 'Italy', 'India', 'Spain'
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [guides, setGuides] = useState<CountryGuide[]>([]);
  const [guidesLoading, setGuidesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (user) {
      const fetchGuides = async () => {
        setGuidesLoading(true);
        setError(null);
        try {
          // In a real app, you might want to fetch a subset or cache this.
          // Fetching all 9 every time can be slow.
          const guidePromises = countries.map(country => 
            generateCountryGuide({ country }).then(guide => ({ ...guide, country }))
          );
          const results = await Promise.all(guidePromises);
          setGuides(results);
        } catch (err) {
            if (err instanceof Error) {
                setError(`Failed to fetch travel guides. ${err.message}`);
            } else {
                setError('An unknown error occurred while fetching travel guides.');
            }
        } finally {
          setGuidesLoading(false);
        }
      };
      fetchGuides();
    }
  }, [user]);
  
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-80 mt-2" />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Welcome back, Wanderer!</h1>
        <p className="text-muted-foreground">Get inspired for your next adventure. Here are some popular destinations.</p>
      </div>

        {error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidesLoading ? (
             [...Array(9)].map((_, i) => (
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
            ))
        ) : (
            guides.map((guide) => (
                <Link href={`/destinations/${guide.country.toLowerCase().replace(/ /g, '-')}`} key={guide.country}>
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full cursor-pointer">
                        <Image
                            src={`https://placehold.co/600x400.png`}
                            alt={`A scenic view of ${guide.country}`}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover"
                            data-ai-hint={guide.imageHint.toLowerCase()}
                        />
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{guide.country}</CardTitle>
                            <CardDescription className="text-foreground/90 h-20 overflow-hidden">{guide.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <h4 className="font-semibold mb-2 flex items-center gap-2"><Pin className="h-4 w-4 text-primary" /> Must-see Attractions</h4>
                            <div className="flex flex-wrap gap-2">
                                {guide.attractions.map(attraction => (
                                    <Badge key={attraction.name} variant="secondary">{attraction.name}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))
        )}
      </div>
    </div>
  );
}