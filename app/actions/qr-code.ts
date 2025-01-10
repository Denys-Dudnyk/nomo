'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function getUserQRCode(userId: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const { data, error } = await supabase
		.from('user_profiles')
		.select('qr_code_id')
		.eq('user_id', userId)
		.single()

	if (error) throw error
	return data.qr_code_id
}

export async function verifyQRCode(qrCodeId: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) throw new Error('Not authenticated')

	// Create a transaction record
	const { error } = await supabase.from('transactions').insert({
		user_id: user.id,
		qr_code_id: qrCodeId,
		amount: 0, // Set appropriate amount
		status: 'completed',
	})

	if (error) throw error
	return true
}

export async function isQRCodeVerified(qrCodeId: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) return false

	const { data, error } = await supabase
		.from('transactions')
		.select('id')
		.eq('user_id', user.id)
		.eq('qr_code_id', qrCodeId)
		.eq('status', 'completed')
		.limit(1)

	if (error) throw error
	return data && data.length > 0
}
