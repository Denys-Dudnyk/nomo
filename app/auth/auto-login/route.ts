import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const token = searchParams.get('token')
		const redirect = searchParams.get('redirect') || '/dashboard'

		if (!token) {
			return NextResponse.redirect(
				`${process.env.NEXT_PUBLIC_SITE_URL}/auth/error`
			)
		}

		const cookieStore = cookies()
		//@ts-ignore
		const supabase = await createClient(cookieStore)

		// Генерируем временный пароль для пользователя
		const tempPassword = Math.random().toString(36).slice(-10)

		// Обновляем пароль пользователя
		const { error: updateError } = await supabase.auth.admin.updateUserById(
			token,
			{ password: tempPassword }
		)

		if (updateError) {
			console.error('Password update error:', updateError)
			return NextResponse.redirect(
				`${process.env.NEXT_PUBLIC_SITE_URL}/auth/error`
			)
		}

		// Выполняем вход с временным паролем
		const {
			data: { session },
			error: signInError,
		} = await supabase.auth.signInWithPassword({
			email: token, // Используем token как email (это ID пользователя)
			password: tempPassword,
		})

		if (signInError || !session) {
			console.error('Sign in error:', signInError)
			return NextResponse.redirect(
				`${process.env.NEXT_PUBLIC_SITE_URL}/auth/error`
			)
		}

		// Устанавливаем куки сессии
		const response = NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_SITE_URL}${redirect}`
		)

		// Устанавливаем куки для сессии
		response.cookies.set('sb-access-token', session.access_token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7, // 1 неделя
		})

		response.cookies.set('sb-refresh-token', session.refresh_token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7, // 1 неделя
		})

		return response
	} catch (error) {
		console.error('Auto-login error:', error)
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_SITE_URL}/auth/error`
		)
	}
}
