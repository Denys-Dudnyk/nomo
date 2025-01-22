import BrandLogo from '@/components/elements/auth/brandlogo'
import Dashboard from '@/components/elements/dashboard/Dashboard'
import NInwest from '@/components/elements/dashboard/n-invest/N-invest'

import { getUserProfile } from '@/lib/database'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
	const supabase = await createClient()

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/login')
	}

	try {
		const profile = await getUserProfile(session.user.id)

		if (!profile) {
			console.error('No profile found for user:', session.user.id)

			return (
				<div className='min-h-screen bg-[#0f0f0f] text-white p-8'>
					<p>
						Профіль не знайдено. Будь ласка, зверніться до служби підтримки.
					</p>
				</div>
			)
		}

		return (
			<div className='min-h-screen bg-[#0f0f0f] text-white'>
				<NInwest session={session} profile={profile} />
			</div>
		)
	} catch (error) {
		console.error('Error in dashboard:', error)
		return (
			<div className='min-h-screen bg-[#0f0f0f] text-white p-8'>
				<p>Помилка завантаження профілю. Спробуйте оновити сторінку.</p>
			</div>
		)
	}
}
