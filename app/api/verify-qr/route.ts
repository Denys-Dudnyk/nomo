import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'

export async function POST(request: Request) {
	try {
		const cookieStore = cookies()
		// @ts-ignore
		const supabase = await createClient(cookieStore)

		const { qrData, transactionData } = await request.json()
		console.log('Request QR data:', qrData)

		// Get current user (scanner)
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser()

		if (userError || !user) {
			console.error('User auth error:', userError)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		// Verify QR data format
		try {
			const { userId, timestamp, signature, id } = JSON.parse(qrData)
			console.log('Parsed QR data:', { userId, timestamp, signature, id })

			// Verify that the QR code belongs to a valid user
			// const { data: qrOwner, error: ownerError } = await supabase
			// 	.from('user_profiles')
			// 	.select('user_id')
			// 	.eq('qr_code_id', userId)
			// 	.single()

			// const { data: qrTransaction, error: qrError } = await supabase
			// 	.from('user_profiles')
			// 	.select('user_id')
			// 	.eq('qr_code_id', userId)
			// 	.single()

			// if (ownerError || !qrOwner) {
			// 	console.error('Invalid QR code owner:', ownerError)
			// 	return NextResponse.json(
			// 		{ error: 'Invalid QR code owner' },
			// 		{ status: 400 }
			// 	)
			// }

			// const qrOwnerId = qrTransaction?.user_id
			// console.log(`id : ${qrOwnerId}`)

			// Check if QR code has already been used
			const { data: existingTransaction, error: fetchError } = await supabase
				.from('transactions')
				.select('id')
				.eq('user_id', id) // Check against QR owner's ID
				.eq('qr_signature', signature)
				.maybeSingle()

			if (fetchError) {
				console.error('Transaction fetch error:', fetchError)
				throw fetchError
			}

			if (existingTransaction) {
				console.warn('QR code already used')
				return NextResponse.json(
					{ error: 'QR code already used' },
					{ status: 400 }
				)
			}

			const now = new Date()

			const formattedDate = format(now, 'dd MMMM.', { locale: uk }) // Например: 05 Трав.
			const formattedTime = format(now, 'HH:mm') // Например: 03:46

			const { data: companyData } = await supabase
				.from('companies')
				.select('*')
				.eq('id', transactionData.company_id)
				.single()

			// Create new transaction for the QR code owner
			const { data: transaction, error: transactionError } = await supabase
				.from('transactions')
				.insert([
					{
						user_id: id, // Use QR owner's ID instead of scanner's ID
						description: transactionData.description,
						status: 'success',
						amount: transactionData.amount,
						savings_percent: companyData.additional_discount,
						savings_amount: Math.round(
							transactionData.amount * (companyData.additional_discount / 100)
						),
						balance: Math.round(
							transactionData.amount * (companyData.additional_discount / 100)
						),
						qr_code_id: userId,
						qr_signature: signature,
						scanned_by: user.id, // Store who scanned the QR code
						scanned_date: formattedDate,
						scanned_time: formattedTime,
					},
				])
				.select()
				.single()

			if (transactionError) {
				console.error('Transaction insert error:', transactionError)
				throw transactionError
			}

			// После успешного добавления транзакции
			if (transaction) {
				// Получаем текущий кешбэк баланс пользователя
				const { data: userProfile, error: userProfileError } = await supabase
					.from('user_profiles')
					.select('cashback_balance')
					.eq('user_id', id)
					.maybeSingle()

				if (userProfileError) {
					console.error(
						'Ошибка получения профиля пользователя:',
						userProfileError
					)
					return NextResponse.json(
						{ error: 'Ошибка обновления баланса' },
						{ status: 500 }
					)
				}

				if (!userProfile) {
					console.warn(`Пользователь с ID ${id} не найден в user_profiles`)
					return NextResponse.json(
						{ error: 'Пользователь не найден' },
						{ status: 404 }
					)
				}

				const newBalance =
					(userProfile.cashback_balance || 0) + transaction.balance

				// Обновляем баланс пользователя
				const { error: updateError } = await supabase
					.from('user_profiles')
					.update({ cashback_balance: newBalance })
					.eq('user_id', id)

				if (updateError) {
					console.error('Ошибка обновления баланса:', updateError)
					return NextResponse.json(
						{ error: 'Ошибка обновления баланса' },
						{ status: 500 }
					)
				}

				console.log(`Баланс обновлён! Новый баланс: ${newBalance}`)
			}

			console.log('Transaction created:', transaction)
			return NextResponse.json({ success: true, transaction })
		} catch (e) {
			console.error('QR code parsing or validation error:', e)
			return NextResponse.json({ error: 'Invalid QR code' }, { status: 400 })
		}
	} catch (error) {
		console.error('Unexpected server error:', error)
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
