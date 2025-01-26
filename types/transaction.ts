export type TransactionStatus = 'success' | 'pending' | 'failed'

export interface Transaction {
	id: string
	user_id: string
	description: string
	status: TransactionStatus
	amount: number
	savings_percent: number
	savings_amount: number
	balance: number
	ncoins_accrued: number
	company_id: string
	created_at: string
	scanned_time: string
	scanned_date: string
	client_name: string
}

// Type for Supabase response
export interface SupabaseTransactionResponse
	extends Omit<
		Transaction,
		| 'status'
		| 'amount'
		| 'savings_percent'
		| 'savings_amount'
		| 'balance'
		| 'ncoins_accrued'
	> {
	status: string
	amount: string | number
	savings_percent: string | number
	savings_amount: string | number
	balance: string | number
	ncoins_accrued: string | number
}

export interface TransactionCreate {
	description: string
	amount: number
	savings_percent: number
	savings_amount: number
	balance: number
}
