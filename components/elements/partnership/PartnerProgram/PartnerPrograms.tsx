'use client'

import { FC } from 'react'
import { useTranslations } from 'next-intl'
import PartnerCard from './PartnerCard'

const PartnerPrograms: FC = () => {
	const t = useTranslations('partnership.partnerprogram')

	const programs = [
		{
			title: t('program1.title'),
			status: t('program1.status'),
			bgColor: 'bg-[#E8F5E9]',
			image: '/partnership/img1.svg',
		},
		{
			title: t('program2.title'),
			status: t('program2.status'),
			bgColor: 'bg-[#FFF8E1]',
			image: '/partnership/img2.svg',
		},
		{
			title: t('program3.title'),
			status: t('program3.status'),
			bgColor: 'bg-[#E3F2FD]',
			image: '/partnership/img3.svg',
		},
		{
			title: t('program4.title'),
			status: t('program4.status'),
			bgColor: 'bg-[#FCE4EC]',
			image: '/partnership/img4.svg',
		},
	]

	return (
		<section className='max-w-7xl mx-auto px-4 py-16'>
			<div className='mb-[130px]'>
				<h2 className='text-[30px] sm:text-[50px] lg:text-[64px] text-[#0f0f0f] font-bold tracking-tight mx-auto w-full max-w-[400px] md:w-auto'>
					{t('partner')}{' '}
					<span className='relative'>
						{t('program')}
						<span className='absolute bg-text-2'></span>
					</span>
				</h2>
			</div>

			<div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
				{programs.map((program, index) => (
					<div key={index} className='mx-auto'>
						<PartnerCard {...program} />
					</div>
				))}
			</div>
		</section>
	)
}

export default PartnerPrograms
