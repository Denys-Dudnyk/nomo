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
	size = 256,
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
					level='H'
					includeMargin
					className='bg-white p-2 rounded-lg'
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
						level='H'
						includeMargin
						className='bg-white p-2 rounded-lg'
					/>
				</div>
				<div className='absolute inset-0 flex items-center justify-center'>
					<span className='text-4xl font-bold text-[#ff6b00]'>N</span>
				</div>
			</div>
			<div
				className={cn(
					'rounded-full p-2 transition-colors',
					isVerified ? 'bg-[#ff6b00]' : 'bg-gray-600'
				)}
			>
				<Check className='w-6 h-6 text-white' />
			</div>
			<ScanButton />
		</div>
	)
}
