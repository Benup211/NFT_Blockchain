"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Jan", total: 1.2 },
  { name: "Feb", total: 1.9 },
  { name: "Mar", total: 1.5 },
  { name: "Apr", total: 2.2 },
  { name: "May", total: 2.8 },
  { name: "Jun", total: 2.6 },
]

export function MarketChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis 
          stroke="#888888" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `Ξ ${value}`} 
        />
        <Tooltip 
          formatter={(value) => [`Ξ ${value}`, "Total"]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

