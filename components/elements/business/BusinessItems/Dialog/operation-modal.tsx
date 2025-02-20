'use client'

import { useState, useEffect } from 'react'
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
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ConfirmationDialog } from './confirmation-dialog'
import { ProductSelectionModal } from './product-selection-modal'
import { useCompany } from '@/hooks/useCompany'
import { Plus, ArrowBigRight, ChevronRight } from 'lucide-react'
import type { Product } from '@/types/database'
import { getProductsForOperation } from '@/app/actions/products'
import Image from 'next/image'

interface CartItem extends Product {
	quantity: number
}

interface OperationModalProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

export function OperationModal({ isOpen, onOpenChange }: OperationModalProps) {
	const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([])
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
	const [isProductSelectionOpen, setIsProductSelectionOpen] = useState(false)
	const [products, setProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const { company, loading, error } = useCompany()

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const result = await getProductsForOperation()
				if (result.success) {
					console.log('Loaded products:', result.data)
					setProducts(result.data || [])
				} else {
					console.error('Failed to load products:', result.error)
				}
			} catch (error) {
				console.error('Error loading products:', error)
			} finally {
				setIsLoading(false)
			}
		}

		if (isOpen) {
			loadProducts()
		}
	}, [isOpen])

	const totalAmount = selectedProducts.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)

	const handleProductsConfirm = (products: CartItem[]) => {
		console.log('Selected products:', products)
		setSelectedProducts(products)
	}

	const handleConfirmationOpen = () => {
		onOpenChange(false)
		setIsConfirmationOpen(true)
		// Очищаем корзину после перехода к подтверждению
		// setSelectedProducts([])
	}

	const additional_discount =
		totalAmount * ((company?.additional_discount || 0) / 100)

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
									<>ТОВ&nbsp;"{company.name}"</>
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
						<Separator className='my-2 bg-[#2A2E37]' />
						<div className='space-y-4'>
							<Button
								variant='outline'
								className='w-full bg-[#1c1d21] text-white border-none hover:bg-[#2c2d31] h-12'
								onClick={() => setIsProductSelectionOpen(true)}
								disabled={isLoading}
							>
								{isLoading ? (
									'Завантаження...'
								) : (
									<>
										{selectedProducts.length > 0 ? (
											<div className='flex justify-between items-center w-full p-4'>
												<div className='text-[16px]'>
													{selectedProducts.reduce(
														(sum, item) => sum + item.quantity,
														0
													)}{' '}
													товарів
												</div>
												<div>
													<ChevronRight className='w-6 h-6' />
												</div>
											</div>
										) : (
											<>
												<Plus className='mr-2 h-4 w-4' />
												Додати товар
											</>
										)}
									</>
								)}
							</Button>

							<div className='space-y-2 mt-10'>
								{/* <Separator className='my-10 bg-[#2A2E37]' /> */}
								<div className='bg-[#1c1d21] rounded-lg px-4 py-3 text-center'>
									<span className='text-2xl font-normal text-white'>
										{totalAmount === 0 ? (
											<div className='text-[#61626F] text-[20px] font-normal'>
												Сума операції (₴)
											</div>
										) : (
											<div className='flex justify-between items-center'>
												<div className='text-[24px] text-[#F4F4F4] font-normal'>
													₴ {totalAmount.toFixed(2)}
												</div>

												<div className='text-[16px] font-normal text-[#F4F4F4] flex items-center gap-2'>
													+ {additional_discount.toFixed(2)}
													<Image
														src={'/business/products/nomo.svg'}
														alt='Nomo'
														width={16}
														height={16}
													/>
												</div>
											</div>
										)}
									</span>
								</div>
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
							className='flex-1 bg-[#ff9500] text-[#121315] hover:bg-[#ff9500]/90 h-12'
							onClick={handleConfirmationOpen}
							disabled={selectedProducts.length === 0}
						>
							Підтвердити
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<ProductSelectionModal
				isOpen={isProductSelectionOpen}
				onOpenChange={setIsProductSelectionOpen}
				onConfirm={handleProductsConfirm}
				products={products}
			/>

			<ConfirmationDialog
				isOpen={isConfirmationOpen}
				onOpenChange={setIsConfirmationOpen}
				data={{
					company: company?.name || 'Компанію не знайдено',
					cashier: 'Савченко Катерина',
					amount: totalAmount.toFixed(2),
				}}
			/>
		</>
	)
}
