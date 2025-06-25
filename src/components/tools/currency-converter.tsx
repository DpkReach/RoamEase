'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const currencies = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'AUD', label: 'AUD - Australian Dollar' },
  { value: 'CAD', label: 'CAD - Canadian Dollar' },
  { value: 'CHF', label: 'CHF - Swiss Franc' },
  { value: 'CNY', label: 'CNY - Chinese Yuan' },
  { value: 'INR', label: 'INR - Indian Rupee' },
  { value: 'BRL', label: 'BRL - Brazilian Real' },
  { value: 'ZAR', label: 'ZAR - South African Rand' },
  { value: 'MXN', label: 'MXN - Mexican Peso' },
  { value: 'NZD', label: 'NZD - New Zealand Dollar' },
  { value: 'SGD', label: 'SGD - Singapore Dollar' },
  { value: 'EGP', label: 'EGP - Egyptian Pound' },
  { value: 'KRW', label: 'KRW - South Korean Won' },
  { value: 'RUB', label: 'RUB - Russian Ruble' },
  { value: 'TRY', label: 'TRY - Turkish Lira' },
];

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!amount || amount <= 0) {
      setConvertedAmount(0);
      return;
    }
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchConversion = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
          { signal }
        );
        if (!res.ok) {
          throw new Error('Failed to fetch conversion data. Please try again later.');
        }
        const data = await res.json();
        if (data.rates && data.rates[toCurrency]) {
            setConvertedAmount(data.rates[toCurrency]);
        } else {
            throw new Error('Could not get the conversion rate for the selected currency.');
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchConversion, 300); // Debounce API calls

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    }
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(isNaN(newAmount) ? 0 : newAmount);
  };

  return (
    <Card className="shadow-lg lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Currency Converter</CardTitle>
        <CardDescription>Get real-time exchange rates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full space-y-2">
            <label htmlFor="fromAmount" className="text-sm font-medium">Amount</label>
            <Input id="fromAmount" type="number" value={amount} onChange={handleAmountChange} min="0" />
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
            <div className="relative">
                <Input id="toAmount" type="number" value={convertedAmount !== null ? convertedAmount.toFixed(2) : ''} readOnly disabled className="bg-muted/50" />
                {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />}
            </div>
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
        {error && (
            <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
