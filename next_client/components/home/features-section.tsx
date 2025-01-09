import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Globe, TrendingUp } from 'lucide-react';

const features = [
  {
    title: "Blockchain Security",
    description: "Leverage the power of blockchain for secure and transparent property transactions.",
    icon: Shield,
  },
  {
    title: "Instant Liquidity",
    description: "Trade property tokens quickly and easily, increasing market liquidity.",
    icon: Zap,
  },
  {
    title: "Global Marketplace",
    description: "Access a worldwide real estate market with tokenized properties.",
    icon: Globe,
  },
  {
    title: "AI-Powered Insights",
    description: "Make informed decisions with our advanced AI valuation and market trend analysis tools.",
    icon: TrendingUp,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose NFT Real Estate?</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

