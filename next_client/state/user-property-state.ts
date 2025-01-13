import { create } from "zustand";
import axios ,{ AxiosError } from "axios";
import { IErrorResponse } from "../types/error-types";

export interface UserProperty {
    id: string;
    name: string;
    location: string;
    features: string[];
    description: string;
    price: string;
    type: "house" | "apartment";
    image: string;
    contractText: string;
    tokenID: string;
    ipfsHash: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    listed: boolean;
}

interface FilterState {
    searchTerm: string;
    propertyType: "all" | "house" | "apartment";
    listedStatus: "all" | "true" | "false";
}

interface UserPropertyStore {
    properties: UserProperty[];
    filteredProperties: UserProperty[];
    currentPage: number;
    itemsPerPage: number;
    filters: FilterState;
    isLoading: boolean;
    error: string | null;
    fetchProperties: () => Promise<void>;
    applyFilters: (filters: FilterState) => void;
    setCurrentPage: (page: number) => void;
    setItemsPerPage: (items: number) => void;
    updatePropertyListing: (
        propertyId: string,
        newStatus: boolean
    ) => Promise<void>;
    clearFilters: () => void;
}

export const useUserPropertyStore = create<UserPropertyStore>((set, get) => ({
    properties: [],
    filteredProperties: [],
    currentPage: 1,
    itemsPerPage: 10,
    filters: {
        searchTerm: "",
        propertyType: "all",
        listedStatus: "all",
    },
    isLoading: false,
    error: null,

    fetchProperties: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                "http://localhost:3001/api/property/all-by-user",
                {
                    withCredentials: true,
                }
            );
            set({
                properties: response.data,
                filteredProperties: response.data,
                isLoading: false,
            });
        } catch (error) {
            set({ error: "Failed to fetch properties", isLoading: false });
        }
    },

    applyFilters: (filters: FilterState) => {
        set({ filters });
        const { properties } = get();
        const filtered = properties.filter(
            (property) =>
                property.name
                    .toLowerCase()
                    .includes(filters.searchTerm.toLowerCase()) &&
                (filters.propertyType === "all" ||
                    property.type === filters.propertyType) &&
                (filters.listedStatus === "all" ||
                    property.listed.toString() === filters.listedStatus)
        );
        set({ filteredProperties: filtered, currentPage: 1 });
    },

    setCurrentPage: (page: number) => set({ currentPage: page }),

    setItemsPerPage: (items: number) => set({ itemsPerPage: items }),

    updatePropertyListing: async (id: string, listed: boolean) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                "http://localhost:3001/api/property/update-listing",
                {
                    id,listed
                },
                {
                    withCredentials: true,
                }
            );
            set((state) => ({
                properties: state.properties.map((property) =>
                    property.id === id
                        ? { ...property, listed: listed }
                        : property
                ),
                isLoading: false,
            }));
            get().applyFilters(get().filters);
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            console.log(response?.data.errorMessage);
            set({
                error: "Failed to update property listing",
                isLoading: false,
            });
            throw Error(response?.data.errorMessage);
        }
    },

    clearFilters: () => {
        const clearedFilters: FilterState = {
            searchTerm: "",
            propertyType: "all",
            listedStatus: "all",
        };
        set({ filters: clearedFilters });
        get().applyFilters(clearedFilters);
    },
}));
