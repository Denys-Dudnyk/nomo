'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScanButton } from './scan-button'

interface QRCodeOverlayProps {
	id: string
	userId: string
	isVerified?: boolean
	size?: number
}

export function QRCodeOverlay({
	id,
	userId,
	isVerified = false,
	size = 300,
}: QRCodeOverlayProps) {
	const qrData = JSON.stringify({
		id,
		userId,
		timestamp: Date.now(),
		signature: `${userId}-${Date.now()}-${Math.random()
			.toString(36)
			.substring(7)}`,
	})
	return (
		<div className='flex flex-col items-center gap-4'>
			<div className='relative'>
				<QRCodeSVG
					value={qrData}
					size={size}
					level='L'
					// includeMargin
					className=' p-2 rounded-lg'
					imageSettings={{
						src: '/qr-img.svg',
						width: 37,
						height: 37,
						excavate: true,
					}}
					bgColor='transparent'
					fgColor='#fff'
				/>
				<div
					className='absolute inset-0 flex items-center justify-center'
					style={{
						maskImage: 'radial-gradient(circle, transparent 30%, black 32%)',
						WebkitMaskImage:
							'radial-gradient(circle, transparent 30%, black 32%)',
					}}
				>
					<QRCodeSVG
						value={qrData}
						size={size}
						level='L'
						marginSize={40}
						className='p-2 rounded-lg'
						bgColor='transparent'
						fgColor='#fff'
					/>
				</div>
				{/* <div className='absolute inset-0 flex items-center justify-center'>
					<span className='text-4xl font-bold text-accent'>N</span>
				</div> */}
			</div>
			<div
				className={cn(
					'rounded-full p-2 transition-colors',
					isVerified ? 'bg-[#ff6b00]' : 'bg-gray-600'
				)}
			>
				<Check className='w-6 h-6 text-white' />
			</div>
		</div>
	)
}
