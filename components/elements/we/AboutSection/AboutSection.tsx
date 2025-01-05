import Image from 'next/image'
import { FC } from 'react'

const AboutSection: FC = () => {
	return (
		<section className={'mt-[150px] mb-[78px]'}>
			<div className='containers'>
				<div className='lg:w-2/3 mt-[150px] lg:ml-[158px] mb-[75px]'>
					<div className='grid grid-cols-1'>
						<div className='flex items-center gap-4'>
							<span className='text-[#FF8D2A] text-[30px] sm:text-[58px] tracking-tight font-bold whitespace-nowrap'>
								5 000 000 +
							</span>
							<span className='text-[#0f0f0f] font-bold  text-[15px] sm:text-[19px]'>
								випущено Ncoin
							</span>
						</div>
						<div className='flex items-center gap-4'>
							<span className='text-[#FF8D2A] text-[30px] sm:text-[58px] tracking-tight font-bold whitespace-nowrap'>
								60 000 +
							</span>
							<span className='text-[#0f0f0f] font-bold text-[15px] sm:text-[19px]'>
								людей використовують наш сервіс
							</span>
						</div>
						<div className='flex items-center gap-4'>
							<span className='text-[#FF8D2A] text-[30px] sm:text-[58px] tracking-tight font-bold whitespace-nowrap'>
								830 +
							</span>
							<span className='text-[#0f0f0f] font-bold text-[15px] sm:text-[19px]'>
								партнерів у різних країнах
							</span>
						</div>
					</div>
				</div>
				<div className='grid-about'>
					<div className='bg-[#212121] rounded-[33px] px-5 py-[33px] max-w-[389px] '>
						<div className='flex items-center gap-[10px]'>
							<Image src={'/we/about-icon.svg'} alt='' width={28} height={22} />
							<p className='text-[21px] text-[#FFFFFF] font-normal tracking-normal'>
								Кешбек за{' '}
								<span className='relative'>
									твоїми{' '}
									<span className='absolute w-[42px] bottom-[3px] right-[7px] h-[4px] bg-accent' />
								</span>{' '}
								правилами
							</p>
						</div>
						<p className='text-[14px] leading-[160%] -tracking-wider mt-[23px]'>
							З nomo ти контролюєш свої вигоди. Обирай кешбек, який пасує твоїм
							потребам та отримуєш повернення грошей за кожну покупку.
						</p>
					</div>
					<div className='bg-[#212121] rounded-[33px] px-5 py-[33px] max-w-[389px] '>
						<div className='flex items-center gap-[10px]'>
							<Image src={'/we/about-icon.svg'} alt='' width={28} height={22} />
							<p className='text-[21px] text-[#FFFFFF] font-normal tracking-normal'>
								Миттєвий{' '}
								<span className='relative'>
									доступ{' '}
									<span className='absolute w-[42px] bottom-[3px] right-[7px] h-[4px] bg-accent' />
								</span>{' '}
								до кешбеку
							</p>
						</div>
						<p className='text-[14px] leading-[160%] -tracking-wider mt-[23px]'>
							З nomo отримати свій кешбек стало ще простіше. Ви можете виводити
							кошти у будь-який час, зручним для вас способом.
						</p>
					</div>
					<div className='bg-[#212121] rounded-[33px] px-5 py-[33px] max-w-[389px] '>
						<div className='flex items-center gap-[10px]'>
							<Image src={'/we/about-icon.svg'} alt='' width={28} height={22} />
							<p className='text-[21px] text-[#FFFFFF] font-normal tracking-normal'>
								Широка{' '}
								<span className='relative'>
									мережа{' '}
									<span className='absolute w-[42px] bottom-[3px] right-[7px] h-[4px] bg-accent' />
								</span>
								партнерів
							</p>
						</div>
						<p className='text-[14px] leading-[160%] -tracking-widest mt-[23px]'>
							Наша програма працює з широким спектром партнерів, що означає, що
							ви можете отримати вигоди за покупки в будь-якому місці, де ви
							зазвичай робите свої покупки.
						</p>
					</div>
				</div>

				<div className='flex flex-col lg:flex-row items-center justify-between gap-8 text-[#0F0F0F] mt-[78px] '>
					{/* Left content */}
					<div className='lg:w-1/2'>
						<div className='mb-8'>
							<h1 className='text-[40px] md:text-[54px] font-extrabold mb-[21px] leading-[135%] flex flex-col items-start gap-2'>
								<div className='flex items-center gap-2'>
									<span>Загадка</span>
									<span className='text-accent'>nomo:</span>
								</div>
								<span>розкриваємо нашу сутність!</span>
							</h1>
							<p className='text-[20px] md:text-[24px] text-[#4F4F4F] text-left leading-[140%] -tracking-[0.04em] font-semibold w-full max-w-[720px]'>
								В нашому світі nomo ми втілюємо унікальність і індивідуальність.
								Кожен елемент нашої ідентичності розкривається через кожну
								послугу та кожну вигоду, яку ми пропонуємо. Приєднуйтеся до
								нашої спільноти, щоб розгадати цю таємницю разом з нами і
								насолоджуватися світом{' '}
								<span className='relative inline-block z-[2]'>
									nomo!
									<span className='absolute w-[100%] bottom-[1px] left-0 h-[15px] bg-accent -z-[1] rounded-full ' />
								</span>
							</p>
						</div>
					</div>

					{/* Right content - Phone image */}
					<div className='lg:w-1/2 relative'>
						<Image
							src='/we/phones.png'
							alt='Nomo App Interface'
							className='w-full max-w-[600px] mx-auto relative z-10'
							width={584}
							height={577}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
export default AboutSection
