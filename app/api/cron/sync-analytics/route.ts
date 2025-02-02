import { syncAnalyticsData } from '@/lib/services/analytics'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
	try {
		const authHeader = request.headers.get('authorization')
		if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const result = await syncAnalyticsData()
		return NextResponse.json(result)
	} catch (error) {
		console.error('Error in sync endpoint:', error)
		return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
	}
}
