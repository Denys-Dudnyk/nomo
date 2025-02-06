import BrandLogo from '@/components/elements/auth/brandlogo'
import Business from '@/components/elements/business/Business'
import Dashboard from '@/components/elements/dashboard/Dashboard'
import PartnersDashboard from '@/components/elements/partners/Dashboard'
import { getPartnerProfile, getUserProfile } from '@/lib/database'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function PartnersPage() {
	const supabase = await createClient()

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/login')
	}

	// Fetch user profile data
	try {
		// Fetch user profile data with error handling
		const profile = await getPartnerProfile(session.user.id)

		if (!profile) {
			console.error('No profile found for user:', session.user.id)
			// You might want to redirect to a profile creation page
			// or create a default profile
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
				<Business session={session} profile={profile} />
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
