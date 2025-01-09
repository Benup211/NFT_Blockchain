'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

export function AIValuationTool() {
  const [address, setAddress] = useState('');
  const [valuation, setValuation] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleValuation = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockValuation = Math.floor(Math.random() * 1000000) + 500000;
    setValuation(mockValuation);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Property Valuation</CardTitle>
        <CardDescription>Get an instant AI-powered valuation for any property</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            placeholder="Enter property address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button onClick={handleValuation} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Valuation'}
          </Button>
        </div>
      </CardContent>
      {valuation && (
        <CardFooter>
          <p className="text-lg font-semibold">
            Estimated Value: ${valuation.toLocaleString()}
          </p>
        </CardFooter>
      )}
    </Card>
  );
}

