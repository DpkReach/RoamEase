'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Wand2, Loader2, CheckSquare } from 'lucide-react';
import { generatePackingList as generatePackingListAction } from '@/app/packing-list/actions';
import { Checkbox } from '../ui/checkbox';

const formSchema = z.object({
  destination: z.string().min(2, { message: 'Destination must be at least 2 characters.' }),
  dates: z.object({
    from: z.date({ required_error: 'A start date is required.' }),
    to: z.date({ required_error: 'An end date is required.' }),
  }),
  preferences: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PackingListGenerator() {
  const [loading, setLoading] = useState(false);
  const [packingList, setPackingList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: '',
      preferences: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setError(null);
    setPackingList([]);

    const input = {
      destination: values.destination,
      startDate: format(values.dates.from, 'yyyy-MM-dd'),
      endDate: format(values.dates.to, 'yyyy-MM-dd'),
      preferences: values.preferences,
    };

    try {
      const result = await generatePackingListAction(input);
      if (result && result.packingList) {
        setPackingList(result.packingList);
      } else {
        setError('Failed to generate packing list. The result was empty.');
      }
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <Card className="lg:col-span-1 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Trip Details</CardTitle>
          <CardDescription>Provide details about your upcoming trip.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paris, France" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dates"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Travel Dates</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value?.from && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y')} - {format(field.value.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Pick your dates</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={{ from: field.value?.from, to: field.value?.to }}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferences & Activities</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Hiking, fine dining, visiting museums"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate List
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 shadow-lg min-h-[30rem]">
        <CardHeader>
          <CardTitle className="font-headline">Your Packing List</CardTitle>
          <CardDescription>Here's what our AI suggests you pack for your trip.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex flex-col items-center justify-center pt-10">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Generating your personalized list...</p>
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {packingList.length > 0 && (
            <ul className="space-y-3">
              {packingList.map((item, index) => (
                <li key={index} className="flex items-center gap-3 p-2 rounded-md bg-secondary/50 animate-in fade-in-50">
                  <Checkbox id={`item-${index}`} />
                  <label htmlFor={`item-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{item}</label>
                </li>
              ))}
            </ul>
          )}
          {!loading && !error && packingList.length === 0 && (
            <div className="flex flex-col items-center justify-center pt-10 text-center">
                <CheckSquare className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">Your packing list will appear here.</p>
            </div>
          )}
        </CardContent>
        {packingList.length > 0 && (
          <CardFooter>
            <Button variant="outline" className="w-full">Export as PDF</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
