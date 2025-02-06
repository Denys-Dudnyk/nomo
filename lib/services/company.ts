import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function getCompanyByUserEdrpou(userEdrpou: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		// Сначала получаем ЕДРПОУ из user_partners
		const { data: userPartner, error: userError } = await supabase
			.from('user_partners')
			.select('edrpou')
			.single()

		if (userError) throw userError

		if (!userPartner?.edrpou) {
			return null
		}

		// Затем ищем компанию с таким же ЕДРПОУ
		const { data: company, error: companyError } = await supabase
			.from('companies')
			.select('*')
			.eq('edrpou', userPartner.edrpou)
			.single()

		if (companyError) throw companyError

		return company
	} catch (error) {
		console.error('Error fetching company:', error)
		return null
	}
}
