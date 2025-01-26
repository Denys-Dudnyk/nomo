'use server'

import { cookies } from 'next/headers'

import { Company, CompanyDatabase, CompanyFormData } from '@/types/company'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

// Helper function to convert database response to frontend model
// function convertDatabaseToCompany(data: CompanyDatabase): Company {
// 	return {
// 		...data,
// 		description: data.description ?? '',
// 		logo_url: data.logo_url ?? '',
// 		banner_url: data.banner_url ?? '',
// 		location: data.location ?? '',
// 		promocode: data.promocode ?? '',
// 	}
// }

export async function getCompanies() {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const { data, error } = await supabase
		.from('companies')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) throw error
	return data as Company[]
}

export async function getCompany(id: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const { data, error } = await supabase
		.from('companies')
		.select('*')
		.eq('id', id)
		.single()

	if (error) throw error
	return data as Company
}

export async function createCompany(formData: CompanyFormData) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const { data, error } = await supabase
		.from('companies')
		.insert([formData])
		.select()
		.single()

	if (error) throw error

	revalidatePath('/cashback')
	return data as Company
}

export async function updateCompany(
	id: string,
	formData: Partial<CompanyFormData>
) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const { data, error } = await supabase
		.from('companies')
		.update(formData)
		.eq('id', id)
		.select()
		.single()

	if (error) throw error

	revalidatePath('/cashback')
	revalidatePath(`/company/${id}`)
	return data as Company
}

export async function getCompanyById(id: string): Promise<Company | null> {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const { data, error } = await supabase
		.from('companies')
		.select('*')
		.eq('id', id)
		.single()

	if (error) {
		if (error.code === 'PGRST116') {
			return null // Company not found
		}
		throw error
	}

	// Convert database response to frontend model
	return {
		...data,
		description: data.description ?? '',
		logo_url: data.logo_url,
		banner_url: data.banner_url,
		location: data.location ?? '',
		promocode: data.promocode ?? '',
		advantages: data.advantages || [],
		contacts: data.contacts || {
			address: '',
			phone: '',
			email: '',
		},
	} as Company
}

export async function uploadCompanyImage(
	file: File,
	path: string
): Promise<string> {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const { data, error } = await supabase.storage
		.from('company-images')
		.upload(path, file, {
			cacheControl: '3600',
			upsert: true,
		})

	if (error) throw error

	// Get public URL
	const {
		data: { publicUrl },
	} = supabase.storage.from('company-images').getPublicUrl(data.path)

	return publicUrl
}
