import { ArrowUpRight, ArrowDownRight, Coins, Home, Activity } from 'lucide-react'

interface QuickInsightsProps {
  walletBalance: number
}

export function QuickInsights({ walletBalance }: QuickInsightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <InsightCard
        title="Wallet Balance"
        value={`Ξ ${walletBalance.toFixed(4)}`}
        change={2.5}
        icon={<Coins className="h-4 w-4" />}
      />
      <InsightCard
        title="Active Listings"
        value="187"
        change={-0.8}
        icon={<Home className="h-4 w-4" />}
      />
      <InsightCard
        title="Avg. Property Value"
        value="Ξ 320.000"
        change={1.2}
        icon={<Activity className="h-4 w-4" />}
      />
      <InsightCard
        title="User Engagement"
        value="92%"
        change={3.1}
        icon={<ArrowUpRight className="h-4 w-4" />}
      />
    </div>
  )
}

interface InsightCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

function InsightCard({ title, value, change, icon }: InsightCardProps) {
  const isPositive = change >= 0
  return (
    <div className="bg-background p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        {icon}
      </div>
      <p className="text-2xl font-semibold mt-2">{value}</p>
      <div className={`flex items-center mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <ArrowUpRight className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 mr-1" />
        )}
        <span className="text-sm font-medium">{Math.abs(change)}%</span>
      </div>
    </div>
  )
}

