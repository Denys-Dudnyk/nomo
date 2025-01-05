import { FC } from 'react'
import { Calendar, Smartphone, Lightbulb, Shield } from 'lucide-react'
import Image from 'next/image'
const ProgramSection: FC = () => {
	return (
		<section className={'bg-[#0F0F0F] pt-[90px] pb-[114px]'}>
			<div className=''>
				<div className='mb-[76px] text-center max-w-[607px] mx-auto'>
					<h2 className='text-[40px] sm:text-[54px] font-extrabold leading-[135%] mb-[37px]'>
						<span className='text-accent '>N</span>
						omo: шлях до зручності і ефективності!
					</h2>
					<p className='text-[14px] leading-[160%] -tracking-wider text-[#CECECE]'>
						Наша програма надає вам можливість отримувати кешбек у криптовалюті
						за будь-яку покупку, що робить ваші витрати ще більш вигідними.
					</p>
				</div>
			</div>

			<div className='max-w-7xl mx-auto pt-[76px]'>
				<div className='grid grid-cols-1 md:grid-cols-3 relative '>
					{/* Left Column Features */}
					<div className='space-y-[100px] md:space-y-[250px] md:mt-44'>
						<div className='text-center md:text-right  '>
							<div className='flex items-center mt-[200px] md:mt-0 justify-center md:justify-end gap-4 mb-4'>
								<Image src={'/we/cashback.svg'} alt='' width={51} height={48} />
							</div>
							<h3 className='font-bold text-[25px] leading-[126%] -tracking-wider'>
								ЗАОЩАДЖУЙТЕ ГРОШІ ПРИ ПОКУПКАХ
							</h3>
							<p className='text-[#cecece] text-[14px] leading-[160%] -tracking-wider mt-[23px]'>
								Отримуйте частину своїх витрат назад у вигляді криптовалютних
								активів і зекономте гроші на майбутні покупки або інвестування.
							</p>
						</div>
						<div className='text-center md:text-right'>
							<div className='flex items-center justify-center md:justify-end gap-4 mb-4'>
								<Image
									src={'/we/innovations.svg'}
									alt=''
									width={52}
									height={50}
								/>
							</div>
							<h3 className='font-bold text-[25px] leading-[126%] -tracking-wider'>
								ІННОВАЦІЙНІ МОЖЛИВОСТІ
							</h3>
							<p className='text-[#cecece] text-[14px] leading-[160%] -tracking-wider mt-[23px]'>
								Криптовалютний кешбек відкриває нові можливості використання
								цифрових активів у повсякденному житті.
							</p>
						</div>
					</div>

					{/* Center Column with Phone */}
					<div className='flex justify-start items-center py-8'>
						<div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mb-[40px] w-full md:max-w-[300px]'>
							<div className='flex items-center justify-center gap-4 mb-[27px] mt-[70px]'>
								<Image src={'/we/message.svg'} alt='' width={49} height={44} />
							</div>
							<h2 className='text-[25px] leading-[126%] -tracking-wider font-bold mb-[20px]'>
								ОТРИМУЙТЕ КЕШБЕК У КРИПТОВАЛЮТІ
							</h2>
							<p className='text-[14px] leading-[160%] -tracking-wider font-normal text-[#CECECE]  mb-[34px]'>
								Наша програма дозволяє вам отримувати кешбек у вигляді
								популярних криптовалют, таких як Bitcoin, Ethereum та інші.
							</p>
						</div>
						<div className='relative w-full max-w-[300px] mx-auto px-5'>
							<Image
								src='/we/iphone2.png'
								width={363}
								height={0}
								alt='Crypto wallet app interface'
								className='w-full h-auto max-w-xs sm:max-w-[363px] md:mt-[120px]'
							/>
						</div>
					</div>

					{/* Right Column Features */}
					<div className='space-y-[100px] md:space-y-[270px] md:mt-44'>
						<div className='text-center md:text-left'>
							<div className='flex items-center justify-center md:justify-start gap-4 mb-4'>
								<Image src={'/we/process.svg'} alt='' width={32} height={54} />
							</div>
							<h3 className='font-bold text-[25px] leading-[126%] -tracking-wider'>
								ПРОСТИЙ ТА ЗРУЧНИЙ ПРОЦЕС
							</h3>
							<p className='text-[#cecece] text-[14px] leading-[160%] -tracking-wider mt-[23px]'>
								Наша програма проста у використанні, ви зможете легко отримувати
								кешбек за свої покупки без зайвих зусиль.
							</p>
						</div>
						<div className='text-center md:text-left'>
							<div className='flex items-center justify-center md:justify-start gap-4 mb-4'>
								<Image src={'/we/secure.svg'} alt='' width={57} height={52} />
							</div>
							<h3 className='font-bold text-[25px] leading-[126%] -tracking-wider'>
								БЕЗПЕКА ТА НАДІЙНІСТЬ
							</h3>
							<p className='text-[#cecece] text-[14px] leading-[160%] -tracking-wider mt-[23px]'>
								Криптовалютний кешбек забезпечує безпеку та надійність операцій
								завдяки застосуванню передових технологій блокчейн.
							</p>
						</div>
					</div>
				</div>

				{/* Bottom Version Tag */}
				<div className='text-center mt-[31px]'>
					<div className='flex items-center justify-center gap-4 mb-[25px]'>
						<Image src={'/we/admin.svg'} alt='' width={39.5} height={50} />
					</div>
					<p className='text-xl font-bold'>IOS & ANDROID VERSION</p>
				</div>
			</div>
		</section>
	)
}
export default ProgramSection
