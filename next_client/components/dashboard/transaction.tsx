import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, ShoppingBag, History, DollarSign } from 'lucide-react'
import BuyerTransaction from './transaction/buyer-transaction'
import SellerTransaction from './transaction/seller-transaction'
import TransactionHistory from './transaction/transaction-history'

export default function Transaction() {
  const [activeTab, setActiveTab] = useState('buyer')

  return (
    <div className="p-4 space-y-6 bg-background min-h-screen">
      <div className="flex items-center space-x-4 mb-6">
        <h1 className="text-3xl font-bold">Real Estate Transactions</h1>
      </div>
      <Card className="shadow-lg">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-muted/50 p-0">
              <TabsTrigger value="buyer" className="flex-1 data-[state=active]:bg-background data-[state=active]:border py-3">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Buyer Transactions
              </TabsTrigger>
              <TabsTrigger value="seller" className="flex-1 data-[state=active]:bg-background data-[state=active]:border py-3">
                <Building2 className="mr-2 h-5 w-5" />
                Seller Transactions
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1 data-[state=active]:bg-background data-[state=active]:border py-3">
                <History className="mr-2 h-5 w-5" />
                Transaction History
              </TabsTrigger>
            </TabsList>
            <div className="p-6">
              <TabsContent value="buyer">
                <BuyerTransaction />
              </TabsContent>
              <TabsContent value="seller">
                <SellerTransaction />
              </TabsContent>
              <TabsContent value="history">
                <TransactionHistory />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

