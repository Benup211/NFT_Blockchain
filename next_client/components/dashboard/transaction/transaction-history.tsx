import { useState, useEffect } from "react";
import { Table } from "./ui/table";
import { Modal } from "./ui/modal";
import { Home, MapPin, DollarSign, Calendar, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTransactionHistoryStore } from "@/state/history-transaction-state";
import { toast } from "@/hooks/use-toast";

export type PropertyType = "house" | "apartment";

interface Seller {
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
    blockchainPublicKey: string;
}

interface Buyer {
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
    blockchainPublicKey: string;
}

interface Property {
    id: string;
    name: string;
    location: string;
    features: string[];
    description: string;
    price: string;
    type: PropertyType;
    image: string;
    contractText: string;
    tokenID: string;
    ipfsHash: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    listed: boolean;
}

interface Transaction {
    id: string;
    buyerId: string;
    sellerId: string;
    propertyId: string;
    amount: string;
    buyerAccept: boolean;
    sellerAccept: boolean;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    property: Property;
    seller: Seller;
    buyer: Buyer;
}

const columns = [
    { key: "property.name", header: "Property Name", sortable: true },
    { key: "property.location", header: "Location", sortable: true },
    { key: "amount", header: "Price ($)", sortable: true },
    { key: "createdAt", header: "Transaction Date", sortable: true },
    { key: "completed", header: "Status", sortable: true },
];

export default function TransactionHistory() {
    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { isloading, getTransactionHistory, transactions } =
        useTransactionHistoryStore();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactionHistory();
                if (data.success) {
                    toast({
                        title: "Transactions fetched successfully",
                        description:
                            "You have successfully fetched all transactions",
                    });
                } else {
                    toast({
                        title: "Failed to fetch transactions",
                        description: "Failed to fetch transactions",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    const handleRowClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    const handleClose = () => {
        setSelectedTransaction(null);
    };

    const renderTableCell = (item: Transaction, key: string) => {
        if (key === "amount") {
            return `$${Number(item[key]).toLocaleString()}`;
        }
        if (key === "completed") {
            const status = item.completed ? "Completed" : "Pending";
            return (
                <Badge variant={item.completed ? "default" : "secondary"}>
                    {status}
                </Badge>
            );
        }
        return key
            .split(".")
            .reduce(
                (o, k) =>
                    o && (o as any)[k] !== undefined ? (o as any)[k] : "",
                item as any
            ) as React.ReactNode;
    };

    if (isloading) {
        return <p>Loading transactions...</p>;
    }

    const filteredTransactions = transactions.filter(
        (transaction) =>
            transaction.property.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            transaction.property.location
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            transaction.seller.first_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            transaction.buyer.first_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

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
            <Modal
                isOpen={!!selectedTransaction}
                onClose={handleClose}
                title="Transaction Details"
                isLoading={isLoading}
            >
                {selectedTransaction && (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Home className="h-5 w-5 text-blue-500" />
                            <p className="font-semibold text-lg">
                                {selectedTransaction.property.name}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-red-500" />
                            <p>{selectedTransaction.property.location}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <DollarSign className="h-5 w-5 text-green-500" />
                            <p className="text-lg font-medium">
                                $
                                {Number(
                                    selectedTransaction.amount
                                ).toLocaleString()}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-purple-500" />
                            <p>
                                Seller: {selectedTransaction.seller.first_name}{" "}
                                {selectedTransaction.seller.last_name}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-indigo-500" />
                            <p>
                                Buyer: {selectedTransaction.buyer.first_name}{" "}
                                {selectedTransaction.buyer.last_name}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-orange-500" />
                            <p>
                                Date:{" "}
                                {new Date(
                                  selectedTransaction.updatedAt
                                ).toLocaleString()}
                            </p>
                        </div>
                        <div className="mt-4">
                            <Badge
                                variant={
                                    selectedTransaction.completed
                                        ? "default"
                                        : "secondary"
                                }
                                className="text-sm"
                            >
                                Status:{" "}
                                {selectedTransaction.completed
                                    ? "Completed"
                                    : "Pending"}
                            </Badge>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
