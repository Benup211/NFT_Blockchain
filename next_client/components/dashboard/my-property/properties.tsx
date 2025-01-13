'use client'

import { useEffect, useState } from 'react'
import { useUserPropertyStore, UserProperty } from '@/state/user-property-state'
import { SearchFilter } from './property-filter'
import { PropertyCard } from './property-card'
import { PropertyModal } from './property-model'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function UserProperties() {
  const { 
    filteredProperties, 
    currentPage, 
    itemsPerPage, 
    isLoading, 
    error,
    fetchProperties, 
    setCurrentPage, 
    setItemsPerPage, 
    updatePropertyListing 
  } = useUserPropertyStore()

  const [selectedProperty, setSelectedProperty] = useState<UserProperty | null>(null)

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  const handleListUnlist = async (propertyId: string, newStatus: boolean) => {
    try{
        await updatePropertyListing(propertyId, newStatus)
    }catch(err){
        console.log(err)
    }
    if (selectedProperty) {
      setSelectedProperty({ ...selectedProperty, listed: newStatus })
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <SearchFilter />
        </div>
        <div className="w-full md:w-3/4">
          {currentProperties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-500">No properties found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {currentProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => setSelectedProperty(property)}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Items per page:</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => setItemsPerPage(Number(value))}
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder={itemsPerPage} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <PropertyModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onListUnlist={handleListUnlist}
      />
    </div>
  )
}

