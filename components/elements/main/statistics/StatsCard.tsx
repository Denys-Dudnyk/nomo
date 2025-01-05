'use client'

import {
	AreaChart,
	Area,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

interface DataPoint {
	value: number
	compareValue: number
	month: string
}

interface StatsCardProps {
	title: string
	data: DataPoint[]
}

const StatsCard = ({ title, data }: StatsCardProps) => {
	const [activeTimeframe, setActiveTimeframe] = useState<
		'12m' | '30d' | '7d' | '24h'
	>('12m')

	const formatMonth = (month: string) => {
		return month.charAt(0).toUpperCase() + month.slice(1).replace('.', '')
	}

	const getFilteredData = () => {
		switch (activeTimeframe) {
			case '30d':
				return data.slice(-1)
			case '7d':
				return data.slice(-1)
			case '24h':
				return data.slice(-1)
			default:
				return data
		}
	}

	return (
		<Card className='bg-[#0F0F0F] text-white border-none'>
			<CardHeader className='mb-[30px] pl-0 sm:pl-7'>
				<CardTitle className='text-[26px] leading-[32px] font-normal mb-[30px] text-center sm:text-left'>
					{title}
				</CardTitle>
				<div className='flex text-[10px] sm:text-[15px] font-normal leading-[18.15px] px-2 sm:px-0 items-center sm:items-start justify-center sm:justify-start'>
					<button
						onClick={() => setActiveTimeframe('12m')}
						className={`border border-[#919191] rounded-tl-[10px] rounded-bl-[10px]  px-3 py-[14px] ${
							activeTimeframe === '12m' ? 'text-accent' : 'text-[#919191]'
						}`}
					>
						12 місяців
					</button>
					<button
						onClick={() => setActiveTimeframe('30d')}
						className={`border border-[#919191] hover:bg-white/10 px-5  py-[14px]   transition-colors  ${
							activeTimeframe === '30d' ? 'text-accent' : 'text-[#919191]'
						}`}
					>
						30 днів
					</button>
					<button
						onClick={() => setActiveTimeframe('7d')}
						className={`border border-[#919191] hover:bg-white/10 px-5  py-[14px]  transition-colors text-[#919191] ${
							activeTimeframe === '7d' ? 'text-accent' : 'text-[#919191]'
						}`}
					>
						7 днів
					</button>
					<button
						onClick={() => setActiveTimeframe('24h')}
						className={`border border-[#919191] hover:bg-white/10 px-5  py-[14px] rounded-tr-[10px] rounded-br-[10px]  transition-colors text-[#919191] ${
							activeTimeframe === '24h' ? 'text-accent' : 'text-[#919191]'
						}`}
					>
						24 години
					</button>
				</div>
			</CardHeader>
			<CardContent>
				<div className='h-[200px] mt-4'>
					<ResponsiveContainer width='100%' height='100%'>
						<AreaChart
							data={getFilteredData()}
							margin={{ top: 0, right: 28, left: 0, bottom: 0 }}
						>
							<defs>
								<linearGradient id='colorGradient' x1='0' y1='0' x2='0' y2='1'>
									<stop offset='0%' stopColor='#EAD0FFCC' stopOpacity={'80%'} />
									<stop
										offset='100%'
										stopColor='#EAD0FFCC'
										stopOpacity={'1%'}
									/>
								</linearGradient>
								<linearGradient
									id='compareGradient'
									x1='0'
									y1='0'
									x2='0'
									y2='1'
								>
									<stop offset='0%' stopColor='#A595FFCC' stopOpacity={'80%'} />
									<stop
										offset='100%'
										stopColor='#C1B6FF03'
										stopOpacity={'1%'}
									/>
								</linearGradient>
							</defs>
							<XAxis
								dataKey='month'
								tick={{ fill: '#9CA3AF' }}
								axisLine={false}
								tickLine={false}
								dy={5}
								// minTickGap={-40}
								tickFormatter={formatMonth}
								fontSize={13}
							/>
							<YAxis
								domain={[40000, 60000]}
								tickFormatter={value => `${value / 1000}k`}
								tick={{ fill: '#9CA3AF' }}
								axisLine={false}
								tickLine={false}
								className=''
								tickMargin={14}
								tickCount={3}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: '#1F2937',
									border: 'none',
									borderRadius: '0.5rem',
									color: 'white',
								}}
								formatter={(value: number) => [
									`${(value / 1000).toFixed(1)}k`,
									'Значення',
								]}
							/>
							<Area
								type='monotone'
								dataKey='value'
								stroke='#EAD0FF'
								strokeWidth={3}
								fill='url(#colorGradient)'
							/>
							<Area
								type='monotone'
								dataKey='compareValue'
								stroke='#A595FF'
								strokeWidth={3}
								fill='url(#compareGradient)'
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

export default StatsCard
