"use client";

import { useEffect, useState } from "react";
import {
    usePropertyStore,
    PropertyType,
    Property,
} from "@/state/property-state";
import { PropertyCard } from "./property-card";
import { PropertyFilter } from "./property-filter";
import { PropertyDetail } from "./property-detail";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

export function PropertyListing() {
    const {
        properties,
        filteredProperties,
        currentPage,
        itemsPerPage,
        totalPages,
        fetchProperties,
        filterProperties,
        setCurrentPage,
        setItemsPerPage,
    } = usePropertyStore();
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(
        null
    );
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const handleFilterChange = (
        searchTerm: string,
        maxPrice: number | null,
        propertyType: PropertyType | null
    ) => {
        filterProperties(searchTerm, maxPrice, propertyType);
        setIsMobileFilterOpen(false);
    };

    const maxPossiblePrice = Math.max(
        ...properties.map((p) => parseFloat(p.price))
    );

    const currentProperties = filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePropertyClick = (property: Property) => {
        setSelectedProperty(property);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="lg:grid lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 mb-6 lg:mb-0 hidden lg:block">
                    <PropertyFilter
                        onFilterChange={handleFilterChange}
                        maxPossiblePrice={maxPossiblePrice}
                    />
                </div>
                <div className="lg:hidden mb-4">
                    <Sheet
                        open={isMobileFilterOpen}
                        onOpenChange={setIsMobileFilterOpen}
                    >
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <Filter className="mr-2 h-4 w-4" /> Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <PropertyFilter
                                onFilterChange={handleFilterChange}
                                maxPossiblePrice={maxPossiblePrice}
                            />
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="lg:col-span-3">
                    <AnimatePresence>
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {currentProperties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    onClick={handlePropertyClick}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                    {filteredProperties.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-8"
                        >
                            <p className="text-muted-foreground">
                                No properties found. Try adjusting your filters.
                            </p>
                        </motion.div>
                    )}
                    {filteredProperties.length > 0 && (
                        <motion.div
                            className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setCurrentPage(
                                            Math.max(currentPage - 1, 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setCurrentPage(
                                            Math.min(
                                                currentPage + 1,
                                                totalPages
                                            )
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm">Items per page:</span>
                                <Select
                                    value={itemsPerPage.toString()}
                                    onValueChange={(value) =>
                                        setItemsPerPage(parseInt(value))
                                    }
                                >
                                    <SelectTrigger className="w-[70px]">
                                        <SelectValue placeholder="9" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="6">6</SelectItem>
                                        <SelectItem value="9">9</SelectItem>
                                        <SelectItem value="12">12</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            {selectedProperty && (
                <PropertyDetail
                    property={selectedProperty}
                    isOpen={!!selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                />
            )}
        </div>
    );
}
