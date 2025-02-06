'use client'

import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ConfirmationDialog } from './confirmation-dialog'
import { useCompany } from '@/hooks/useCompany'

interface OperationModalProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

export function OperationModal({ isOpen, onOpenChange }: OperationModalProps) {
	const [amount, setAmount] = useState('')
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
	const { company, loading, error } = useCompany()

	const formatAmount = (value: string) => {
		const numbers = value.replace(/\D/g, '')
		const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		return formatted
	}

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatAmount(e.target.value)
		setAmount(formatted)
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
							Проведення операції
						</DialogTitle>
					</DialogHeader>
					<div className='grid gap-6 py-4'>
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
							<Select defaultValue='katerina1'>
								<SelectTrigger className='w-full bg-[#1c1d21] border-none text-white focus:ring-0 focus:ring-offset-0'>
									<SelectValue>Савченко Катерина</SelectValue>
								</SelectTrigger>
								<SelectContent className='bg-[#1c1d21] border-none text-white p-0'>
									<SelectItem value='katerina1'>Савченко Катерина</SelectItem>
									<SelectItem value='ivan'>Назаренко Іван</SelectItem>
									<SelectItem value='katerina2'>Савченко Катерина</SelectItem>
									<SelectItem value='daniil'>Зусь Даніїл</SelectItem>
									<SelectItem value='iryna'>Ірина Пізняк</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<Separator className='my-2 bg-gray-800' />
						<div className='space-y-2'>
							<div className='relative'>
								<Input
									type='text'
									value={amount}
									onChange={handleAmountChange}
									placeholder='0'
									className='bg-[#1c1d21] border-none text-center text-4xl font-normal text-white placeholder:text-gray-400 h-12 focus:ring-0 focus:ring-offset-0 rounded-lg'
								/>
								{amount && (
									<div className='absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-white'>
										₴
									</div>
								)}
							</div>
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
								setIsConfirmationOpen(true)
							}}
						>
							Підтвердити
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<ConfirmationDialog
				isOpen={isConfirmationOpen}
				onOpenChange={setIsConfirmationOpen}
				data={{
					company: company?.name || 'Компанію не знайдено',
					cashier: 'Савченко Катерина',
					amount: amount || '0',
				}}
			/>
		</>
	)
}
