import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import CompanySettingsForm from './company-settings-form'

interface PageProps {
	params: Promise<{ id: string }>
}

export default async function CompanySettingsPage({ params }: PageProps) {
	const { id } = await params
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	// Get current session for admin check
	const {
		data: { session },
	} = await supabase.auth.getSession()
	if (!session) {
		redirect('/auth/login')
	}

	// Get company data
	const { data: company, error } = await supabase
		.from('companies')
		.select('*')
		.eq('id', id)
		.single()

	if (error || !company) {
		redirect('/dashboard/companies')
	}

	return <CompanySettingsForm company={company} />
}
