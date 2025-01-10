'use server'

import { cookies } from 'next/headers'

import { Transaction, TransactionCreate } from '@/types/transaction'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function getTransactions(userId: string): Promise<Transaction[]> {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const { data, error } = await supabase
		.from('transactions')
		.select('*')
		.eq('user_id', userId)
		.order('created_at', { ascending: false })

	if (error) throw error
	return data as Transaction[]
}

export async function createTransaction(
	userId: string,
	transaction: TransactionCreate
): Promise<Transaction> {
	const cookieStore = cookies()
	//@ts-ignore

	const supabase = await createClient(cookieStore)

	const { data, error } = await supabase
		.from('transactions')
		.insert([
			{
				user_id: userId,
				...transaction,
				status: 'pending',
			},
		])
		.select()
		.single()

	if (error) throw error

	revalidatePath('/dashboard')
	return data as Transaction
}

export async function updateTransactionStatus(
	transactionId: string,
	status: 'success' | 'failed'
): Promise<Transaction> {
	const cookieStore = cookies()
	//@ts-ignore

	const supabase = await createClient(cookieStore)

	const { data, error } = await supabase
		.from('transactions')
		.update({ status })
		.eq('id', transactionId)
		.select()
		.single()

	if (error) throw error

	revalidatePath('/dashboard')
	return data as Transaction
}
