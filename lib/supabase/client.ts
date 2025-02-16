import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
		{
			realtime: {
				params: {
					eventsPerSecond: 100,
				},
			},
			auth: {
				persistSession: true,
				autoRefreshToken: true,
			},
		}
	)
}
