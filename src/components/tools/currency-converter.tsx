'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '../ui/button';

const currencies = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'AUD', label: 'AUD - Australian Dollar' },
  { value: 'CAD', label: 'CAD - Canadian Dollar' },
  { value: 'CHF', label: 'CHF - Swiss Franc' },
  { value: 'CNY', label: 'CNY - Chinese Yuan Renminbi' },
  { value: 'INR', label: 'INR - Indian Rupee' },
  { value: 'BRL', label: 'BRL - Brazilian Real' },
  { value: 'ZAR', label: 'ZAR - South African Rand' },
  { value: 'MXN', label: 'MXN - Mexican Peso' },
  { value: 'NZD', label: 'NZD - New Zealand Dollar' },
  { value: 'SGD', label: 'SGD - Singapore Dollar' },
];

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState(92.50);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    // In a real app, you would recalculate here
  };
  
  // Dummy conversion
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value) || 0;
    setAmount(newAmount);
    setConvertedAmount(newAmount * 0.925);
  };


  return (
    <Card className="shadow-lg lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Currency Converter</CardTitle>
        <CardDescription>Get up-to-date exchange rates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full space-y-2">
            <label htmlFor="fromAmount" className="text-sm font-medium">Amount</label>
            <Input id="fromAmount" type="number" value={amount} onChange={handleAmountChange} />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" size="icon" className="mt-4 sm:mt-8" onClick={handleSwap}>
            <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
          </Button>
          <div className="w-full space-y-2">
            <label htmlFor="toAmount" className="text-sm font-medium">Converted Amount</label>
            <Input id="toAmount" type="number" value={convertedAmount.toFixed(2)} readOnly />
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
