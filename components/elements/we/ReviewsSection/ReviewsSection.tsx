'use client'

import { useState } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { ReviewsItem } from './ReviewsItem'
import Image from 'next/image'
import DevelopModal from '@/components/ui/DevelopModal/DevelopModal'

const testimonials = [
	{
		id: 1,
		name: 'Robert Fox',
		surname: '',
		avatar: '/we/user1.svg',
		rating: 5,
		text: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
	},
	{
		id: 2,
		name: 'Jenny Wilson',
		surname: '',
		avatar: '/we/user2.svg',
		rating: 5,
		text: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
	},
	{
		id: 3,
		name: 'Jacob Jones',
		surname: '',
		avatar: '/we/user3.svg',
		rating: 5,
		text: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
	},
	{
		id: 4,
		name: 'Sarah Smith',
		surname: '',
		avatar: '/we/user2.svg',
		rating: 5,
		text: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
	},
	{
		id: 5,
		name: 'Sarah Smith',
		surname: '',
		avatar: '/we/user3.svg',
		rating: 5,
		text: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
	},
]

export const ReviewsSection = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const isMobile = useIsMobile()
	const itemsPerPage = isMobile ? 1 : 3
	const totalPages = Math.ceil(testimonials.length / itemsPerPage)
	const [showDev, setShowDev] = useState(false)

	const nextSlide = () => {
		setCurrentIndex(prev => (prev + 1) % totalPages)
	}

	const prevSlide = () => {
		setCurrentIndex(prev => (prev === 0 ? totalPages - 1 : prev - 1))
	}

	const getCurrentTestimonials = () => {
		const start = currentIndex * itemsPerPage
		const end = start + itemsPerPage
		return testimonials.slice(start, end)
	}

	const visibleTestimonials = getCurrentTestimonials()

	const openDevelopModal = () => {
		setShowDev(true)
	}

	return (
		<>
			<section className='py-16 px-4 max-w-7xl mx-auto text-[#0f0f0f]'>
				<h2 className='text-[40px] sm:text-[54px] font-extrabold text-center mb-[56px] '>
					<span className='relative'>
						Що кажуть наші
						<span className='absolute -bottom-3 left-[55%] transform -translate-x-1/2 w-full h-[9px] bg-accent rounded-full'></span>
					</span>{' '}
					<span className='relative'>
						клієнти
						<span className='absolute -bottom-3 left-[55%] transform -translate-x-1/2 w-[55%] h-[9px] bg-accent rounded-full'></span>
					</span>
				</h2>

				<div className='relative'>
					<div className='flex items-center justify-center gap-8 '>
						<button
							onClick={prevSlide}
							className='hidden md:flex  items-center justify-center '
							aria-label='Previous slide'
						>
							<Image src={'/we/arrow-left.svg'} alt='' width={26} height={31} />
						</button>

						<div className='overflow-hidden '>
							<div className='flex gap-[36px] py-6 px-4'>
								{visibleTestimonials.map(testimonial => (
									<div
										key={testimonial.id}
										className='min-w-full md:min-w-[calc(33.333%-1.5rem)] flex justify-center'
									>
										<ReviewsItem {...testimonial} />
									</div>
								))}
							</div>
							<div className='text-left mt-8'>
								<button
									className='text-[#919191] font-bold text-[18px] underline  transition-colors'
									onClick={openDevelopModal}
								>
									Додати коментар...
								</button>
							</div>
						</div>

						<button
							onClick={nextSlide}
							className='hidden md:flex  items-center justify-center '
							aria-label='Next slide'
						>
							<Image
								src={'/we/arrow-right.svg'}
								alt=''
								width={26}
								height={31}
							/>
						</button>
					</div>

					{/* Mobile Navigation */}
					<div className='flex justify-center gap-4 mt-8 md:hidden'>
						<button
							onClick={prevSlide}
							className='flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors'
						>
							<ChevronLeft className='w-6 h-6' />
						</button>
						<button
							onClick={nextSlide}
							className='flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors'
						>
							<ChevronRight className='w-6 h-6' />
						</button>
					</div>

					{/* Pagination Dots */}
					{/* <div className='flex justify-center gap-2 mt-8'>
					{Array.from({ length: totalPages }).map((_, index) => (
						<button
							key={index}
							className={`w-2 h-2 rounded-full transition-colors ${
								index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
							}`}
							onClick={() => setCurrentIndex(index)}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div> */}
				</div>
			</section>
			<DevelopModal isOpen={showDev} onClose={() => setShowDev(false)} />
		</>
	)
}
