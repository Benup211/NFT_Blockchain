import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "../types/error-types";

export type PropertyType = "house" | "apartment";

interface Seller {
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
    blockchainPublicKey: string;
}

interface buyer {
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
    buyer: buyer;
}

interface TransactionHistoryState {
    transactions: Transaction[];
    isloading: boolean;
    getTransactionHistory: () => Promise<{
        success: boolean;
        message: string;
    }>;
}

export const useTransactionHistoryStore = create<TransactionHistoryState>((set) => ({
    transactions: [],
    isloading: false,

    getTransactionHistory: async () => {
        set({ isloading: true });
        try {
            const response = await axios.get("http://localhost:3001/api/transaction/getTransactionsHistory",
                { withCredentials: true }
            );
            set({ transactions: response.data, isloading: false });
            return { success: true, message: response.data.message };
        } catch (error) {
            const {response} = error as AxiosError<IErrorResponse>;
            set({ isloading: false });
            return {
                success: false,
                message: response?.data.errorMessage || "An error occurred",
            };
        }
    },

}));
