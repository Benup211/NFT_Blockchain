import { create } from 'zustand'
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "../types/error-types";

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

interface SellTransactionState{
    transactions:Transaction[]
    getSellerTransactions:()=>Promise<{
        success:boolean
        message:string
    }>
    isloading:boolean
}

export const useSellTransactionStore = create<SellTransactionState>((set) => ({
    transactions:[],
    isloading:false,
    getSellerTransactions: async () => {
        set({ isloading: true });
        try {
            const response = await axios.get(
                "http://localhost:3001/api/transaction/getSellerTransactions",
                { withCredentials: true }
            );
            set({ transactions: response.data, isloading: false });
            return { success: true, message: "Sell Transactions fetched successfully" };
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isloading: false });
            return { success: false, message: response?.data.errorMessage || "An error occurred" };
        }
    },
}));