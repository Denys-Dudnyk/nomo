'use client'

import { useTranslations } from 'next-intl'
import BenefitCard from './BenefitCard'

const BenefitsSection = () => {
	const t = useTranslations('partnership.benefits')

	// Получаем данные по ключам
	const benefits = [
		{ key: 'item1', data: 'item1' },
		{ key: 'item2', data: 'item2' },
		{ key: 'item3', data: 'item3' },
		{ key: 'item4', data: 'item4' },
	]

	return (
		<section className='py-16 px-4'>
			<div className='max-w-7xl mx-auto'>
				<h2 className='text-[30px] sm:text-[55px] lg:text-[64px] text-[#0f0f0f] font-bold text-center mb-[30px]'>
					{t('program')}{' '}
					<span className='relative'>
						Nomo
						<span className='absolute bg-text'></span>
					</span>
				</h2>
				<p className='text-[#4e4e4e] text-center text-[20px] sm:text-[25px] max-w-[750px] mx-auto mb-[90px]'>
					{t('programDescription')}
				</p>

				{/* Карточки */}
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-6'>
					{benefits.map(({ key, data }) => (
						<div key={key} className='mx-auto'>
							<BenefitCard
								icon={t(`${data}.icon`)}
								title={t(`${data}.title`)}
								description={t(`${data}.description`)}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default BenefitsSection
