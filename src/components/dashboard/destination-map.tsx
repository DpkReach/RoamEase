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
    { name: 'Paris, France', position: { lat: 48.8566, lng: 2.3522 }, hint: 'Eiffel tower', slug: 'france' },
    { name: 'Kyoto, Japan', position: { lat: 35.0116, lng: 135.7681 }, hint: 'temple shrine', slug: 'japan' },
    { name: 'Giza, Egypt', position: { lat: 29.9792, lng: 31.1342 }, hint: 'great pyramids', slug: 'egypt' },
    { name: 'Rio de Janeiro, Brazil', position: { lat: -22.9068, lng: -43.1729 }, hint: 'Christ Redeemer', slug: 'brazil' },
    { name: 'Agra, India', position: { lat: 27.1751, lng: 78.0421 }, hint: 'Taj Mahal', slug: 'india' },
    { name: 'Beijing, China', position: { lat: 39.9042, lng: 116.4074 }, hint: 'Forbidden City', slug: 'china' },
    { name: 'Rome, Italy', position: { lat: 41.9028, lng: 12.4964 }, hint: 'Colosseum ruins', slug: 'italy' },
    { name: 'Cusco, Peru', position: { lat: -13.5319, lng: -71.9675 }, hint: 'inca capital', slug: 'peru' },
    { name: 'Cancun, Mexico', position: { lat: 21.1619, lng: -86.8515 }, hint: 'beaches ruins', slug: 'mexico' },
    { name: 'Amman, Jordan', position: { lat: 31.9454, lng: 35.9284 }, hint: 'roman theater', slug: 'jordan' },
    { name: 'Great Wall of China, China', position: { lat: 40.4319, lng: 116.5704 }, hint: 'Great Wall', slug: 'great-wall-of-china' },
    { name: 'Petra, Jordan', position: { lat: 30.3285, lng: 35.4444 }, hint: 'rose city', slug: 'petra' },
    { name: 'Machu Picchu, Peru', position: { lat: -13.1631, lng: -72.5450 }, hint: 'inca citadel', slug: 'machu-picchu' },
    { name: 'Chichen Itza, Mexico', position: { lat: 20.6843, lng: -88.5678 }, hint: 'mayan pyramid', slug: 'chichen-itza' },
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

  const handleExplore = (destinationSlug: string) => {
    if (destinationSlug) {
      router.push(`/destinations/${destinationSlug}`);
    }
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
                    <Image src={`https://source.unsplash.com/random/200x100/?${selected.hint.toLowerCase().replace(/ /g, ',')}`} alt={selected.name} width={200} height={100} className="rounded-md border" />
                    <p className="text-sm text-muted-foreground">Discover the beauty and culture of {selected.name.split(',')[0]}.</p>
                    <Button size="sm" className="w-full" onClick={() => handleExplore(selected.slug)}>Explore Destination</Button>
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
