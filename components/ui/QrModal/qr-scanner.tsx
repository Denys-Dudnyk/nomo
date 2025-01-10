'use client'

import { useState } from 'react'
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

interface QRScannerProps {
	isOpen: boolean
	onClose: () => void
	onSuccess: () => void
}

export function QRScanner({ isOpen, onClose, onSuccess }: QRScannerProps) {
	const { toast } = useToast()
	const [scanning, setScanning] = useState(false)

	const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
		// Берем первый найденный QR-код из массива
		const data = detectedCodes[0]?.rawValue

		if (data && !scanning) {
			setScanning(true)
			try {
				const response = await fetch('/api/verify-qr', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ qrData: data }),
				})

				const result = await response.json()

				if (!response.ok) {
					throw new Error(result.error || 'Failed to verify QR code')
				}

				toast({
					title: 'Success!',
					description: 'QR code verified successfully',
				})

				onSuccess()
				onClose()
			} catch (error: any) {
				toast({
					title: 'Error',
					description: error.message || 'Failed to verify QR code',
					variant: 'destructive',
				})
			} finally {
				setScanning(false)
			}
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md bg-[#1C1C1C] border-gray-800'>
				<DialogHeader>
					<DialogTitle className='text-white'>Scan QR Code</DialogTitle>
				</DialogHeader>
				<div className='aspect-square bg-transparent flex items-center justify-center w-full h-full'>
					<Scanner
						onScan={handleScan} // Адаптировано под массив IDetectedBarcode[]
						onError={error =>
							toast({
								title: 'Camera Error',
								// @ts-ignore
								description: error?.message || 'Failed to access camera',
								variant: 'destructive',
							})
						}
						// styles={ }
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
