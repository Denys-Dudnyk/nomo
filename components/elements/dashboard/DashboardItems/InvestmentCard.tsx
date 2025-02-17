'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { InvestmentProgramModal } from '@/components/ui/investment-program-modal'
import { startInvestment, addToInvestment } from '@/app/actions/investment'
import { useInvestmentSync } from '@/hooks/useInvestmentSync'
import { usePathname } from 'next/navigation'

interface InvestmentCardProps {
	balance: number
	userId: string
}

const TIMER_DURATION = 7 * 24 * 60 * 60
const ANNUAL_RATE = 0.004
const DAILY_RATE = ANNUAL_RATE / 365
const SECONDS_RATE = DAILY_RATE / 86400

export default function InvestmentCard({
	balance: initialBalance,
	userId,
}: InvestmentCardProps) {
	const [currentAmount, setCurrentAmount] = useState(0)
	const [currentAccumulated, setCurrentAccumulated] = useState(0)
	const [baseAccumulated, setBaseAccumulated] = useState(0)
	const [timer, setTimer] = useState<string | null>(null)
	const [progress, setProgress] = useState(0)
	const [isAccumulating, setIsAccumulating] = useState(false)
	const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
	const [investmentStartTime, setInvestmentStartTime] = useState<string | null>(
		null
	)
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
	const [localBalance, setLocalBalance] = useState(initialBalance)

	const mountedRef = useRef(true)
	const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
	const accumulationIntervalRef = useRef<NodeJS.Timeout | null>(null)

	const t = useTranslations('dashboard')
	const pathname = usePathname()

	const calculateAccumulation = useCallback(
		(amount: number, baseAccum: number, lastUpdate: Date) => {
			const now = Date.now()
			const elapsedSeconds = Math.max(0, (now - lastUpdate.getTime()) / 1000)
			return Number(
				(baseAccum + amount * SECONDS_RATE * elapsedSeconds).toFixed(7)
			)
		},
		[]
	)

	const calculateProgress = useCallback((startTime: string) => {
		const start = new Date(startTime).getTime()
		const now = Date.now()
		const elapsed = now - start
		return Math.min((elapsed / (TIMER_DURATION * 1000)) * 100, 100)
	}, [])

	const handleDataUpdate = useCallback(
		(data: any) => {
			if (!data || !mountedRef.current || !pathname.includes('dashboard'))
				return

			setCurrentAmount(data.current_amount || 0)
			setBaseAccumulated(data.current_accumulated || 0)
			setTimer(data.timer_state)
			setIsAccumulating(!!data.is_accumulating)
			setLastUpdateTime(
				data.last_accumulation_update
					? new Date(data.last_accumulation_update)
					: new Date()
			)
			setInvestmentStartTime(data.investment_start_time)
			setLocalBalance(data.cashback_balance || 0)

			if (data.investment_start_time) {
				setProgress(calculateProgress(data.investment_start_time))
			}
		},
		[calculateProgress, pathname]
	)

	const { checkStatus, refreshSubscription } = useInvestmentSync(
		userId,
		handleDataUpdate,
		setCurrentAccumulated
	)

	const handleInvest = useCallback(async () => {
		if (localBalance <= 0) return

		try {
			const action = isAccumulating ? addToInvestment : startInvestment
			const result = await action(userId)

			if (result.success && pathname.includes('dashboard')) {
				await checkStatus()
			}
		} catch (error) {
			console.error('Investment error:', error)
		}
	}, [localBalance, isAccumulating, userId, checkStatus, pathname])

	useEffect(() => {
		const loadState = async () => {
			try {
				await checkStatus()
			} catch (error) {
				console.error('Error loading initial state:', error)
			}
		}
		loadState()
	}, [checkStatus])

	useEffect(() => {
		if (
			isAccumulating &&
			currentAmount > 0 &&
			lastUpdateTime &&
			mountedRef.current
		) {
			accumulationIntervalRef.current = setInterval(() => {
				const newAccumulated = calculateAccumulation(
					currentAmount,
					baseAccumulated,
					lastUpdateTime
				)
				setCurrentAccumulated(newAccumulated)
			}, 1000)

			return () => {
				if (accumulationIntervalRef.current) {
					clearInterval(accumulationIntervalRef.current)
				}
			}
		}
	}, [
		isAccumulating,
		currentAmount,
		baseAccumulated,
		lastUpdateTime,
		calculateAccumulation,
	])

	useEffect(() => {
		if (investmentStartTime && isAccumulating) {
			progressIntervalRef.current = setInterval(() => {
				setProgress(calculateProgress(investmentStartTime))
			}, 1000)

			return () => {
				if (progressIntervalRef.current) {
					clearInterval(progressIntervalRef.current)
				}
			}
		}
	}, [investmentStartTime, isAccumulating, calculateProgress])

	useEffect(() => {
		return () => {
			mountedRef.current = false
			if (progressIntervalRef.current)
				clearInterval(progressIntervalRef.current)
			if (accumulationIntervalRef.current)
				clearInterval(accumulationIntervalRef.current)
		}
	}, [])

	useEffect(() => {
		if (pathname.includes('dashboard')) {
			setLocalBalance(initialBalance)
		}
	}, [initialBalance, pathname])

	return (
		<>
			<div className='bg-[#1E2128] rounded-[16px] p-6 w-full shadow-xl h-auto sm:max-h-[228px]'>
				<div className='flex items-center justify-between gap-6 flex-col sm:flex-row'>
					<div className='relative w-[180px] h-[180px]'>
						<svg
							width='180'
							height='180'
							viewBox='0 0 120 120'
							style={{ overflow: 'visible' }}
						>
							<circle
								cx='60'
								cy='60'
								r='50'
								fill='none'
								stroke='#0F0F0F'
								strokeWidth='8'
							/>
							<circle
								cx='60'
								cy='60'
								r='50'
								fill='none'
								stroke='#FF8A00'
								strokeWidth='8'
								strokeLinecap='round'
								strokeDasharray={`${2 * Math.PI * 50}`}
								strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
								className='transition-all duration-1000 ease-linear'
								style={{
									transform: 'rotate(-90deg)',
									transformOrigin: 'center',
								}}
							/>
						</svg>

						<div className='absolute inset-0 flex flex-col items-center justify-center text-center space-y-1'>
							<div className='text-[#F4F4F4] text-[15px] font-normal'>
								<img
									src='/dashboard/icon-coin.svg'
									alt=''
									className='w-12 h-12'
								/>
							</div>
							<div className='text-[#F4F4F4] text-[15px] font-normal'>
								{t('accrued')}
							</div>
							<div className='text-white text-sm font-mono'>
								{currentAccumulated.toFixed(7)}
							</div>
						</div>
					</div>

					<div>
						<div className='flex justify-between items-center mb-3'>
							<div className='text-[#767785] text-[14px] font-normal'>
								{t('accumulated_funds')}
							</div>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger onClick={() => setIsInfoModalOpen(true)}>
										<Image
											src='/dashboard/fbook.svg'
											width={24}
											height={24}
											className='hover:stroke-accent cursor-pointer'
											alt=''
										/>
									</TooltipTrigger>
									<TooltipContent className='bg-[#2A2A2D] border-[#363638] text-white'>
										<p>{t('info_accrued')}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>

						<div className='flex items-center text-[24px] font-medium text-[#F4F4F4] mb-[5px]'>
							<img src='/dashboard/n-coin.svg' alt='' />
							{currentAmount.toFixed(5)}
						</div>

						<div className='text-[#767785] text-[14px] mb-1'>
							{t('free_funds')}
						</div>

						<div className='text-2xl font-mono font-medium text-[#F4F4F4]'>
							{localBalance.toFixed(2)}
						</div>

						<Button
							className='w-full mt-[16px] bg-[#E37719] hover:bg-accenthover text-[#0F0F0F] font-medium rounded-lg py-[10px] transition-all disabled:opacity-50'
							onClick={handleInvest}
							disabled={localBalance <= 0}
						>
							{t('invest')}
						</Button>
					</div>
				</div>
			</div>

			<InvestmentProgramModal
				isOpen={isInfoModalOpen}
				onClose={() => setIsInfoModalOpen(false)}
			/>
		</>
	)
}
