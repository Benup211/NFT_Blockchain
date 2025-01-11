import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { PropertyType } from '@/state/property-state'
import { Button } from "@/components/ui/button"
import { X, Search, Home, Building } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

interface PropertyFilterProps {
  onFilterChange: (searchTerm: string, maxPrice: number | null, propertyType: PropertyType | null) => void
  maxPossiblePrice: number
}

export function PropertyFilter({ onFilterChange, maxPossiblePrice }: PropertyFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null)
  const [isFilterActive, setIsFilterActive] = useState(false)

  useEffect(() => {
    setIsFilterActive(searchTerm !== '' || maxPrice !== null || propertyType !== null)
  }, [searchTerm, maxPrice, propertyType])

  const handleFilterChange = () => {
    onFilterChange(searchTerm, maxPrice, propertyType)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setMaxPrice(null)
    setPropertyType(null)
    onFilterChange('', null, null)
  }

  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold mb-2">Filter Properties</h2>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Property Type</label>
        <Select onValueChange={(value) => setPropertyType(value === 'all' ? null : value as PropertyType)}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="house">
              <span className="flex items-center">
                <Home className="h-4 w-4 mr-2" /> House
              </span>
            </SelectItem>
            <SelectItem value="apartment">
              <span className="flex items-center">
                <Building className="h-4 w-4 mr-2" /> Apartment
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Max Price: <span className="font-bold">{maxPrice?.toFixed(2) || 'Any'} ETH</span></label>
        <Slider
          min={0}
          max={maxPossiblePrice}
          step={0.1}
          value={[maxPrice || maxPossiblePrice]}
          onValueChange={([value]) => setMaxPrice(value)}
        />
      </div>
      <AnimatePresence>
        {isFilterActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex justify-between items-center"
          >
            <Button onClick={handleFilterChange} className="w-full mr-2">Apply Filters</Button>
            <Button variant="outline" size="icon" onClick={handleClearFilters}>
              <X className="h-4 w-4" />
              <span className="sr-only">Clear Filters</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

