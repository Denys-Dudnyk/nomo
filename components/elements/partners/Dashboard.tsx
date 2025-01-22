'use client'

import { User } from '@supabase/supabase-js'
import { PartnerProfile, UserProfile } from '@/types/database'

import { useState } from 'react'
import UserHeader from './DashboardItems/UserHeader'
import NavigationCards from './DashboardItems/NavigationCards'
import TransactionsTable from './DashboardItems/TransactionTable'
import { Button } from '@/components/ui/button'
import Balance from './DashboardItems/Balance'
import { ScanButton } from '@/components/ui/QrModal/scan-button'
import { useIsAdmin } from '@/hooks/useIsAdmin'

interface DashboardContentProps {
	session: {
		user: User
	}
	profile: PartnerProfile
}

export default function PartnersDashboard({
	session,
	profile,
}: DashboardContentProps) {
	const [currentMonth, setCurrentMonth] = useState('Чер, 2024')
	const [currency, setCurrency] = useState('UAH')
	const { isAdmin } = useIsAdmin()

	return (
		<div className='mx-5 md:mx-[80px] px-4 pt-[110px] pb-[100px]'>
			<div className='grid grid-cols-1 gap-8'>
				<UserHeader user={session.user} profile={profile} />
				<Balance balance={profile?.cashback_balance || 0} profile={profile} />
				{isAdmin && <ScanButton />}
				<TransactionsTable
					currentMonth={currentMonth}
					currency={currency}
					onMonthChange={setCurrentMonth}
					onCurrencyChange={setCurrency}
				/>
			</div>
		</div>
	)
}
