import { AIValuationTool } from '@/components/home/ai-valuation-tool';
import { CTASection } from '@/components/home/cta-section';
import { FeaturesSection } from '@/components/home/features-section';
import { HeroSection } from '@/components/home/hero-section';
import { MarketTrends } from '@/components/home/market-trends';
import { TestimonialsSection } from '@/components/home/testimonials-section';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <HeroSection />
                <FeaturesSection/>
                <div className="container mx-auto px-4 py-16 grid gap-8 md:grid-cols-2">
                    <AIValuationTool/>
                    <MarketTrends />
                </div>
                <TestimonialsSection/>
                <CTASection/>
            </main>
        </div>
    );
}
