'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, GripVertical, Trash2, Calendar as CalendarIcon, Hotel, Utensils, FerrisWheel } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const initialActivities = [
  { id: 1, name: 'Eiffel Tower Visit', category: 'Attraction', icon: FerrisWheel },
  { id: 2, name: 'Louvre Museum Tour', category: 'Attraction', icon: FerrisWheel },
  { id: 3, name: 'Seine River Cruise', category: 'Activity', icon: FerrisWheel },
  { id: 4, name: 'Check in to Hotel Elysées', category: 'Accommodation', icon: Hotel },
  { id: 5, name: 'Dinner at Le Cinq', category: 'Dining', icon: Utensils },
];

const initialDays = [
  { id: 1, name: 'Day 1', date: '2024-08-15', activities: [] },
  { id: 2, name: 'Day 2', date: '2024-08-16', activities: [] },
  { id: 3, name: 'Day 3', date: '2024-08-17', activities: [] },
];

export default function ItineraryBuilder() {
  const [activities, setActivities] = useState(initialActivities);
  const [days, setDays] = useState(initialDays);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleAddActivity = (dayId) => {
    if (!selectedActivity) return;

    setDays(currentDays =>
      currentDays.map(day =>
        day.id === dayId
          ? { ...day, activities: [...day.activities, selectedActivity] }
          : day
      )
    );
    setActivities(currentActivities =>
      currentActivities.filter(act => act.id !== selectedActivity.id)
    );
    setSelectedActivity(null);
  };
  
  const handleRemoveActivity = (dayId, activityId) => {
    let activityToMoveBack;
    setDays(currentDays =>
      currentDays.map(day => {
        if (day.id === dayId) {
          activityToMoveBack = day.activities.find(act => act.id === activityId);
          return { ...day, activities: day.activities.filter(act => act.id !== activityId) };
        }
        return day;
      })
    );
    if(activityToMoveBack) {
        setActivities(currentActivities => [...currentActivities, activityToMoveBack].sort((a,b) => a.id - b.id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <Card className="lg:col-span-1 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Available Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activities.map(activity => (
             <AlertDialog key={activity.id}>
                <AlertDialogTrigger asChild>
                    <div
                        key={activity.id}
                        onClick={() => setSelectedActivity(activity)}
                        className="flex items-center justify-between p-3 bg-secondary rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                        <activity.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{activity.name}</span>
                        </div>
                        <PlusCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Add to which day?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Select a day to add "{activity.name}" to your itinerary.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        {days.map(day => (
                             <AlertDialogAction key={day.id} onClick={() => handleAddActivity(day.id)}>{day.name}</AlertDialogAction>
                        ))}
                       <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          ))}
          {activities.length === 0 && (
            <p className="text-muted-foreground text-center py-4">All activities scheduled!</p>
          )}
        </CardContent>
      </Card>

      <div className="lg:col-span-2 space-y-4">
        {days.map(day => (
          <Card key={day.id} className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-headline flex items-center gap-2">
                  <CalendarIcon className="h-6 w-6 text-accent" />
                  {day.name}
                </CardTitle>
                <span className="text-muted-foreground font-sans">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </CardHeader>
            <CardContent className="min-h-[10rem] space-y-3 p-4 border-t">
              {day.activities.length > 0 ? (
                day.activities.map((activity, index) => (
                  <div key={`${activity.id}-${index}`} className="flex items-center justify-between p-3 bg-background rounded-lg border animate-in fade-in-20">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                      <activity.icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{activity.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveActivity(day.id, activity.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>Drag activities here or use the add button.</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
