import { useTranslations } from 'next-intl'
import Image from 'next/image'

const ProductOverview = () => {
	const t = useTranslations('mainpage.productOverview')

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
						{t('title')}
					</h2>
					<h3 className='text-[30px] sm:text-[52px] font-bold text-[#1D2733]  mb-[30px]'>
						{t('subtitle')}
					</h3>
					<p className='text-base'>{t('description')}</p>
				</div>
			</div>
		</section>
	)
}
export default ProductOverview
