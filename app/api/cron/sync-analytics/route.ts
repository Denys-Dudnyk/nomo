import { syncDailyStats } from '@/lib/services/analytics-sync'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
	// Проверяем, что запрос пришел от доверенного источника
	const authHeader = request.headers.get('authorization')
	if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const result = await syncDailyStats()
		return NextResponse.json(result)
	} catch (error) {
		return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
	}
}
