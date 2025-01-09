'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import { BiTransfer } from 'react-icons/bi'
import { useTranslations } from 'next-intl'

export function RightPanel({ className }: { className?: string }) {
	const t = useTranslations('portfolio')
	return (
		<section className={`flex-auto  w-auto max-w-[363px] ${className || ''}`}>
			<Card className='bg-[#1E2128] border-none text-gray-300 p-6 mb-6 rounded-[28px]'>
				<h3 className='text-lg font-bold'>{t('cash_on_balance')}</h3>
				<p className='text-3xl font-bold mt-2'>$3,753.15</p>
				<p className='text-sm text-green-500 mt-1'>▲ $173.85</p>
				<p className='text-sm text-gray-400 mt-4'>1 NCOIN = $0.5112</p>

				<div className='space-y-4 mt-6'>
					{/* Transfer Section */}
					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gray-700 rounded-lg p-3'>
						<span className='text-sm text-gray-400'>{t('give')}</span>
						<div className='flex items-center gap-2 w-full sm:w-auto'>
							<Input
								type='number'
								placeholder='0.00'
								className='w-full sm:w-24 bg-transparent text-white border-none focus:ring-0 focus:outline-none'
							/>
							<Select>
								<SelectTrigger className='w-full sm:w-28 bg-transparent text-white border-none'>
									<SelectValue placeholder='NCOIN' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='ncoin'>NCOIN</SelectItem>
									<SelectItem value='btc'>BTC</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className='relative flex justify-center'>
						<button className='bg-white p-2 rounded-full border border-gray-600 shadow-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500'>
							<BiTransfer className='h-6 w-6 text-gray-800 rotate-90' />
						</button>
					</div>

					{/* Receive Section */}
					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gray-700 rounded-lg p-3'>
						<span className='text-sm text-gray-400'>{t('get')}</span>
						<div className='flex items-center gap-2 w-full sm:w-auto'>
							<Input
								type='number'
								placeholder='0.00'
								className='w-full sm:w-24 bg-transparent text-white border-none focus:ring-0 focus:outline-none'
							/>
							<Select>
								<SelectTrigger className='w-full sm:w-28 bg-transparent text-white border-none'>
									<SelectValue placeholder='USDT' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='usdt'>USDT</SelectItem>
									<SelectItem value='eth'>ETH</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				<Button className='bg-orange-500 hover:bg-orange-600 text-white w-full mt-4 py-2 text-lg font-semibold'>
					{t('buy')} Tether US
				</Button>
			</Card>

			<Card className='bg-[#1E2128] border-none text-[#fff] p-6 rounded-[28px]'>
				<h3 className='text-lg font-bold'> {t('task')}</h3>
				<div className='mt-4 text-gray-400'> {t('no_task')}</div>
			</Card>
		</section>
	)
}
