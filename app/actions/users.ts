'use server'

import { createClient } from '@/lib/supabase/server'
import { UserProfile } from '@/types/database'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function getUsers(): Promise<UserProfile[]> {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

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

export async function getUserAcknowledgment(userId: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		console.log('Checking acknowledgment for user:', userId)

		const { data, error } = await supabase
			.from('user_profiles')
			.select('has_acknowledged_terms')
			.eq('user_id', userId)
			.single()

		if (error) {
			console.error('Database error:', error)
			throw error
		}

		console.log('Acknowledgment data:', data)
		return data?.has_acknowledged_terms ?? false
	} catch (error) {
		console.error('Error getting user acknowledgment:', error)
		return false
	}
}

export async function updateUserAcknowledgment(userId: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		console.log('Updating acknowledgment for user:', userId)

		const { error } = await supabase
			.from('user_profiles')
			.update({ has_acknowledged_terms: true })
			.eq('user_id', userId)

		if (error) throw error

		revalidatePath('/dashboard')
		return { success: true }
	} catch (error) {
		console.error('Error updating user acknowledgment:', error)
		return { success: false, error }
	}
}
