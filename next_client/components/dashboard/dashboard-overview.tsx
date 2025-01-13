"use client";

import { Building2, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarketChart } from "./overview/market-chart";
import { MarketTrends } from "./overview/market-trends";
import { WalletCard } from "./overview/wallet-card";
import { QuickInsights } from "./overview/quick-insights";
import { useWalletStore } from "@/state/use-wallet-state";
import { useAuthStore } from "@/state/auth-state";
import Link from "next/link";

export default function DashboardOverview() {
    const { user } = useAuthStore();
    const userName = user.first_name;
    const propertyOwners = 1234;
    const marketStatus = "Stable";
    const { isConnected, balance } = useWalletStore();

    return (
        <div className="p-6 space-y-6 bg-background">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Welcome, {userName}
                </h1>
                <Link href={'/create-nft'}>
                    <Button>
                        <Building2 className="mr-2 h-4 w-4" /> Add Property
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-background">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Property Owners
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {propertyOwners.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +20% from last month
                        </p>
                    </CardContent>
                </Card>
                <WalletCard />
                <Card className="bg-background">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Market Overview
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{marketStatus}</div>
                        <p className="text-xs text-muted-foreground">
                            3% growth in the last quarter
                        </p>
                    </CardContent>
                </Card>
            </div>

            <QuickInsights
                walletBalance={isConnected ? parseFloat(balance) : 0}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-background">
                    <CardHeader>
                        <CardTitle>Market Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MarketChart />
                    </CardContent>
                </Card>
                <Card className="bg-background">
                    <CardHeader>
                        <CardTitle>Market Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MarketTrends />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
