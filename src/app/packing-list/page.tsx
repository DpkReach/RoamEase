import PackingListGenerator from "@/components/packing-list/packing-list-generator";

export default function PackingListPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">AI Packing List Generator</h1>
        <p className="text-muted-foreground">Tell us about your trip, and we'll generate a personalized packing list for you.</p>
      </div>
      <PackingListGenerator />
    </div>
  );
}
