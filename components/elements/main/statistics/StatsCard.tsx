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
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/client'
import { umamiClient } from '@/lib/services/umami'

interface StatsCardProps {
	title: string
	type: 'visits' | 'users' | 'transactions' | 'crypto'
}

interface StatData {
	date: string
	visits: number
	registered_users: number
}

const StatsCard = ({ title, type }: StatsCardProps) => {
	const [activeTimeframe, setActiveTimeframe] = useState<
		'12m' | '30d' | '7d' | '24h'
	>('12m')
	const [data, setData] = useState<StatData[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''

			try {
				// Get data for the selected timeframe
				const now = new Date()
				const days = getTimeframeDays(activeTimeframe)
				const startAt = new Date(
					now.getTime() - days * 24 * 60 * 60 * 1000
				).getTime()
				const endAt = now.getTime()

				// Fetch data from Umami
				const stats = await umamiClient.getWebsiteStats(websiteId, {
					startAt,
					endAt,
					// unit: getTimeframeUnit(activeTimeframe), // Ensure correct unit (day, month, hour)
				})

				// Check if the data structure is correct
				if (!stats.data?.visitors || !Array.isArray(stats.data.visitors)) {
					console.error('Invalid data format from Umami:', stats.data?.visitors)
					return
				}

				// Fetch registered users data from Supabase
				const supabase = createClient()
				const { data: supabaseStats, error: supabaseError } = await supabase
					.from('statistics')
					.select('*')
					.order('date', { ascending: true })

				if (supabaseError) throw supabaseError

				// Combine the data
				const combinedData = stats.data.visitors.map((item, index) => ({
					date: format(new Date(item.date), 'yyyy-MM-dd'),
					visits: item.value,
					registered_users: supabaseStats?.[index]?.registered_users || 0,
				}))

				setData(combinedData)
			} catch (error) {
				console.error('Error fetching statistics:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [activeTimeframe])

	const formatChartData = () => {
		if (!data.length) return []

		return data.map(item => ({
			month: format(new Date(item.date), 'MMM', { locale: uk }),
			value: type === 'visits' ? item.visits : item.registered_users,
			forecast:
				type === 'visits' || type === 'users'
					? (type === 'visits' ? item.visits : item.registered_users) *
					  (1 + Math.random() * 0.2)
					: 0,
		}))
	}

	function getTimeframeDays(timeframe: '12m' | '30d' | '7d' | '24h'): number {
		switch (timeframe) {
			case '12m':
				return 365
			case '30d':
				return 30
			case '7d':
				return 7
			case '24h':
				return 1
			default:
				return 30
		}
	}

	function getTimeframeUnit(
		timeframe: '12m' | '30d' | '7d' | '24h'
	): 'hour' | 'day' | 'month' {
		switch (timeframe) {
			case '12m':
				return 'month'
			case '24h':
				return 'hour'
			default:
				return 'day'
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
						className={`border border-[#919191] rounded-tl-[10px] rounded-bl-[10px] px-3 py-[14px] ${
							activeTimeframe === '12m' ? 'text-accent' : 'text-[#919191]'
						}`}
					>
						12М
					</button>
					<button
						onClick={() => setActiveTimeframe('30d')}
						className={`border border-[#919191] px-5 py-[14px] ${
							activeTimeframe === '30d' ? 'text-accent' : 'text-[#919191]'
						}`}
					>
						30Д
					</button>
					<button
						onClick={() => setActiveTimeframe('7d')}
						className={`border border-[#919191] px-5 py-[14px] ${
							activeTimeframe === '7d' ? 'text-accent' : 'text-[#919191]'
						}`}
					>
						7Д
					</button>
					<button
						onClick={() => setActiveTimeframe('24h')}
						className={`border border-[#919191] rounded-tr-[10px] rounded-br-[10px] px-5 py-[14px] ${
							activeTimeframe === '24h' ? 'text-accent' : 'text-[#919191]'
						}`}
					>
						24Г
					</button>
				</div>
			</CardHeader>
			<CardContent>
				<div className='h-[200px] mt-4'>
					{loading ? (
						<div className='flex items-center justify-center h-full text-[#919191]'>
							Завантаження...
						</div>
					) : (
						<ResponsiveContainer width='100%' height='100%'>
							<AreaChart
								data={formatChartData()}
								margin={{ top: 0, right: 28, left: 0, bottom: 0 }}
							>
								<defs>
									<linearGradient
										id='colorGradient'
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop
											offset='0%'
											stopColor='#EAD0FFCC'
											stopOpacity={'80%'}
										/>
										<stop
											offset='100%'
											stopColor='#EAD0FFCC'
											stopOpacity={'1%'}
										/>
									</linearGradient>
									<linearGradient
										id='realDataGradient'
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop offset='0%' stopColor='#FF8A00' stopOpacity={'80%'} />
										<stop
											offset='100%'
											stopColor='#FF8A00'
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
									fontSize={13}
								/>
								<YAxis
									tickFormatter={value => `${(value / 1000).toFixed(1)}k`}
									tick={{ fill: '#9CA3AF' }}
									axisLine={false}
									tickLine={false}
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
									formatter={(value: number, name: string) => [
										`${(value / 1000).toFixed(1)}k`,
										name === 'value' ? 'Реальні дані' : 'Прогноз',
									]}
								/>
								{(type === 'visits' || type === 'users') && (
									<>
										<Area
											type='monotone'
											dataKey='forecast'
											stroke='#EAD0FF'
											strokeWidth={3}
											fill='url(#colorGradient)'
											name='Прогноз'
										/>
										<Area
											type='monotone'
											dataKey='value'
											stroke='#FF8A00'
											strokeWidth={3}
											fill='url(#realDataGradient)'
											name='Реальні дані'
										/>
									</>
								)}
							</AreaChart>
						</ResponsiveContainer>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default StatsCard
