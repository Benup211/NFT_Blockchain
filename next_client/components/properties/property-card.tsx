import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Property } from '@/state/property-state'
import { Heart, Home, Building } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface PropertyCardProps {
  property: Property
  onClick: (property: Property) => void
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className="w-full max-w-sm mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer bg-card text-card-foreground"
        onClick={() => onClick(property)}
      >
        <CardContent className="p-0">
          <div className="relative h-48 w-full group">
            <Image
              src={property.image}
              alt={property.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 bg-background/80 hover:bg-background"
              onClick={(e) => {
                e.stopPropagation();
                // Add to favorites logic here
              }}
            >
              <Heart className="h-4 w-4 text-primary" />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold line-clamp-1 mb-1">{property.name}</h3>
            <p className="text-sm text-muted-foreground mb-2 flex items-center">
              <Home className="h-4 w-4 mr-1" /> {property.location}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {property.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">{feature}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-muted/50 px-4 py-3">
          <span className="text-lg font-bold">{property.price} ETH</span>
          <Badge variant="outline" className="flex items-center">
            {property.type === 'house' ? <Home className="h-3 w-3 mr-1" /> : <Building className="h-3 w-3 mr-1" />}
            {property.type}
          </Badge>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

