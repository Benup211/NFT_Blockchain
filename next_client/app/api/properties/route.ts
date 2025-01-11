import { NextResponse } from 'next/server'
import { Property } from '@/state/property-state'

const properties: Property[] = [
  {
    id: '1',
    name: 'Sunny Villa NFT',
    location: 'Miami, FL',
    features: ['3 bedrooms', '2 bathrooms', 'Pool', 'Ocean View'],
    price: '10',
    type: 'house',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'Miami Luxury Homes',
    smartContract: '0x1234...5678',
    limitedOffer: true
  },
  {
    id: '2',
    name: 'Downtown Loft NFT',
    location: 'New York, NY',
    features: ['1 bedroom', '1 bathroom', 'City view', 'Gym access'],
    price: '5',
    type: 'apartment',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'NYC Real Estate Tokenization',
    smartContract: '0x9876...5432'
  },
  {
    id: '3',
    name: 'Downtown Loft NFT',
    location: 'New York, NY',
    features: ['1 bedroom', '1 bathroom', 'City view', 'Gym access'],
    price: '5',
    type: 'apartment',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'NYC Real Estate Tokenization',
    smartContract: '0x9876...5432'
  },
  {
    id: '4',
    name: 'Downtown Loft NFT',
    location: 'New York, NY',
    features: ['1 bedroom', '1 bathroom', 'City view', 'Gym access'],
    price: '5',
    type: 'apartment',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'NYC Real Estate Tokenization',
    smartContract: '0x9876...5432'
  },
  {
    id: '11',
    name: 'Downtown Loft NFT',
    location: 'New York, NY',
    features: ['1 bedroom', '1 bathroom', 'City view', 'Gym access'],
    price: '5',
    type: 'apartment',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'NYC Real Estate Tokenization',
    smartContract: '0x9876...5432'
  },
  {
    id: '5',
    name: 'Downtown Loft NFT',
    location: 'New York, NY',
    features: ['1 bedroom', '1 bathroom', 'City view', 'Gym access'],
    price: '5',
    type: 'apartment',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'NYC Real Estate Tokenization',
    smartContract: '0x9876...5432'
  },
  {
    id: '6',
    name: 'Downtown Loft NFT',
    location: 'New York, NY',
    features: ['1 bedroom', '1 bathroom', 'City view', 'Gym access'],
    price: '5',
    type: 'apartment',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'NYC Real Estate Tokenization',
    smartContract: '0x9876...5432'
  },
  {
    id: '7',
    name: 'Downtown Loft NFT',
    location: 'New York, NY',
    features: ['1 bedroom', '1 bathroom', 'City view', 'Gym access'],
    price: '5',
    type: 'apartment',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'NYC Real Estate Tokenization',
    smartContract: '0x9876...5432'
  },
  {
    id: '8',
    name: 'Downtown Loft NFT',
    location: 'New York, NY',
    features: ['1 bedroom', '1 bathroom', 'City view', 'Gym access'],
    price: '5',
    type: 'apartment',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'NYC Real Estate Tokenization',
    smartContract: '0x9876...5432'
  },
  {
    id: '9',
    name: 'Downtown Loft NFT',
    location: 'New York, NY',
    features: ['1 bedroom', '1 bathroom', 'City view', 'Gym access'],
    price: '5',
    type: 'apartment',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'NYC Real Estate Tokenization',
    smartContract: '0x9876...5432'
  },
  {
    id: '10',
    name: 'Downtown Loft NFT',
    location: 'New York, NY',
    features: ['1 bedroom', '1 bathroom', 'City view', 'Gym access'],
    price: '5',
    type: 'apartment',
    image: '/placeholder.svg?height=300&width=400',
    creator: 'NYC Real Estate Tokenization',
    smartContract: '0x9876...5432'
  },
  // Add more properties as needed
]

export async function GET() {
  return NextResponse.json(properties)
}

