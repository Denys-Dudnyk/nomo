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
import {
	startInvestment,
	addToInvestment,
	completeInvestment,
} from '@/app/actions/investment'
import { useInvestmentSync } from '@/hooks/useInvestmentSync'
import { Skeleton } from '@/components/ui/skeleton'

interface InvestmentCardProps {
	balance: number
	userId: string
}

const TIMER_DURATION = 7 * 24 * 60 * 60
const ANNUAL_RATE = 0.004 // 0.4%
const DAILY_RATE = ANNUAL_RATE / 365
const SECONDS_RATE = DAILY_RATE / 86400

const LoadingSkeleton = () => (
	<div className='bg-[#1E2128] rounded-[16px] p-6 w-full shadow-xl h-auto sm:max-h-[228px]'>
		<div className='flex items-center justify-between gap-6 flex-col sm:flex-row'>
			<div className='relative w-[180px] h-[180px]'>
				<Skeleton className='w-[180px] h-[180px] rounded-full bg-gray-800' />
			</div>
			<div className='w-full sm:w-auto'>
				<div className='flex justify-between items-center mb-3'>
					<Skeleton className='h-4 w-32 bg-gray-800' />
					<Skeleton className='h-6 w-6 rounded-full bg-gray-800' />
				</div>
				<Skeleton className='h-8 w-40 mb-4 bg-gray-800' />
				<Skeleton className='h-4 w-24 mb-2 bg-gray-800' />
				<Skeleton className='h-8 w-32 mb-4 bg-gray-800' />
				<Skeleton className='h-10 w-full bg-gray-800' />
			</div>
		</div>
	</div>
)

export default function InvestmentCard({
	balance,
	userId,
}: InvestmentCardProps) {
	const [currentAmount, setCurrentAmount] = useState(0)
	const [currentBalance, setCurrentBalance] = useState(balance)
	const [currentAccumulated, setCurrentAccumulated] = useState(0)
	const [baseAccumulated, setBaseAccumulated] = useState(0)
	const [timer, setTimer] = useState<string | null>(null)
	const [progress, setProgress] = useState(0)
	const [isAccumulating, setIsAccumulating] = useState(false)
	const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isUpdating, setIsUpdating] = useState(false)
	const [investmentStartTime, setInvestmentStartTime] = useState<string | null>(
		null
	)
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

	const accumulationIntervalRef = useRef<NodeJS.Timeout | null>(null)
	const lastAccumulationUpdateRef = useRef<number>(Date.now())

	// Добавляем ref для отслеживания монтирования компонента
	const mountedRef = useRef(true)
	const accumulationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	// Оптимизированная функция расчета накопления
	const calculateAccumulation = useCallback(
		(amount: number, baseAccum: number, lastUpdate: Date) => {
			const now = Date.now()
			const elapsedSeconds = Math.max(0, (now - lastUpdate.getTime()) / 1000)
			const newAccumulated = baseAccum + amount * SECONDS_RATE * elapsedSeconds
			return Number(newAccumulated.toFixed(7))
		},
		[]
	)

	// Функция для расчета прогресса на основе времени начала инвестиции
	const calculateProgress = useCallback((startTime: string) => {
		const start = new Date(startTime).getTime()
		const now = Date.now()
		const elapsed = now - start
		const totalDuration = TIMER_DURATION * 1000 // конвертируем в миллисекунды
		return Math.min((elapsed / totalDuration) * 100, 100)
	}, [])

	// Функция для планирования следующего обновления
	const scheduleNextUpdate = useCallback(() => {
		if (accumulationTimeoutRef.current) {
			clearTimeout(accumulationTimeoutRef.current)
		}

		if (
			isAccumulating &&
			currentAmount > 0 &&
			lastUpdateTime &&
			mountedRef.current
		) {
			accumulationTimeoutRef.current = setInterval(() => {
				if (mountedRef.current) {
					const newAccumulated = calculateAccumulation(
						currentAmount,
						baseAccumulated,
						lastUpdateTime
					)
					setCurrentAccumulated(newAccumulated)
					scheduleNextUpdate() // Планируем следующее обновление
				}
			}, 1000)
		}
	}, [
		isAccumulating,
		currentAmount,
		baseAccumulated,
		lastUpdateTime,
		calculateAccumulation,
	])

	// Обработка обновлений из базы данных
	const { checkStatus, refreshSubscription } = useInvestmentSync(
		userId,
		useCallback((data: any) => {
			if (data && mountedRef.current) {
				// console.log('Received update from Supabase:', data)
				setCurrentAmount(data.current_amount)
				setBaseAccumulated(data.current_accumulated)
				setTimer(data.timer_state)
				setIsAccumulating(data.is_accumulating)
				setLastUpdateTime(new Date(data.last_accumulation_update))
				setInvestmentStartTime(data.investment_start_time)
				setCurrentBalance(data.cashback_balance)
				if (data.investment_start_time) {
					const newProgress = calculateProgress(data.investment_start_time)
					setProgress(newProgress)
				}
			}
		}, []),
		setCurrentAccumulated
	)

	// Эффект для управления обновлениями
	useEffect(() => {
		scheduleNextUpdate()

		return () => {
			if (accumulationTimeoutRef.current) {
				clearTimeout(accumulationTimeoutRef.current)
			}
		}
	}, [scheduleNextUpdate])

	// Загрузка начального состояния
	// useEffect(() => {
	// 	const loadState = async () => {
	// 		setIsLoading(true)
	// 		try {
	// 			await checkStatus()
	// 		} finally {
	// 			if (mountedRef.current) {
	// 				setIsLoading(false)
	// 			}
	// 		}
	// 	}
	// 	loadState()
	// }, [checkStatus])

	// Эффект для очистки при размонтировании
	useEffect(() => {
		return () => {
			mountedRef.current = false
			if (accumulationTimeoutRef.current) {
				clearTimeout(accumulationTimeoutRef.current)
			}
		}
	}, [])

	// Эффект для локального обновления накопления
	useEffect(() => {
		if (accumulationIntervalRef.current) {
			clearInterval(accumulationIntervalRef.current)
		}

		if (isAccumulating && currentAmount > 0 && lastUpdateTime) {
			accumulationIntervalRef.current = setInterval(() => {
				const now = Date.now()
				// Проверяем, прошло ли достаточно времени с последнего обновления
				if (now - lastAccumulationUpdateRef.current >= 1000) {
					const newAccumulated = calculateAccumulation(
						currentAmount,
						baseAccumulated,
						lastUpdateTime
					)
					setCurrentAccumulated(newAccumulated)
					lastAccumulationUpdateRef.current = now
				}
			}, 1000)
		}

		return () => {
			if (accumulationIntervalRef.current) {
				clearInterval(accumulationIntervalRef.current)
			}
		}
	}, [
		isAccumulating,
		currentAmount,
		baseAccumulated,
		lastUpdateTime,
		calculateAccumulation,
	])

	// Обновляем прогресс каждую секунду если есть время начала инвестиции
	useEffect(() => {
		if (investmentStartTime && isAccumulating) {
			const interval = setInterval(() => {
				const newProgress = calculateProgress(investmentStartTime)
				setProgress(newProgress)
			}, 1000)

			return () => clearInterval(interval)
		}
	}, [investmentStartTime, isAccumulating, calculateProgress])

	// Загрузка начального состояния
	useEffect(() => {
		const loadState = async () => {
			await checkStatus()
		}
		loadState()
	}, [checkStatus])

	// Обработка кнопки инвестирования с блокировкой повторных нажатий
	const handleInvest = useCallback(async () => {
		if (currentBalance <= 0 || isUpdating) return

		try {
			setIsUpdating(true)

			if (isAccumulating) {
				// console.log('Adding to investment. Current balance:', balance)
				const result = await addToInvestment(userId)

				if (result.success) {
					// console.log('Investment addition successful:', result.data)
					await checkStatus()
					refreshSubscription() // Обновляем подписку
				} else {
					console.error('Failed to add to investment:', result.error)
				}
			} else {
				// console.log('Starting new investment with balance:', balance)
				const result = await startInvestment(userId)

				if (result.success) {
					// console.log('Investment start successful')
					await checkStatus()
					refreshSubscription() // Обновляем подписку
				} else {
					console.error('Failed to start investment:', result.error)
				}
			}
		} catch (error) {
			console.error('Investment error:', error)
		} finally {
			setIsUpdating(false)
		}
	}, [
		currentBalance,
		isAccumulating,
		userId,
		checkStatus,
		refreshSubscription,
		isUpdating,
	])

	// // Format time display
	// const formatTime = useCallback((seconds: number): string => {
	// 	const days = Math.floor(seconds / 86400)
	// 	const remainder = seconds % 86400
	// 	const hours = Math.floor(remainder / 3600)
	// 	const minutes = Math.floor((remainder % 3600) / 60)
	// 	const secs = remainder % 60
	// 	return `${days}:${hours.toString().padStart(2, '0')}:${minutes
	// 		.toString()
	// 		.padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
	// }, [])

	// Effect for timer and progress
	// useEffect(() => {
	// 	let interval: NodeJS.Timeout

	// 	if (timer) {
	// 		const parts = timer.split(':').map(Number)
	// 		if (parts.length === 4) {
	// 			let totalSeconds =
	// 				parts[0] * 86400 + parts[1] * 3600 + parts[2] * 60 + parts[3]

	// 			interval = setInterval(async () => {
	// 				if (totalSeconds > 0) {
	// 					totalSeconds -= 1
	// 					setTimer(formatTime(totalSeconds))

	// 					const elapsedSeconds = TIMER_DURATION - totalSeconds
	// 					const progressPercentage = (elapsedSeconds / TIMER_DURATION) * 100
	// 					setProgress(progressPercentage)
	// 				} else {
	// 					// Complete investment
	// 					await completeInvestment(userId)
	// 					await checkStatus()
	// 					refreshSubscription()
	// 				}
	// 			}, 1000)
	// 		}
	// 		return () => clearInterval(interval)
	// 	}
	// }, [timer, formatTime, userId, checkStatus, refreshSubscription])

	const t = useTranslations('dashboard')

	// Circle properties
	const circleRadius = 50
	const circumference = 2 * Math.PI * circleRadius

	// Компонент для отображения скелетона

	// if (isLoading) {
	// 	return <LoadingSkeleton />
	// }

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
							{currentBalance.toFixed(2)}
						</div>

						<Button
							className='w-full mt-[16px] bg-[#E37719] hover:bg-accenthover text-[#0F0F0F] font-medium rounded-lg py-[10px] transition-all'
							onClick={handleInvest}
							disabled={currentBalance <= 0 || isUpdating}
						>
							{isUpdating ? 'Обработка...' : t('invest')}
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

// 'use client'

// import { useState, useEffect, useCallback, useRef } from 'react'
// import { Button } from '@/components/ui/button'
// import {
// 	Tooltip,
// 	TooltipContent,
// 	TooltipProvider,
// 	TooltipTrigger,
// } from '@/components/ui/tooltip'
// import Image from 'next/image'
// import { useTranslations } from 'next-intl'
// import { InvestmentProgramModal } from '@/components/ui/investment-program-modal'
// import {
// 	startInvestment,
// 	addToInvestment,
// 	completeInvestment,
// } from '@/app/actions/investment'
// import { useInvestmentSync } from '@/hooks/useInvestmentSync'

// interface InvestmentCardProps {
// 	balance: number
// 	userId: string
// }

// const TIMER_DURATION = 7 * 24 * 60 * 60
// const ANNUAL_RATE = 0.004 // 0.4%
// const DAILY_RATE = ANNUAL_RATE / 365
// const SECONDS_RATE = DAILY_RATE / 86400

// export default function InvestmentCard({
// 	balance,
// 	userId,
// }: InvestmentCardProps) {
// 	const [currentAmount, setCurrentAmount] = useState(0)
// 	const [currentAccumulated, setCurrentAccumulated] = useState(0)
// 	const [baseAccumulated, setBaseAccumulated] = useState(0)
// 	const [timer, setTimer] = useState<string | null>(null)
// 	const [progress, setProgress] = useState(0)
// 	const [isAccumulating, setIsAccumulating] = useState(false)
// 	const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
// 	const [isUpdating, setIsUpdating] = useState(false)
// 	const accumulationIntervalRef = useRef<NodeJS.Timeout | null>(null)
// 	const lastAccumulationUpdateRef = useRef<number>(Date.now())

// 	// Добавляем ref для отслеживания монтирования компонента
// 	const mountedRef = useRef(true)
// 	const accumulationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

// 	// Оптимизированная функция расчета накопления
// 	const calculateAccumulation = useCallback(
// 		(amount: number, baseAccum: number, lastUpdate: Date) => {
// 			const now = Date.now()
// 			const elapsedSeconds = Math.max(0, (now - lastUpdate.getTime()) / 1000)
// 			const newAccumulated = baseAccum + amount * SECONDS_RATE * elapsedSeconds
// 			return Number(newAccumulated.toFixed(7))
// 		},
// 		[]
// 	)

// 	// Функция для планирования следующего обновления
// 	const scheduleNextUpdate = useCallback(() => {
// 		if (accumulationTimeoutRef.current) {
// 			clearTimeout(accumulationTimeoutRef.current)
// 		}

// 		if (
// 			isAccumulating &&
// 			currentAmount > 0 &&
// 			lastUpdateTime &&
// 			mountedRef.current
// 		) {
// 			accumulationTimeoutRef.current = setInterval(() => {
// 				if (mountedRef.current) {
// 					const newAccumulated = calculateAccumulation(
// 						currentAmount,
// 						baseAccumulated,
// 						lastUpdateTime
// 					)
// 					setCurrentAccumulated(newAccumulated)
// 					scheduleNextUpdate() // Планируем следующее обновление
// 				}
// 			}, 1000)
// 		}
// 	}, [
// 		isAccumulating,
// 		currentAmount,
// 		baseAccumulated,
// 		lastUpdateTime,
// 		calculateAccumulation,
// 	])

// 	// Эффект для управления обновлениями
// 	useEffect(() => {
// 		scheduleNextUpdate()

// 		return () => {
// 			if (accumulationTimeoutRef.current) {
// 				clearTimeout(accumulationTimeoutRef.current)
// 			}
// 		}
// 	}, [scheduleNextUpdate])

// 	// Эффект для очистки при размонтировании
// 	useEffect(() => {
// 		return () => {
// 			mountedRef.current = false
// 			if (accumulationTimeoutRef.current) {
// 				clearTimeout(accumulationTimeoutRef.current)
// 			}
// 		}
// 	}, [])

// 	// Обработка обновлений из базы данных
// 	const { checkStatus, refreshSubscription } = useInvestmentSync(
// 		userId,
// 		useCallback((data: any) => {
// 			if (data && mountedRef.current) {
// 				console.log('Received update from Supabase:', data)
// 				setCurrentAmount(data.current_amount)
// 				setBaseAccumulated(data.current_accumulated)
// 				setTimer(data.timer_state)
// 				setIsAccumulating(data.is_accumulating)
// 				setLastUpdateTime(new Date(data.last_accumulation_update))
// 			}
// 		}, []),
// 		setCurrentAccumulated
// 	)

// 	// Эффект для локального обновления накопления
// 	useEffect(() => {
// 		if (accumulationIntervalRef.current) {
// 			clearInterval(accumulationIntervalRef.current)
// 		}

// 		if (isAccumulating && currentAmount > 0 && lastUpdateTime) {
// 			accumulationIntervalRef.current = setInterval(() => {
// 				const now = Date.now()
// 				// Проверяем, прошло ли достаточно времени с последнего обновления
// 				if (now - lastAccumulationUpdateRef.current >= 1000) {
// 					const newAccumulated = calculateAccumulation(
// 						currentAmount,
// 						baseAccumulated,
// 						lastUpdateTime
// 					)
// 					setCurrentAccumulated(newAccumulated)
// 					lastAccumulationUpdateRef.current = now
// 				}
// 			}, 1000)
// 		}

// 		return () => {
// 			if (accumulationIntervalRef.current) {
// 				clearInterval(accumulationIntervalRef.current)
// 			}
// 		}
// 	}, [
// 		isAccumulating,
// 		currentAmount,
// 		baseAccumulated,
// 		lastUpdateTime,
// 		calculateAccumulation,
// 	])

// 	// Загрузка начального состояния
// 	useEffect(() => {
// 		const loadState = async () => {
// 			await checkStatus()
// 		}
// 		loadState()
// 	}, [checkStatus])

// 	// Обработка кнопки инвестирования с блокировкой повторных нажатий
// 	const handleInvest = useCallback(async () => {
// 		if (balance <= 0 || isUpdating) return

// 		try {
// 			setIsUpdating(true)

// 			if (isAccumulating) {
// 				console.log('Adding to investment. Current balance:', balance)
// 				const result = await addToInvestment(userId)

// 				if (result.success) {
// 					console.log('Investment addition successful:', result.data)
// 					await checkStatus()
// 					refreshSubscription() // Обновляем подписку
// 				} else {
// 					console.error('Failed to add to investment:', result.error)
// 				}
// 			} else {
// 				console.log('Starting new investment with balance:', balance)
// 				const result = await startInvestment(userId)

// 				if (result.success) {
// 					console.log('Investment start successful')
// 					await checkStatus()
// 					refreshSubscription() // Обновляем подписку
// 				} else {
// 					console.error('Failed to start investment:', result.error)
// 				}
// 			}
// 		} catch (error) {
// 			console.error('Investment error:', error)
// 		} finally {
// 			setIsUpdating(false)
// 		}
// 	}, [
// 		balance,
// 		isAccumulating,
// 		userId,
// 		checkStatus,
// 		refreshSubscription,
// 		isUpdating,
// 	])

// 	// Format time display
// 	const formatTime = useCallback((seconds: number): string => {
// 		const days = Math.floor(seconds / 86400)
// 		const remainder = seconds % 86400
// 		const hours = Math.floor(remainder / 3600)
// 		const minutes = Math.floor((remainder % 3600) / 60)
// 		const secs = remainder % 60
// 		return `${days}:${hours.toString().padStart(2, '0')}:${minutes
// 			.toString()
// 			.padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
// 	}, [])

// 	// Effect for timer and progress
// 	useEffect(() => {
// 		let interval: NodeJS.Timeout

// 		if (timer) {
// 			const parts = timer.split(':').map(Number)
// 			if (parts.length === 4) {
// 				let totalSeconds =
// 					parts[0] * 86400 + parts[1] * 3600 + parts[2] * 60 + parts[3]

// 				interval = setInterval(async () => {
// 					if (totalSeconds > 0) {
// 						totalSeconds -= 1
// 						setTimer(formatTime(totalSeconds))

// 						const elapsedSeconds = TIMER_DURATION - totalSeconds
// 						const progressPercentage = (elapsedSeconds / TIMER_DURATION) * 100
// 						setProgress(progressPercentage)
// 					} else {
// 						// Complete investment
// 						await completeInvestment(userId)
// 						await checkStatus()
// 						refreshSubscription()
// 					}
// 				}, 1000)
// 			}
// 			return () => clearInterval(interval)
// 		}
// 	}, [timer, formatTime, userId, checkStatus, refreshSubscription])

// 	const t = useTranslations('dashboard')
// 	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

// 	// Circle properties
// 	const circleRadius = 50
// 	const circumference = 2 * Math.PI * circleRadius

// 	return (
// 		<>
// 			<div className='bg-[#1E2128] rounded-[16px] p-6 w-full shadow-xl h-auto sm:max-h-[228px]'>
// 				<div className='flex items-center justify-between gap-6 flex-col sm:flex-row'>
// 					{/* Left side with circle */}
// 					<div className='relative w-[180px] h-[180px]'>
// 						<svg
// 							width='180'
// 							height='180'
// 							viewBox='0 0 120 120'
// 							className='-rotate-90'
// 							style={{ overflow: 'visible' }}
// 						>
// 							<circle
// 								cx='60'
// 								cy='60'
// 								r='50'
// 								fill='none'
// 								stroke='#0F0F0F'
// 								strokeWidth='8'
// 							/>
// 							<circle
// 								cx='60'
// 								cy='60'
// 								r='50'
// 								fill='none'
// 								stroke='#FF8A00'
// 								strokeWidth='8'
// 								strokeLinecap='round'
// 								strokeDasharray={circumference}
// 								strokeDashoffset={
// 									circumference - (circumference * progress) / 100
// 								}
// 								className='transition-all duration-1000 ease-linear'
// 							/>
// 						</svg>

// 						<div className='absolute inset-0 flex flex-col items-center justify-center text-center space-y-1'>
// 							<div className='text-[#F4F4F4] text-[15px] font-normal'>
// 								<img
// 									src='/dashboard/icon-coin.svg'
// 									alt=''
// 									className='w-12 h-12'
// 								/>
// 							</div>
// 							<div className='text-[#F4F4F4] text-[15px] font-normal'>
// 								{t('accrued')}
// 							</div>
// 							<div className='text-white text-sm font-mono'>
// 								{currentAccumulated.toFixed(7)}
// 							</div>
// 						</div>
// 					</div>

// 					{/* Right side */}
// 					<div className=''>
// 						<div className='flex justify-between items-center mb-3'>
// 							<div className='text-[#767785] text-[14px] font-normal'>
// 								{t('accumulated_funds')}
// 							</div>
// 							<TooltipProvider>
// 								<Tooltip>
// 									<TooltipTrigger onClick={() => setIsInfoModalOpen(true)}>
// 										<Image
// 											src='/dashboard/fbook.svg'
// 											width={24}
// 											height={24}
// 											className='hover:stroke-accent cursor-pointer'
// 											alt=''
// 										/>
// 									</TooltipTrigger>
// 									<TooltipContent className='bg-[#2A2A2D] border-[#363638] text-white'>
// 										<p>{t('info_accrued')}</p>
// 									</TooltipContent>
// 								</Tooltip>
// 							</TooltipProvider>
// 						</div>

// 						<div className='flex items-center text-[24px] font-medium text-[#F4F4F4] mb-[5px]'>
// 							<img src='/dashboard/n-coin.svg' alt='' />
// 							{currentAmount.toFixed(5)}
// 						</div>

// 						<div className='text-[#767785] text-[14px] mb-1'>
// 							{t('free_funds')}
// 						</div>

// 						<div className='text-2xl font-mono font-medium text-[#F4F4F4]'>
// 							{balance.toFixed(2)}
// 						</div>

// 						<Button
// 							className='w-full mt-[16px] bg-[#E37719] hover:bg-accenthover text-[#0F0F0F] font-medium rounded-lg py-[10px] transition-all'
// 							onClick={handleInvest}
// 							disabled={balance <= 0 || isUpdating}
// 						>
// 							{isUpdating ? 'Обработка...' : t('invest')}
// 						</Button>
// 					</div>
// 				</div>
// 			</div>

// 			<InvestmentProgramModal
// 				isOpen={isInfoModalOpen}
// 				onClose={() => setIsInfoModalOpen(false)}
// 			/>
// 		</>
// 	)
// }
