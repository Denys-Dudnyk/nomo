'use client'

import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import type { Product } from '@/types/database'
import { getCompanyById, getCompanyByIds } from '@/app/actions/companies'
import { createClient } from '@/lib/supabase/client'
import { Company } from '@/types/company'
import { useCompany } from '@/hooks/useCompany'

interface CartItem extends Product {
	quantity: number
}

interface ProductSelectionModalProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: (products: CartItem[]) => void
	products?: Product[]
}

export function ProductSelectionModal({
	isOpen,
	onOpenChange,
	onConfirm,
	products = [],
}: ProductSelectionModalProps) {
	const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([])
	const [searchQuery, setSearchQuery] = useState('')

	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const handleProductSelect = (product: Product) => {
		setSelectedProducts(prev => {
			const existingItem = prev.find(item => item.id === product.id)
			if (existingItem) {
				// Увеличиваем количество существующего товара
				return prev.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}
			// Добавляем новый товар с количеством 1
			return [...prev, { ...product, quantity: 1 }]
		})
	}

	const handleQuantityChange = (productId: string, change: number) => {
		setSelectedProducts(prev => {
			return prev
				.map(item => {
					if (item.id === productId) {
						const newQuantity = Math.max(0, item.quantity + change)
						return { ...item, quantity: newQuantity }
					}
					return item
				})
				.filter(item => item.quantity > 0) // Удаляем товары с количеством 0
		})
	}

	const totalAmount = selectedProducts.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)

	const handleConfirm = () => {
		onConfirm(selectedProducts)
		onOpenChange(false)
	}

	const { company, loading, error } = useCompany()

	const additional_discount =
		totalAmount * ((company?.additional_discount || 0) / 100)

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className='sm:w-full sm:max-w-[1200px]  max-h-[90vh] border-none bg-[#121315] text-white p-0'>
				<DialogHeader className='p-6 pb-0'>
					<DialogTitle className='text-2xl font-normal text-center'>
						Оберіть товари
					</DialogTitle>
				</DialogHeader>
				<div className='flex h-[calc(80vh-140px)] gap-20'>
					{/* Left side - Product List */}
					<div className='flex-1   p-6'>
						<div className='relative mb-4'>
							<Input
								placeholder='Пошук'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='pl-3 bg-[#1c1d21] border-none rounded-[10px] text-[14px] text-[#fff] placeholder:text-[#61626F]'
							/>
							<Search className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
						</div>
						<div className=' overflow-auto h-[calc(100%-70px)]  pr-[12px] rounded-[10px]  products-scrollbar  '>
							<div className='bg-[#191B20] p-4 space-y-2 rounded-[10px]'>
								{filteredProducts.map(product => (
									<div
										key={product.id}
										className='flex items-center gap-3 p-3 rounded-lg bg-[#272A35] hover:bg-[#2c2d31] cursor-pointer transition-colors'
										onClick={() => handleProductSelect(product)}
									>
										<div className='relative w-12 h-12 rounded-md overflow-hidden'>
											<Image
												src={product.image_path || '/placeholder.svg'}
												alt={product.name}
												fill
												className='object-cover'
											/>
										</div>
										<div className='flex-1'>
											<div className='text-sm font-medium'>{product.name}</div>
											<div className='text-xs text-gray-400'>
												{product.category}
											</div>
										</div>
										<div className='text-sm font-medium'>₴{product.price}</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right side - Selected Products */}
					<div className='w-full max-w-[416px] flex flex-col'>
						<div className='flex-1 p-6 overflow-auto'>
							{selectedProducts.length === 0 ? (
								<div className='h-full flex items-center justify-center text-center text-gray-400'>
									<div>
										<div className='text-sm mb-2'>Поки що список порожній</div>
										<div className='text-xs'>
											Тут будуть відображатися обрані товари
										</div>
									</div>
								</div>
							) : (
								<div className='space-y-[16px] p-4 border-[3px] rounded-[16px] border-dashed border-[#1F222A]'>
									{selectedProducts.map(item => (
										<div
											key={`${item.id}-${item.quantity}`}
											className='flex items-center gap-3 p-3 rounded-[12px] bg-[#272A35]'
										>
											<div className='relative w-10 h-10 rounded-md overflow-hidden'>
												<Image
													src={item.image_path || '/placeholder.svg'}
													alt={item.name}
													fill
													className='object-cover'
												/>
											</div>
											<div className='flex-1'>
												<div className='text-sm font-medium'>{item.name}</div>
												<div className='text-xs text-gray-400'>
													₴{(item.price * item.quantity).toFixed(2)}
												</div>
											</div>
											<div className='flex items-center gap-2'>
												<Button
													variant='ghost'
													className='h-8 w-8 p-0 text-gray-400 hover:text-white'
													onClick={e => {
														e.stopPropagation()
														handleQuantityChange(item.id, -1)
													}}
												>
													<Minus className='h-4 w-4' />
												</Button>
												<span className='text-sm w-4 text-center'>
													{item.quantity}
												</span>
												<Button
													variant='ghost'
													className='h-8 w-8 p-0 text-gray-400 hover:text-white'
													onClick={e => {
														e.stopPropagation()
														handleQuantityChange(item.id, 1)
													}}
												>
													<Plus className='h-4 w-4' />
												</Button>
											</div>
										</div>
									))}
								</div>
							)}
						</div>

						{/* Footer with total and buttons */}
						<div className=' p-6'>
							<div className='flex justify-between items-center mb-4 bg-[#191B20] px-4 py-3 rounded-[12px]'>
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
						</div>
					</div>
				</div>
				<div className='flex gap-12 px-[32px] pb-8'>
					<Button
						className='flex-1 bg-[#18191E] text-[#F4F4F4] border-none hover:bg-[#2c2d31] py-[18px]'
						onClick={() => onOpenChange(false)}
					>
						Відмінити
					</Button>
					<Button
						className='flex-1 bg-[#FF8D2A] text-[#121315] hover:bg-accenthover py-[18px]'
						onClick={handleConfirm}
						disabled={selectedProducts.length === 0}
					>
						Підтвердити
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
