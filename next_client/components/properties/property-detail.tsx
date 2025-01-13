import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Property, usePropertyStore } from '@/state/property-state'
import { Check, ExternalLink, Home, Building } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import { useAuthStore } from '@/state/auth-state'

interface PropertyDetailProps {
  property: Property
  isOpen: boolean
  onClose: () => void
}

export function PropertyDetail({ property, isOpen, onClose }: PropertyDetailProps) {
  const [isBuying, setIsBuying] = useState(false)
  const {user}=useAuthStore();
  const buyProperty = usePropertyStore((state) => state.buyProperty)

  const handleBuyNow = async () => {
    setIsBuying(true)
    try {
      const result = await buyProperty(property.id,property.price,user.uuid)
      if (result.success) {
        toast({
          title: "Purchase Successful",
          description: `Property ${property.name} added in the transaction list`,
        })
        onClose()
      } else {
        toast({
          title: "Purchase Failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsBuying(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{property.name}</DialogTitle>
        </DialogHeader>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 py-4"
          >
            <div className="relative h-64 w-full">
              <Image
                src={`http://localhost:3001/${property.image}`}
                alt={property.name}
                fill
                priority
                sizes='100%'
                className="rounded-lg"
              />
              {property.limitedOffer && (
                <Badge className="absolute top-2 right-2 bg-red-500">Limited Offer</Badge>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{property.price} ETH</span>
              <Badge variant="outline">Edition 1 of 1</Badge>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="grid grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Description:</h3>
              <p>{property.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Property Type:</h3>
              <Badge variant="secondary" className="flex items-center w-fit">
                {property.type === 'house' ? <Home className="h-4 w-4 mr-2" /> : <Building className="h-4 w-4 mr-2" />}
                {property.type}
              </Badge>
            </div>
            <Button 
              className="w-full" 
              onClick={handleBuyNow}
              disabled={isBuying}
            >
              {isBuying ? 'Processing...' : 'Buy Now'}
            </Button>
            <div className="text-sm text-muted-foreground">
                <Link href={`https://turquoise-main-stingray-37.mypinata.cloud/ipfs/${property.ipfsHash}`} target="_blank" rel="noopener noreferrer">IPFS Hash: {property.ipfsHash}</Link>
              <p>Blockchain: Ethereum TokenID:{property.tokenID}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

