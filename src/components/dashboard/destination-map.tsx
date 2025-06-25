'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Building, Waves, Mountain, Pin, AlertTriangle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.5rem',
};

const center = {
  lat: 20,
  lng: 15
};

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
];

const destinations = [
  { name: 'Paris, France', position: { lat: 48.8566, lng: 2.3522 }, hint: 'Eiffel tower' },
  { name: 'Kyoto, Japan', position: { lat: 35.0116, lng: 135.7681 }, hint: 'temple shrine' },
  { name: 'Cairo, Egypt', position: { lat: 30.0444, lng: 31.2357 }, hint: 'pyramids desert' },
  { name: 'Rio de Janeiro, Brazil', position: { lat: -22.9068, lng: -43.1729 }, hint: 'Christ Redeemer' },
  { name: 'Sydney, Australia', position: { lat: -33.8688, lng: 151.2093 }, hint: 'opera house' },
];

export default function DestinationMap() {
  const [budget, setBudget] = useState(5000);
  const [selected, setSelected] = useState<(typeof destinations[0] | null)>(null);

  const mapOptions = useMemo(() => ({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  }), []);

  const { isLoaded, loadError } = useJsApiLoader(mapOptions);

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
              zoom={3}
              options={{ styles: mapStyles, disableDefaultUI: true, zoomControl: true, minZoom: 2, maxZoom: 15 }}
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
                    <Button size="sm" className="w-full">Explore Destination</Button>
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
