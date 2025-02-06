'use client'

import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useCompany } from '@/hooks/useCompany'
import { QRScanner } from '@/components/ui/QrModal/qr-scanner'
import toast from 'react-hot-toast'

interface ConfirmationDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	data: {
		company: string
		cashier: string
		amount: string
	}
}

export function ConfirmationDialog({
	isOpen,
	onOpenChange,
	data,
}: ConfirmationDialogProps) {
	const [isQRScannerOpen, setIsQRScannerOpen] = useState(false)
	const { company, loading, error } = useCompany()

	const handleQRSuccess = async (qrData: string) => {
		try {
			const response = await fetch('/api/verify-qr', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					qrData,
					transactionData: {
						description: company?.name || 'Unknown Company',
						amount: Number.parseFloat(data.amount.replace(/\s/g, '')) || 0,
					},
				}),
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Failed to process transaction')
			}

			toast.success('Транзакцію успішно створено')
			setIsQRScannerOpen(false)
		} catch (error) {
			console.error('Transaction error:', error)
			toast.error(
				error instanceof Error ? error.message : 'Помилка створення транзакції'
			)
		}
	}

	return (
		<>
			<Dialog open={isOpen} onOpenChange={onOpenChange}>
				<DialogContent
					style={{ borderRadius: 15 }}
					className='sm:max-w-[425px] border-none rounded-sm bg-[#121315] text-white'
				>
					<DialogHeader>
						<DialogTitle className='text-2xl font-normal text-center'>
							Підтвердження
						</DialogTitle>
					</DialogHeader>
					<div className='grid gap-6 py-6'>
						<div className='space-y-2'>
							<Label className='text-sm text-gray-400'>Назва компанії</Label>
							<div className='text-white'>
								{loading ? (
									'Завантаження...'
								) : error ? (
									<span className='text-red-500'>
										Помилка завантаження даних компанії
									</span>
								) : company ? (
									<>ТОВ&nbsp;&quot;{company.name}&quot;</>
								) : (
									'Компанію не знайдено'
								)}
							</div>
						</div>
						<div className='space-y-2'>
							<Label className='text-sm text-gray-400'>Касир</Label>
							<div className='text-white'>{data.cashier}</div>
						</div>
						<div className='space-y-2'>
							<Label className='text-sm text-gray-400'>Сума операції</Label>
							<div className='text-2xl text-white'>{data.amount} ₴</div>
						</div>
					</div>
					<div className='flex justify-between gap-3 mt-4'>
						<Button
							variant='outline'
							className='flex-1 bg-[#1c1d21] text-white border-none hover:bg-[#2c2d31] hover:text-white h-12'
							onClick={() => onOpenChange(false)}
						>
							Відмінити
						</Button>
						<Button
							className='flex-1 bg-[#ff9500] text-white hover:bg-[#ff9500]/90 h-12'
							onClick={() => {
								onOpenChange(false)
								setIsQRScannerOpen(true)
							}}
						>
							Підтвердити
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<QRScanner
				isOpen={isQRScannerOpen}
				onClose={() => setIsQRScannerOpen(false)}
				onSuccess={handleQRSuccess}
			/>
		</>
	)
}
