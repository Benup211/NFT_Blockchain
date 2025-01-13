'use client'

import { UserProperty } from '@/state/user-property-state';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

interface PropertyModalProps {
  property: UserProperty | null
  isOpen: boolean
  onClose: () => void
  onListUnlist: (propertyId: string, newStatus: boolean) => void
}

export function PropertyModal({ property, isOpen, onClose, onListUnlist }: PropertyModalProps) {
  if (!property) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{property.name}</DialogTitle>
          <DialogDescription>{property.location}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Image
            src={`http://localhost:3001/${property.image}`}
            alt={property.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-lg"
          />
          <p>{property.description}</p>
          <div className="flex flex-wrap gap-2">
            {property.features.map((feature, index) => (
              <Badge key={index} variant="secondary">{feature}</Badge>
            ))}
          </div>
          <p className="font-bold text-lg">{property.price} ETH</p>
          <div className="flex justify-between items-center">
            <Badge>{property.type}</Badge>
            <Badge variant={property.listed ? "default" : "destructive"}>
              {property.listed ? "Listed" : "Unlisted"}
            </Badge>
          </div>
          <Button 
            onClick={() => onListUnlist(property.id, !property.listed)}
            variant={property.listed ? "destructive" : "default"}
          >
            {property.listed ? "Unlist Property" : "List Property"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

