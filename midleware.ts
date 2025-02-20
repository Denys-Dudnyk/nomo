import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
	locales: ['ua', 'en', 'pl', 'es'],
	defaultLocale: 'ua',
	// localePrefix: 'as-needed',
})

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)'],
}

export async function middleware(request: NextRequest) {
	const response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	// Allow access to email verification routes without authentication
	if (request.nextUrl.pathname.startsWith('/auth/edit/verify-email')) {
		return NextResponse
	}

	// Handle CORS preflight requests
	if (request.method === 'OPTIONS') {
		return new NextResponse(null, {
			status: 200,
			headers: {
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Access-Control-Allow-Origin': '*',
			},
		})
	}

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value
				},
				set(name: string, value: string, options: CookieOptions) {
					response.cookies.set({
						name,
						value,
						...options,
					})
				},
				remove(name: string, options: CookieOptions) {
					response.cookies.delete({
						name,
						...options,
					})
				},
			},
		}
	)

	const verifyToken = request.nextUrl.searchParams.get('token')
	const isVerifyPage = request.nextUrl.pathname === '/verify'

	// Get reset password state from cookies
	const isResettingPassword =
		request.cookies.get('resetting_password')?.value === 'true'
	const currentPath = request.nextUrl.pathname

	// If user is in password reset flow
	if (isResettingPassword) {
		// Allow only reset-password page and essential assets
		const allowedPaths = [
			'/reset-password',
			'/_next',
			'/favicon.ico',
			'/header',
			'/auth',
		]

		const isAllowedPath = allowedPaths.some(path =>
			currentPath.startsWith(path)
		)

		if (!isAllowedPath) {
			return NextResponse.redirect(new URL('/reset-password', request.url))
		}

		// Explicitly block dashboard access during reset
		if (currentPath.startsWith('/dashboard')) {
			return NextResponse.redirect(new URL('/reset-password', request.url))
		}

		return response
	}

	// If trying to access reset-password page without being in reset flow
	if (currentPath === '/reset-password' && !isResettingPassword) {
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}

	// Normal auth flow
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session && currentPath.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}

	if (
		session &&
		(currentPath.startsWith('/auth') ||
			currentPath === '/auth/login' ||
			currentPath === '/auth/register' ||
			currentPath === '/forgot-password')
	) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	if (isVerifyPage) {
		const email = request.nextUrl.searchParams.get('email')

		if (!email && !verifyToken) {
			return NextResponse.redirect(new URL('/', request.url))
		}
	}

	// Проверяем авторизацию для доступа к продуктам
	if (request.nextUrl.pathname.startsWith('/products')) {
		if (!session) {
			return NextResponse.redirect(new URL('/login', request.url))
		}

		// Проверяем, является ли пользователь партнером
		const { data: partner } = await supabase
			.from('partner_profiles')
			.select('user_id')
			.eq('user_id', session.user.id)
			.single()

		if (!partner) {
			return NextResponse.redirect(new URL('/dashboard', request.url))
		}
	}

	// Add CORS headers to all responses
	response.headers.set('Access-Control-Allow-Origin', '*')
	response.headers.set(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	)
	response.headers.set(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	)

	return response
}
