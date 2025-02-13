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

interface InvestmentCardProps {
	initialAmount?: number
	cashback?: number
	accumulated?: number
	balance: number
}

export default function InvestmentCard({
	initialAmount = 1000.70298,
	cashback = 0,
	accumulated = 0.0000001,
	balance,
}: InvestmentCardProps) {
	const [currentAmount, setCurrentAmount] = useState(initialAmount)
	const [currentAccumulated, setCurrentAccumulated] = useState(accumulated)
	const [timer, setTimer] = useState<string | null>(null)
	const [progress, setProgress] = useState(0)
	const [clickCount, setClickCount] = useState(0)
	const [isAccumulating, setIsAccumulating] = useState(false)

	// Таймер длительностью 7 дней = 604799 секунд
	const TIMER_DURATION = 7 * 24 * 60 * 60 - 1 // 604799 секунд
	const ACCUMULATION_RATE = 0.0000001 // Скорость накопления

	// Функция для форматирования времени в формате D:HH:MM:SS
	const formatTime = useCallback((seconds: number): string => {
		const days = Math.floor(seconds / 86400)
		const remainder = seconds % 86400
		const hours = Math.floor(remainder / 3600)
		const minutes = Math.floor((remainder % 3600) / 60)
		const secs = remainder % 60
		// Дни без ведущего нуля, а часы, минуты и секунды — с двумя цифрами
		return `${days}:${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
	}, [])

	// Эффект накопления, когда таймер активен
	useEffect(() => {
		let interval: NodeJS.Timeout

		if (isAccumulating) {
			interval = setInterval(() => {
				setCurrentAccumulated(prev => {
					const newValue = prev + ACCUMULATION_RATE
					return Number(newValue.toFixed(7))
				})

				// Обновляем общую сумму
				setCurrentAmount(prev => {
					const newValue = prev + ACCUMULATION_RATE
					return Number(newValue.toFixed(5))
				})
			}, 1000)
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isAccumulating, ACCUMULATION_RATE])

	// Эффект для обновления таймера и прогресса
	useEffect(() => {
		let interval: NodeJS.Timeout

		if (timer) {
			// Разбиваем строку таймера на части (D:HH:MM:SS)
			const parts = timer.split(':').map(Number)
			if (parts.length === 4) {
				const [days, hours, minutes, seconds] = parts
				let totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds

				interval = setInterval(() => {
					if (totalSeconds > 0) {
						totalSeconds -= 1
						setTimer(formatTime(totalSeconds))

						const elapsedSeconds = TIMER_DURATION - totalSeconds
						const progressPercentage = (elapsedSeconds / TIMER_DURATION) * 100
						setProgress(progressPercentage)
					} else {
						setTimer(null)
						setIsAccumulating(false)
					}
				}, 1000)
			}
			return () => clearInterval(interval)
		}
	}, [timer, formatTime, TIMER_DURATION])

	// Обработчик нажатия кнопки Invest
	const handleInvest = useCallback(() => {
		setTimer(formatTime(TIMER_DURATION))
		setIsAccumulating(true)
		setClickCount(prev => prev + 1)
	}, [formatTime, TIMER_DURATION])

	// Прогресс-бар: рассчитываем длину окружности для круга
	const circleRadius = 50
	const circumference = 2 * Math.PI * circleRadius

	// Подключаем переводы из раздела dashboard
	const t = useTranslations('dashboard')

	return (
		<div className='bg-[#1E2128] rounded-[16px] p-6 w-full shadow-xl h-auto sm:max-h-[228px]'>
			<div className='flex items-center justify-between gap-6 flex-col sm:flex-row'>
				{/* Левая часть с кругом */}
				<div className='relative w-[180px] h-[180px]'>
					<svg
						width='180'
						height='180'
						viewBox='0 0 120 120'
						className='-rotate-90'
						style={{ overflow: 'visible' }}
					>
						{/* Фоновый круг */}
						<circle
							cx='60'
							cy='60'
							r='50'
							fill='none'
							stroke='#0F0F0F'
							strokeWidth='8'
						/>

						{/* Прогресс-бар */}
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

				{/* Правая часть */}
				<div className=''>
					<div className='flex justify-between items-center mb-3'>
						<div className='text-[#767785] text-[14px] font-normal'>
							{t('accumulated_funds')}
						</div>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Image
										src={'/dashboard/fbook.svg'}
										width={24}
										height={24}
										className='hover:stroke-accent'
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

					<div className='text-2xl font-mono font-medium text-[#F4F4F4] '>
						{balance}
					</div>

					<Button
						className='w-full mt-[16px] bg-[#E37719] hover:bg-accenthover text-[#0F0F0F] font-medium rounded-lg py-[10px] transition-all'
						onClick={handleInvest}
						disabled={timer !== null}
					>
						{t('invest')}
					</Button>
				</div>
			</div>
		</div>
	)
}
