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
  slug: string;
  description: string;
  attractions: DetailedAttraction[];
  whatToDo: string[];
  imageHint: string;
};

const staticGuidesDetails: CountryGuide[] = [
  {
    country: 'France',
    slug: 'france',
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
    slug: 'japan',
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
    slug: 'brazil',
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
    slug: 'italy',
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
    slug: 'india',
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
    slug: 'china',
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
    slug: 'peru',
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
    slug: 'mexico',
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
    slug: 'jordan',
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
    slug: 'egypt',
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
  {
    country: 'Great Wall of China',
    slug: 'great-wall-of-china',
    description: 'A series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups. It is the longest wall in the world.',
    attractions: [
      { name: 'Mutianyu', description: 'A well-preserved section of the Great Wall with magnificent views, less crowded than other sections.', imageHint: 'Mutianyu Great Wall' },
      { name: 'Jinshanling', description: 'Known for its stunning and diverse watchtowers, this section offers a challenging hike with breathtaking scenery.', imageHint: 'Jinshanling Great Wall' },
      { name: 'Badaling', description: 'The most visited section of the Great Wall, it was the first to be opened to the public and is highly accessible.', imageHint: 'Badaling Great Wall' }
    ],
    whatToDo: [
      'Hike along the wall for spectacular views',
      'Take a cable car or chairlift up',
      'Toboggan down from the wall',
      'Learn about its history at the Great Wall Museum'
    ],
    imageHint: 'Great Wall',
  },
  {
    country: 'Petra',
    slug: 'petra',
    description: 'This ancient city of red-rose stone, half-built, half-carved into the rock, is a breathtaking historical site and a testament to the ingenuity of the Nabataean civilization.',
    attractions: [
      { name: 'The Treasury (Al-Khazneh)', description: 'The iconic facade of Petra, famously featured in movies. It is believed to have been a mausoleum for a Nabataean king.', imageHint: 'Petra Treasury' },
      { name: 'The Monastery (Ad-Deir)', description: 'A massive structure carved out of a mountaintop, requiring a hike to reach but offering stunning views.', imageHint: 'Petra Monastery' },
      { name: 'The Siq', description: 'The narrow, winding canyon that serves as the dramatic entrance to the city of Petra, revealing the Treasury at its end.', imageHint: 'Petra Siq' }
    ],
    whatToDo: [
      'Hike to the High Place of Sacrifice',
      'Explore the Street of Facades',
      'Visit the Petra by Night show',
      'Discover the Great Temple'
    ],
    imageHint: 'Petra Jordan',
  },
  {
    country: 'Christ the Redeemer',
    slug: 'christ-the-redeemer',
    description: 'An Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil. The statue is a symbol of Christianity across the world and a cultural icon of both Rio de Janeiro and Brazil.',
    attractions: [
      { name: 'Statue Viewpoint', description: 'Stand at the feet of the colossal statue and enjoy panoramic views of Rio de Janeiro, including Sugarloaf Mountain and Copacabana beach.', imageHint: 'Christ Redeemer statue' },
      { name: 'Corcovado Train', description: 'A scenic cogwheel train ride that takes you through the Tijuca National Park to the summit of Corcovado Mountain.', imageHint: 'Corcovado train' },
      { name: 'Tijuca National Park', description: 'The urban rainforest surrounding Christ the Redeemer, offering hiking trails, waterfalls, and diverse wildlife.', imageHint: 'Tijuca rainforest' }
    ],
    whatToDo: [
      'Take a helicopter tour for an aerial view',
      'Visit the chapel at the base of the statue',
      'Hike one of the trails in Tijuca Forest',
      'Enjoy a coffee at the mountaintop cafe'
    ],
    imageHint: 'Christ Redeemer',
  },
  {
    country: 'Machu Picchu',
    slug: 'machu-picchu',
    description: 'This Incan citadel from the 15th century is perched high in the Andes Mountains of Peru. It is renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar.',
    attractions: [
      { name: 'Intihuatana Stone', description: 'A ritual stone associated with the astronomic clock or calendar of the Inca, a masterpiece of sacred geometry.', imageHint: 'Intihuatana stone' },
      { name: 'Temple of the Sun', description: 'A semi-circular temple built around a large granite rock, used for astronomical observations and religious ceremonies.', imageHint: 'Temple of Sun' },
      { name: 'Huayna Picchu', description: 'The steep mountain that rises over Machu Picchu, offering a challenging hike and breathtaking views of the ruins from above.', imageHint: 'Huayna Picchu' }
    ],
    whatToDo: [
      'Watch the sunrise over the ruins',
      'Hike to the Sun Gate (Inti Punku)',
      'Cross the Inca Bridge',
      'Get your passport stamped with a unique Machu Picchu stamp'
    ],
    imageHint: 'Machu Picchu',
  },
  {
    country: 'Colosseum',
    slug: 'colosseum',
    description: 'Located in the center of Rome, Italy, the Colosseum is the largest ancient amphitheater ever built. It is an iconic symbol of Imperial Rome and its gladiatorial contests.',
    attractions: [
      { name: 'The Arena Floor', description: 'Stand where gladiators once fought and get a unique perspective of the amphitheater\'s immense scale.', imageHint: 'Colosseum arena' },
      { name: 'The Underground (Hypogeum)', description: 'Explore the network of tunnels and chambers where gladiators and animals were held before contests.', imageHint: 'Colosseum underground' },
      { name: 'The Roman Forum', description: 'Adjacent to the Colosseum, this plaza was the center of day-to-day life in ancient Rome, surrounded by the ruins of important government buildings.', imageHint: 'Roman Forum' }
    ],
    whatToDo: [
      'Take a guided tour to learn its history',
      'Visit at night for a different perspective',
      'Climb Palatine Hill for views of the Forum and Colosseum',
      'Toss a coin in the nearby Trevi Fountain'
    ],
    imageHint: 'Colosseum Rome',
  },
  {
    country: 'Chichen Itza',
    slug: 'chichen-itza',
    description: 'A vast complex of Mayan ruins on Mexico\'s Yucatán Peninsula. A massive step-pyramid, known as El Castillo or Temple of Kukulcan, dominates the ancient city.',
    attractions: [
      { name: 'El Castillo (Temple of Kukulcan)', description: 'The iconic pyramid at the heart of Chichen Itza, engineered to align with the solar equinoxes.', imageHint: 'El Castillo pyramid' },
      { name: 'The Great Ball Court', description: 'The largest and best-preserved ancient ball court in the Americas, known for its remarkable acoustics.', imageHint: 'Chichen Itza ball court' },
      { name: 'The Sacred Cenote', description: 'A large natural well that was a site of pilgrimage for the ancient Maya people, who conducted sacrifices here.', imageHint: 'Sacred Cenote' }
    ],
    whatToDo: [
      'Witness the light-and-shadow serpent during the equinox',
      'Explore the Temple of the Warriors',
      'Swim in a nearby cenote like Ik Kil',
      'Visit the El Caracol observatory'
    ],
    imageHint: 'Chichen Itza',
  },
  {
    country: 'Taj Mahal',
    slug: 'taj-mahal',
    description: 'An immense mausoleum of ivory-white marble in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.',
    attractions: [
      { name: 'The Main Mausoleum', description: 'The central focus of the complex, featuring the iconic dome and minarets. Its white marble is inlaid with semi-precious stones.', imageHint: 'Taj Mahal mausoleum' },
      { name: 'The Reflecting Pool', description: 'The long water channel in front of the mausoleum that creates the famous, perfectly symmetrical reflection of the structure.', imageHint: 'Taj Mahal reflection' },
      { name: 'The Gardens of Paradise (Charbagh)', description: 'The beautiful Persian-style gardens that surround the mausoleum, symbolizing paradise.', imageHint: 'Taj Mahal garden' }
    ],
    whatToDo: [
      'Visit at sunrise or sunset for the best light',
      'Take a boat ride on the Yamuna River for a different view',
      'Explore the red sandstone mosque and guesthouse',
      'Visit the nearby Agra Fort'
    ],
    imageHint: 'Taj Mahal',
  },
];

export default function DestinationDetailPage() {
  const router = useRouter();
  const params = useParams();
  
  const slug = params.slug as string;
  const guide = staticGuidesDetails.find(
    (g) => g.slug === slug
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
                src="https://placehold.co/1200x400.png"
                data-ai-hint={guide.imageHint}
                alt={`Scenic view of ${destinationName}`}
                width={1200}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
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
                            src="https://placehold.co/600x400.png"
                            data-ai-hint={attraction.imageHint}
                            alt={`View of ${attraction.name}`}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover rounded-t-lg"
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
