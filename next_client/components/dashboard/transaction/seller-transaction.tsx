"use client";
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table } from './ui/table'
import { Modal } from './ui/modal'
import { Home, MapPin, DollarSign, FileText, ArrowUpDown, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useSellTransactionStore } from '@/state/sell-transaction-state'
import { toast } from '@/hooks/use-toast';

export type PropertyType = 'house' | 'apartment'

interface Seller{
    uuid:string
    email:string
    first_name:string
    last_name:string
    blockchainPublicKey:string
}

interface buyer{
    uuid:string
    email:string
    first_name:string
    last_name:string
    blockchainPublicKey:string
}

interface Property{
    id:string
    name:string
    location:string
    features:string[]
    description:string
    price:string
    type:PropertyType
    image:string
    contractText:string
    tokenID:string
    ipfsHash:string
    createdAt:string
    updatedAt:string
    userId:string
    listed:boolean
}

interface Transaction{
    id:string
    buyerId:string
    sellerId:string
    propertyId:string
    amount:string
    buyerAccept:boolean
    sellerAccept:boolean
    completed:boolean
    createdAt:string
    updatedAt:string
    property:Property
    seller:Seller
    buyer:buyer
}

const columns = [
  { key: 'property.name', header: 'Property Name', sortable: true },
  { key: 'property.location', header: 'Location', sortable: true },
  { key: 'property.price', header: 'Asking Price ($)', sortable: true },
  { key: 'amount', header: 'Offer ($)', sortable: true },
]

export default function SellerTransaction() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const {getSellerTransactions,isloading,transactions}=useSellTransactionStore();

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleClose = () => {
    setSelectedTransaction(null)
  }

  const handleAccept = () => {
    alert(`Offer accepted for ${selectedTransaction?.property.name}`)
    handleClose()
  }

  const renderTableCell = (item: any, key: string) => {
    const keys = key.split('.')
    let value = item
    for (const k of keys) {
      value = value[k]
    }
    if (key === 'property.price' || key === 'amount') {
      return `$${parseInt(value).toLocaleString()}`
    }
    return value
  }

  useEffect(() => {
    const fetchData = async () => {
        const data = await getSellerTransactions();
        if (data.success) {
            toast({
                title: "Success",
                description: data.message,
            })
        } else {
            toast({
                title: "Error",
                description: data.message,
                variant:"destructive"
            })
        }
    };
    fetchData();
}, []);

  if(isloading){
    return <div>Loading...</div>
  }

  const filteredTransactions = transactions.filter(transaction =>
    transaction.property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.property.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Seller Transactions</h3>
      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      <Table 
        columns={columns} 
        data={filteredTransactions} 
        onRowClick={handleRowClick}
        renderCell={renderTableCell}
      />
      <Modal isOpen={!!selectedTransaction} onClose={handleClose} title="Transaction Details" isLoading={isLoading}>
        {selectedTransaction && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-blue-500" />
              <p className="font-semibold text-lg">{selectedTransaction.property.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <p>{selectedTransaction.property.location}</p>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <p className="text-lg font-medium">Asking Price: ${parseInt(selectedTransaction.property.price).toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="h-5 w-5 text-orange-500" />
              <p className="text-lg font-medium">Buyer Offer: ${parseInt(selectedTransaction.amount).toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <p>{selectedTransaction.property.description}</p>
            </div>
            <div className="mt-4">
              <Badge variant={parseInt(selectedTransaction.amount) >= parseInt(selectedTransaction.property.price) ? "default" : "destructive"} className="text-sm">
                {parseInt(selectedTransaction.amount) >= parseInt(selectedTransaction.property.price) ? "Offer Meets or Exceeds Asking Price" : "Offer Below Asking Price"}
              </Badge>
            </div>
            <Button onClick={handleAccept} className="w-full mt-4">
              Accept Offer
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
