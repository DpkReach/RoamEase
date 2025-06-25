import CurrencyConverter from "@/components/tools/currency-converter";
import DocumentChecklist from "@/components/tools/document-checklist";

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Travel Tools</h1>
        <p className="text-muted-foreground">Essential utilities to help you prepare for your trip.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
        <CurrencyConverter />
        <DocumentChecklist />
      </div>
    </div>
  );
}
