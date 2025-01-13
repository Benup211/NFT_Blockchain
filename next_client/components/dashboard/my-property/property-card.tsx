import Image from 'next/image'
import { UserProperty } from '@/state/user-property-state'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PropertyCardProps {
  property: UserProperty
  onClick: () => void
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader className="p-0">
        <Image
          src={`http://localhost:3001/${property.image}`}
          alt={property.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{property.name}</CardTitle>
        <p className="text-sm text-gray-600 mb-2">{property.location}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {property.features.map((feature, index) => (
            <Badge key={index} variant="secondary">{feature}</Badge>
          ))}
        </div>
        <p className="font-bold">{property.price} ETH</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Badge>{property.type}</Badge>
        <Badge variant={property.listed ? "default" : "destructive"}>
          {property.listed ? "Listed" : "Unlisted"}
        </Badge>
      </CardFooter>
    </Card>
  )
}

