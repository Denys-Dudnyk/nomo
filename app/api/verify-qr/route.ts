import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const cookieStore = cookies()
		// @ts-ignore
		const supabase = await createClient(cookieStore)

		const { qrData } = await request.json()
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

			// Create new transaction for the QR code owner
			const { data: transaction, error: transactionError } = await supabase
				.from('transactions')
				.insert([
					{
						user_id: id, // Use QR owner's ID instead of scanner's ID
						description: 'QR Code Verification',
						status: 'success',
						amount: 150,
						savings_percent: 28.67,
						savings_amount: 40,
						balance: 40,
						qr_signature: signature,
						scanned_by: user.id, // Store who scanned the QR code
						scanned_at: new Date().toISOString(),
					},
				])
				.select()
				.single()

			if (transactionError) {
				console.error('Transaction insert error:', transactionError)
				throw transactionError
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
