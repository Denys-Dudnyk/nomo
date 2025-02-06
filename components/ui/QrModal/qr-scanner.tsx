'use client'

import { useState } from 'react'
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { Button } from '../button'
import { SuccessDialog } from '@/components/elements/business/BusinessItems/Dialog/success-dialog'

interface QRScannerProps {
	isOpen: boolean
	onClose: (open: boolean) => void
	onSuccess: (qrData: string) => void
}

export function QRScanner({ isOpen, onClose, onSuccess }: QRScannerProps) {
	const { toast } = useToast()
	const [scanning, setScanning] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)

	const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
		const data = detectedCodes[0]?.rawValue

		if (data && !scanning) {
			setScanning(true)
			try {
				// Instead of making API call here, pass the data to parent
				onSuccess(data)
				setShowSuccess(true)
			} catch (error: any) {
				toast({
					title: 'Error',
					description: error.message || 'Failed to scan QR code',
					variant: 'destructive',
				})
			} finally {
				setScanning(false)
			}
		}
	}

	return (
		<>
			<Dialog open={isOpen && !showSuccess} onOpenChange={onClose}>
				<DialogContent className='sm:max-w-md bg-[#1C1C1C] border-gray-800'>
					<DialogHeader>
						<DialogTitle className='text-2xl font-normal text-center'>
							Просканyйте QR-код
						</DialogTitle>
					</DialogHeader>
					<div className='aspect-square bg-transparent flex items-center justify-center w-full h-full'>
						<Scanner
							onScan={handleScan}
							onError={error =>
								toast({
									title: 'Camera Error',
									//@ts-ignore
									description: error?.message || 'Failed to access camera',
									variant: 'destructive',
								})
							}
						/>
					</div>
					<div className='flex justify-between gap-3 mt-4'>
						<Button
							variant='outline'
							className='flex-1 bg-[#1c1d21] text-white border-none hover:bg-[#2c2d31] hover:text-white h-12'
							onClick={() => {
								onClose(false)
								setShowSuccess(false)
							}}
						>
							Назад
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<SuccessDialog
				isOpen={showSuccess}
				onOpenChange={open => {
					setShowSuccess(open)
					if (!open) {
						onClose(false)
					}
				}}
			/>
		</>
	)
}
