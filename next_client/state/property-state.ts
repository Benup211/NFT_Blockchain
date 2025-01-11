import { create } from 'zustand'

export type PropertyType = 'house' | 'apartment'

export interface Property {
  id: string
  name: string
  location: string
  features: string[]
  price: string
  type: PropertyType
  image: string
  creator: string
  smartContract: string
  limitedOffer?: boolean
}

interface PropertyStore {
  properties: Property[]
  filteredProperties: Property[]
  currentPage: number
  itemsPerPage: number
  totalPages: number
  fetchProperties: () => Promise<void>
  filterProperties: (searchTerm: string, maxPrice: number | null, propertyType: PropertyType | null) => void
  buyProperty: (propertyId: string) => Promise<{ success: boolean; message: string }>
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
}

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: [],
  filteredProperties: [],
  currentPage: 1,
  itemsPerPage: 9,
  totalPages: 1,
  fetchProperties: async () => {
    // Simulating an API call
    const response = await fetch('/api/properties')
    const data = await response.json()
    set((state) => ({ 
      properties: data, 
      filteredProperties: data,
      totalPages: Math.ceil(data.length / state.itemsPerPage)
    }))
  },
  filterProperties: (searchTerm, maxPrice, propertyType) => {
    const { properties, itemsPerPage } = get()
    const filtered = properties.filter((property) => {
      const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            property.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = maxPrice ? parseFloat(property.price) <= maxPrice : true
      const matchesType = propertyType ? property.type === propertyType : true
      return matchesSearch && matchesPrice && matchesType
    })
    set({ 
      filteredProperties: filtered, 
      currentPage: 1,
      totalPages: Math.ceil(filtered.length / itemsPerPage)
    })
  },
  buyProperty: async (propertyId: string) => {
    // Simulating an API call to purchase the property
    try {
      const response = await fetch('/api/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId }),
      })
      const data = await response.json()
      if (data.success) {
        set((state) => {
          const updatedProperties = state.properties.filter(p => p.id !== propertyId)
          const updatedFilteredProperties = state.filteredProperties.filter(p => p.id !== propertyId)
          return {
            properties: updatedProperties,
            filteredProperties: updatedFilteredProperties,
            totalPages: Math.ceil(updatedFilteredProperties.length / state.itemsPerPage)
          }
        })
      }
      return data
    } catch (error) {
      console.error('Error buying property:', error)
      return { success: false, message: 'An error occurred while purchasing the property.' }
    }
  },
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setItemsPerPage: (items: number) => set((state) => ({ 
    itemsPerPage: items,
    totalPages: Math.ceil(state.filteredProperties.length / items)
  })),
}))

