import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

const trends = [
  { area: "Kathmandu", change: "+5.2%", trending: "up" },
  { area: "Lalitpur", change: "+3.8%", trending: "up" },
  { area: "Bhaktapur", change: "-1.5%", trending: "down" },
  { area: "Kavre", change: "+6.7%", trending: "up" },
  { area: "Janakpur", change: "+4.5%", trending: "up" },
];

export function MarketTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Trends</CardTitle>
        <CardDescription>Latest real estate market trends in major cities</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {trends.map((trend, index) => (
            <li key={index} className="flex items-center justify-between">
              <span className="font-medium">{trend.area}</span>
              <span className={`flex items-center ${trend.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trend.trending === 'up' ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                {trend.change}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

