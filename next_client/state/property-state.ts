import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "../types/error-types";

export type PropertyType = "house" | "apartment";

export interface Property {
    id: string;
    name: string;
    location: string;
    features: string[];
    description: string;
    price: string;
    type: PropertyType;
    image: string;
    creator: string;
    smartContract: string;
    limitedOffer?: boolean;
    contractText: string;
    tokenID: string;
    ipfsHash: string;
}

interface PropertyStore {
    properties: Property[];
    filteredProperties: Property[];
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    fetchProperties: () => Promise<void>;
    filterProperties: (
        searchTerm: string,
        maxPrice: number | null,
        propertyType: PropertyType | null
    ) => void;
    buyProperty: (
        propertyId: string,
        amount: string,
        buyerId: string
    ) => Promise<{ success: boolean; message: string }>;
    setCurrentPage: (page: number) => void;
    setItemsPerPage: (items: number) => void;
}

export const usePropertyStore = create<PropertyStore>((set, get) => ({
    properties: [],
    filteredProperties: [],
    currentPage: 1,
    itemsPerPage: 9,
    totalPages: 1,
    fetchProperties: async () => {
        try {
            const response = await fetch(
                "http://localhost:3001/api/property/all"
            );
            const data = await response.json();
            set((state) => ({
                properties: data,
                filteredProperties: data,
                totalPages: Math.ceil(data.length / state.itemsPerPage),
            }));
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    },
    filterProperties: (searchTerm, maxPrice, propertyType) => {
        const { properties, itemsPerPage } = get();
        const filtered = properties.filter((property) => {
            const matchesSearch =
                property.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                property.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesPrice = maxPrice
                ? parseFloat(property.price) <= maxPrice
                : true;
            const matchesType = propertyType
                ? property.type === propertyType
                : true;
            return matchesSearch && matchesPrice && matchesType;
        });
        set({
            filteredProperties: filtered,
            currentPage: 1,
            totalPages: Math.ceil(filtered.length / itemsPerPage),
        });
    },
    buyProperty: async (
        propertyId: string,
        amount: string,
        buyerId: string
    ) => {
        try {
            console.log(propertyId, amount, buyerId);
            const response = await axios.post(
                "http://localhost:3001/api/transaction/create",
                {
                    propertyId: propertyId,
                    amount: amount,
                    buyerId: buyerId,
                },
                {
                    withCredentials: true,
                }
            );
            const data = await response.data;
            set((state) => {
                const updatedProperties = state.properties.filter(
                    (p) => p.id !== propertyId
                );
                const updatedFilteredProperties =
                    state.filteredProperties.filter((p) => p.id !== propertyId);
                return {
                    properties: updatedProperties,
                    filteredProperties: updatedFilteredProperties,
                    totalPages: Math.ceil(
                        updatedFilteredProperties.length / state.itemsPerPage
                    ),
                };
            });
            return {
                success: true,
                message: "Property bought successfully",
            };
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            return {
                success: false,
                message: response?.data.errorMessage || "An unexpected error occurred",
            };
        }
    },
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setItemsPerPage: (items: number) =>
        set((state) => ({
            itemsPerPage: items,
            totalPages: Math.ceil(state.filteredProperties.length / items),
        })),
}));
