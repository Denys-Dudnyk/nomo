'use client'

import { useState } from 'react'

interface CardPreviewProps {
	cardNumber?: string
	cardHolder?: string
	expiryDate?: string
	className?: string
}

export default function CardPreview({
	cardNumber = '1234 1234 1234 1234',
	cardHolder,
	expiryDate = '11/25',
	className = '',
}: CardPreviewProps) {
	const [transform, setTransform] = useState<string>(
		'rotateX(0deg) rotateY(0deg)'
	)
	const [shadow, setShadow] = useState<string>(
		'0px 10px 20px rgba(255, 141, 42, 0.0)'
	)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = e.currentTarget
		const x = e.clientX - offsetLeft
		const y = e.clientY - offsetTop

		// Вычисление углов для наклона
		const rotateX = ((y - offsetHeight / 2) / offsetHeight) * 15 // -15 до 15 градусов
		const rotateY = ((x - offsetWidth / 2) / offsetWidth) * -15 // -15 до 15 градусов

		// Вычисление смещения тени
		const shadowX = ((x - offsetWidth / 2) / offsetWidth) * 20 // -20 до 20 пикселей
		const shadowY = ((y - offsetHeight / 2) / offsetHeight) * 20 // -20 до 20 пикселей

		setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
		setShadow(`${shadowX}px ${shadowY}px 30px rgba(255, 141, 42,0.5)`)
	}

	const handleMouseLeave = () => {
		// Сброс трансформации и тени
		setTransform('rotateX(0deg) rotateY(0deg)')
		setShadow('0px 10px 20px rgba(255, 141, 42, 0.0)')
	}

	return (
		<div
			className={`relative w-[380px] h-[214px] rounded-xl overflow-hidden ${className}`}
			style={{
				background: 'linear-gradient(125deg, #1a1a1a 0%, #2a2a2a 100%)',
				transform: transform,
				transformStyle: 'preserve-3d',
				transition: 'transform 0.2s ease, box-shadow 0.3s ease',
				boxShadow: shadow,
				perspective: '1000px', // Добавляет глубину
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{/* Card content container */}
			<div className='absolute inset-0 p-6 flex flex-col justify-between'>
				{/* Logo */}
				<div className='text-gray-300/90'>
					<svg
						width='30'
						height='30'
						viewBox='0 0 58 43'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M0 28.1833V0.951172C0 0.813101 0.111928 0.701172 0.25 0.701172H14.6563C14.722 0.701172 14.7852 0.727101 14.832 0.773339L57.0759 42.5144C57.2349 42.6715 57.1237 42.9422 56.9002 42.9422H36.2375C36.1712 42.9422 36.1076 42.9159 36.0607 42.869L15.6125 22.4208C15.2975 22.1058 14.7589 22.3289 14.7589 22.7744V42.9422C6.6078 42.9422 0 36.3344 0 28.1833Z'
							fill='#ff8d2a'
						/>
						<path
							d='M42.75 24.5092V0.915069C42.75 0.796937 42.8458 0.701172 42.9639 0.701172C50.9969 0.701172 57.5089 7.21321 57.5089 15.2462V37.2931C57.5089 37.5093 57.253 37.6235 57.092 37.4792L42.8331 24.6953C42.7802 24.6479 42.75 24.5802 42.75 24.5092Z'
							fill='#ff8d2a'
						/>
					</svg>
				</div>

				{/* Card number */}
				<div className='space-y-[50px]'>
					<div className='font-mono text-[19px] font-medium tracking-wider text-gray-300/90 text-center'>
						{cardNumber}
					</div>

					{/* Card holder and expiry */}
					<div className='flex justify-between items-center text-sm text-gray-400'>
						<span>{cardHolder}</span>
						<span>{expiryDate}</span>
					</div>
				</div>
			</div>

			{/* Gradient overlay */}
			<div className='absolute inset-0 bg-gradient-to-br from-black/10 to-black/0' />
		</div>
	)
}
