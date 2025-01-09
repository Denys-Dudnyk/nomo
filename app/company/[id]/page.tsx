'use client'

import { useEffect, useState, use } from 'react'
import { notFound } from 'next/navigation'
// import CompanyItem from '@/components/CompanyItem'
import CompanyItem from '@/components/elements/company/CompanyItem'
import { Company } from '@/types/company'
import { createClient } from '@/lib/supabase/client'

interface CompanyPageProps {
	params: Promise<{ id: string }>
}

export default function CompanyPage({ params }: CompanyPageProps) {
	const { id } = use(params)
	const [company, setCompany] = useState<Company | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCompany = async () => {
			try {
				const supabase = createClient()
				const { data, error } = await supabase
					.from('companies')
					.select('*')
					.eq('id', id)
					.single()

				if (error) {
					if (error.code === 'PGRST116') {
						setCompany(null)
					} else {
						console.error('Error fetching company:', error)
					}
					return
				}

				const convertedData = {
					...data,
					description: data.description ?? '',
					logo_url: data.logo_url ?? '',
					banner_url: data.banner_url ?? '',
					location: data.location ?? '',
					promocode: data.promocode ?? '',
					advantages: data.advantages || [],
					contacts: data.contacts || {
						address: '',
						phone: '',
						email: '',
					},
				} as Company

				setCompany(convertedData)
			} catch (error) {
				console.error('Error:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCompany()
	}, [id])

	if (loading) {
		return (
			<div className='min-h-screen bg-[#1C1C1C] text-white flex items-center justify-center'>
				<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white'></div>
			</div>
		)
	}

	if (!company) {
		notFound()
	}

	return <CompanyItem company={company} />
}
