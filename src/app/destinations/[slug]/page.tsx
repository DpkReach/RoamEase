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
  {
    country: 'Italy',
    description: 'From the ancient ruins of Rome to the rolling vineyards of Tuscany and the romantic canals of Venice, Italy offers a journey through history, art, and culinary excellence. It is a country that captivates the senses and inspires the soul.',
    attractions: [
      { name: 'Colosseum', description: 'The largest ancient amphitheatre ever built, this iconic symbol of Imperial Rome once hosted gladiatorial contests and public spectacles. A must-see for its historical significance and architectural grandeur.', imageHint: 'Colosseum Rome' },
      { name: 'Canals of Venice', description: "Explore the floating city's enchanting waterways by gondola. A unique experience of navigating through a network of canals, under historic bridges, and past stunning Venetian architecture.", imageHint: 'Venice canals' },
      { name: 'Florence Cathedral', description: 'Known as the Duomo, this masterpiece of Renaissance architecture dominates the Florence skyline. Climb Brunelleschi\'s dome for breathtaking panoramic views of the city.', imageHint: 'Florence Cathedral' },
    ],
    whatToDo: [
      'Eat authentic pizza in Naples',
      'Explore the ruins of Pompeii',
      'Drive along the Amalfi Coast',
      'Go wine tasting in Tuscany'
    ],
    imageHint: 'Colosseum Rome',
  },
  {
    country: 'India',
    description: 'A land of incredible diversity, from the snow-capped Himalayas to the tropical beaches of the south. India is a whirlwind for the senses, with vibrant festivals, spicy cuisine, and architectural wonders.',
    attractions: [
      { name: 'Taj Mahal', description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife. It is the jewel of Muslim art in India.", imageHint: 'Taj Mahal' },
      { name: 'Amber Palace', description: 'A magnificent fort-palace in Amer, Rajasthan. Known for its artistic Hindu style elements, it overlooks Maota Lake and offers a glimpse into the lavish lifestyle of the Rajput rulers.', imageHint: 'Amber Palace' },
      { name: 'Qutub Minar', description: 'A towering 73-meter-high minaret in Delhi, a UNESCO World Heritage Site. This victory tower is a stunning example of Indo-Islamic architecture with intricate carvings and verses.', imageHint: 'Qutub Minar' },
    ],
    whatToDo: [
      'Take a boat ride on the Ganges in Varanasi',
      'Explore the bustling markets of Delhi',
      'Relax on the beaches of Goa',
      'Experience a Bollywood movie in Mumbai'
    ],
    imageHint: 'Taj Mahal',
  },
  {
    country: 'China',
    description: 'A country of epic proportions, where ancient history and cutting-edge technology coexist. From the Great Wall to the Forbidden City, China offers a journey through millennia of dynasties and modern ambition.',
    attractions: [
      { name: 'Great Wall of China', description: "One of the most iconic man-made structures on Earth, this series of fortifications stretches for thousands of miles. Walk along a section to appreciate its scale and historical importance.", imageHint: 'Great Wall' },
      { name: 'Forbidden City', description: 'A vast palace complex in central Beijing that served as the home of emperors and their households for almost 500 years. It is a masterpiece of Chinese palatial architecture.', imageHint: 'Forbidden City' },
      { name: 'Terracotta Army', description: "A collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. It is a form of funerary art buried with the emperor to protect him in his afterlife.", imageHint: 'Terracotta Army' },
    ],
    whatToDo: [
      'Cruise the Li River in Guilin',
      'See the Giant Pandas in Chengdu',
      'Explore the modern skyline of Shanghai',
      'Visit the ancient city of Pingyao'
    ],
    imageHint: 'Great Wall',
  },
  {
    country: 'Peru',
    description: 'A country rich in archaeological heritage and biodiversity. Peru is home to the ancient Inca citadel of Machu Picchu, the mysterious Nazca Lines, and a portion of the vast Amazon rainforest.',
    attractions: [
      { name: 'Machu Picchu', description: 'An Incan citadel set high in the Andes Mountains. This UNESCO World Heritage site is renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, and its breathtaking panoramic views.', imageHint: 'Machu Picchu' },
      { name: 'Sacred Valley', description: "The heartland of the Inca Empire, this valley is home to numerous archaeological sites, traditional villages, and agricultural terraces. A perfect place to acclimate and explore Inca culture.", imageHint: 'Sacred Valley' },
      { name: 'Cusco Cathedral', description: "Located on the Plaza de Armas, this cathedral is a stunning example of colonial architecture, built on the foundations of an Inca palace and filled with historical art.", imageHint: 'Cusco Cathedral' },
    ],
    whatToDo: [
      'Hike the Inca Trail',
      'Fly over the Nazca Lines',
      'Explore the Amazon rainforest from Iquitos',
      'Taste ceviche in Lima'
    ],
    imageHint: 'Machu Picchu',
  },
  {
    country: 'Mexico',
    description: 'A land of contrasts, from sun-drenched beaches to dense jungles and ancient ruins. Mexico\'s rich history, vibrant culture, and delicious cuisine make it a captivating destination for all types of travelers.',
    attractions: [
      { name: 'Chichen Itza', description: 'A large pre-Columbian city built by the Maya people. The iconic step-pyramid known as El Castillo is a testament to the Maya\'s astronomical skills.', imageHint: 'Chichen Itza' },
      { name: 'Tulum Ruins', description: 'The ruins of a pre-Columbian Maya walled city overlooking the Caribbean Sea. It is one of the best-preserved coastal Maya sites and a popular spot for its stunning beach views.', imageHint: 'Tulum ruins' },
      { name: 'Palenque', description: 'A Maya city state in southern Mexico that flourished in the 7th century. The ruins are known for their exquisite sculpture, architecture, and hieroglyphic inscriptions.', imageHint: 'Palenque ruins' },
    ],
    whatToDo: [
      'Swim in a cenote in the Yucatán Peninsula',
      'Explore the colorful streets of Oaxaca',
      'Attend a Lucha Libre wrestling match',
      'Relax on the beaches of Cancun'
    ],
    imageHint: 'Chichen Itza',
  },
  {
    country: 'Jordan',
    description: 'A kingdom steeped in history, Jordan is home to the ancient Nabatean city of Petra, the vast desert landscapes of Wadi Rum, and the salty waters of the Dead Sea.',
    attractions: [
      { name: 'Petra', description: 'A famous archaeological site in Jordan\'s southwestern desert. Dating to around 300 B.C., it was the capital of the Nabatean Kingdom. Accessed via a narrow canyon called Al Siq, it contains tombs and temples carved into pink sandstone cliffs.', imageHint: 'Petra Jordan' },
      { name: 'Wadi Rum', description: 'A protected desert wilderness in southern Jordan. It features dramatic sandstone mountains, natural arches, and a landscape often used as a location for films set on Mars.', imageHint: 'Wadi Rum' },
      { name: 'Dead Sea', description: 'A salt lake whose banks are more than 400m below sea level, the lowest point on dry land. Its famously hypersaline water makes floating easy, and its mineral-rich black mud is used for therapeutic and cosmetic treatments.', imageHint: 'Dead Sea' },
    ],
    whatToDo: [
      'Explore the Roman ruins of Jerash',
      'Hike in the Dana Biosphere Reserve',
      'Visit the crusader castle at Kerak',
      'Experience Bedouin hospitality'
    ],
    imageHint: 'Petra Jordan',
  },
  {
    country: 'Egypt',
    description: 'The cradle of civilization, Egypt beckons with its mighty pyramids, ancient tombs, and the life-giving Nile River. A journey through Egypt is a journey through thousands of years of history.',
    attractions: [
      { name: 'Pyramids of Giza', description: 'The last surviving of the Seven Wonders of the Ancient World, these monumental tombs are a testament to the power and engineering prowess of the ancient Egyptian pharaohs.', imageHint: 'Pyramids Giza' },
      { name: 'Valley of the Kings', description: 'For nearly 500 years, this valley on the west bank of the Nile was used for royal burials. It contains the tombs of many pharaohs, including the famous tomb of Tutankhamun.', imageHint: 'Valley Kings' },
      { name: 'Karnak Temple', description: 'A vast complex of ruined temples, chapels, pylons, and other buildings near Luxor. It is the second-largest ancient religious site in the world, after Angkor Wat.', imageHint: 'Karnak Temple' },
    ],
    whatToDo: [
      'Cruise the Nile River from Luxor to Aswan',
      'Explore the bustling Khan el-Khalili bazaar in Cairo',
      'Dive in the Red Sea at Sharm El Sheikh',
      'Visit the Abu Simbel temples'
    ],
    imageHint: 'Pyramids Giza',
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
