import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const cookieStore = cookies()
		//@ts-ignore
		const supabase = await createClient(cookieStore)

		const { userId } = await request.json()

		if (!userId) {
			return NextResponse.json(
				{ error: 'User ID is required' },
				{ status: 400 }
			)
		}

		const newPassword = Math.random().toString(36).slice(-10)

		const { data, error: updateError } =
			await supabase.auth.admin.updateUserById(userId, {
				password: newPassword,
			})

		if (updateError) {
			console.error('Password update error:', updateError)
			return NextResponse.json(
				{ error: 'Failed to update password' },
				{ status: 400 }
			)
		}

		return NextResponse.json({ success: true, password: newPassword })
	} catch (error) {
		console.error('Unexpected error:', error)
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
