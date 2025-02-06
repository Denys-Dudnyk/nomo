import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const startAt = searchParams.get('startAt')
		const endAt = searchParams.get('endAt')
		const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
		const apiKey = process.env.UMAMI_API_KEY
		const host = process.env.NEXT_PUBLIC_UMAMI_HOST?.replace('/share', '') // Убираем /share из URL

		// Логируем параметры (кроме apiKey)
		console.log('Request parameters:', {
			startAt,
			endAt,
			websiteId,
			host,
		})

		if (!websiteId || !startAt || !endAt || !apiKey || !host) {
			throw new Error(
				`Missing parameters: ${[
					!websiteId && 'websiteId',
					!startAt && 'startAt',
					!endAt && 'endAt',
					!apiKey && 'apiKey',
					!host && 'host',
				]
					.filter(Boolean)
					.join(', ')}`
			)
		}

		// Используем правильный API endpoint
		const url = `${host}/api/website/${websiteId}/stats`
		console.log('Requesting URL:', url)

		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
				Accept: 'application/json',
			},
			next: { revalidate: 60 },
		})

		// Логируем статус ответа
		console.log('Response status:', response.status)

		if (!response.ok) {
			const errorText = await response.text()
			console.error('Error response:', errorText)
			throw new Error(`API returned ${response.status}: ${errorText}`)
		}

		const data = await response.json()
		return NextResponse.json(data)
	} catch (error) {
		console.error('Full error:', error)
		return NextResponse.json(
			{
				error: 'Failed to fetch analytics',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		)
	}
}
