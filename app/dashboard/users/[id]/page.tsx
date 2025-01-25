import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import UserProfile from './user-profile'

export default async function UserPage({ params }: { params: { id: string } }) {
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

	// Check if user is admin
	const { data: adminCheck } = await supabase
		.from('user_profiles')
		.select('role')
		.eq('user_id', session.user.id)
		.single()

	const isAdmin = adminCheck?.role === 'admin'

	if (!isAdmin) {
		redirect('/dashboard')
	}

	// Get user profile data
	const { data: profile, error } = await supabase
		.from('user_profiles')
		.select('*')
		.eq('user_id', params.id)
		.single()

	if (error || !profile) {
		redirect('/dashboard/users')
	}

	return <UserProfile profile={profile} isAdmin={isAdmin} />
}
