import ItineraryBuilder from "@/components/itinerary/itinerary-builder";

export default function ItineraryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Itinerary Builder</h1>
        <p className="text-muted-foreground">Plan your trip day by day. Drag and drop activities to organize your schedule.</p>
      </div>
      <ItineraryBuilder />
    </div>
  );
}
