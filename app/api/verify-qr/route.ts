import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const cookieStore = cookies()
		//@ts-ignore
		const supabase = await createClient(cookieStore)

		const { qrData } = await request.json()

		// Get current user
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser()
		if (userError || !user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		// Verify QR data format
		try {
			const { userId, timestamp, signature } = JSON.parse(qrData)

			// Check if QR code has already been used
			const { data: existingTransaction } = await supabase
				.from('transactions')
				.select('id')
				.eq('user_id', userId)
				.eq('qr_signature', signature)
				.single()

			if (existingTransaction) {
				return NextResponse.json(
					{ error: 'QR code already used' },
					{ status: 400 }
				)
			}

			// Create new transaction
			const { data: transaction, error: transactionError } = await supabase
				.from('transactions')
				.insert([
					{
						user_id: userId,
						description: 'QR Code Verification',
						status: 'success',
						amount: 150, // Example amount
						savings_percent: 28.67,
						savings_amount: 40,
						balance: 40,
						qr_signature: signature,
					},
				])
				.select()
				.single()

			if (transactionError) throw transactionError

			return NextResponse.json({ success: true, transaction })
		} catch (e) {
			return NextResponse.json({ error: 'Invalid QR code' }, { status: 400 })
		}
	} catch (error) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
