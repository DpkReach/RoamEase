'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Building, Waves, Mountain, AlertTriangle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useRouter } from 'next/navigation';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.5rem',
};

const center = {
  lat: 20,
  lng: 15
};

const destinations = [
    { name: 'Paris, France', position: { lat: 48.8566, lng: 2.3522 }, hint: 'Eiffel tower' },
    { name: 'Nice, France', position: { lat: 43.7102, lng: 7.2620 }, hint: 'promenade beach' },
    { name: 'Lyon, France', position: { lat: 45.7640, lng: 4.8357 }, hint: 'old town' },
    { name: 'Kyoto, Japan', position: { lat: 35.0116, lng: 135.7681 }, hint: 'temple shrine' },
    { name: 'Tokyo, Japan', position: { lat: 35.6895, lng: 139.6917 }, hint: 'city skyline' },
    { name: 'Osaka, Japan', position: { lat: 34.6937, lng: 135.5023 }, hint: 'castle food' },
    { name: 'Giza, Egypt', position: { lat: 29.9792, lng: 31.1342 }, hint: 'great pyramids' },
    { name: 'Luxor, Egypt', position: { lat: 25.6872, lng: 32.6396 }, hint: 'ancient temples' },
    { name: 'Alexandria, Egypt', position: { lat: 31.2001, lng: 29.9187 }, hint: 'library lighthouse' },
    { name: 'Rio de Janeiro, Brazil', position: { lat: -22.9068, lng: -43.1729 }, hint: 'Christ Redeemer' },
    { name: 'São Paulo, Brazil', position: { lat: -23.5505, lng: -46.6333 }, hint: 'metropolis art' },
    { name: 'Salvador, Brazil', position: { lat: -12.9777, lng: -38.5016 }, hint: 'colonial architecture' },
    { name: 'Sydney, Australia', position: { lat: -33.8688, lng: 151.2093 }, hint: 'opera house' },
    { name: 'Melbourne, Australia', position: { lat: -37.8136, lng: 144.9631 }, hint: 'laneway coffee' },
    { name: 'Brisbane, Australia', position: { lat: -27.4705, lng: 153.0260 }, hint: 'river city' },
    { name: 'New York, USA', position: { lat: 40.7128, lng: -74.0060 }, hint: 'Statue Liberty' },
    { name: 'Los Angeles, USA', position: { lat: 34.0522, lng: -118.2437 }, hint: 'Hollywood sign' },
    { name: 'Chicago, USA', position: { lat: 41.8781, lng: -87.6298 }, hint: 'bean sculpture' },
    { name: 'Agra, India', position: { lat: 27.1751, lng: 78.0421 }, hint: 'Taj Mahal' },
    { name: 'Mumbai, India', position: { lat: 19.0760, lng: 72.8777 }, hint: 'Gateway India' },
    { name: 'Jaipur, India', position: { lat: 26.9124, lng: 75.7873 }, hint: 'pink palace' },
    { name: 'Beijing, China', position: { lat: 39.9042, lng: 116.4074 }, hint: 'Forbidden City' },
    { name: 'Shanghai, China', position: { lat: 31.2304, lng: 121.4737 }, hint: 'skyline Bund' },
    { name: 'Xi\'an, China', position: { lat: 34.3416, lng: 108.9398 }, hint: 'terracotta army' },
    { name: 'Rome, Italy', position: { lat: 41.9028, lng: 12.4964 }, hint: 'Colosseum ruins' },
    { name: 'Florence, Italy', position: { lat: 43.7696, lng: 11.2558 }, hint: 'renaissance art' },
    { name: 'Venice, Italy', position: { lat: 45.4408, lng: 12.3155 }, hint: 'gondola canals' },
    { name: 'Madrid, Spain', position: { lat: 40.4168, lng: -3.7038 }, hint: 'royal palace' },
    { name: 'Barcelona, Spain', position: { lat: 41.3851, lng: 2.1734 }, hint: 'Sagrada Familia' },
    { name: 'Seville, Spain', position: { lat: 37.3891, lng: -5.9845 }, hint: 'flamenco dance' },
    { name: 'Toronto, Canada', position: { lat: 43.6532, lng: -79.3832 }, hint: 'CN Tower' },
    { name: 'Vancouver, Canada', position: { lat: 49.2827, lng: -123.1207 }, hint: 'mountain ocean' },
    { name: 'Montreal, Canada', position: { lat: 45.5017, lng: -73.5673 }, hint: 'old city' },
    { name: 'London, UK', position: { lat: 51.5074, lng: -0.1278 }, hint: 'Big Ben' },
    { name: 'Edinburgh, UK', position: { lat: 55.9533, lng: -3.1883 }, hint: 'historic castle' },
    { name: 'Manchester, UK', position: { lat: 53.4808, lng: -2.2426 }, hint: 'industrial city' },
    { name: 'Cape Town, South Africa', position: { lat: -33.9249, lng: 18.4241 }, hint: 'Table Mountain' },
    { name: 'Johannesburg, South Africa', position: { lat: -26.2041, lng: 28.0473 }, hint: 'city gold' },
    { name: 'Durban, South Africa', position: { lat: -29.8587, lng: 31.0218 }, hint: 'beachfront promenade' },
    { name: 'Buenos Aires, Argentina', position: { lat: -34.6037, lng: -58.3816 }, hint: 'tango dance' },
    { name: 'Mendoza, Argentina', position: { lat: -32.8895, lng: -68.8458 }, hint: 'wine vineyards' },
    { name: 'Bariloche, Argentina', position: { lat: -41.1335, lng: -71.3103 }, hint: 'lakes mountains' },
    { name: 'Bangkok, Thailand', position: { lat: 13.7563, lng: 100.5018 }, hint: 'temples markets' },
    { name: 'Chiang Mai, Thailand', position: { lat: 18.7883, lng: 98.9853 }, hint: 'elephants temples' },
    { name: 'Phuket, Thailand', position: { lat: 7.8804, lng: 98.3923 }, hint: 'tropical beaches' },
    { name: 'Machu Picchu, Peru', position: { lat: -13.1631, lng: -72.5450 }, hint: 'inca citadel' },
    { name: 'Cusco, Peru', position: { lat: -13.5319, lng: -71.9675 }, hint: 'inca capital' },
    { name: 'Chichen Itza, Mexico', position: { lat: 20.6843, lng: -88.5678 }, hint: 'mayan pyramid' },
    { name: 'Cancun, Mexico', position: { lat: 21.1619, lng: -86.8515 }, hint: 'beaches ruins' },
    { name: 'Petra, Jordan', position: { lat: 30.3285, lng: 35.4444 }, hint: 'rose city' },
    { name: 'Wadi Rum, Jordan', position: { lat: 29.5733, lng: 35.4214 }, hint: 'desert landscape' },
];

export default function DestinationMap() {
  const router = useRouter();
  const [budget, setBudget] = useState(5000);
  const [selected, setSelected] = useState<(typeof destinations[0] | null)>(null);

  const mapOptions = useMemo(() => ({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  }), []);

  const { isLoaded, loadError } = useJsApiLoader(mapOptions);

  const handleExplore = (destinationName: string) => {
    const slug = destinationName.toLowerCase().replace(/, /g, '-').replace(/ /g, '-');
    router.push(`/destinations/${slug}`);
  };

  return (
    <Card className="w-full shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline">Interactive Destination Map</CardTitle>
        <CardDescription>Filter and explore destinations around the globe.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 border rounded-lg bg-secondary/50 items-end">
          <div className="space-y-2">
            <Label htmlFor="interest">Interest</Label>
            <Select>
              <SelectTrigger id="interest" className="bg-background">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="beach"><Waves className="inline-block mr-2 h-4 w-4" />Beaches</SelectItem>
                <SelectItem value="mountains"><Mountain className="inline-block mr-2 h-4 w-4" />Mountains</SelectItem>
                <SelectItem value="city"><Building className="inline-block mr-2 h-4 w-4" />City Breaks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="budget">Budget: ${budget.toLocaleString()}</Label>
            <Slider
              id="budget"
              defaultValue={[budget]}
              max={10000}
              step={100}
              onValueChange={(value) => setBudget(value[0])}
              className="pt-2"
            />
          </div>
          <div>
            <Button className="w-full">Search</Button>
          </div>
        </div>
        <div className="relative w-full rounded-lg overflow-hidden border bg-background" style={{ height: containerStyle.height }}>
          {loadError && (
             <Alert variant="destructive" className="h-full">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Map Error</AlertTitle>
                <AlertDescription>
                  There was an error loading the map. Please check the API key and try again.
                </AlertDescription>
            </Alert>
          )}
          {!isLoaded && !loadError && <Skeleton className="h-full w-full" />}
          {isLoaded && !loadError && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={2}
              options={{ disableDefaultUI: true, zoomControl: true, minZoom: 2, maxZoom: 15 }}
            >
              {destinations.map((dest) => (
                <Marker
                  key={dest.name}
                  position={dest.position}
                  onClick={() => {
                    setSelected(dest);
                  }}
                  icon={{
                    path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
                    fillColor: 'hsl(var(--primary))',
                    fillOpacity: 0.9,
                    strokeColor: 'hsl(var(--primary-foreground))',
                    strokeWeight: 2,
                    scale: 0.5,
                  }}
                />
              ))}

              {selected ? (
                <InfoWindow
                  position={selected.position}
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                >
                  <div className="space-y-3 p-2 w-60">
                    <h4 className="font-semibold font-headline">{selected.name}</h4>
                    <Image src={`https://placehold.co/200x100.png`} alt={selected.name} width={200} height={100} className="rounded-md border" data-ai-hint={selected.hint} />
                    <p className="text-sm text-muted-foreground">Discover the beauty and culture of {selected.name}.</p>
                    <Button size="sm" className="w-full" onClick={() => handleExplore(selected.name)}>Explore Destination</Button>
                  </div>
                </InfoWindow>
              ) : null}
            </GoogleMap>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
