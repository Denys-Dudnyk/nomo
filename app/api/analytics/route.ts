import { NextResponse } from 'next/server'
import { simpleAnalyticsClient } from '@/lib/services/simple-analytics'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const startAt = searchParams.get('startAt')
		const endAt = searchParams.get('endAt')

		if (!startAt || !endAt) {
			return NextResponse.json(
				{ error: 'Missing required parameters' },
				{ status: 400 }
			)
		}

		console.log('Fetching stats with params:', {
			startAt: new Date(Number.parseInt(startAt)).toISOString(),
			endAt: new Date(Number.parseInt(endAt)).toISOString(),
		})

		const stats = await simpleAnalyticsClient.getStats(
			new Date(Number.parseInt(startAt)),
			new Date(Number.parseInt(endAt))
		)

		console.log('Received stats:', stats)

		// Проверяем, что у нас есть данные
		if (!stats.visitors.length || !stats.dates.length) {
			console.log('No data received from Simple Analytics')
			// Возвращаем пустые массивы, но с правильной структурой
			return NextResponse.json({
				data: {
					visitors: [],
					dates: [],
				},
			})
		}

		return NextResponse.json({
			data: stats,
			debug: {
				timeframe: {
					start: new Date(Number.parseInt(startAt)).toISOString(),
					end: new Date(Number.parseInt(endAt)).toISOString(),
				},
			},
		})
	} catch (error) {
		console.error('Analytics API error:', error)
		return NextResponse.json(
			{
				error: 'Failed to fetch analytics data',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		)
	}
}
