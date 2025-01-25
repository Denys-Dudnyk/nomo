'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import CompanyProfile from '@/components/elements/company/company_profile/CompanyProfile'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface UserProfileProps {
	profile: any
	isAdmin: boolean
}

export default function UserProfile({ profile, isAdmin }: UserProfileProps) {
	const [loading, setLoading] = useState({
		transactions: false,
		income: false,
		referral: false,
	})
	const supabase = createClient()

	const handleTransactions = async () => {
		setLoading(prev => ({ ...prev, transactions: true }))
		try {
			// Implement transactions view logic
			toast.success('Транзакції завантажено')
		} catch (error) {
			toast.error('Помилка завантаження транзакцій')
		} finally {
			setLoading(prev => ({ ...prev, transactions: false }))
		}
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
				<div className='flex flex-col gap-[45px] max-w-[1440px] mx-auto px-4 '>
					<div className='grid grid-cols-1 gap-[150px] md:grid-cols-2 '>
						<Button
							onClick={handleTransactions}
							disabled={loading.transactions}
							className='bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-[#fff] h-auto py-5 font-semibold text-[20px]'
						>
							Транзакції Користувача
						</Button>
						<Button
							onClick={handleIncome}
							disabled={loading.income}
							className='bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-[#fff] h-auto py-5 font-semibold text-[20px]'
						>
							Дохід Від Користувача
						</Button>
					</div>
					<Button
						onClick={handleReferral}
						disabled={loading.referral}
						className='bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-[#fff] h-auto py-5 font-semibold text-[20px]'
					>
						Референальний Обігдохід користувача
					</Button>
				</div>
			)}
		</div>
	)
}
