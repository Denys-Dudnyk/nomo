'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import {
	Search,
	Filter,
	ChevronLeft,
	ChevronRight,
	CalendarRange,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import type {
	Transaction,
	TransactionStatus,
	SupabaseTransactionResponse,
} from '@/types/transaction'

interface TransactionsTableProps {
	companyId: string
}

export default function TransactionsTable({
	companyId,
}: TransactionsTableProps) {
	const router = useRouter()
	const [search, setSearch] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [transactions, setTransactions] = useState<Transaction[]>([])
	const [loading, setLoading] = useState(true)
	const [totalPages, setTotalPages] = useState(1)
	const currentMonth = format(new Date(), 'MMMM', { locale: uk })
	const formattedDate = format(new Date(), 'dd.MM.yy')
	const currency = 'UAH'

	useEffect(() => {
		fetchTransactions()
	}, [currentPage, companyId])

	const fetchTransactions = async () => {
		setLoading(true)
		try {
			const supabase = createClient()

			// Fetch transactions
			let query = supabase
				.from('transactions')
				.select(
					`
          id,
          user_id,
          description,
          status,
          amount,
          savings_percent,
          savings_amount,
          balance,
          ncoins_accrued,
          company_id,
          created_at,
          scanned_date,
          scanned_time
        `,
					{ count: 'exact' }
				)
				.eq('company_id', companyId)
				.order('created_at', { ascending: false })
				.range((currentPage - 1) * 10, currentPage * 10 - 1)

			if (search) {
				query = query.ilike('description', `%${search}%`)
			}

			const {
				data: transactionData,
				count,
				error: transactionError,
			} = await query

			if (transactionError) throw transactionError

			// Fetch user profiles
			const { data: userProfiles, error: userError } = await supabase
				.from('user_profiles')
				.select('user_id, full_name')

			if (userError) throw userError

			// Transform transactions and map user names
			const transformedData: Transaction[] = (
				transactionData as SupabaseTransactionResponse[]
			).map(transaction => {
				const client = userProfiles.find(
					user => user.user_id === transaction.user_id
				)

				return {
					...transaction,
					amount:
						typeof transaction.amount === 'string'
							? Number.parseFloat(transaction.amount)
							: transaction.amount,
					savings_percent:
						typeof transaction.savings_percent === 'string'
							? Number.parseFloat(transaction.savings_percent)
							: transaction.savings_percent,
					savings_amount:
						typeof transaction.savings_amount === 'string'
							? Number.parseFloat(transaction.savings_amount)
							: transaction.savings_amount,
					balance:
						typeof transaction.balance === 'string'
							? Number.parseFloat(transaction.balance)
							: transaction.balance,
					ncoins_accrued:
						typeof transaction.ncoins_accrued === 'string'
							? Number.parseFloat(transaction.ncoins_accrued)
							: transaction.ncoins_accrued,
					status: transaction.status as TransactionStatus,
					client_name: client?.full_name || 'Невідомий клієнт',
				}
			})

			setTransactions(transformedData)
			setTotalPages(Math.ceil((count || 0) / 10))
		} catch (error) {
			console.error('Error fetching transactions:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Card className='bg-[#121212] border border-[#242424] rounded-[19px] shadow-table'>
			<div className='p-6'>
				<div className='flex justify-between items-center mb-6 gap-4 sm:gap-0'>
					<h2 className='text-[20px] sm:text-[25px] font-light text-[#fff]'>
						Транзакції
					</h2>
					<div className='text-[#919191] font-normal text-[14px] leading-[18px]'>
						Сьогодні {formattedDate}
					</div>
				</div>

				<div className='flex gap-[32px] max-h-[38px] mb-[240px] md:mb-24 lg:mb-12 flex-col lg:flex-row'>
					<div className='flex items-center gap-16 grid-filter'>
						<Input
							type='text'
							placeholder='Останні транзакції'
							value={search}
							onChange={e => setSearch(e.target.value)}
							className='bg-[#1E2128] border-[0.5px] border-[#919191] rounded-[7px] px-6 py-[10px] placeholder:text-[14px] h-full'
						/>
						<Button className='bg-[#1E2128] text-[#919191] text-[14px] leading-[18px] font-normal px-6 py-[7px] h-[43px] lg:h-full flex gap-[12px]'>
							<Filter className='h-6 w-6' />
							<div>Фільтри</div>
						</Button>
					</div>
					<div className='flex md:items-center flex-col md:flex-row md:justify-between lg:justify-center gap-[32px] h-full md:h-auto'>
						<Button className='bg-[#1E2128] px-[12px] py-[10px] text-[14px] leading-[18px] font-normal h-full text-[#919191] flex gap-7'>
							{currentMonth}
							<CalendarRange className='w-4 h-4' />
						</Button>
						<Select>
							<SelectTrigger className='border-none bg-[#1E2128] px-[12px] py-[10px] text-[14px] leading-[18px] font-normal text-[#919191] flex gap-7 w-auto h-[38px] md:h-full'>
								<Image
									src='/dashboard/uah.svg'
									alt='UAH'
									width={24}
									height={24}
								/>
								<SelectValue placeholder={currency} />
							</SelectTrigger>
							<SelectContent className='bg-[#1E2128] text-[#919191] border-none'>
								<SelectItem className='bg-[#1E2128] text-[#919191]' value='UAH'>
									UAH
								</SelectItem>
								<SelectItem className='bg-[#1E2128] text-[#919191]' value='USD'>
									USD
								</SelectItem>
								<SelectItem className='bg-[#1E2128] text-[#919191]' value='EUR'>
									EUR
								</SelectItem>
							</SelectContent>
						</Select>
						<Button className='bg-[#1E2128] px-[21px] py-[7px] text-[14px] leading-[18px] font-normal h-full text-[#919191] flex gap-[15px]'>
							<Image
								src='/dashboard/export.svg'
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
									Дата
								</TableHead>
								<TableHead className='border-[#242424] text-[#919191]'>
									Клієнт
								</TableHead>
								<TableHead className='border-[#242424] text-[#919191]'>
									Статус
								</TableHead>
								<TableHead className='border-[#242424] text-[#919191]'>
									Сума
								</TableHead>
								<TableHead className='border-[#242424] text-[#919191]'>
									Час
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell
										colSpan={7}
										className='text-center py-4 text-[#919191]'
									>
										<div className=' text-white flex items-center justify-center'>
											<div className='animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white'></div>
										</div>
									</TableCell>
								</TableRow>
							) : transactions.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={7}
										className='text-center py-4 text-[#919191]'
									>
										Транзакції не знайдено
									</TableCell>
								</TableRow>
							) : (
								transactions.map(tx => (
									<TableRow
										key={tx.id}
										className='border-[#242424] text-[#fff] text-[14px] font-normal leading-[18px]'
									>
										<TableCell>
											<div className='flex items-center gap-2'>
												<div
													className={`${
														tx.status === 'success'
															? 'bg-[#214D40]'
															: 'bg-[#542A30]'
													} rounded-[7px] w-10 h-10 text-center text-[11px] font-semibold`}
												>
													<div>{tx.scanned_date}</div>
												</div>
											</div>
										</TableCell>
										<TableCell>{tx.client_name}</TableCell>
										<TableCell>
											<div className='flex items-center gap-[12px]'>
												<div
													className={`w-[10px] h-[10px] rounded-full ${
														tx.status === 'success'
															? 'bg-[#15B76B]'
															: 'bg-[#DC5656]'
													}`}
												></div>
												<span
													className={
														tx.status === 'success'
															? 'text-[#15B76B]'
															: 'text-[#DC5656]'
													}
												>
													{tx.status === 'success' ? 'Успішно' : 'Помилка'}
												</span>
											</div>
										</TableCell>
										<TableCell>{tx.amount.toFixed(2)} UAH</TableCell>
										<TableCell>{tx.scanned_time}</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>

				<div className='flex justify-between items-center mt-6 flex-col md:flex-row gap-4 md:gap-0'>
					<Button
						variant='outline'
						onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className='border-[#1E2128] px-[7.5px] py-[10px] text-[#919191] bg-transparent'
					>
						<ChevronLeft className='h-4 w-4 mr-2' />
						Назад
					</Button>
					<div className='flex items-center gap-5 sm:gap-12'>
						{[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
							<Button
								key={i}
								onClick={() => {
									if (typeof page === 'number') {
										setCurrentPage(page)
									}
								}}
								className={`bg-transparent text-[#919191] hover:bg-transparent ${
									page === currentPage ? 'text-[#FF8A00]' : 'border-gray-700'
								}`}
							>
								{page}
							</Button>
						))}
					</div>
					<Button
						variant='outline'
						onClick={() =>
							setCurrentPage(prev => Math.min(prev + 1, totalPages))
						}
						disabled={currentPage === totalPages}
						className='border-[#1E2128] px-[7.5px] py-[10px] text-accent bg-transparent'
					>
						Далі
						<ChevronRight className='h-4 w-4 ml-2' />
					</Button>
				</div>
			</div>
		</Card>
	)
}
