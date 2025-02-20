'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

interface Company {
	id: string
	name: string
	edrpou: string
	additional_discount?: number
}

export function useCompany() {
	const [company, setCompany] = useState<Company | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchCompany() {
			try {
				const supabase = await createClient()

				// Получаем ЕДРПОУ из user_partners
				const { data: userPartner, error: userError } = await supabase
					.from('partner_profiles')
					.select('edrpou')
					.single()

				if (userError) throw userError

				if (!userPartner?.edrpou) {
					setCompany(null)
					return
				}

				// Ищем компанию с таким же ЕДРПОУ
				const { data: companyData, error: companyError } = await supabase
					.from('companies')
					.select('*')
					.eq('edrpou', userPartner.edrpou)
					.single()

				if (companyError) throw companyError

				setCompany(companyData)
			} catch (error) {
				console.error('Error fetching company:', error)
				setError(
					error instanceof Error ? error.message : 'Failed to fetch company'
				)
			} finally {
				setLoading(false)
			}
		}

		fetchCompany()
	}, [])

	return { company, loading, error }
}
