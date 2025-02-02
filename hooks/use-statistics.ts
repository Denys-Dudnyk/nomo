'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { startOfDay, subMonths, subDays, subHours } from 'date-fns'

interface StatisticsData {
	date: string
	visits: number
	registered_users: number
}

export function useStatistics(timeframe: '12m' | '30d' | '7d' | '24h') {
	const [data, setData] = useState<StatisticsData[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchStatistics = async () => {
			const supabase = createClient()

			// Определяем начальную дату на основе временного периода
			const now = new Date()
			let startDate = startOfDay(now)

			switch (timeframe) {
				case '12m':
					startDate = subMonths(now, 12)
					break
				case '30d':
					startDate = subDays(now, 30)
					break
				case '7d':
					startDate = subDays(now, 7)
					break
				case '24h':
					startDate = subHours(now, 24)
					break
			}

			try {
				const { data: statsData, error } = await supabase
					.from('statistics')
					.select('*')
					.gte('date', startDate.toISOString())
					.lte('date', now.toISOString())
					.order('date', { ascending: true })

				if (error) throw error

				setData(statsData || [])
			} catch (error) {
				console.error('Error fetching statistics:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchStatistics()
	}, [timeframe])

	return { data, loading }
}
