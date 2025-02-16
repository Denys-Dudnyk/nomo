export type UserProfile = {
	id: number
	user_id: string
	username?: string
	full_name: string
	phone_number: string
	wallet_address?: string
	cashback_balance: number
	total_cashback: number
	referral_code?: string
	referred_by?: string
	contest_bonus: number
	savings_balance: number
	role: 'user' | 'admin'
	created_at: string
	updated_at: string
	profile_image?: string
	has_acknowledged_terms: boolean
	// Added investment-related fields
	current_amount: number
	current_accumulated: number
	investment_start_time: string | null
	timer_state: string | null
	is_accumulating: boolean
}

export interface PartnerProfile {
	id: number
	user_id: string
	username: string
	full_name: string
	phone_number: string
	wallet_address: string
	cashback_balance: number
	total_cashback: number
	referral_code: string
	referred_by: string
	contest_bonus: number
	savings_balance: number
	role: 'partner' | 'admin'
	edrpou: string
	created_at: string
	updated_at: string
	qr_code_id: string
}
