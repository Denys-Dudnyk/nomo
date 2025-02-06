"use client"

import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface LineChartProps {
  data: any[]
  categories: string[]
  index: string
  colors?: string[]
  className?: string
}

export function LineChart({ data, categories, index, colors = ["#0ea5e9"], className }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsLineChart data={data}>
        <XAxis dataKey={index} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

