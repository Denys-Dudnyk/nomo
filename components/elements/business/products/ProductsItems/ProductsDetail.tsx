'use client'

import type React from 'react'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Save,
	Pencil,
} from 'lucide-react'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { Product, Category } from '@/types/database'
import { updateProduct } from '@/app/actions/products'
import { uploadProductImage } from '@/app/actions/upload'
import { toast } from 'sonner'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { createProduct } from '@/app/actions/products'

interface ProductDetailsProps {
	product: Product
	categories: Category[]
	isNew?: boolean
}

export default function ProductDetails({
	product: initialProduct,
	categories,
	isNew = false,
}: ProductDetailsProps) {
	const [product, setProduct] = useState(initialProduct)
	const [isEditing, setIsEditing] = useState(isNew)
	const [isSaving, setIsSaving] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [isUploading, setIsUploading] = useState(false)
	const router = useRouter()

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		setIsUploading(true)
		try {
			const result = await uploadProductImage(file)
			if (result.success && result.url) {
				handleInputChange('image_path', result.url)
				toast.success('Зображення завантажено!')
			} else {
				throw new Error('Failed to upload image')
			}
		} catch (error) {
			toast.error('Помилка при завантаженні зображення')
			console.error('Error uploading image:', error)
		} finally {
			setIsUploading(false)
		}
	}

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text)
		toast.success('Скопійовано!')
	}

	const handleSave = async () => {
		setIsSaving(true)
		try {
			// Если это новый продукт, используем createProduct
			const result = isNew
				? await createProduct(product)
				: await updateProduct(product.id, product)

			if (result.success) {
				toast.success(isNew ? 'Продукт створено!' : 'Продукт збережено!')
				if (isNew) {
					// Перенаправляем на страницу продукта после создания
					router.push(`/partners/products/${result.data.id}`)
				} else {
					setIsEditing(false)
				}
			} else {
				throw new Error('Failed to save product')
			}
		} catch (error) {
			toast.error('Помилка при збереженні продукту')
			console.error('Error saving product:', error)
		} finally {
			setIsSaving(false)
		}
	}

	const handleInputChange = (
		field: keyof Product,
		value: string | number | string[]
	) => {
		setProduct(prev => {
			const newProduct = {
				...prev,
				[field]: value,
			}

			// Если меняется category_id, очищаем старое поле category
			if (field === 'category_id') {
				const selectedCategory = categories.find(cat => cat.id === value)
				newProduct.category = selectedCategory?.name || ''
			}

			return newProduct
		})
	}

	return (
		<div className='space-y-6 p-5'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div className='space-y-2'>
					<Link
						href='/partners/products'
						className='inline-flex items-center text-sm text-gray-400 hover:text-gray-300'
					>
						<ChevronLeft className='h-4 w-4 mr-1' />
						Назад до Продуктів
					</Link>
					<h1 className='text-xl font-semibold text-white'>
						{isNew ? 'Новий продукт' : 'Деталі продукту'}
					</h1>
				</div>
				<div className='flex gap-2'>
					{!isNew && !isEditing && (
						<Button
							onClick={() => setIsEditing(true)}
							className='bg-[#1c1d20] hover:bg-[#2a2b2f] text-gray-400 p-3'
						>
							<Pencil className='h-4 w-4 mr-2' />
							Редагувати
						</Button>
					)}
					{(isEditing || isNew) && (
						<Button
							onClick={handleSave}
							className='bg-[#FF8D2A] hover:bg-[#b35429] text-black p-3'
							disabled={isSaving}
						>
							{isSaving ? 'Збереження...' : 'Зберегти'}
							<Save className='ml-2 h-4 w-4' />
						</Button>
					)}
				</div>
			</div>

			{/* Basic Information Section */}
			<Collapsible
				defaultOpen
				className='border border-gray-800 rounded-md text-[var(--foreground)] border-none shadow-none rounded-lg bg-[#121315]'
			>
				<CollapsibleTrigger className='flex items-center justify-between w-full p-4 text-gray-400 hover:bg-[#1c1d20]'>
					<span>Базові</span>
					<ChevronDown className='h-4 w-4' />
				</CollapsibleTrigger>
				<CollapsibleContent className='border-gray-800'>
					<div className='p-4 space-y-6'>
						{/* Name */}
						<div>
							<Label className='text-xs text-gray-500'>Найменування</Label>
							<div className='mt-1'>
								<Input
									value={product.name}
									onChange={e => handleInputChange('name', e.target.value)}
									readOnly={!isEditing}
									className='bg-[#1c1d20] border-none text-sm rounded-lg text-gray-400'
								/>
							</div>
						</div>

						{/* Category and Unit */}
						<div className='grid grid-cols-2 gap-8'>
							<div>
								<Label className='text-xs text-gray-500'>Категорія</Label>
								<div className='mt-1'>
									{isEditing ? (
										<Select
											value={product.category_id || ''}
											onValueChange={value =>
												handleInputChange('category_id', value)
											}
										>
											<SelectTrigger className='bg-[#1c1d20] border-none text-sm text-gray-400 rounded-lg'>
												<SelectValue placeholder='Виберіть категорію' />
											</SelectTrigger>
											<SelectContent className='bg-[#1c1d20] border-gray-800'>
												{categories.map(category => (
													<SelectItem key={category.id} value={category.id}>
														{category.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									) : (
										<Input
											value={product.category_id}
											readOnly
											className='bg-[#1c1d20] border-none text-sm text-gray-400 rounded-lg'
										/>
									)}
								</div>
							</div>
							<div>
								<Label className='text-xs text-gray-500'>Одиниця виміру</Label>
								<div className='mt-1'>
									<Input
										value={product.unit}
										onChange={e => handleInputChange('unit', e.target.value)}
										readOnly={!isEditing}
										className='bg-[#1c1d20] border-none text-sm text-gray-400 rounded-lg'
									/>
								</div>
							</div>
						</div>

						{/* IDs */}
						<div className='grid grid-cols-2 gap-8'>
							<div>
								<Label className='text-xs text-gray-500'>ID товару</Label>
								<div className='mt-1'>
									<Input
										value={product.product_id || ''}
										onChange={e =>
											handleInputChange('product_id', e.target.value)
										}
										readOnly={!isEditing}
										className='bg-[#1c1d20] border-none text-sm text-gray-400 rounded-lg'
									/>
								</div>
							</div>
							<div>
								<Label className='text-xs text-gray-500'>
									Внутрішній ідентифікатор
								</Label>
								<div className='mt-1'>
									<Input
										value={product.internal_id || ''}
										onChange={e =>
											handleInputChange('internal_id', e.target.value)
										}
										readOnly={!isEditing}
										className='bg-[#1c1d20] border-none text-sm text-gray-400 rounded-lg'
									/>
								</div>
							</div>
						</div>

						{/* Image Upload */}
						<div>
							<Label className='text-xs text-gray-500'>Зображення товару</Label>
							<div className='mt-1 space-y-2'>
								{product.image_path && (
									<div className='relative w-32 h-32 rounded-lg overflow-hidden'>
										<img
											src={product.image_path || '/placeholder.svg'}
											alt={product.name}
											className='object-cover w-full h-full'
										/>
									</div>
								)}
								{isEditing && (
									<div className='flex items-center gap-2'>
										<input
											type='file'
											ref={fileInputRef}
											onChange={handleImageUpload}
											accept='image/*'
											className='hidden'
										/>
										<Button
											type='button'
											onClick={() => fileInputRef.current?.click()}
											disabled={isUploading}
											className='bg-[#1c1d20] hover:bg-[#2a2b2f] text-gray-400 p-3'
										>
											{isUploading
												? 'Завантаження...'
												: 'Завантажити зображення'}
										</Button>
										{product.image_path && (
											<Button
												type='button'
												variant='destructive'
												onClick={() => handleInputChange('image_path', '')}
												className='bg-red-900 hover:bg-red-800 text-white p-3'
											>
												Видалити
											</Button>
										)}
									</div>
								)}
								<Input
									value={product.image_path || ''}
									onChange={e =>
										handleInputChange('image_path', e.target.value)
									}
									readOnly={!isEditing}
									className='bg-[#1c1d20] border-none text-sm text-gray-400'
									placeholder='URL зображення'
								/>
							</div>
						</div>

						{/* Tags */}
						<div>
							<Label className='text-xs text-gray-500'>Теги</Label>
							<Input
								value={product.tags?.join(' ') || ''}
								onChange={e =>
									handleInputChange(
										'tags',
										e.target.value.split(' ').filter(Boolean)
									)
								}
								readOnly={!isEditing}
								className='bg-[#1c1d20] border-none text-sm text-gray-400'
								placeholder='#tag1 #tag2'
							/>
						</div>

						<div>
							<Label className='text-xs text-gray-500'>Опис товару</Label>
							<div className='mt-1'>
								<Textarea
									value={product.description || ''}
									onChange={e =>
										handleInputChange('description', e.target.value)
									}
									readOnly={!isEditing}
									className='bg-[#1c1d20] border-none text-sm text-gray-400'
								/>
							</div>
						</div>

						{/* PLU and EAN */}
						<div className='grid grid-cols-2 gap-8'>
							<div>
								<Label className='text-xs text-gray-500'>PLU</Label>
								<div className='mt-1'>
									<Input
										value={product.plu || ''}
										onChange={e => handleInputChange('plu', e.target.value)}
										readOnly={!isEditing}
										className='bg-[#1c1d20] border-none text-sm text-gray-400 rounded-lg'
									/>
								</div>
							</div>
							<div>
								<Label className='text-xs text-gray-500'>EAN</Label>
								<div className='mt-1'>
									<Input
										value={product.ean || ''}
										onChange={e => handleInputChange('ean', e.target.value)}
										readOnly={!isEditing}
										className='bg-[#1c1d20] border-none text-sm text-gray-400 rounded-lg'
									/>
								</div>
							</div>
						</div>
					</div>
				</CollapsibleContent>
			</Collapsible>

			{/* Price Section */}
			<Collapsible className='border border-gray-800 rounded-md bg-[#121315] text-[var(--foreground)] border-none shadow-none rounded-lg'>
				<CollapsibleTrigger className='flex items-center justify-between w-full p-4 text-gray-400 hover:bg-[#1c1d20]'>
					<span>Ціна</span>
					<ChevronDown className='h-4 w-4' />
				</CollapsibleTrigger>
				<CollapsibleContent className='border-gray-800'>
					<div className='p-4 space-y-6'>
						{/* Price without VAT and VAT */}
						<div className='grid grid-cols-2 gap-8'>
							<div>
								<Label className='text-xs text-gray-500'>Ціна без ПДВ</Label>
								<div className='mt-1 relative'>
									<Input
										type='number'
										value={product.price_without_vat || ''}
										onChange={e =>
											handleInputChange(
												'price_without_vat',
												Number.parseFloat(e.target.value)
											)
										}
										readOnly={!isEditing}
										className='bg-[#1c1d20] border-none text-sm text-gray-400 pr-10 rounded-lg'
									/>
									<span className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500 pointer-events-none'>
										₴ <ChevronRight className='w-4 h-4' />
									</span>
								</div>
							</div>
							<div>
								<Label className='text-xs text-gray-500'>ПДВ</Label>
								<div className='mt-1 relative'>
									<Input
										type='number'
										value={product.vat_percentage || ''}
										onChange={e =>
											handleInputChange(
												'vat_percentage',
												Number.parseInt(e.target.value)
											)
										}
										readOnly={!isEditing}
										className='bg-[#1c1d20] border-none text-sm text-gray-400 pr-8 rounded-lg'
									/>
									<span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500'>
										%
									</span>
								</div>
							</div>
						</div>

						{/* Final Price */}
						<div>
							<Label className='text-xs text-gray-500'>Ціна з ПДВ</Label>
							<div className='mt-1 relative'>
								<Input
									type='number'
									value={product.price}
									onChange={e =>
										handleInputChange(
											'price',
											Number.parseFloat(e.target.value)
										)
									}
									readOnly={!isEditing}
									className='bg-[#1c1d20] border-none text-sm text-gray-400 pr-8 rounded-lg'
								/>
								<span className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500 pointer-events-none'>
									₴ <ChevronRight className='w-4 h-4' />
								</span>
							</div>
						</div>

						{/* Cashback */}
						<div className='grid grid-cols-2 gap-8'>
							<div>
								<Label className='text-xs text-gray-500'>Кешбек %</Label>
								<div className='mt-1 relative'>
									<Input
										type='number'
										value={product.cashback_percentage || ''}
										onChange={e =>
											handleInputChange(
												'cashback_percentage',
												Number.parseInt(e.target.value)
											)
										}
										readOnly
										className='bg-[#1c1d20] border-none text-sm text-gray-400 pr-8 rounded-lg'
									/>
									<span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500'>
										%
									</span>
								</div>
							</div>
							<div>
								<Label className='text-xs text-gray-500'>Кешбек сума</Label>
								<div className='mt-1 relative'>
									<Input
										type='number'
										value={product.cashback_amount || ''}
										onChange={e =>
											handleInputChange(
												'cashback_amount',
												Number.parseFloat(e.target.value)
											)
										}
										readOnly
										className='bg-[#1c1d20] border-none text-sm text-gray-400 pr-8 rounded-lg'
									/>
									<span className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500 pointer-events-none'>
										₴ <ChevronRight className='w-4 h-4' />
									</span>
								</div>
							</div>
						</div>
					</div>
				</CollapsibleContent>
			</Collapsible>

			{/* Warehouse Section */}
			<Collapsible className='border border-gray-800 rounded-md bg-[#121315] text-[var(--foreground)] border-none shadow-none rounded-lg'>
				<CollapsibleTrigger className='flex items-center justify-between w-full p-4 text-gray-400 hover:bg-[#1c1d20]'>
					<span>Складські приміщення</span>
					<ChevronDown className='h-4 w-4' />
				</CollapsibleTrigger>
				<CollapsibleContent className='border-t border-gray-800'>
					<div className='p-10 text-center'>
						<p className='text-sm text-gray-400'>В розробці...</p>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	)
}
