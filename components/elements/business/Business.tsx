import React from 'react'
import { MainContents } from './BusinessItems/app_content'
import { User } from '@supabase/supabase-js'
import { PartnerProfile } from '@/types/database'

interface DashboardContentProps {
	session: {
		user: User
	}
	profile: PartnerProfile
}

const Business = ({ session, profile }: DashboardContentProps) => {
	return (
		<div>
			<main className=' flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-lg'>
				<MainContents />
			</main>
		</div>
	)
}

export default Business
