import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import TransactionsTable from './transactions-table'

interface PageProps {
	params: Promise<{ id: string }>
}

export default async function UserTransactionsPage({ params }: PageProps) {
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

	// Get user profile for the header
	const { data: profile } = await supabase
		.from('user_profiles')
		.select('*')
		.eq('user_id', id)
		.single()

	if (!profile) {
		redirect('/dashboard/users')
	}

	return (
		<div className='min-h-screen bg-[#0f0f0f] text-white p-6'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-2xl font-bold mb-6'>
					Транзакції користувача: {profile.full_name}
				</h1>
				<TransactionsTable
					userId={id}
					currentMonth='Січень 2024'
					currency='UAH'
				/>
			</div>
		</div>
	)
}
