import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST-запрос для верификации email
export async function POST(request: Request) {
	const supabase = await createClient()
	const { token, email, type } = await request.json()

	console.log

	// Проверяем наличие всех параметров
	if (!token || !email || type !== 'email_change') {
		return NextResponse.json(
			{ error: 'Invalid request. Missing or invalid parameters.' },
			{ status: 400 }
		)
	}

	try {
		// Верифицируем токен через Supabase
		const { error } = await supabase.auth.verifyOtp({
			token: token,
			type: 'email_change',
			email: email, // Старый email
		})

		if (error) {
			console.error('Verification error:', error)
			return NextResponse.json({ error: error.message }, { status: 400 })
		}

		// Возвращаем успешный ответ
		return NextResponse.json({ message: 'Email verified successfully' })
	} catch (err) {
		console.error('Unexpected error:', err)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
