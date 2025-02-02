import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

import { format, subDays, startOfDay, endOfDay } from 'date-fns'
import { UMAMI_CONFIG } from '@/components/analytics/config'

interface UmamiPageviews {
	pageviews: number
}

async function getUmamiStats(date: Date): Promise<number> {
	const startDate = startOfDay(date).getTime()
	const endDate = endOfDay(date).getTime()

	try {
		console.log('🔍 Umami API:', UMAMI_CONFIG)
		console.log(
			'📡 Запрос в Umami:',
			`${UMAMI_CONFIG.apiEndpoint}/api/websites/${UMAMI_CONFIG.websiteId}/stats?startAt=${startDate}&endAt=${endDate}`
		)

		const response = await fetch(
			`${UMAMI_CONFIG.apiEndpoint}/api/websites/${UMAMI_CONFIG.websiteId}/stats?startAt=${startDate}&endAt=${endDate}`,
			{
				method: 'GET',
				headers: {
					Authorization: UMAMI_CONFIG.apiKey,
					Accept: 'application/json',
				},
				next: { revalidate: 3600 }, // Кэшируем на 1 час
			}
		)

		console.log('📩 Ответ от Umami:', response.status, response.statusText)

		if (!response.ok) {
			throw new Error('Failed to fetch Umami stats')
		}

		const responseText = await response.text()
		console.log(
			'📩 Ответ от Umami:',
			response.status,
			response.statusText,
			responseText
		)

		try {
			const data: UmamiPageviews = JSON.parse(responseText)
			return data.pageviews
		} catch (error) {
			console.error('❌ Ошибка парсинга JSON:', error)
			return 0
		}
	} catch (error) {
		console.error('Error fetching Umami stats:', error)
		return 0
	}
}

async function getRegisteredUsersCount(supabase: any): Promise<number> {
	try {
		const { count, error } = await supabase
			.from('auth.users')
			.select('*', { count: 'exact', head: true })

		if (error) throw error
		return count || 0
	} catch (error) {
		console.error('Error counting users:', error)
		return 0
	}
}

export async function syncDailyStats() {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)
	const today = new Date()

	try {
		// Получаем статистику посещений из Umami
		const visits = await getUmamiStats(today)

		// Получаем количество зарегистрированных пользователей
		const registeredUsers = await getRegisteredUsersCount(supabase)

		// Обновляем или создаем запись в таблице statistics
		const { error } = await supabase.from('statistics').upsert(
			{
				date: format(today, 'yyyy-MM-dd'),
				visits,
				registered_users: registeredUsers,
			},
			{
				onConflict: 'date',
			}
		)

		if (error) throw error

		return { success: true }
	} catch (error) {
		console.error('Error syncing stats:', error)
		return { success: false, error }
	}
}
