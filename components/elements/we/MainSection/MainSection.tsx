import Image from 'next/image'
import { FC } from 'react'

const MainSection: FC = () => {
	return (
		<section className={'relative min-h-screen w-full'}>
			<div className='bg-we '></div>
			<div className='max-w-[1400px] my-0 px-[20px] sm:px-[70px]  mx-auto  flex flex-col lg:flex-row items-center justify-between'>
				<div className='lg:w-1/2 mt-[203px] '>
					<div className='w-full'>
						<h1 className='leading-[126%] text-[35px] sm:text-[40px] lg:text-[56px] font-bold mb-6 tracking-tight items-center gap-2 '>
							<span className='text-[#FF8D2A]'>Nomo</span> твій особистий
							бенефіціар - кешбек, що обирає сам!
						</h1>
						<p className='text-[20px] sm:text-[24px] leading-[140%] tracking-tight text-[#CECECE] mb-8'>
							Ми віримо - таємниця успішних покупок полягає в обраному кешбеку.
							Отримуйте максимум вигоди разом із nomo.
						</p>
						<div className='flex gap-4 mb-[30px] lg:mb-[242px]'>
							<a href='#' className='hover:opacity-80 transition-opacity'>
								<Image
									src={'/we/apple.svg'}
									width={144}
									height={42}
									alt='Nomo App Interface'
								/>
							</a>
							<a href='#' className='hover:opacity-80 transition-opacity'>
								<Image
									src={'/we/googleplay.svg'}
									width={159}
									height={42}
									alt='Nomo App Interface'
								/>
							</a>
						</div>
					</div>

					{/* <div className='space-y-6 '>
						<div className='flex items-center gap-4'>
							<span className='text-[#FF8D2A] text-5xl font-bold'>
								5 000 000 +
							</span>
							<span className='text-gray-300'>випущено Ncoin</span>
						</div>
						<div className='flex items-center gap-4'>
							<span className='text-[#FF8D2A] text-5xl font-bold'>
								60 000 +
							</span>
							<span className='text-gray-300'>
								людей використовують наш сервіс
							</span>
						</div>
						<div className='flex items-center gap-4'>
							<span className='text-[#FF8D2A] text-5xl font-bold'>830 +</span>
							<span className='text-gray-300'>партнерів у різних країнах</span>
						</div>
					</div> */}
				</div>

				<div className='lg:w-1/2 mt-8 lg:mt-[200px] '>
					<div className=''>
						<Image
							src={'/we/iphone.png'}
							width={406}
							height={818}
							alt='Nomo App Interface'
							className=' mx-auto'
						/>
					</div>
					{/* <div className='absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-0 lg:hidden' /> */}
				</div>
			</div>
		</section>
	)
}
export default MainSection
