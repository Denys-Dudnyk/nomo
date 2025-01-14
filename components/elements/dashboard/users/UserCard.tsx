import { UserProfile } from '@/types/database'
import Link from 'next/link'

interface UserCardProps {
	user: UserProfile
}

export function UserCard({ user }: UserCardProps) {
	return (
		<div className='bg-[#343434] rounded-lg p-4 hover:bg-[#252525] transition-colors'>
			<div className='flex justify-between items-center'>
				<div className='space-y-[25px]'>
					<div className='text-[15px] font-semibold text-[#919191]'>ПІБ</div>
					<div className='text-[#fff] font-bold text-[20px]'>
						{user.full_name}
					</div>
				</div>
				<Link
					href={`/dashboard/users/${user.id}`}
					className='text-accent hover:text-accenthover text-sm'
				>
					Детальніше
				</Link>
			</div>
		</div>
	)
}
