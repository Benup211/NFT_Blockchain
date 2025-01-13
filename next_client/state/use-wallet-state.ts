import { create } from 'zustand'
import { ethers } from 'ethers'

interface WalletState {
  isConnected: boolean
  address: string
  balance: string
  connect: () => Promise<void>
  disconnect: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: '',
  balance: '',
  connect: async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const balance = ethers.formatEther(await provider.getBalance(address))
        
        set({ isConnected: true, address, balance })
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      console.error("Ethereum object not found, do you have MetaMask installed?")
    }
  },
  disconnect: () => set({ isConnected: false, address: '', balance: '' }),
}))

