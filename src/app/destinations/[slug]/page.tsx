'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@/services/auth';
import { User } from 'firebase/auth';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Landmark, CheckCircle2, AlertCircle } from 'lucide-react';
import { generateCountryGuide } from '@/app/actions';
import type { GenerateCountryGuideOutput } from '@/ai/flows/country-guide-generator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DestinationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [guide, setGuide] = useState<GenerateCountryGuideOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const slug = params.slug as string;
  const destinationName = slug
    ? slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Destination';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user && destinationName !== 'Destination') {
      const fetchGuide = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await generateCountryGuide({ country: destinationName });
          setGuide(result);
        } catch (e: any) {
          setError(e.message || 'An unknown error occurred while fetching the destination guide.');
        } finally {
          setLoading(false);
        }
      };
      fetchGuide();
    }
  }, [user, destinationName]);

  if (loading || !guide) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-64 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <div className="space-y-8">
             <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Button>
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Failed to load destination</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-4xl font-headline font-bold text-foreground">{destinationName}</h1>
      </div>

      <div className="space-y-12">
        <Card className="overflow-hidden shadow-lg border-0">
            <Image
                src={`https://placehold.co/1200x400.png`}
                alt={`Scenic view of ${destinationName}`}
                width={1200}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
                data-ai-hint={guide.imageHint.toLowerCase()}
            />
            <CardContent className="p-0 pt-6">
                <p className="text-foreground/90 leading-relaxed">{guide.description}</p>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-3xl font-headline font-bold text-foreground flex items-center gap-3 mb-6">
                <Landmark className="h-8 w-8 text-primary" />
                Top Attractions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guide.attractions.map(attraction => (
                    <Card key={attraction.name} className="flex flex-col">
                        <Image
                            src={`https://placehold.co/600x400.png`}
                            alt={`View of ${attraction.name}`}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover rounded-t-lg"
                            data-ai-hint={attraction.imageHint.toLowerCase()}
                        />
                         <CardHeader>
                            <CardTitle className="font-headline text-xl">{attraction.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <p className="text-sm text-muted-foreground">{attraction.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        <div>
             <h2 className="text-3xl font-headline font-bold text-foreground flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-8 w-8 text-accent" />
                What to Do
            </h2>
            <Card>
                <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {guide.whatToDo.map(activity => (
                        <div key={activity} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <p className="font-medium">{activity}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}