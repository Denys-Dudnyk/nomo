'use client'

import { Line, LineChart, ResponsiveContainer } from 'recharts'

interface MiniGraphProps {
    data: number[]
    color: string
}

export function MiniGraph({ data, color }: MiniGraphProps) {
    const chartData = data.map((value, index) => ({ value, index }))

    return (
        <ResponsiveContainer width={60} height={30}>
            <LineChart data={chartData}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

