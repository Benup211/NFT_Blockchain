import { create } from 'zustand'
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "../types/error-types";
export type PropertyType = 'house' | 'apartment'

export interface Property {
  name: string
  location: string
  features: string[]
  description:string
  price: string
  type: PropertyType
  image: string
  contractText: string
  tokenID:string
  ipfsHash:string
}

interface PropertyCreateStore {
    property: Property
    createProperty: (property:Property) => Promise<void>
    isCreating: boolean
}

export const usePropertyCreateStore = create<PropertyCreateStore>((set) => ({

    property: {
        name: '',
        location: '',
        features: [],
        description:'',
        price: '',
        type: 'house',
        image: '',
        contractText: '',
        tokenID:'',
        ipfsHash:''
    },
    isCreating: false,
    createProperty: async (property: Property) => {
        set({ isCreating: true });
        try {
            console.log(property)
            const response = await axios.post(
                "http://localhost:3001/api/property/create",
                property,
                { withCredentials: true }
            );
            set({ isCreating: false });
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isCreating: false });
            throw Error(response?.data.errorMessage);
        }
    },
}));