'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { VisuallyHidden } from '@/lib/visually-hidden'

interface SuccessDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

export function SuccessDialog({ isOpen, onOpenChange }: SuccessDialogProps) {
	const handleSuccess = () => {
		onOpenChange(false)
		// Optionally refresh the transactions list or update UI
		window.location.reload()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent
				style={{ borderRadius: 15 }}
				className='sm:max-w-[425px] border-none bg-[#121315] text-white'
			>
				<DialogHeader>
					<VisuallyHidden>
						<DialogTitle>Операція успішна</DialogTitle>
					</VisuallyHidden>
				</DialogHeader>
				<div className='grid gap-6 py-6'>
					<div className='flex flex-col items-center justify-center gap-4'>
						<div className='w-16 h-16 rounded-full bg-green-500 flex items-center justify-center'>
							<Check className='w-8 h-8 text-black' />
						</div>
						<h2 className='text-2xl font-normal'>Операція успішна</h2>
					</div>
				</div>
				<div className='flex justify-between gap-3 mt-4'>
					<Button
						className='flex-1 bg-[#ff9500] text-white hover:bg-[#ff9500]/90 h-12'
						onClick={() => handleSuccess()}
					>
						Продовжити
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
