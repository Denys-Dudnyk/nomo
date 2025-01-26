'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import CompanyProfile from '@/components/elements/company/company_profile/CompanyProfile'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface UserProfileProps {
	profile: any
	isAdmin: boolean
}

export default function UserProfile({ profile, isAdmin }: UserProfileProps) {
	const router = useRouter()
	const [loading, setLoading] = useState({
		transactions: false,
		income: false,
		referral: false,
	})
	const supabase = createClient()

	const handleTransactions = () => {
		router.push(`/dashboard/users/${profile.user_id}/transactions`)
	}

	const handleIncome = async () => {
		setLoading(prev => ({ ...prev, income: true }))
		try {
			// Implement income view logic
			toast.success('Дохід завантажено')
		} catch (error) {
			toast.error('Помилка завантаження доходу')
		} finally {
			setLoading(prev => ({ ...prev, income: false }))
		}
	}

	const handleReferral = async () => {
		setLoading(prev => ({ ...prev, referral: true }))
		try {
			// Implement referral income logic
			toast.success('Референальний дохід завантажено')
		} catch (error) {
			toast.error('Помилка завантаження референального доходу')
		} finally {
			setLoading(prev => ({ ...prev, referral: false }))
		}
	}

	return (
		<div className=' bg-black'>
			<CompanyProfile profile={profile} profileType='user' />

			{isAdmin && (
				<div className='flex flex-col gap-5 sm:gap-[45px] w-full max-w-[1440px] mx-auto p-5 sm:px-20 '>
					<div className='grid grid-cols-1 gap-5 sm:gap-[150px] md:grid-cols-2 '>
						<Button
							onClick={handleTransactions}
							disabled={loading.transactions}
							className='bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-[#fff] h-auto py-5 font-semibold text-[16px] sm:text-[20px]'
						>
							Транзакції Користувача
						</Button>
						<Button
							onClick={handleIncome}
							disabled={loading.income}
							className='bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-[#fff] h-auto py-5 font-semibold text-[16px] sm:text-[20px]'
						>
							Дохід Від Користувача
						</Button>
					</div>
					<Button
						onClick={handleReferral}
						disabled={loading.referral}
						className='bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-[#fff] h-auto py-5 font-semibold text-[16px] sm:text-[20px] text-wrap'
					>
						Референальний Обігдохід користувача
					</Button>
				</div>
			)}
		</div>
	)
}
