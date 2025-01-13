'use client'

import { useUserPropertyStore } from '@/state/user-property-state';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

export function SearchFilter() {
  const { filters, applyFilters, clearFilters } = useUserPropertyStore()

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    applyFilters({ ...filters, [key]: value })
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Input
              id="search"
              placeholder="Search properties..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
            {filters.searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => handleFilterChange('searchTerm', '')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <Select
            value={filters.propertyType}
            onValueChange={(value: 'all' | 'house' | 'apartment') => handleFilterChange('propertyType', value)}
          >
            <SelectTrigger id="propertyType">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="listedStatus">Listed Status</Label>
          <Select
            value={filters.listedStatus}
            onValueChange={(value: 'all' | 'true' | 'false') => handleFilterChange('listedStatus', value)}
          >
            <SelectTrigger id="listedStatus">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Listed</SelectItem>
              <SelectItem value="false">Unlisted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

