interface SimpleAnalyticsStats {
	visitors: number[]
	dates: string[]
}

class SimpleAnalyticsClient {
	private baseUrl: string
	private websiteId: string
	private apiKey: string

	constructor() {
		this.baseUrl = 'https://simpleanalytics.com'
		this.websiteId = 'nomocashback.com'
		this.apiKey = process.env.SIMPLE_ANALYTICS_API_KEY || ''
	}

	async getStats(start: Date, end: Date): Promise<SimpleAnalyticsStats> {
		try {
			const startDate = start.toISOString().split('T')[0]
			const endDate = end.toISOString().split('T')[0]

			const url = `${this.baseUrl}/${this.websiteId}.json?version=5&fields=histogram&start=${startDate}&end=${endDate}`

			console.log('Fetching from URL:', url)

			const response = await fetch(url, {
				headers: {
					'Content-Type': 'application/json',
					'Api-Key': this.apiKey,
				},
			})

			const data = await response.json()
			console.log('Raw API response:', data)

			if (!response.ok || !data.histogram) {
				throw new Error(data.error || 'Failed to fetch data')
			}

			// Преобразуем данные из формата histogram в нужный нам формат
			const result = {
				visitors: data.histogram.map(
					(item: { visitors: number }) => item.visitors
				),
				dates: data.histogram.map((item: { date: string }) => item.date),
			}

			console.log('Transformed data:', result)
			return result
		} catch (error) {
			console.error('Simple Analytics error:', error)
			throw error
		}
	}
}

export const simpleAnalyticsClient = new SimpleAnalyticsClient()
