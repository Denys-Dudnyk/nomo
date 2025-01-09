export interface Company {
	id: string
	name: string
	description: string | null
	logo_url: string
	banner_url: string
	is_active: boolean
	location: string | null
	rating: number
	review_count: number
	advantages: string[]
	cashback: number
	promocode: string | null
	contacts: {
		address: string
		phone: string
		email: string
	}
	created_at: string
	updated_at: string
}

export type CompanyFormData = Omit<Company, 'id' | 'created_at' | 'updated_at'>

export type CompanyDatabase = {
	id: string
	name: string
	description: string | null
	logo_url: string | null
	banner_url: string | null
	is_active: boolean
	location: string | null
	rating: number
	review_count: number
	advantages: string[]
	cashback: number
	promocode: string | null
	catalogue_enabled?: boolean
	contacts: {
		address: string
		phone: string
		email: string
	}
	created_at: string
	updated_at: string
}
