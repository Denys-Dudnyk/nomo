import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { format, subDays, subMonths } from 'date-fns'

interface UmamiResponse {
	pageviews: {
		value: number
	}[]
}

export async function fetchUmamiStats(startDate: Date, endDate: Date) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_UMAMI_HOST}/api/websites/${
				process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
			}/metrics?startAt=${startDate.getTime()}&endAt=${endDate.getTime()}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.UMAMI_API_KEY}`,
				},
				next: { revalidate: 3600 }, // Cache for 1 hour
			}
		)

		if (!response.ok) {
			throw new Error('Failed to fetch Umami stats')
		}

		const data: UmamiResponse = await response.json()
		return data.pageviews[0]?.value || 0
	} catch (error) {
		console.error('Error fetching Umami stats:', error)
		return 0
	}
}

export async function syncAnalyticsData() {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)
	const today = new Date()

	try {
		// Get visits from Umami
		const visits = await fetchUmamiStats(
			subDays(today, 1), // Start from yesterday
			today
		)

		// Get registered users count from Supabase
		const { count: registeredUsers } = await supabase
			.from('auth.users')
			.select('*', { count: 'exact', head: true })

		// Update statistics table
		const { error } = await supabase.from('statistics').upsert(
			{
				date: format(today, 'yyyy-MM-dd'),
				visits,
				registered_users: registeredUsers || 0,
			},
			{
				onConflict: 'date',
			}
		)

		if (error) throw error

		return { success: true }
	} catch (error) {
		console.error('Error syncing analytics:', error)
		return { success: false, error }
	}
}

export async function getStatisticsForPeriod(
	timeframe: '12m' | '30d' | '7d' | '24h'
) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)
	const now = new Date()

	let startDate: Date
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
			startDate = subDays(now, 1)
			break
		default:
			startDate = subMonths(now, 12)
	}

	try {
		const { data, error } = await supabase
			.from('statistics')
			.select('*')
			.gte('date', format(startDate, 'yyyy-MM-dd'))
			.lte('date', format(now, 'yyyy-MM-dd'))
			.order('date', { ascending: true })

		if (error) throw error
		return data
	} catch (error) {
		console.error('Error fetching statistics:', error)
		return []
	}
}
