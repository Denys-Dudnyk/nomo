'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { QRCodeOverlay } from './qr-code-overlay'

interface QRCodeModalProps {
	isOpen: boolean
	onClose: () => void
	qrValue: string
	id: string
	isVerified: boolean
}

export function QRCodeModal({
	isOpen,
	id,
	onClose,
	qrValue,
	isVerified,
}: QRCodeModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md bg-[#0f0f0f] border-gray-800'>
				<DialogHeader>
					<DialogTitle className='text-[#fff] text-center'>
						Your QR Code
					</DialogTitle>
				</DialogHeader>
				<div className='flex items-center justify-center p-6'>
					<QRCodeOverlay
						userId={qrValue}
						isVerified={isVerified}
						size={256}
						id={id}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
