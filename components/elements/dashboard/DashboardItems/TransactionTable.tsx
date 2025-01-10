'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Filter,
	Download,
	ChevronLeft,
	ChevronRight,
	CalendarRange,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { getTransactions } from '@/app/actions/transactions'
// import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/client'

interface TransactionsTableProps {
	currentMonth: string
	currency: string
	onMonthChange: (month: string) => void
	onCurrencyChange: (currency: string) => void
}

// Sample data - replace with real data from your API
// const transactions = [
// 	{
// 		id: 1,
// 		date: '05 Трав.',
// 		time: '03:46',
// 		description: 'Номер у Готелі "ЛЬВІВ"',
// 		status: 'Успішно',
// 		amount: 150,
// 		cashback: 40,
// 		balance: 125050.0,
// 		ncoin: 0.00013398,
// 	},
// 	{
// 		id: 2,
// 		date: '05 Трав.',
// 		time: '03:46',
// 		description: 'Номер у Готелі "ЛЬВІВ"',
// 		status: 'Скасований',
// 		amount: 150,
// 		cashback: 40,
// 		balance: 125050.0,
// 		ncoin: 0.00013398,
// 	},
// 	{
// 		id: 3,
// 		date: '05 Трав.',
// 		time: '03:46',
// 		description: 'Номер у Готелі "ЛЬВІВ"',
// 		status: 'Скасований',
// 		amount: 150,
// 		cashback: 40,
// 		balance: 125050.0,
// 		ncoin: 0.00013398,
// 	},
// 	{
// 		id: 4,
// 		date: '05 Трав.',
// 		time: '03:46',
// 		description: 'Номер у Готелі "ЛЬВІВ"',
// 		status: 'Успішно',
// 		amount: 150,
// 		cashback: 40,
// 		balance: 125050.0,
// 		ncoin: 0.00013398,
// 	},
// 	{
// 		id: 5,
// 		date: '05 Трав.',
// 		time: '03:46',
// 		description: 'Номер у Готелі "ЛЬВІВ"',
// 		status: 'Скасований',
// 		amount: 150,
// 		cashback: 40,
// 		balance: 125050.0,
// 		ncoin: 0.00013398,
// 	},
// 	{
// 		id: 6,
// 		date: '05 Трав.',
// 		time: '03:46',
// 		description: 'Номер у Готелі "ЛЬВІВ"',
// 		status: 'Скасований',
// 		amount: 150,
// 		cashback: 40,
// 		balance: 125050.0,
// 		ncoin: 0.00013398,
// 	},
// 	// Add more sample transactions...
// ]

const today = new Date()
const formattedDate = `${today.getDate()}/${
	today.getMonth() + 1
}/${today.getFullYear()}`
console.log(formattedDate)

export default function TransactionsTable({
	currentMonth,
	currency,
	onMonthChange,
	onCurrencyChange,
}: TransactionsTableProps) {
	const today = new Date()
	const formattedDate = ` ${today.getDate()}.${
		today.getMonth() + 1
	}.${today.getFullYear()}`

	const formatNCOIN = (value: number) => value.toFixed(8)
	const formatUAH = (value: number) => `${value} UAH`
	const formatPercent = (value: number) => `${value.toFixed(2)}%`

	const [transactions, setTransactions] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	// Fetch transactions when the component mounts
	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				// Assuming you have a way to get the current userId
				// const cookieStore = cookies()
				// @ts-ignore
				const supabase = await createClient()
				const {
					data: { user },
				} = await supabase.auth.getUser()
				const userId = String(user?.id) // Replace with real user ID
				const data = await getTransactions(userId)
				setTransactions(data)
				setLoading(false)
			} catch (err) {
				setError('Failed to load transactions')
				setLoading(false)
			}
		}

		fetchTransactions()
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<Card className='bg-[#121212] border border-[#242424] rounded-[19px] shadow-table'>
			<div className='p-6'>
				<div className='flex justify-between items-center mb-6 gap-4 sm:gap-0'>
					<h2 className='text-[20px] sm:text-[25px] font-light text-[#fff]'>
						Транзакції
					</h2>
					<div className='text-[#919191] font-normal text-[14px] leading-[18px]'>
						Сьогодні
						{formattedDate}
					</div>
				</div>
				<div className='flex gap-[32px] max-h-[38px] mb-[240px] md:mb-24 lg:mb-12 flex-col lg:flex-row '>
					<div className='flex items-center gap-16 grid-filter'>
						<Input
							type='text'
							placeholder='Останні транзакції'
							className='bg-[#1E2128] border-[0.5px] border-[#919191] rounded-[7px] px-6 py-[10px] placeholder:text-[14px] h-full'
						/>
						<Button className='bg-[#1E2128] text-[#919191]  text-[14px] leading-[18px] font-normal px-6 py-[7px] h-[43px] lg:h-full flex gap-[12px]'>
							<Filter className='h-6 w-6' />
							<div>Фільтри</div>
						</Button>
					</div>
					<div className='flex  md:items-center flex-col md:flex-row md:justify-between lg:justify-center gap-[32px] h-full md:h-auto'>
						<Button className='bg-[#1E2128] px-[12px] py-[10px] text-[14px] leading-[18px] font-normal h-full text-[#919191] flex gap-7'>
							{currentMonth}
							<CalendarRange className={'w-4 h-4'} />
						</Button>
						<Select>
							{/* {currency} */}

							<SelectTrigger className='border-none bg-[#1E2128] px-[12px] py-[10px] text-[14px] leading-[18px] font-normal text-[#919191] flex gap-7 w-auto h-[38px] md:h-full'>
								<Image
									src={'/dashboard/uah.svg'}
									alt='UAH'
									width={24}
									height={24}
								/>
								<SelectValue placeholder={`${currency}`} />
							</SelectTrigger>
							<SelectContent className='bg-[#1E2128] text-[#919191] border-none'>
								<SelectItem
									className='bg-[#1E2128] text-[#919191]'
									value='light'
								>
									{currency}
								</SelectItem>
								<SelectItem
									className='bg-[#1E2128] text-[#919191]'
									value='dark'
								>
									{currency}
								</SelectItem>
								<SelectItem
									className='bg-[#1E2128] text-[#919191]'
									value='system'
								>
									{currency}
								</SelectItem>
							</SelectContent>
						</Select>

						<Button className='bg-[#1E2128] px-[21px] py-[7px] text-[14px] leading-[18px] font-normal h-full text-[#919191] flex gap-[15px]'>
							<Image
								src={'/dashboard/export.svg'}
								alt='Export'
								width={24}
								height={24}
							/>
							<div>Експорт</div>
						</Button>
					</div>
				</div>

				<div className='rounded-lg overflow-hidden'>
					<Table>
						<TableHeader>
							<TableRow className='border-[#242424] text-[#919191] px-6'>
								<TableHead className='border-[#242424] text-[#919191]'>
									Опис
								</TableHead>
								<TableHead className='border-[#242424] text-[#919191]'>
									Статус
								</TableHead>
								<TableHead className='border-[#242424] text-[#919191]'>
									Сума
								</TableHead>
								<TableHead className='border-[#242424] text-[#919191]'>
									% Заощадження, UAH
								</TableHead>
								<TableHead className='border-[#242424] text-[#919191]'>
									Залишок, UAH
								</TableHead>
								<TableHead className='border-[#242424] text-[#919191]'>
									%Нараховано, NCOIN
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{transactions.map(tx => (
								<TableRow
									key={tx.id}
									className='border-[#242424] text-[#fff] text-[14px] font-normal leading-[18px]'
								>
									<TableCell className=''>
										<div className='flex items-center gap-2 '>
											<div
												className={`${
													tx.status === 'Успішно'
														? 'bg-[#542A30]'
														: 'bg-[#214D40]'
												}  rounded-[7px] w-10 h-10  text-center  text-[11px] font-semibold`}
											>
												<div>{tx.date}</div>
											</div>
											<div className='flex flex-col'>
												{tx.description}
												<div className='text-[11px] font-normal text-[#919191]'>
													{tx.created_at}
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className='flex items-center gap-[12px]'>
											<div
												className={`w-[10px] h-[10px] rounded-full ${
													tx.status === 'success'
														? 'bg-[#15B76B]'
														: 'bg-[#DC5656]'
												}`}
											/>
											<span
												className={
													tx.status === 'success'
														? 'text-[#15B76B]'
														: 'text-[#DC5656]'
												}
											>
												{tx.status}
											</span>
										</div>
									</TableCell>
									<TableCell>{tx.amount} UAH</TableCell>
									<TableCell>
										<div className='flex items-center gap-9'>
											<div className='bg-accent text-[#fff] py-[1px] px-[11px] text-[11px] font-semibold leading-[18px] rounded-[7px] '>
												28,67%
											</div>
											<div>{tx.cashback} UAH</div>
										</div>
									</TableCell>
									<TableCell>₴ {tx.balance.toLocaleString()}</TableCell>
									<TableCell>
										<div className='bg-[#1E2128] px-[26px] py-[4px] text-[11px] font-medium text-accent rounded-[7px] text-center'>
											{tx.ncoins_accrued} Ncoin
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<div className='flex justify-between items-center mt-6 flex-col md:flex-row gap-4 md:gap-0'>
					<Button
						variant='outline'
						className='border-[#1E2128] px-[7.5px] py-[10px] text-[#919191] bg-transparent'
					>
						<ChevronLeft className='h-4 w-4 mr-2' />
						Назад
					</Button>
					<div className='flex items-center gap-5 sm:gap-12'>
						{[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
							<Button
								key={i}
								className={`bg-transparent text-[#919191] hover:bg-transparent ${
									page === 2 ? 'text-[#FF8A00]' : 'border-gray-700'
								} `}
							>
								{page}
							</Button>
						))}
					</div>
					<Button
						variant='outline'
						className=' border-[#1E2128] px-[7.5px] py-[10px] text-accent bg-transparent'
					>
						Далі
						<ChevronRight className='h-4 w-4 ml-2' />
					</Button>
				</div>
			</div>
		</Card>
	)
}
