'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Building, Waves, Mountain, DollarSign, Pin } from 'lucide-react';

const destinations = [
  { name: 'Paris, France', position: { top: '35%', left: '48%' }, hint: 'Eiffel tower' },
  { name: 'Kyoto, Japan', position: { top: '42%', left: '85%' }, hint: 'temple shrine' },
  { name: 'Cairo, Egypt', position: { top: '52%', left: '55%' }, hint: 'pyramids desert' },
  { name: 'Rio de Janeiro, Brazil', position: { top: '80%', left: '30%' }, hint: 'Christ Redeemer' },
  { name: 'Sydney, Australia', position: { top: '85%', left: '88%' }, hint: 'opera house' },
];

export default function DestinationMap() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Interactive Destination Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="interest">Interest</Label>
            <Select>
              <SelectTrigger id="interest">
                <SelectValue placeholder="Select interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beach"><Waves className="inline-block mr-2 h-4 w-4" />Beaches</SelectItem>
                <SelectItem value="mountains"><Mountain className="inline-block mr-2 h-4 w-4" />Mountains</SelectItem>
                <SelectItem value="city"><Building className="inline-block mr-2 h-4 w-4" />City Breaks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="budget">Budget</Label>
            <div className="flex items-center gap-4 pt-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <Slider defaultValue={[5000]} max={10000} step={100} />
              <span className="font-semibold w-24 text-right">$5,000</span>
            </div>
          </div>
          <div className="flex items-end">
            <Button className="w-full">Search</Button>
          </div>
        </div>
        <div className="relative w-full h-[30rem] rounded-lg overflow-hidden border">
          <Image
            src="https://placehold.co/1200x600/EBF5FB/333333.png"
            alt="World Map"
            layout="fill"
            objectFit="cover"
            data-ai-hint="world map"
          />
          {destinations.map((dest) => (
            <Popover key={dest.name}>
              <PopoverTrigger asChild>
                <button
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ top: dest.position.top, left: dest.position.left }}
                  aria-label={`Location marker for ${dest.name}`}
                >
                  <Pin className="h-8 w-8 text-primary drop-shadow-lg hover:text-accent transition-colors animate-bounce" fill="currentColor" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="space-y-2">
                  <h4 className="font-semibold font-headline">{dest.name}</h4>
                  <p className="text-sm text-muted-foreground">Discover the beauty of {dest.name}.</p>
                  <Image src={`https://placehold.co/200x100.png`} alt={dest.name} width={200} height={100} className="rounded-md" data-ai-hint={dest.hint} />
                  <Button size="sm" className="w-full">Explore</Button>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
