'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

const initialDocuments = [
  { id: 'passport', label: 'Passport', checked: true },
  { id: 'visa', label: 'Visa (if applicable)', checked: false },
  { id: 'tickets', label: 'Flight/Train Tickets', checked: true },
  { id: 'hotel', label: 'Hotel Reservations', checked: false },
  { id: 'insurance', label: 'Travel Insurance', checked: false },
  { id: 'id_card', label: 'National ID Card / Driver\'s License', checked: true },
];

export default function DocumentChecklist() {
  const [documents, setDocuments] = useState(initialDocuments);

  const handleCheckChange = (id: string) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === id ? { ...doc, checked: !doc.checked } : doc
      )
    );
  };

  const checkedCount = documents.filter(doc => doc.checked).length;
  const progress = (checkedCount / documents.length) * 100;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Document Checklist</CardTitle>
        <CardDescription>Make sure you have all your essentials.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progress} className="w-full" />
          <div className="space-y-3">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center space-x-3">
                <Checkbox
                  id={doc.id}
                  checked={doc.checked}
                  onCheckedChange={() => handleCheckChange(doc.id)}
                />
                <label
                  htmlFor={doc.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {doc.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
