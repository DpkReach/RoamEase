import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const staticGuides = [
  {
    country: 'France',
    description: 'Experience the romance of Paris, the lavender fields of Provence, and the exquisite wines of Bordeaux.',
    attractions: [
      { name: 'Eiffel Tower' },
      { name: 'Louvre Museum' },
      { name: 'Palace of Versailles' },
    ],
    imageHint: 'Eiffel Tower',
  },
  {
    country: 'Japan',
    description: 'A fascinating country where ancient traditions meet futuristic technology. Explore serene temples and bustling cityscapes.',
    attractions: [
      { name: 'Mount Fuji' },
      { name: 'Kinkaku-ji' },
      { name: 'Tokyo Skytree' },
    ],
    imageHint: 'Mount Fuji',
  },
  {
    country: 'Brazil',
    description: 'Home to the vibrant Carnival, the vast Amazon rainforest, and the iconic Christ the Redeemer statue.',
    attractions: [
      { name: 'Christ the Redeemer' },
      { name: 'Iguazu Falls' },
      { name: 'Sugarloaf Mountain' },
    ],
    imageHint: 'Christ Redeemer',
  },
];


export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staticGuides.map((guide) => (
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
