import CompanyProfile from '@/components/elements/company/company_profile/CompanyProfile'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/login')
	}

	// First try to get user profile
	const { data: userProfile, error: userError } = await supabase
		.from('user_profiles')
		.select('*')
		.eq('user_id', session.user.id)
		.single()

	if (userProfile) {
		return <CompanyProfile profile={userProfile} profileType='user' />
	}

	// If no user profile, try to get partner profile
	const { data: partnerProfile, error: partnerError } = await supabase
		.from('partner_profiles')
		.select('*')
		.eq('user_id', session.user.id)
		.single()

	if (partnerProfile) {
		return <CompanyProfile profile={partnerProfile} profileType='partner' />
	}

	// If no profile found, redirect to dashboard
	redirect('/dashboard')
}
