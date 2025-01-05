'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { chartData, chartConfig, getLineColor } from '../utils/chartUtils';


export function BarChartComponent() {
    return (
        <ChartContainer config={chartConfig} className="border-0">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        left: 12,
                        right: 12,
                        top: 20,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid vertical={false} stroke="#555" />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                        stroke="#bbb"
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                        tickMargin={10}
                        stroke="#bbb"
                    />
                    <Tooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
                    <Bar
                        dataKey="desktop"
                        fill={getLineColor(chartData[chartData.length - 1].desktop)}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

