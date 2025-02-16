import { createBrowserClient } from '@supabase/ssr'

export function createClientSingleton() {
	let supabaseClient = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // IMPORTANT: Use ANON_KEY, not SERVICE_ROLE_KEY
		{
			realtime: {
				params: {
					eventsPerSecond: 10, // Reduced to prevent throttling
				},
			},
			auth: {
				persistSession: true,
				autoRefreshToken: true,
			},
		}
	)

	return supabaseClient
}

export const createClient = createClientSingleton
