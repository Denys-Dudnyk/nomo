export type TransactionStatus = 'pending' | 'success' | 'failed'

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
	created_at: string
}

export interface TransactionCreate {
	description: string
	amount: number
	savings_percent: number
	savings_amount: number
	balance: number
}
