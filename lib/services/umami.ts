import { getClient } from '@umami/api-client'

const client = getClient({
	apiEndpoint: process.env.NEXT_PUBLIC_UMAMI_HOST,
	apiKey: process.env.UMAMI_API_KEY,

	// secret:"",
	// userId: 'df605b01-6889-4d62-8805-e02c4962edfe',
	// baseUrl: process.env.NEXT_PUBLIC_UMAMI_HOST || '',
	// token: process.env.UMAMI_API_KEY || '',
})

export const umamiClient = client
