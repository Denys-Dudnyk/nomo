import { User } from '@supabase/supabase-js'
import { UserProfile } from '@/types/database'
import { Settings } from 'lucide-react'
import Image from 'next/image'
import NavigationCards from './NavigationCards'
import CardPreview from './CardPreview'

interface UserHeaderProps {
	user: User
	profile: UserProfile
}

export default function UserHeader({ user, profile }: UserHeaderProps) {
	return (
		<div className='flex items-center justify-between mb-[35px] gap-4 flex-col md:flex-row'>
			<div className='flex items-center gap-6 flex-col mr-[21px]'>
				<div className='relative h-[150px] w-[150px]'>
					<Image
						src={user.user_metadata.avatar_url || '/dashboard/user.svg'}
						alt='Profile'
						className='rounded-full'
						fill
						sizes='64px'
					/>
				</div>
				<h2 className='text-[19px] font-medium text-accent'>
					<span className='text-[#fff]'>N</span>
					User_{profile?.id || user.id.slice(0, 6)}
				</h2>
			</div>

			<div className='w-full lg:w-auto'>
				<NavigationCards userProfile={profile} user={user} />
			</div>
			<div className='flex justify-end card-h'>
				<CardPreview cardHolder={profile?.full_name} />
			</div>
		</div>
	)
}
