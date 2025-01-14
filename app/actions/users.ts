'use server'

import { createClient } from '@/lib/supabase/server'
import { UserProfile } from '@/types/database'
import { cookies } from 'next/headers'

export async function getUsers(): Promise<UserProfile[]> {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	// Простой запрос - RLS политики сами обработают доступ
	const { data, error } = await supabase
		.from('user_profiles')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) {
		console.error('Error fetching profiles:', error)
		return []
	}

	return data || []
}
