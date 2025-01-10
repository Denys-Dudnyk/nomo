import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import CashbackItem from '../cashback/CashbackItem'
import CashbackModal from '../cashback/CashbackModal/CashBackModal'
import { Company } from '@/types/company'
import { useRouter } from 'next/navigation'
import { useIsAdmin } from '@/hooks/useIsAdmin'

export function CarouselScroll({
	initialCompanies,
	isAdmin,
}: {
	initialCompanies: Company[]
	isAdmin: boolean
}) {
	const [isModalOpen, setIsModalOpen] = React.useState(false)
	const router = useRouter()

	const handleAddDeal = () => {
		router.push('/company/new')
	}
	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	return (
		<div className='w-full'>
			<Carousel className='w-full'>
				<CarouselContent className='flex gap-[60px] px-16'>
					{isAdmin && (
						<CarouselItem className='flex-shrink-0 w-full max-w-[269px] '>
							<Card className='h-full flex justify-center items-center border-dashed border-2 border-gray-300'>
								<CardContent className='flex flex-col items-center justify-center p-4 space-y-4 '>
									<button
										className='w-full h-full flex justify-center items-center text-7xl text-gray-500'
										onClick={handleAddDeal}
									>
										+
									</button>
								</CardContent>
							</Card>
						</CarouselItem>
					)}

					{initialCompanies.map(item => (
						<CarouselItem
							key={item.id}
							className='flex-shrink-0 w-[90%] max-w-[250px]'
						>
							<div className='flex flex-col items-center justify-center  px-4 py-8 space-y-4'>
								<CashbackItem {...item} />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselPrevious className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-accent' />
				<CarouselNext className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-accent' />
			</Carousel>

			<CashbackModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	)
}
