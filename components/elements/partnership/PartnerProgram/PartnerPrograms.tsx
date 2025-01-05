import { FC } from 'react'
import PartnerCard from './PartnerCard'

const PartnerPrograms: FC = () => {
	const programs = [
		{
			title: 'ПАРТНЕРСЬКА ПРОГРАМА З КЕШБЕКОМ',
			status: 'У розробці...',
			bgColor: 'bg-[#E8F5E9]',
			image: '/partnership/img1.svg',
		},
		{
			title: 'ПАРТНЕРСЬКА ПРОГРАМА З ВИКОРИСТАННЯМ КРИПТОВАЛЮТИ',
			status: 'У розробці...',
			bgColor: 'bg-[#FFF8E1]',
			image: '/partnership/img2.svg',
		},
		{
			title: 'БІЗНЕС-РЕФЕРАЛ',
			status: 'У розробці...',
			bgColor: 'bg-[#E3F2FD]',
			image: '/partnership/img3.svg',
		},
		{
			title: 'КОРИСТУВАЧ-РЕФЕРАЛ',
			status: 'У розробці...',
			bgColor: 'bg-[#FCE4EC]',
			image: '/partnership/img4.svg',
		},
	]

	return (
		<section className='max-w-7xl mx-auto px-4 py-16'>
			<div className=' mb-[130px]'>
				<h2 className='text-[30px] sm:text-[50px] lg:text-[64px] text-[#0f0f0f] font-bold tracking-tight mx-auto w-full max-w-[400px]  md:w-auto'>
					Партнерські{' '}
					<span className='relative'>
						Програми
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
