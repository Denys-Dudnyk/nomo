import Link from 'next/link'
import { Company } from '@/types/company'

interface CompanyCardProps {
	company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
	return (
		<div className='bg-[#343434] rounded-lg p-4 hover:bg-[#252525] transition-colors'>
			<div className='flex justify-between items-center'>
				<div className='space-y-[25px]'>
					<div className='text-[15px] font-semibold text-[#919191]'>
						Назва компанії
					</div>
					<div className='text-[#fff] font-bold text-[20px]'>
						ТОВ "{company.name}"
					</div>
				</div>
				<Link
					href={`/dashboard/companies/${company.id}/settings`}
					className='text-accent hover:text-accenthover text-sm'
				>
					Детальніше
				</Link>
			</div>
		</div>
	)
}
