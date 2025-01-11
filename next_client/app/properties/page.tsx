import { PropertyListing } from "@/components/properties/property-listing";

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <header className="bg-background border-b">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">
                        Find Your Dream Property
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Explore our curated selection of properties for sale and
                        rent
                    </p>
                </div>
            </header>
            <PropertyListing />
        </main>
    );
}
