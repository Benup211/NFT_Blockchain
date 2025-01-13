"use client";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table } from './ui/table';
import { Modal } from './ui/modal';
import { Badge } from "@/components/ui/badge";
import { Home, MapPin,Coins, FileText, Check, X, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useBuyTransactionStore } from '@/state/buy-transaction-state';
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
    { key: 'amount', header: 'Amount (eth)', sortable: true },
    { key: 'sellerAccept', header: 'Status', sortable: true },
];

export default function BuyerTransaction() {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { getBuyerTransactions, transactions, isloading } = useBuyTransactionStore();

    const handleRowClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    const handleClose = () => {
        setSelectedTransaction(null);
    };

    const handleCreateTransaction = () => {
        alert(`Transaction confirmed for ${selectedTransaction?.property.name}`);
        handleClose();
    };

    const renderTableCell = (item: any, key: string) => {
        if (key === 'amount') {
            return `$${item[key].toLocaleString()}`;
        }
        if (key === 'sellerAccept') {
            return (
                <Badge variant={item[key] ? "default" : "secondary"}>
                    {item[key] ? 'Accepted' : 'Pending'}
                </Badge>
            );
        }
        if (key.includes('.')) {
            const keys = key.split('.');
            return keys.reduce((obj, k) => (obj ? obj[k] : null), item);
        }
        return item[key];
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBuyerTransactions();
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
    );

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-6">Buyer Transactions</h3>
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
                            <Coins className="h-5 w-5 text-green-500" />
                            <p className="text-lg font-medium">eth {selectedTransaction.amount.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-purple-500" />
                            <p>{selectedTransaction.property.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-orange-500" />
                            <p>Contract: {selectedTransaction.property.contractText}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {selectedTransaction.sellerAccept ? (
                                <Check className="h-5 w-5 text-green-500" />
                            ) : (
                                <X className="h-5 w-5 text-red-500" />
                            )}
                            <p>
                                {selectedTransaction.sellerAccept
                                    ? "Seller has accepted"
                                    : "Awaiting seller acceptance"}
                            </p>
                        </div>
                        {selectedTransaction.sellerAccept && (
                            <Button onClick={handleCreateTransaction} className="w-full mt-4">
                                Confirm Transaction
                            </Button>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}
