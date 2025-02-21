'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, MapPin } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Partner {
	id: number
	name: string
	logoUrl?: string
	bannerUrl?: string
	subtitle: string
}

const MapPage = () => {
	const partners: Partner[] = [
		{
			id: 1,
			name: 'Hyatt Regency',
			logoUrl: '/cashback/item.svg',
			bannerUrl: '/company/image.png',
			subtitle: 'Готель, ресторани та кафе',
		},
		{
			id: 2,
			name: 'Hyatt Regency',
			logoUrl: '/cashback/item.svg',
			subtitle: 'Готель, ресторани та кафе',
		},
		{
			id: 3,
			name: 'Hyatt Regency',
			logoUrl: '/cashback/item.svg',
			subtitle: 'Готель, ресторани та кафе',
		},
		{
			id: 4,
			name: 'Hyatt Regency',
			logoUrl: '/cashback/item.svg',
			subtitle: 'Готель, ресторани та кафе',
		},
		{
			id: 5,
			name: 'Hyatt Regency',
			logoUrl: '/cashback/item.svg',
			subtitle: 'Готель, ресторани та кафе',
		},
		{
			id: 6,
			name: 'Hyatt Regency',
			logoUrl: '/cashback/item.svg',
			subtitle: 'Готель, ресторани та кафе',
		},
		{
			id: 7,
			name: 'Hyatt Regency',
			logoUrl: '/cashback/item.svg',
			subtitle: 'Готель, ресторани та кафе',
		},
		{
			id: 8,
			name: 'Hyatt Regency',
			logoUrl: '/cashback/item.svg',
			subtitle: 'Готель, ресторани та кафе',
		},
	]

	return (
		<main className='min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]'>
			<section className='py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-10'>
				<div className='max-w-7xl mx-auto'>
					{/* Partners Map Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='mb-16'
					>
						<div className='text-center mb-10'>
							<h2 className='text-white text-3xl sm:text-4xl font-bold mb-4'>
								КАРТА ПАРТНЕРІВ
							</h2>
							<p className='text-gray-400 text-lg max-w-2xl mx-auto'>
								Тут ви можете знайти наших партнерів, які пропонують кешбек на свої товари чи послуги
							</p>
						</div>

						<div
							className='rounded-2xl overflow-hidden shadow-2xl'
							style={{ filter: 'invert(1) hue-rotate(180deg)' }}
						>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.9631935332186!2d24.738350576869387!3d48.916093496643455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4730c3d7ff25bc91%3A0xd4b6a5ad6531c10e!2z0YPQuy4g0JjQstCw0YHRjtC60LAsIDg0LCDQmNCy0LDQvdC-LtCk0YDQsNC90LrQvtCy0YHQuiwg0JjQstCw0L3Qvi3QpNGA0LDQvdC60L7QstGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCDQo9C60YDQsNC40L3QsCwgNzYwMDA!5e0!3m2!1sru!2ssk!4v1734522030520!5m2!1sru!2ssk'
								width='100%'
								height='400'
								style={{ border: '0' }}
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
								title='Google Map'
							></iframe>
						</div>
					</motion.div>

					{/* Partners Grid Section */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='mb-20'
					>
						<h2 className='text-white text-2xl sm:text-3xl font-bold mb-8'>
							НАШІ ПАРТНЕРИ ПОБЛИЗУ
						</h2>
						<div className='flex flex-col sm:flex-row gap-4 mb-10'>
							<div className='flex-grow relative'>
								<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
								<Input
									placeholder='Пошук (вкажіть назву або категорію)'
									className='w-full  bg-white bg-opacity-10 border-none text-white h-14 pl-12 pr-4 rounded-full placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF8D2A] transition-all'
								/>
							</div>
							<Button className='bg-[#FF8D2A] hover:bg-[#FF8D2A]/90 text-white h-14 px-8 text-base font-medium rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center'>
								<MapPin className='mr-2 h-5 w-5' />
								ВИЗНАЧИТИ ЛОКАЦІЮ
							</Button>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{partners.map((partner, index) => (
								<motion.div
									key={partner.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<Card className='bg-white bg-opacity-5 border-none hover:bg-opacity-10 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl'>
										<CardContent className='p-6 flex items-center space-x-4'>
											<div className='w-16 h-16 bg-white rounded-full flex-shrink-0 overflow-hidden'>
												{partner.logoUrl ? (
													<Image
														src={partner.logoUrl || '/placeholder.svg'}
														alt={partner.name}
														width={64}
														height={64}
														className='w-full h-full object-cover'
													/>
												) : (
													<div className='w-full h-full flex items-center justify-center bg-gray-300'>
														<p className='text-sm text-gray-700'>N/A</p>
													</div>
												)}
											</div>
											<div className='flex-grow'>
												<p className='text-white text-lg font-semibold mb-1'>
													{partner.name}
												</p>
												<p className='text-gray-400 text-sm'>
													{partner.subtitle}
												</p>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Global System Section */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className='relative pb-16'
					>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center'>
							<div className='max-w-xl'>
								<h2 className='text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-6'>
									Глобальна система
									<br />
									<span className='text-[#FF8D2A]'>Block N</span>
								</h2>
								<div className='space-y-4 text-gray-300 text-lg'>
									<p>
										Block N — це стартап, який пропонує криптовалютні кешбек.
										Хоч ми тільки розпочинаємо свою діяльність, маємо надійних
										партнерів, що підтверджують нашу стабільність і потенціал.
									</p>
									<p>
										Ми не лише працюємо над розширенням франшиз по всьому світу,
										а й самостійно виходимо на нові ринки та країни, що дозволяє
										нам швидко збільшувати своє охоплення та вплив.
									</p>
								</div>
							</div>
							<div className='relative h-[300px] sm:h-[400px] bg-[#0B1C3D] rounded-[100px] sm:rounded-[200px] overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out'>
								<div className='absolute inset-0 flex items-center justify-center p-0'>
									<Image
										src='/map/globe.png'
										alt='Global presence map'
										layout='fill'
										objectFit='cover'
										className='opacity-80 hover:opacity-100 transition-opacity duration-300'
									/>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Statistics */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'
					>
						{[
							{ number: '42', text: 'Міст у понад 12 Країнах' },
							{
								number: '~1500',
								text: 'До нас постійно підключаються нові партнери. І їхня кількість зростає з кожним днем, оскільки вона інтегрується з нашою платформою.',
							},
							{
								number: '6',
								text: 'Ми активно розвиваємо мережу франшиз. І їхня кількість постійно зростає.',
							},
							{
								number: '~45000',
								text: 'Кількість наших користувачів постійно зростає, оскільки все більше людей приєднується до нашої платформи.',
							},
						].map((stat, index) => (
							<motion.div
								key={index}
								className='bg-white bg-opacity-5 rounded-xl p-6 hover:bg-opacity-10 transition-all duration-300 ease-in-out transform hover:scale-105'
								whileHover={{ y: -5 }}
							>
								<h3 className='text-[#FF8D2A] text-4xl sm:text-5xl font-bold mb-4'>
									{stat.number}
								</h3>
								<p className='text-gray-300 text-sm'>{stat.text}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>
		</main>
	)
}

export default MapPage
