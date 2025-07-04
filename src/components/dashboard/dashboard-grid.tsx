import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const staticGuides = [
  {
    country: 'France',
    slug: 'france',
    description: 'Experience the romance of Paris, the lavender fields of Provence, and the exquisite wines of Bordeaux.',
    attractions: [ { name: 'Eiffel Tower' }, { name: 'Louvre Museum' }, { name: 'Palace of Versailles' } ],
    imageHint: 'Eiffel Tower',
  },
  {
    country: 'Japan',
    slug: 'japan',
    description: 'A fascinating country where ancient traditions meet futuristic technology. Explore serene temples and bustling cityscapes.',
    attractions: [ { name: 'Mount Fuji' }, { name: 'Kinkaku-ji' }, { name: 'Tokyo Skytree' } ],
    imageHint: 'Mount Fuji',
  },
  {
    country: 'Brazil',
    slug: 'brazil',
    description: 'Home to the vibrant Carnival, the vast Amazon rainforest, and the iconic Christ the Redeemer statue.',
    attractions: [ { name: 'Christ the Redeemer' }, { name: 'Iguazu Falls' }, { name: 'Sugarloaf Mountain' } ],
    imageHint: 'Christ Redeemer',
  },
  {
    country: 'Italy',
    slug: 'italy',
    description: 'Explore ancient Roman ruins, marvel at Renaissance art, and indulge in world-famous cuisine.',
    attractions: [ { name: 'Colosseum' }, { name: 'Canals of Venice' }, { name: 'Florence Cathedral' } ],
    imageHint: 'Colosseum Rome',
  },
  {
    country: 'India',
    slug: 'india',
    description: 'A land of vibrant cultures, ancient traditions, and architectural marvels like the iconic Taj Mahal.',
    attractions: [ { name: 'Taj Mahal' }, { name: 'Amber Palace' }, { name: 'Qutub Minar' } ],
    imageHint: 'Taj Mahal',
  },
  {
    country: 'China',
    slug: 'china',
    description: 'Discover the epic scale of the Great Wall, the history of the Forbidden City, and futuristic cityscapes.',
    attractions: [ { name: 'Great Wall' }, { name: 'Forbidden City' }, { name: 'Terracotta Army' } ],
    imageHint: 'Great Wall',
  },
  {
    country: 'Peru',
    slug: 'peru',
    description: 'Journey to the heart of the Inca Empire, from the mystical heights of Machu Picchu to the historic city of Cusco.',
    attractions: [ { name: 'Machu Picchu' }, { name: 'Sacred Valley' }, { name: 'Cusco Cathedral' } ],
    imageHint: 'Machu Picchu',
  },
  {
    country: 'Mexico',
    slug: 'mexico',
    description: 'Uncover ancient Mayan ruins at Chichen Itza, relax on pristine beaches, and enjoy vibrant local culture.',
    attractions: [ { name: 'Chichen Itza' }, { name: 'Tulum Ruins' }, { name: 'Palenque' } ],
    imageHint: 'Chichen Itza',
  },
  {
    country: 'Jordan',
    slug: 'jordan',
    description: 'Witness the ancient city of Petra, carved into rose-red cliffs, and float in the buoyant Dead Sea.',
    attractions: [ { name: 'Petra' }, { name: 'Wadi Rum' }, { name: 'Dead Sea' } ],
    imageHint: 'Petra Jordan',
  },
  {
    country: 'Egypt',
    slug: 'egypt',
    description: 'Stand in awe of the Great Pyramids of Giza, the last surviving wonder of the ancient world.',
    attractions: [ { name: 'Pyramids of Giza' }, { name: 'Valley of the Kings' }, { name: 'Karnak Temple' } ],
    imageHint: 'Pyramids Giza',
  },
  {
    country: 'Great Wall of China',
    slug: 'great-wall-of-china',
    description: 'One of the most iconic man-made structures, stretching thousands of miles across northern China.',
    attractions: [ { name: 'Mutianyu' }, { name: 'Jinshanling' }, { name: 'Badaling' } ],
    imageHint: 'Great Wall'
  },
  {
    country: 'Petra',
    slug: 'petra',
    description: 'The ancient "Rose City" carved into rock, a testament to the ingenuity of the Nabataeans.',
    attractions: [ { name: 'The Treasury' }, { name: 'The Monastery' }, { name: 'The Siq' } ],
    imageHint: 'Petra Jordan'
  },
  {
    country: 'Christ the Redeemer',
    slug: 'christ-the-redeemer',
    description: 'This colossal statue of Jesus Christ overlooks Rio de Janeiro from the summit of Mount Corcovado.',
    attractions: [ { name: 'Statue Viewpoint' }, { name: 'Corcovado Train' }, { name: 'Tijuca National Park' } ],
    imageHint: 'Christ Redeemer'
  },
  {
    country: 'Machu Picchu',
    slug: 'machu-picchu',
    description: 'An Incan citadel set high in the Andes Mountains in Peru, renowned for its sophisticated dry-stone walls.',
    attractions: [ { name: 'Intihuatana' }, { name: 'Temple of the Sun' }, { name: 'Huayna Picchu' } ],
    imageHint: 'Machu Picchu'
  },
  {
    country: 'Colosseum',
    slug: 'colosseum',
    description: 'The largest ancient amphitheater ever built, an iconic symbol of Imperial Rome.',
    attractions: [ { name: 'Arena Floor' }, { name: 'Underground Tunnels' }, { name: 'Roman Forum' } ],
    imageHint: 'Colosseum Rome'
  },
  {
    country: 'Chichen Itza',
    slug: 'chichen-itza',
    description: 'A massive pre-Columbian city built by the Maya people, a focal point in the Northern Maya Lowlands.',
    attractions: [ { name: 'El Castillo' }, { name: 'Great Ball Court' }, { name: 'Temple of the Warriors' } ],
    imageHint: 'Chichen Itza'
  },
  {
    country: 'Taj Mahal',
    slug: 'taj-mahal',
    description: 'An immense mausoleum of white marble, built in Agra by Mughal emperor Shah Jahan in memory of his favorite wife.',
    attractions: [ { name: 'Main Mausoleum' }, { name: 'Reflecting Pool' }, { name: 'Gardens of Paradise' } ],
    imageHint: 'Taj Mahal'
  },
];


export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staticGuides.map((guide) => (
        <Link href={`/destinations/${guide.slug}`} key={guide.slug}>
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full cursor-pointer">
            <Image
              src={`https://source.unsplash.com/featured/600x400/?${guide.imageHint.toLowerCase().replace(/ /g, ',')}`}
              alt={`A scenic view of ${guide.country}`}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
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
