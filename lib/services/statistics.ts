import { getClient } from '@umami/api-client'
import { cookies } from 'next/headers'
import { startOfDay, endOfDay, subDays, format } from 'date-fns'
import { createClient } from '../supabase/server'
// import { getClient as getSupabaseClient } from '@/lib/supabase/server'

const umamiClient = getClient({
	apiKey: process.env.UMAMI_API_KEY || '', // Используем apiKey
	apiEndpoint: process.env.NEXT_PUBLIC_UMAMI_HOST || '', // Используем apiEndpoint для указания базового URL
})

export async function syncVisitorsData() {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)
	const today = new Date()
	const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''

	try {
		const startAt = startOfDay(today).getTime()
		const endAt = endOfDay(today).getTime()

		// Получаем данные о посещениях из Umami
		const stats = await umamiClient.getWebsiteStats(websiteId, {
			startAt,
			endAt,
		})

		// Получаем количество зарегистрированных пользователей из Supabase
		const { count: registeredUsers, error: userError } = await supabase
			.from('auth.users')
			.select('*', { count: 'exact', head: true })

		if (userError) throw userError

		// Обновляем таблицу статистики
		const { error } = await supabase.from('statistics').upsert(
			{
				date: format(today, 'yyyy-MM-dd'),
				visits: stats?.data?.visitors || 0,
				registered_users: registeredUsers || 0,
			},
			{
				onConflict: 'date',
			}
		)

		if (error) throw error

		return { success: true }
	} catch (error) {
		console.error('Error syncing statistics:', error)
		return { success: false, error }
	}
}

export async function getStatisticsForPeriod(
	timeframe: '12m' | '30d' | '7d' | '24h'
) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)
	const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''
	const now = new Date()

	try {
		const startAt = startOfDay(
			subDays(now, getTimeframeDays(timeframe))
		).getTime()
		const endAt = endOfDay(now).getTime()

		// Получаем данные из Umami и Supabase
		const [umamiStats, { data: supabaseStats, error: supabaseError }] =
			await Promise.all([
				umamiClient.getWebsiteStats(websiteId, {
					startAt,
					endAt,
					// unit: getTimeframeUnit(timeframe),
				}),
				supabase
					.from('statistics')
					.select('*')
					.gte(
						'date',
						format(subDays(now, getTimeframeDays(timeframe)), 'yyyy-MM-dd')
					)
					.lte('date', format(now, 'yyyy-MM-dd'))
					.order('date', { ascending: true }),
			])

		if (supabaseError) throw supabaseError
		if (
			!umamiStats?.data?.visitors ||
			!Array.isArray(umamiStats.data.visitors)
		) {
			throw new Error('Umami statistics data is not in the expected format')
		}

		// Объединяем данные
		return umamiStats?.data?.visitors.map((item, index) => ({
			date: format(new Date(item.date), 'yyyy-MM-dd'),
			visits: item.value, // Доступ к правильному полю для посещений
			registered_users: supabaseStats?.[index]?.registered_users || 0,
		}))
	} catch (error) {
		console.error('Error fetching statistics:', error)
		return []
	}
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
