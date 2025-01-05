import Image from 'next/image'

const ProductOverview = () => {
	return (
		<section className={'text-[#1D2733]'}>
			<div className='px-5 flex flex-col lg:flex-row justify-center items-center lg:gap-8 xl:gap-[175px] my-16 lg:my-[128px]'>
				<Image
					src={'/main/hello-nomo.png'}
					alt='Привіт, це Nomo!'
					width={459}
					height={445}
				/>
				<div className='w-full sm:max-w-[600px] text-center lg:text-left '>
					<h2 className='text-[25px] sm:text-[52px] leading-[62.93px] font-normal text-[#C6CFDC] mb-[6px]'>
						Давай познайомимося
					</h2>
					<h3 className='text-[30px] sm:text-[52px] font-bold text-[#1D2733]  mb-[30px]'>
						Привіт, це Nomo!
					</h3>
					<p className='text-base'>
						Я технологія, яка поєднує цифрові гроші, глобальні платежі та
						програми. Наша спільнота створила цифрову економіку, що зростає,
						відкрила розробникам нові шляхи для заробітку онлайн і досягла
						прогресу в багатьох інших сферах. Ця технологія доступна для всіх і
						будь-де. Усе, що вам потрібно, — Інтернет.
					</p>
				</div>
			</div>
		</section>
	)
}
export default ProductOverview
