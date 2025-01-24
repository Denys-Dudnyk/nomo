'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const updateProfileSchema = z.object({
	full_name: z.string().min(3, "Ім'я повинно містити мінімум 2 символи"),
	phone_number: z
		.string()
		.regex(/^\+38 $$\d{3}$$ \d{3}-\d{4}$/, 'Невірний формат телефону'),
	email: z.string().email('Невірний формат email'),
})

export async function updateProfile(
	userId: string,
	data: {
		full_name?: string
		phone_number?: string
		email?: string
	}
) {
	try {
		const cookieStore = cookies()
		//@ts-ignore
		const supabase = await createClient(cookieStore)

		// Validate the data
		const validatedData = updateProfileSchema.partial().parse(data)

		// Update auth email if it's being changed
		if (validatedData.email) {
			const { error: authError } = await supabase.auth.admin.updateUserById(
				userId,
				{ email: validatedData.email }
			)
			if (authError) throw authError
		}

		// Update profile
		const { error: profileError } = await supabase
			.from('user_profiles')
			.update(validatedData)
			.eq('user_id', userId)

		if (profileError) throw profileError

		return { success: true }
	} catch (error) {
		console.error('Error updating profile:', error)
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Помилка оновлення профілю',
		}
	}
}
