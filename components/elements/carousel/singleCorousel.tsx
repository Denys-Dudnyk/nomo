'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Autoplay from 'embla-carousel-autoplay'

const carouselItems = [
	{
		id: 1,
		title: 'Bitcoin',
		imageUrl: '/carousel/inv1.jpg',
		description: 'Discover how Bitcoin is revolutionizing the financial world.',
		ctaText: 'Learn More',
	},
	{
		id: 2,
		title: 'Ethereum',
		imageUrl: '/carousel/inv3.jpg',
		description:
			'Explore the power of decentralized applications with Ethereum.',
		ctaText: 'Learn More',
	},
	{
		id: 3,
		title: 'Cardano',
		imageUrl: '/carousel/inv4.jpg',
		description:
			"Learn about Cardano's eco-friendly approach to cryptocurrency.",
		ctaText: 'Learn More',
	},
	{
		id: 4,
		title: 'Polkadot',
		imageUrl: '/carousel/inv5.jpg',
		description:
			'Understand how Polkadot is connecting different blockchain networks.',
		ctaText: 'Learn More',
	},
	{
		id: 5,
		title: 'Solana',
		imageUrl: '/carousel/inv6.jpg',
		description:
			'Experience lightning-fast blockchain transactions with Solana, the high-performance cryptocurrency network.',
		ctaText: 'Learn More',
	},
]

export function CarouselSingle() {
	const [api, setApi] = React.useState<CarouselApi>()
	const [current, setCurrent] = React.useState(0)
	const [autoplayRef] = React.useState(() =>
		Autoplay({ delay: 5000, stopOnInteraction: false })
	)

	React.useEffect(() => {
		if (!api) {
			return
		}

		setCurrent(api.selectedScrollSnap())
		api.on('select', () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])

	const handleMouseEnter = () => {
		autoplayRef.stop()
	}

	const handleMouseLeave = () => {
		autoplayRef.reset()
	}

	return (
		<Carousel
			setApi={setApi}
			className='w-full h-full'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			plugins={[autoplayRef]}
		>
			<CarouselContent className='h-full'>
				{carouselItems.map(item => (
					<CarouselItem key={item.id} className='h-full'>
						<div className='relative w-full h-full min-h-[300px] sm:aspect-[21/9]'>
							<Image
								src={item.imageUrl}
								alt={item.title}
								fill
								className='object-cover'
							/>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex flex-col items-center justify-center text-center px-4'
							>
								<h1 className='text-white text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide uppercase drop-shadow-lg shadow-black mb-4 max-w-4xl'>
									{item.title}
								</h1>
								<p className='text-white text-sm sm:text-lg md:text-xl font-medium max-w-3xl drop-shadow-md shadow-black mb-8'>
									{item.description}
								</p>
								<Button className='py-3 px-3 sm:p-3 bg-accent text-[#fff] hover:text-accent text-xs sm:text-sm md:text-base'>
									{item.ctaText}
									<ChevronRight className='ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1' />
								</Button>
							</motion.div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<div className='absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10 sm:flex hidden'>
				{carouselItems.map((_, index) => (
					<button
						key={index}
						className={cn(
							'w-3 h-3 rounded-full transition-colors duration-300',
							current === index ? 'bg-white' : 'bg-white/50'
						)}
						onClick={() => api?.scrollTo(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</Carousel>
	)
}

export function CarouselContainer() {
	return (
		<div className='w-full h-screen sm:h-auto mx-auto mb-10'>
			<div className='carousel-container h-full overflow-hidden'>
				<CarouselSingle />
			</div>
		</div>
	)
}
