'use client'

import { useState, useEffect } from 'react'
import { QrReader } from 'react-qr-reader'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
// import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { FlipHorizontal } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface QRScannerProps {
	isOpen: boolean
	onClose: () => void
	onSuccess: () => void
}

export function QRScanner({ isOpen, onClose, onSuccess }: QRScannerProps) {
	const [scanning, setScanning] = useState(false)
	// const [facingMode, setFacingMode] = useState<'environment' | 'user'>(
	// 	'environment'
	// )
	const { toast } = useToast()

	const handleScan = async (result: any) => {
		if (result && !scanning) {
			setScanning(true)
			try {
				const response = await fetch('/api/verify-qr', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ qrData: result?.text }),
				})

				const data = await response.json()

				if (!response.ok) {
					throw new Error(data.error)
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

	// const toggleCamera = () => {
	// 	setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'))
	// }

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md bg-[#1C1C1C] border-gray-800'>
				<DialogHeader className='flex flex-row items-center justify-between'>
					<DialogTitle className='text-white'>Scan QR Code</DialogTitle>
					{/* <Button
						variant='ghost'
						size='icon'
						onClick={toggleCamera}
						className='text-white'
					>
						<FlipHorizontal className='h-4 w-4' />
					</Button> */}
				</DialogHeader>
				<div className='w-full aspect-square bg-transparent flex items-center justify-center'>
					<QrReader
						onResult={handleScan}
						constraints={{ facingMode: 'user' }}
						containerStyle={{
							width: '100%',
							height: '100%',
							position: 'relative',
						}}
						videoStyle={{
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
