'use client'

import * as React from 'react'
import {
	LayoutGrid,
	List,
	ChevronRight,
	Plus,
	ChevronDown,
	ChevronUp,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Product, Category } from '@/types/database'
import {
	ProductTable,
	ProductTableBody,
	ProductTableCell,
	ProductTableHead,
	ProductTableHeader,
	ProductTableRow,
} from '@/components/ui/product-table'

interface ProductsViewProps {
	initialProducts: Product[]
	categories: Category[]
}

type SortField = 'name' | 'price' | 'unit'
type SortOrder = 'asc' | 'desc'

export function ProductsView({
	initialProducts,
	categories,
}: ProductsViewProps) {
	const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list')
	const [products, setProducts] = React.useState<Product[]>(initialProducts)
	const [sortField, setSortField] = React.useState<SortField>('name')
	const [sortOrder, setSortOrder] = React.useState<SortOrder>('asc')
	const router = useRouter()

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortField(field)
			setSortOrder('asc')
		}

		const sortedProducts = [...products].sort((a, b) => {
			const aValue = a[field]
			const bValue = b[field]
			const multiplier = sortOrder === 'asc' ? 1 : -1

			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return aValue.localeCompare(bValue) * multiplier
			}
			if (typeof aValue === 'number' && typeof bValue === 'number') {
				return (aValue - bValue) * multiplier
			}
			return 0
		})

		setProducts(sortedProducts)
	}

	const SortIcon = ({ field }: { field: SortField }) => {
		if (sortField !== field)
			return <ChevronUp className='h-3 w-3 opacity-0 group-hover:opacity-50' />
		return sortOrder === 'asc' ? (
			<ChevronUp className='h-3 w-3' />
		) : (
			<ChevronDown className='h-3 w-3' />
		)
	}

	return (
		<div className='min-h-screen bg-[#0F0F0F]'>
			<div className='space-y-4'>
				<div className='flex justify-between items-center px-4 py-3 bg-[#0F0F0F]'>
					<h1 className='text-white text-lg'>Продукти</h1>
					<div className='flex items-center gap-4'>
						<div className='flex bg-[#252629] rounded-md'>
							<button
								onClick={() => setViewMode('list')}
								className={`p-2 rounded-l-md transition-colors ${
									viewMode === 'list' ? 'bg-[#1C1D21]' : 'hover:bg-[#1C1D21]'
								}`}
								aria-label='List view'
							>
								<List className='h-4 w-4 text-gray-400' />
							</button>
							<button
								onClick={() => setViewMode('grid')}
								className={`p-2 rounded-r-md transition-colors ${
									viewMode === 'grid' ? 'bg-[#1C1D21]' : 'hover:bg-[#1C1D21]'
								}`}
								aria-label='Grid view'
							>
								<LayoutGrid className='h-4 w-4 text-gray-400' />
							</button>
						</div>

						<Select defaultValue='all'>
							<SelectTrigger className='w-[120px] bg-[#FF8D2A] text-black hover:bg-[#b35429] border-none text-xs py-1 h-8'>
								<SelectValue placeholder='Категорії' />
							</SelectTrigger>
							<SelectContent className='bg-[#1C1D21] border-gray-800'>
								<SelectItem value='all'>Всі категорії</SelectItem>
								{categories.map(category => (
									<SelectItem key={category.id} value={category.id}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{viewMode === 'list' ? (
					<div className='rounded-[12px]  bg-[#161518]'>
						<ProductTable>
							<ProductTableHeader>
								<ProductTableRow className='hover:bg-transparent border-none'>
									<ProductTableHead
										onClick={() => handleSort('name')}
										className='text-[#767785] font-normal text-sm px-6 py-4 cursor-pointer hover:text-white'
									>
										<div className='flex items-center gap-2'>
											Назва
											<SortIcon field='name' />
										</div>
									</ProductTableHead>
									<ProductTableHead
										onClick={() => handleSort('price')}
										className='text-[#767785] font-normal text-sm px-6 py-4 cursor-pointer hover:text-white'
									>
										<div className='flex items-center gap-2'>
											Ціна
											<SortIcon field='price' />
										</div>
									</ProductTableHead>
									<ProductTableHead
										onClick={() => handleSort('unit')}
										className='text-[#767785] font-normal text-sm px-6 py-4 cursor-pointer hover:text-white'
									>
										<div className='flex items-center gap-2'>
											Одиниця
											<SortIcon field='unit' />
										</div>
									</ProductTableHead>
									<ProductTableHead className='text-[#767785] font-normal text-sm px-6 py-4'>
										Складники
									</ProductTableHead>
									<ProductTableHead className='text-[#767785] font-normal text-sm px-6 py-4'>
										Деталі
									</ProductTableHead>
								</ProductTableRow>
							</ProductTableHeader>
							<ProductTableBody className='border-spacing-[16px] border-collapse'>
								{products.map(product => (
									<ProductTableRow
										key={product.id}
										className='hover:bg-[#252629] transition-colors border-none bg-[#1C1A1E] border-b-transparent border-[16px]'
									>
										<ProductTableCell className='px-6 py-3 text-[#767785] text-sm '>
											{product.name}
										</ProductTableCell>
										<ProductTableCell className='px-6 py-3 text-[#767785] text-sm'>
											₴{product.price}
										</ProductTableCell>
										<ProductTableCell className='px-6 py-3 text-[#767785] text-sm'>
											{product.unit}
										</ProductTableCell>
										<ProductTableCell className='px-6 py-3'>
											<Button
												variant='ghost'
												className='bg-[#B35429] text-white hover:bg-[#B35429]/90 rounded px-3 py-1.5 text-xs font-normal h-7 flex items-center gap-1'
											>
												Складники
												<ChevronRight className='h-4 w-4' />
											</Button>
										</ProductTableCell>
										<ProductTableCell className='px-6 py-3'>
											<Button
												variant='ghost'
												className='bg-[#B35429] text-white hover:bg-[#B35429]/90 rounded px-3 py-1.5 text-xs font-normal h-7 flex items-center gap-1'
												onClick={() =>
													router.push(`/partners/products/${product.id}`)
												}
											>
												Деталі
												<ChevronRight className='h-4 w-4' />
											</Button>
										</ProductTableCell>
									</ProductTableRow>
								))}

								<ProductTableRow
									className='border-[#252629] hover:bg-[#252629] cursor-pointer transition-colors '
									onClick={() => router.push('/partners/products/new')}
								>
									<ProductTableCell colSpan={10} className='text-center py-4'>
										<div className='flex items-center justify-center gap-2 text-[#FF8D2A]'>
											<Plus className='h-4 w-4' />
											<span className='text-sm'>Додати новий продукт</span>
										</div>
									</ProductTableCell>
								</ProductTableRow>
							</ProductTableBody>
						</ProductTable>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4'>
						<div
							className='bg-[#1C1D21] rounded-lg overflow-hidden cursor-pointer hover:bg-[#252629] text-gray-400 hover:text-[#FF8D2A] transition-all border-2 border-dashed border-[#252629] flex items-center justify-center h-full'
							onClick={() => router.push('/partners/products/new')}
						>
							<div className='text-center  '>
								<Plus className='h-8 w-8 mx-auto mb-2' />
								<span className='text-sm'>Додати новий продукт</span>
							</div>
						</div>
						{products.map(product => (
							<div
								key={product.id}
								className='bg-[#1C1D21] rounded-lg overflow-hidden'
							>
								<div className='relative aspect-[4/3] overflow-hidden'>
									<Image
										src={product.image_path || '/placeholder.svg'}
										alt={product.name}
										fill
										className='object-cover'
									/>
								</div>
								<div className='p-4'>
									<div className='flex items-start justify-between mb-2'>
										<span className='text-gray-200 text-sm font-medium'>
											₴{product.price}
										</span>
										<span className='text-gray-500 text-xs'>
											{product.unit}
										</span>
									</div>
									<h3 className='text-gray-400 text-sm mb-3'>{product.name}</h3>
									<div className='flex flex-col gap-2'>
										<button
											className='text-[#FF8D2A] text-xs hover:text-[#FF8D2A]/80 text-left flex items-center justify-between group'
											onClick={() =>
												router.push(`/partners/products/${product.id}`)
											}
										>
											Деталі
											<ChevronRight className='h-3 w-3 transition-transform group-hover:translate-x-0.5' />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				<div className='flex items-center justify-between px-4 py-2 bg-[#1C1D21]'>
					<div className='flex items-center gap-2 text-gray-400'>
						<span className='text-xs'>Відображати по:</span>
						<Select defaultValue='10'>
							<SelectTrigger className='w-[50px] bg-transparent border-[#252629] text-gray-400 h-7 text-xs pl-2'>
								<SelectValue placeholder='10' />
							</SelectTrigger>
							<SelectContent className='bg-[#1C1D21] border-[#252629]'>
								<SelectItem value='10'>10</SelectItem>
								<SelectItem value='20'>20</SelectItem>
								<SelectItem value='50'>50</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='flex items-center gap-1 text-xs'>
						<button className='px-2 py-1 text-gray-400 hover:text-gray-300 transition-colors'>
							←
						</button>
						<button className='px-2 py-1 bg-[#FF8D2A] text-white rounded'>
							1
						</button>
						<button className='px-2 py-1 text-gray-400 hover:text-gray-300 transition-colors'>
							2
						</button>
						<button className='px-2 py-1 text-gray-400 hover:text-gray-300 transition-colors'>
							3
						</button>
						<span className='text-gray-400'>...</span>
						<button className='px-2 py-1 text-gray-400 hover:text-gray-300 transition-colors'>
							15
						</button>
						<button className='px-2 py-1 text-gray-400 hover:text-gray-300 transition-colors'>
							→
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
