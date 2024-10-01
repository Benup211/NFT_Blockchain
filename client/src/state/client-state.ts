import { create } from "zustand";
import { IClientState } from "../types/client-types";

export const useClientState = create<IClientState>((set) => ({
    navbar: "Home",
    setNavbarTab: (tab: string) => {
        set((state) => ({ ...state, navbar: tab }));
    },
}));
