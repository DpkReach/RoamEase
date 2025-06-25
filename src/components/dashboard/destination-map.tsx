'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Building, Waves, Mountain, Pin } from 'lucide-react';
import { useState } from 'react';

const destinations = [
  { name: 'Paris, France', position: { top: '35%', left: '48%' }, hint: 'Eiffel tower' },
  { name: 'Kyoto, Japan', position: { top: '42%', left: '85%' }, hint: 'temple shrine' },
  { name: 'Cairo, Egypt', position: { top: '52%', left: '55%' }, hint: 'pyramids desert' },
  { name: 'Rio de Janeiro, Brazil', position: { top: '80%', left: '30%' }, hint: 'Christ Redeemer' },
  { name: 'Sydney, Australia', position: { top: '85%', left: '88%' }, hint: 'opera house' },
];

export default function DestinationMap() {
  const [budget, setBudget] = useState(5000);

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
        <div className="relative w-full h-[35rem] rounded-lg overflow-hidden border bg-background">
          <Image
            src="https://placehold.co/1200x700/EBF5FB/888888.png"
            alt="World Map"
            layout="fill"
            objectFit="cover"
            data-ai-hint="stylized world map"
            className="opacity-70"
          />
          {destinations.map((dest) => (
            <Popover key={dest.name}>
              <PopoverTrigger asChild>
                <button
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-125"
                  style={{ top: dest.position.top, left: dest.position.left }}
                  aria-label={`Location marker for ${dest.name}`}
                >
                  <Pin className="h-8 w-8 text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" fill="currentColor" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="space-y-3">
                  <h4 className="font-semibold font-headline">{dest.name}</h4>
                  <Image src={`https://placehold.co/200x100.png`} alt={dest.name} width={200} height={100} className="rounded-md border" data-ai-hint={dest.hint} />
                  <p className="text-sm text-muted-foreground">Discover the beauty and culture of {dest.name}.</p>
                  <Button size="sm" className="w-full">Explore Destination</Button>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
