'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Landmark, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type DetailedAttraction = {
  name: string;
  description: string;
  imageHint: string;
};

type CountryGuide = {
  country: string;
  description: string;
  attractions: DetailedAttraction[];
  whatToDo: string[];
  imageHint: string;
};

const staticGuidesDetails: CountryGuide[] = [
  {
    country: 'France',
    description: 'Experience the romance of Paris, the lavender fields of Provence, and the exquisite wines of Bordeaux. France is a country that has it all, from iconic landmarks to charming villages.',
    attractions: [
      { name: 'Eiffel Tower', description: 'The most iconic landmark in Paris, offering breathtaking views of the city. A symbol of French culture and a must-visit for any traveler.', imageHint: 'Eiffel Tower' },
      { name: 'Louvre Museum', description: "Home to thousands of works of art, including the Mona Lisa and the Venus de Milo. It is the world's largest art museum and a historic monument.", imageHint: 'Louvre Museum' },
      { name: 'Palace of Versailles', description: 'A former royal residence built by King Louis XIV. Explore the opulent Hall of Mirrors, the vast gardens, and the Grand Trianon.', imageHint: 'Palace Versailles' },
    ],
    whatToDo: [
      'Indulge in a croissant from a local patisserie',
      'Take a scenic boat tour on the Seine River',
      'Explore the charming streets of Montmartre',
      'Go wine tasting in the Bordeaux region'
    ],
    imageHint: 'Eiffel Tower',
  },
  {
    country: 'Japan',
    description: 'A fascinating country where ancient traditions meet futuristic technology. Explore serene temples, bustling cityscapes, and stunning natural landscapes.',
    attractions: [
      { name: 'Mount Fuji', description: "Japan's highest mountain and an active volcano. It's a symbol of the country and offers stunning views, especially during sunrise.", imageHint: 'Mount Fuji' },
      { name: 'Kinkaku-ji', description: 'A stunning Zen Buddhist temple in Kyoto, also known as the Golden Pavilion. Its top two floors are completely covered in gold leaf.', imageHint: 'Kinkaku-ji temple' },
      { name: 'Tokyo Skytree', description: 'A broadcasting and observation tower in Sumida, Tokyo. It is the tallest structure in Japan and offers panoramic views of the city.', imageHint: 'Tokyo Skytree' },
    ],
    whatToDo: [
      'Experience a traditional tea ceremony',
      'Ride the Shinkansen (bullet train)',
      'Visit the historic temples of Kyoto',
      'Enjoy fresh sushi at Tsukiji Fish Market'
    ],
    imageHint: 'Mount Fuji',
  },
  {
    country: 'Brazil',
    description: 'Home to the vibrant Carnival, the vast Amazon rainforest, and the iconic Christ the Redeemer statue. Brazil is a country of immense natural beauty and cultural diversity.',
    attractions: [
      { name: 'Christ the Redeemer', description: 'An Art Deco statue of Jesus Christ in Rio de Janeiro, located at the peak of Corcovado mountain. It offers spectacular views of the city.', imageHint: 'Christ Redeemer' },
      { name: 'Iguazu Falls', description: 'A magnificent waterfall system on the border of Brazil and Argentina. It is one of the largest and most impressive waterfalls in the world.', imageHint: 'Iguazu Falls' },
      { name: 'Sugarloaf Mountain', description: 'A peak situated in Rio de Janeiro, offering panoramic views of the city and its surrounding beaches, mountains, and forests.', imageHint: 'Sugarloaf Mountain' },
    ],
    whatToDo: [
      'Relax on the famous Copacabana beach',
      'Explore the Amazon rainforest on a guided tour',
      'Experience the energy of the Carnival in Rio',
      'Learn to dance samba'
    ],
    imageHint: 'Christ Redeemer',
  },
];

export default function DestinationDetailPage() {
  const router = useRouter();
  const params = useParams();
  
  const slug = params.slug as string;
  const guide = staticGuidesDetails.find(
    (g) => g.country.toLowerCase().replace(/ /g, '-') === slug
  );
  
  const destinationName = guide ? guide.country : slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (!guide) {
    return (
      <div className="space-y-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Destination Not Found</AlertTitle>
          <AlertDescription>
            The travel guide for "{destinationName}" is not available.
          </AlertDescription>
        </Alert>
      </div>
    );
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
