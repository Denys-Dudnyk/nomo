'use client'

import { Card } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { AreaCharts } from './BalanceItems/Charts/AreaCharts'
import Image from 'next/image'

import { User } from '@supabase/supabase-js'
import { UserProfile } from '@/types/database'

interface UBalanceContentProps {
	session: {
		user: User
	}
	profile: UserProfile
}

const cryptoData = [
	{ name: 'Ncoin', symbol: 'NCOIN', icon: '/dashboard/ncoin.svg' },
	{ name: 'UAH', symbol: 'UAH', icon: '/dashboard/grn.svg' },
	{ name: 'USD', symbol: 'USD', icon: '/dashboard/usd.svg' },
	{
		name: 'Bitcoin',
		symbol: 'BTC',
		icon: '/dashboard/btc.svg',
	},
	{
		name: 'Ethereum',
		symbol: 'ETH',
		icon: '/dashboard/eth.svg',
	},
	{
		name: 'Solana',
		symbol: 'SOL',
		icon: '/dashboard/sol.svg',
	},
	{ name: 'Pepe', symbol: 'PEPE', icon: '/dashboard/pepe.svg' },
	{
		name: 'Dogecoin',
		symbol: 'DOGE',
		icon: '/dashboard/doge.svg',
	},
]

const chartData = [
	{ x: '07-09', y: 35 },
	{ x: '07-10', y: 40 },
	{ x: '07-11', y: 30 },
	{ x: '07-12', y: 45 },
	{ x: '07-13', y: 35 },
	{ x: '07-14', y: 50 },
	{ x: '07-15', y: 40 },
]

export default function UserBalance({
	session,
	profile,
}: UBalanceContentProps) {
	return (
		<div className='min-h-screen bg-black p-4 md:p-8 lg:p-16'>
			<div className='mx-auto max-w-5xl space-y-8 p-4 md:p-8'>
				{/* Balance Card */}
				<Card className='bg-[#1D2129] border-[1px] border-[#2E333E] p-6'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-between'>
						<div className='space-y-2 md:space-y-0 md:mr-4'>
							<div className='text-sm text-white'>Орієнтовний баланс</div>
							<div className='text-xl md:text-2xl font-bold text-white'>
								0,00000000 Грн
							</div>
							<div className='text-sm text-white'>≈0,00 $</div>
							<div className='flex items-center gap-1 text-xs'>
								<span className='text-muted-foreground text-white'>
									За сьогодні
								</span>
								<span className='text-emerald-500'>+0,00 $ (0,00%)</span>
							</div>
						</div>
						<div className='h-[120px] w-full md:w-[60%] mt-4 md:mt-0'>
							<AreaCharts
								data={chartData}
								index='x'
								categories={['y']}
								colors={['#F5A524']}
								showXAxis={true}
								showYAxis={false}
								showLegend={false}
								showGridLines={false}
								className='h-full w-full'
							/>
						</div>
					</div>
				</Card>

				{/* Assets Card */}
				<Card className='bg-[#1D2129] border-[1px] border-[#2E333E] p-6'>
					<div className='text-sm text-white mb-4'>Активи</div>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow className='hover:bg-transparent border-none'>
									<TableHead className='text-muted-foreground'>
										Валюта
									</TableHead>
									<TableHead className='text-right text-muted-foreground'>
										Сума
									</TableHead>
									<TableHead className='text-right text-muted-foreground'>
										Ціна
									</TableHead>
									<TableHead className='text-right text-muted-foreground'>
										Зміна сьогодні
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{cryptoData.map(crypto => (
									<TableRow
										key={crypto.symbol}
										className='hover:bg-transparent border-none'
									>
										<TableCell className='flex items-center gap-2'>
											<Image
												src={crypto.icon}
												alt={crypto.name}
												width={32}
												height={32}
												className='rounded-full'
											/>
											<div>
												<div className='font-medium text-[#fff]'>
													{crypto.symbol}
												</div>
												<div className='text-sm text-[#767785]'>
													{crypto.name}
												</div>
											</div>
										</TableCell>
										<TableCell className='text-right text-white'>0.0</TableCell>
										<TableCell className='text-right text-white'>0.0</TableCell>
										<TableCell className='text-right text-emerald-500'>
											+0.0 $
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</Card>
			</div>
		</div>
	)
}
