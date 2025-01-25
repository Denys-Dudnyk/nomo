import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import UserProfile from './user-profile'

interface PageProps {
	params: Promise<{ id: string }>
}

export default async function UserPage({ params }: PageProps) {
	// Await the params
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

	// Get user profile data using the awaited id
	const { data: profile, error } = await supabase
		.from('user_profiles')
		.select('*')
		.eq('user_id', id)
		.single()

	if (error || !profile) {
		redirect('/dashboard/users')
	}

	return <UserProfile profile={profile} isAdmin={isAdmin} />
}
