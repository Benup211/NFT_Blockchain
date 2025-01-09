import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your NFT Real Estate Journey?</h2>
        <p className="text-xl mb-8">Join thousands of investors and property owners in the future of real estate.</p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/register">Get Started Today</Link>
        </Button>
      </div>
    </section>
  );
}
