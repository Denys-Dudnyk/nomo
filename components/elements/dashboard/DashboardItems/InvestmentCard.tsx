'use client'

import { useState, useEffect, useCallback } from 'react'
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
import {
	startInvestment,
	addToInvestment,
	completeInvestment,
} from '@/app/actions/investment'
import { useInvestmentSync } from '@/hooks/useInvestmentSync'

interface InvestmentCardProps {
	balance: number
	userId: string
}

const TIMER_DURATION = 7 * 24 * 60 * 60
const ANNUAL_RATE = 0.004 // 0.4%
const DAILY_RATE = ANNUAL_RATE / 365
const SECONDS_RATE = DAILY_RATE / 86400

export default function InvestmentCard({
	balance,
	userId,
}: InvestmentCardProps) {
	const [currentAmount, setCurrentAmount] = useState(0)
	const [currentAccumulated, setCurrentAccumulated] = useState(0)
	const [baseAccumulated, setBaseAccumulated] = useState(0)
	const [timer, setTimer] = useState<string | null>(null)
	const [progress, setProgress] = useState(0)
	const [isAccumulating, setIsAccumulating] = useState(false)
	const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)

	// Функция для расчета накопления
	const calculateAccumulation = useCallback(
		(amount: number, baseAccum: number, lastUpdate: Date) => {
			const now = new Date()
			const elapsedSeconds = (now.getTime() - lastUpdate.getTime()) / 1000
			const newAccumulated = baseAccum + amount * SECONDS_RATE * elapsedSeconds
			return Number(newAccumulated.toFixed(7))
		},
		[]
	)

	// Обработка обновлений из базы данных
	const { checkStatus } = useInvestmentSync(
		userId,
		data => {
			if (data) {
				console.log('Received update from Supabase:', data)
				setCurrentAmount(data.current_amount)
				setBaseAccumulated(data.current_accumulated)
				setTimer(data.timer_state)
				setIsAccumulating(data.is_accumulating)
				setLastUpdateTime(new Date(data.last_accumulation_update))
			}
		},
		setCurrentAccumulated
	)

	// Эффект для локального обновления накопления
	useEffect(() => {
		let interval: NodeJS.Timeout

		if (isAccumulating && currentAmount > 0 && lastUpdateTime) {
			// Обновляем накопление каждую секунду
			interval = setInterval(() => {
				const newAccumulated = calculateAccumulation(
					currentAmount,
					baseAccumulated,
					lastUpdateTime
				)
				setCurrentAccumulated(newAccumulated)
			}, 1000)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [
		isAccumulating,
		currentAmount,
		baseAccumulated,
		lastUpdateTime,
		calculateAccumulation,
	])

	// Загрузка начального состояния
	useEffect(() => {
		const loadState = async () => {
			const status = await checkStatus()
			if (status) {
				setCurrentAmount(status.currentAmount)
				setBaseAccumulated(status.currentAccumulated)
				setLastUpdateTime(new Date(status.lastUpdate))
			}
		}
		loadState()
	}, [checkStatus])

	// Обработка кнопки инвестирования
	const handleInvest = useCallback(async () => {
		if (balance <= 0) return

		try {
			if (isAccumulating) {
				console.log('Adding to investment. Current balance:', balance)
				const result = await addToInvestment(userId)

				if (result.success) {
					console.log('Investment addition successful:', result.data)
					setCurrentAmount(prev => {
						const newAmount = prev + balance
						console.log('New current amount:', newAmount)
						return newAmount
					})

					// Принудительно запрашиваем обновление состояния
					await checkStatus()
				} else {
					console.error('Failed to add to investment:', result.error)
				}
			} else {
				console.log('Starting new investment with balance:', balance)
				const result = await startInvestment(userId)

				if (result.success) {
					console.log('Investment start successful')
					setCurrentAmount(balance)
					setTimer('7:00:00:00')
					setIsAccumulating(true)

					// Принудительно запрашиваем обновление состояния
					await checkStatus()
				} else {
					console.error('Failed to start investment:', result.error)
				}
			}
		} catch (error) {
			console.error('Investment error:', error)
		}
	}, [balance, isAccumulating, userId, checkStatus])

	// Format time display
	const formatTime = useCallback((seconds: number): string => {
		const days = Math.floor(seconds / 86400)
		const remainder = seconds % 86400
		const hours = Math.floor(remainder / 3600)
		const minutes = Math.floor((remainder % 3600) / 60)
		const secs = remainder % 60
		return `${days}:${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
	}, [])

	// Effect for timer and progress
	useEffect(() => {
		let interval: NodeJS.Timeout

		if (timer) {
			const parts = timer.split(':').map(Number)
			if (parts.length === 4) {
				let totalSeconds =
					parts[0] * 86400 + parts[1] * 3600 + parts[2] * 60 + parts[3]

				interval = setInterval(async () => {
					if (totalSeconds > 0) {
						totalSeconds -= 1
						setTimer(formatTime(totalSeconds))

						const elapsedSeconds = TIMER_DURATION - totalSeconds
						const progressPercentage = (elapsedSeconds / TIMER_DURATION) * 100
						setProgress(progressPercentage)
					} else {
						// Complete investment
						await completeInvestment(userId)
						await checkStatus() // Обновляем состояние после завершения инвестиции
					}
				}, 1000)
			}
			return () => clearInterval(interval)
		}
	}, [timer, formatTime, userId, checkStatus])

	const t = useTranslations('dashboard')
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

	// Circle properties
	const circleRadius = 50
	const circumference = 2 * Math.PI * circleRadius

	return (
		<>
			<div className='bg-[#1E2128] rounded-[16px] p-6 w-full shadow-xl h-auto sm:max-h-[228px]'>
				<div className='flex items-center justify-between gap-6 flex-col sm:flex-row'>
					{/* Left side with circle */}
					<div className='relative w-[180px] h-[180px]'>
						<svg
							width='180'
							height='180'
							viewBox='0 0 120 120'
							className='-rotate-90'
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
								strokeDasharray={circumference}
								strokeDashoffset={
									circumference - (circumference * progress) / 100
								}
								className='transition-all duration-1000 ease-linear'
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

					{/* Right side */}
					<div className=''>
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
							{balance.toFixed(2)}
						</div>

						<Button
							className='w-full mt-[16px] bg-[#E37719] hover:bg-accenthover text-[#0F0F0F] font-medium rounded-lg py-[10px] transition-all'
							onClick={handleInvest}
							disabled={balance <= 0}
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
