import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'

interface RequestBody {
	phone: string
	email: string
	order_id: string
	amount: number
	api_key: string
}

export async function POST(request: Request) {
	try {
		const cookieStore = cookies()
		//@ts-ignore
		const supabase = await createClient(cookieStore)

		const body: RequestBody = await request.json()
		const { phone, email, order_id, amount, api_key } = body

		// Проверка API ключа
		if (api_key !== process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
			return NextResponse.json({ error: 'Неверный API ключ' }, { status: 403 })
		}

		// Проверяем существующего пользователя
		const { data: existingUser, error: userError } = await supabase
			.from('user_profiles')
			.select('user_id')
			.eq('phone_number', phone)
			.single()

		let userId: string

		const updatedPhone = phone.replace(/\D/g, '')
		if (!existingUser) {
			// Создаем нового пользователя в auth.users
			const { data: authUser, error: createAuthError } =
				await supabase.auth.admin.createUser({
					email: email || `${updatedPhone}@nomocashback.com`,
					phone,
					password: `${process.env.NEXT_PUBLIC_PASS_AUTO}`,
					email_confirm: true,
					phone_confirm: true,
				})

			if (createAuthError) {
				console.error('Error creating auth user:', createAuthError)
				return NextResponse.json(
					{ error: 'Ошибка при создании пользователя' },
					{ status: 400 }
				)
			}

			userId = authUser.user.id

			// Создаем запись в user_profiles
			const { data: profileData, error: profileError } = await supabase
				.from('user_profiles')
				.insert([
					{
						user_id: userId,
						phone_number: phone,
					},
				])

			if (profileError) {
				console.error('Error creating user profile:', profileError)
				return NextResponse.json(
					{ error: 'Ошибка при создании профиля пользователя' },
					{ status: 400 }
				)
			}
		} else {
			userId = existingUser.user_id
		}

		// Форматируем дату и время
		const now = new Date()
		const formattedDate = format(now, 'dd MMMM.', { locale: uk })
		const formattedTime = format(now, 'HH:mm')

		// Проверяем существующего пользователя
		const { data: dataUser } = await supabase
			.from('user_profiles')
			.select('qr_code_id')
			.eq('user_id', userId)
			.single()

		// Создаем транзакцию
		const { data: transaction, error: transactionError } = await supabase
			.from('transactions')
			.insert([
				{
					user_id: userId,
					description: 'Таксі',
					status: 'success',
					amount: amount,
					savings_percent: 28.67,
					savings_amount: Math.round(amount * 0.2867),
					balance: Math.round(amount * 0.2867),
					qr_code_id: dataUser?.qr_code_id,
					qr_signature: order_id,
					scanned_date: formattedDate,
					scanned_time: formattedTime,
				},
			])
			.select()
			.single()

		if (transactionError) {
			console.error('Error creating transaction:', transactionError)
			return NextResponse.json(
				{ error: 'Ошибка при создании транзакции' },
				{ status: 400 }
			)
		}

		// const { data, error: signInError } = await supabase.auth.signInWithOtp({
		// 	email: email || `${phone}@temp.com`,
		// 	options: {
		// 		data: {
		// 			userId: userId,
		// 		},
		// 		emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/login-callback?userId=${userId}&next=/dashboard`,
		// 	},
		// })

		// if (signInError) {
		// 	console.error('Error generating login link:', signInError)
		// 	return NextResponse.json({
		// 		success: true,
		// 		transaction,
		// 		message:
		// 			'Транзакция успешно создана, но не удалось создать ссылку для входа',
		// 	})
		// }

		const loginUrl = `${
			process.env.NEXT_PUBLIC_SITE_URL
		}/auth/login-callback?email=${
			email || `${updatedPhone}@nomocashback.com`
		}&next=/dashboard`

		return NextResponse.json({
			success: true,
			transaction,
			loginUrl,
			message: 'Пользователь зарегистрирован и кэшбэк начислен',
		})
	} catch (error) {
		console.error('Unexpected error:', error)
		return NextResponse.json(
			{ error: 'Неизвестная ошибка сервера' },
			{ status: 500 }
		)
	}
}
