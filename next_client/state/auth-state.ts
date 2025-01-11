import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "../types/error-types";

type data = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    blockchainPublicKey: string | null;
};

interface AuthStateProps {
    user: {
        uuid: string;
        email: string;
        first_name: string;
        last_name: string;
        blockchainPublicKey: string;
    };
    isAuthenticated: boolean;
    setAuthenticated: (isAuthenticated: boolean) => void;
    setUser: ({
        uuid,
        first_name,
        last_name,
        email,
        blockchainPublicKey,
    }: {
        uuid: string;
        first_name: string;
        last_name: string;
        email: string;
        blockchainPublicKey: string;
    }) => void;
    registerUser: (data: data) => Promise<void>;
    loginUser: (email: string, password: string) => Promise<void>;
    loginByBlockchainPublicKey: (blockchainPublicKey: string) => Promise<void>;
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
    getUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStateProps>((set) => ({
    user: {
        uuid: "",
        email: "",
        first_name: "",
        last_name: "",
        blockchainPublicKey: "",
    },
    isAuthenticated: false,
    setAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
    },
    setUser: ({ uuid, first_name, last_name, email, blockchainPublicKey }) => {
        set({
            user: { uuid, email, first_name, last_name, blockchainPublicKey },
        });
    },
    isLoading: false,
    setLoading: (isLoading: boolean) => {
        set({ isLoading });
    },
    registerUser: async (data: data) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(
                "http://localhost:3001/api/user/register",
                data
            );
            set({ isLoading: false });
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            throw Error(response?.data.errorMessage);
        }
    },
    loginUser: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(
                "http://localhost:3001/api/user/login",
                { email, password },
                {
                    withCredentials: true,
                }
            );
            set({ isLoading: false, user: response.data });
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            throw Error(response?.data.errorMessage);
        }
    },
    loginByBlockchainPublicKey: async (blockchainPublicKey: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(
                "http://localhost:3001/api/user/login-by-blockchain-public-key",
                { blockchainPublicKey },
                {
                    withCredentials: true,
                }
            );
            set({ user: response.data });
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            throw Error(response?.data.errorMessage);
        }
    },
    getUser: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(
                "http://localhost:3001/api/user/getUser",
                {
                    withCredentials: true,
                }
            );
            set({ user: response.data });
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            throw Error(response?.data.errorMessage);
        }
    },
    logout: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(
                "http://localhost:3001/api/user/logout",
                {
                    withCredentials: true,
                }
            );
            set({
                isLoading: false,
                isAuthenticated: false,
            });
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            throw Error(response?.data.errorMessage);
        }
    },
}));
