'use client'

import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import BrandLogo from '@/components/elements/auth/brandlogo'
import { DialogTitle } from '@radix-ui/react-dialog'

interface SuccessModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
	const router = useRouter()

	const handleClose = () => {
		onClose()
		router.push('/auth/login')
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className='sm:max-w-md bg-[#1C1C1C] text-white border-gray-800'>
				<DialogHeader>
					<div className='flex justify-center mb-8'>
						<BrandLogo />
					</div>
				</DialogHeader>

				<div className='flex flex-col items-center text-center'>
					<DialogTitle className='text-2xl font-bold mb-4'>
						Ваш пароль успішно змінено
					</DialogTitle>
					<p className='text-gray-400'>
						Тепер ви можете <span className='text-accent'>увійти</span>{' '}
						використовуючи нові дані
					</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}
