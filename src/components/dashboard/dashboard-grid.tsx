import Image from 'next/image';
import Link from 'next/link';
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
  'France', 'Japan', 'Brazil'
];

export default async function DashboardGrid() {
  let guides: CountryGuide[] = [];
  let error: string | null = null;

  try {
    const guidePromises = countries.map(country => 
      generateCountryGuide({ country }).then(guide => ({ ...guide, country }))
    );
    guides = await Promise.all(guidePromises);
  } catch (err) {
    if (err instanceof Error) {
        error = `Failed to fetch travel guides. ${err.message}`;
    } else {
        error = 'An unknown error occurred while fetching travel guides.';
    }
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => (
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
      ))}
    </div>
  );
}
