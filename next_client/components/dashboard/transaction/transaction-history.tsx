import { useState } from 'react'
import { Table } from './ui/table'
import { Modal } from './ui/modal'
import { Home, MapPin, DollarSign, Calendar, User, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Transaction = {
  id: number
  propertyName: string
  location: string
  price: number
  sellerName: string
  buyerName: string
  date: string
  status: 'completed' | 'pending' | 'cancelled'
}

const dummyTransactions: Transaction[] = [
  { id: 1, propertyName: "Sunset Villa", location: "Malibu", price: 2500000, sellerName: "John Doe", buyerName: "Jane Smith", date: "2023-06-15", status: 'completed' },
  { id: 2, propertyName: "Mountain Retreat", location: "Aspen", price: 3000000, sellerName: "Alice Johnson", buyerName: "Bob Williams", date: "2023-06-10", status: 'pending' },
  { id: 3, propertyName: "City Loft", location: "New York", price: 1500000, sellerName: "Emma Brown", buyerName: "Michael Davis", date: "2023-06-05", status: 'cancelled' },
]

const columns = [
  { key: 'propertyName', header: 'Property Name', sortable: true },
  { key: 'location', header: 'Location', sortable: true },
  { key: 'price', header: 'Price ($)', sortable: true },
  { key: 'date', header: 'Transaction Date', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
]

export default function TransactionHistory() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleClose = () => {
    setSelectedTransaction(null)
  }

  const renderTableCell = (item: any, key: string) => {
    if (key === 'price') {
      return `$${item[key].toLocaleString()}`
    }
    if (key === 'status') {
      return (
        <Badge
          variant={item.status === 'completed' ? 'default' : item.status === 'pending' ? 'secondary' : 'destructive'}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      )
    }
    return item[key]
  }

  const filteredTransactions = dummyTransactions.filter(transaction =>
    transaction.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Transaction History</h3>
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
              <p className="font-semibold text-lg">{selectedTransaction.propertyName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <p>{selectedTransaction.location}</p>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <p className="text-lg font-medium">${selectedTransaction.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-500" />
              <p>Seller: {selectedTransaction.sellerName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-indigo-500" />
              <p>Buyer: {selectedTransaction.buyerName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <p>Date: {selectedTransaction.date}</p>
            </div>
            <div className="mt-4">
              <Badge
                variant={selectedTransaction.status === 'completed' ? 'default' : selectedTransaction.status === 'pending' ? 'secondary' : 'destructive'}
                className="text-sm"
              >
                Status: {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
              </Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

