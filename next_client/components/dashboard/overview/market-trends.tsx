"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 120 },
  { name: "Mar", value: 110 },
  { name: "Apr", value: 140 },
  { name: "May", value: 160 },
  { name: "Jun", value: 150 },
]

export function MarketTrends() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis 
          stroke="#888888" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false}
          tickFormatter={(value) => `Ξ ${value / 1000}`} 
        />
        <Tooltip 
          formatter={(value: number) => [`Ξ ${value / 1000}`, "Value"]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Line type="monotone" dataKey="value" stroke="#adfa1d" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

