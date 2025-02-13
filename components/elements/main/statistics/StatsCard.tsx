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
import { format, subDays, subMonths, subHours } from 'date-fns'
import { uk } from 'date-fns/locale'
import { getUsers } from '@/app/actions/users'
import { useTranslations } from 'next-intl'

interface StatsCardProps {
	title: string
	type: 'visits' | 'users' | 'transactions' | 'crypto'
}

interface ChartData {
	date: string
	value: number
	forecast: number
}

const StatsCard = ({ title, type }: StatsCardProps) => {
	const [activeTimeframe, setActiveTimeframe] = useState<
		'12m' | '30d' | '7d' | '24h'
	>('7d')
	const [data, setData] = useState<ChartData[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			if (type === 'users') {
				try {
					const users = await getUsers()
					// Рахуємо кількість користувачів за датами (кількість нових реєстрацій у кожен день)
					const usersByDate = users.reduce(
						(acc: { [key: string]: number }, user) => {
							const date = new Date(user.created_at).toISOString().split('T')[0]
							acc[date] = (acc[date] || 0) + 1
							return acc
						},
						{}
					)

					// Визначаємо діапазон дат залежно від вибраного періоду
					const now = new Date()
					let start: Date
					switch (activeTimeframe) {
						case '12m':
							start = subMonths(now, 12)
							break
						case '30d':
							start = subDays(now, 30)
							break
						case '7d':
							start = subDays(now, 7)
							break
						case '24h':
							start = subHours(now, 24)
							break
						default:
							start = subMonths(now, 1)
					}

					// Створюємо масив дат (у форматі YYYY-MM-DD) від start до now
					const dates: string[] = []
					let currentDate = start
					while (currentDate <= now) {
						dates.push(currentDate.toISOString().split('T')[0])
						currentDate = new Date(
							currentDate.setDate(currentDate.getDate() + 1)
						)
					}

					// Рахуємо накопичувальну суму
					let cumulative = 0
					const chartData = dates.map(date => {
						// Кількість реєстрацій у конкретний день
						const daily = usersByDate[date] || 0
						// Додаємо до накопичувальної суми
						cumulative += daily
						return {
							date: format(new Date(date), 'dd MMM', { locale: uk }),
							value: cumulative,
							forecast: Math.round(cumulative * (1.2 + Math.random() * 0.3)), // прогноз 120-150% від накопиченої кількості
						}
					})

					setData(chartData)
				} catch (error) {
					console.error('Error fetching users:', error)
					setData([
						{
							date: format(new Date(), 'dd MMM', { locale: uk }),
							value: 0,
							forecast: 0,
						},
					])
				}
				setLoading(false)
				return
			}

			if (type === 'visits') {
				setLoading(true)
				try {
					const now = new Date()
					let start: Date

					switch (activeTimeframe) {
						case '12m':
							start = subMonths(now, 12)
							break
						case '30d':
							start = subDays(now, 30)
							break
						case '7d':
							start = subDays(now, 7)
							break
						case '24h':
							start = subHours(now, 24)
							break
						default:
							start = subMonths(now, 1)
					}

					const response = await fetch(
						`/api/analytics?startAt=${start.getTime()}&endAt=${now.getTime()}`
					)
					const result = await response.json()
					console.log('API Response:', result)

					if (!result.data?.visitors || !result.data?.dates) {
						throw new Error('Invalid data format received')
					}

					// Перетворюємо дані і додаємо прогноз
					const chartData: ChartData[] = result.data.dates.map(
						(date: string, index: number) => {
							const visitors = result.data.visitors[index]
							const forecastMultiplier = 1.2 + Math.random() * 0.3
							return {
								date: format(new Date(date), 'dd MMM', { locale: uk }),
								value: visitors,
								forecast: Math.round(visitors * forecastMultiplier),
							}
						}
					)

					console.log('Transformed chart data:', chartData)
					setData(chartData)
				} catch (error) {
					console.error('Error fetching statistics:', error)
					setData([
						{
							date: format(new Date(), 'dd MMM', { locale: uk }),
							value: 40,
							forecast: 50,
						},
					])
				} finally {
					setLoading(false)
				}
				return
			}

			// Mock дані для інших типів (transactions, crypto)
			const mockData = Array.from({ length: 12 }, (_, i) => ({
				date: format(subMonths(new Date(), 11 - i), 'LLL', { locale: uk }),
				value: 40000 + Math.random() * 20000,
				forecast: 45000 + Math.random() * 20000,
			}))
			setData(mockData)
			setLoading(false)
		}

		fetchData()
	}, [activeTimeframe, type])

	// Обчислюємо максимальне значення для шкали осі Y
	const maxValue = Math.max(
		...data.map(item => Math.max(item.value, item.forecast))
	)
	const yAxisMax = Math.ceil(maxValue * 1.2) // додаємо 20% запасу

	const t = useTranslations('mainpage.statistics')

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
							activeTimeframe === '12m' ? 'text-[#FF8A00]' : 'text-[#919191]'
						}`}
					>
						{t('days.12m')}
					</button>
					<button
						onClick={() => setActiveTimeframe('30d')}
						className={`border border-[#919191] px-5 py-[14px] ${
							activeTimeframe === '30d' ? 'text-[#FF8A00]' : 'text-[#919191]'
						}`}
					>
						{t('days.30d')}
					</button>
					<button
						onClick={() => setActiveTimeframe('7d')}
						className={`border border-[#919191] px-5 py-[14px] ${
							activeTimeframe === '7d' ? 'text-[#FF8A00]' : 'text-[#919191]'
						}`}
					>
						{t('days.7d')}
					</button>
					<button
						onClick={() => setActiveTimeframe('24h')}
						className={`border border-[#919191] rounded-tr-[10px] rounded-br-[10px] px-5 py-[14px] ${
							activeTimeframe === '24h' ? 'text-[#FF8A00]' : 'text-[#919191]'
						}`}
					>
						{t('days.24h')}
					</button>
				</div>
			</CardHeader>
			<CardContent>
				<div className='h-[300px] mt-4'>
					{loading ? (
						<div className='flex items-center justify-center h-full text-[#919191]'>
							Завантаження...
						</div>
					) : data.length === 0 ? (
						<div className='flex items-center justify-center h-full text-[#919191]'>
							Немає даних для відображення
						</div>
					) : (
						<ResponsiveContainer width='100%' height='100%'>
							<AreaChart
								data={data}
								margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
							>
								<defs>
									<linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
										<stop offset='5%' stopColor='#A595FF' stopOpacity={0.3} />
										<stop offset='95%' stopColor='#A595FF' stopOpacity={0} />
									</linearGradient>
									<linearGradient
										id='colorForecast'
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop offset='5%' stopColor='#EAD0FF' stopOpacity={0.3} />
										<stop offset='95%' stopColor='#EAD0FF' stopOpacity={0} />
									</linearGradient>
								</defs>
								<XAxis
									dataKey='date'
									tick={{ fill: '#919191' }}
									axisLine={false}
									tickLine={false}
									tickMargin={25}
								/>
								<YAxis
									domain={[0, yAxisMax]}
									tick={{ fill: '#919191' }}
									axisLine={false}
									tickLine={false}
									width={60}
									tickMargin={15}
								/>
								<Tooltip
									contentStyle={{
										backgroundColor: '#1F2937',
										border: 'none',
										borderRadius: '8px',
										color: 'white',
									}}
								/>

								<Area
									type='monotone'
									dataKey='forecast'
									stroke='#EAD0FF'
									strokeWidth={2}
									fill='url(#colorForecast)'
									name='Прогноз'
								/>
								<Area
									type='monotone'
									dataKey='value'
									stroke='#A595FF'
									strokeWidth={2}
									fill='url(#colorValue)'
									name='Реальні дані'
								/>
							</AreaChart>
						</ResponsiveContainer>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default StatsCard
