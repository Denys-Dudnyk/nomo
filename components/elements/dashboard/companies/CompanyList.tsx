'use client'

import { useState } from 'react'
import { Company } from '@/types/company'

import Pagination from '@/components/ui/Pagination/Pagination'
import { CompanyCard } from './CompanyCard'

interface CompanyListProps {
	initialCompanies: Company[]
}

const ITEMS_PER_PAGE = 8

export function CompanyList({ initialCompanies }: CompanyListProps) {
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(initialCompanies.length / ITEMS_PER_PAGE)
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const currentCompanies = initialCompanies.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE
	)

	return (
		<div className='space-y-4'>
			{currentCompanies.map(company => (
				<CompanyCard key={company.id} company={company} />
			))}

			{totalPages > 1 && (
				<div className='mt-8 flex justify-center'>
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
