'use client'

import { useState } from 'react'

import Pagination from '@/components/ui/Pagination/Pagination'
import { UserProfile } from '@/types/database'
import { UserCard } from './UserCard'

interface UserListProps {
	initialUsers: UserProfile[]
}

const ITEMS_PER_PAGE = 6

export function UserList({ initialUsers }: UserListProps) {
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(initialUsers.length / ITEMS_PER_PAGE)
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const currentUsers = initialUsers.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE
	)

	return (
		<div className='space-y-4'>
			{currentUsers.map(user => (
				<UserCard key={user.id} user={user} />
			))}

			{totalPages > 1 && (
				<div className='mt-8 flex justify-center text-[#fff]'>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</div>
			)}
		</div>
	)
}
