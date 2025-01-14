import { create } from "zustand";
import axios, { AxiosError } from "axios";


export interface Prediction {
    Area_Sqft: number;
    City: string;
    Place: string;
    Property_Type: string;
    Bedroom: number;
    Bathroom: number;
    Parking: number;
    Year_Built: number;
}


export interface PredictionState {
    getPredictions: (prediction:Prediction) => Promise<{
        success: boolean;
        predictions: any;
    }>;
    isloading: boolean;
}

export const usePredictionStore = create<PredictionState>((set) => ({
    isloading: false,
    getPredictions: async (prediction:Prediction) => {
        set({ isloading: true });
        try {
            const response = await axios.post("http://localhost:8000/predict", prediction);
            set({ isloading: false });
            return {
                success: true,
                predictions: response.data.predicted_price
            };
        } catch (error) {
            set({ isloading: false });
            return {
                success: false,
                predictions: []
            };
        }
    }
}));