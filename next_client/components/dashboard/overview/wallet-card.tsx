"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from 'lucide-react'
import { useWalletStore } from "@/state/use-wallet-state"

export function WalletCard() {
  const { isConnected, address, balance, connect, disconnect } = useWalletStore()

  useEffect(() => {
    // Check if the wallet is already connected (e.g., on page refresh)
    if (typeof window.ethereum !== "undefined" && window.ethereum.selectedAddress) {
      connect()
    }
  }, [connect])

  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wallet</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
            <div className="text-2xl font-bold">{parseFloat(balance).toFixed(4)} ETH</div>
            <Button onClick={disconnect} variant="outline" size="sm" className="mt-2">Disconnect</Button>
          </div>
        ) : (
          <Button onClick={connect} className="w-full">Connect Wallet</Button>
        )}
      </CardContent>
    </Card>
  )
}

