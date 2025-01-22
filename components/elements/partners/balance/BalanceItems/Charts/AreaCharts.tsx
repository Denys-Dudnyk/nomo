'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface AreaChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showGridLines?: boolean
  className?: string
}

export function AreaCharts({
  data,
  index,
  categories,
  colors,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showGridLines = true,
  className,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <AreaChart data={data}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#333333" />}
        {categories.map((category, i) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i]}
            fill={colors[i]}
            fillOpacity={0.1}
            strokeWidth={2}
          />
        ))}
        {showXAxis && (
          <XAxis
            dataKey={index}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
        )}
        {showYAxis && (
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  )
}

