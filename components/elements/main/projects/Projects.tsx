import Image from 'next/image'
import { FC } from 'react'
import { useTranslations } from 'next-intl'

const projectItems = [
	{
		id: 1,
		key: 'item1',
	},
	{
		id: 2,
		key: 'item2',
	},
	{
		id: 3,
		key: 'item3',
	},
	{
		id: 4,
		key: 'item4',
	},
]

interface PartnersProps {
	bgColor: string
}

const Projects: FC<PartnersProps> = ({ bgColor }) => {
	const t = useTranslations('mainpage.projects')

	return (
		<section className={`${bgColor}`}>
			<div className={'containers'}>
				<h2 className='py-[60px] text-center font-extrabold text-[35px] sm:text-[54px]  leading-tight sm:leading-[72.9px]'>
					{t('title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-10  pb-[30px]'>
					{projectItems.map(item => (
						<div
							key={item.id}
							className='bg-[#fff] text-[#1D2733] shadow-project shadow-accent'
						>
							<div className='relative h-[208px]'>
								<Image
									src={t(`${item.key}.img`)}
									alt={t(`${item.key}.title`)}
									layout='fill'
									objectFit={t(`${item.key}.objectFit`)}
									className='bg'
								/>
							</div>
							<div className='mt-[23px] ml-[24px] mr-[31px]'>
								<h3 className='text-[24px] font-bold leading-[29.05px] mb-[10px]'>
									{t(`${item.key}.title`)}
								</h3>
								<p className='mb-[46px] text-[16px]'>
									<span className='text-accent font-bold'>
										{t(`${item.key}.main`)}
									</span>
									{t(`${item.key}.text`)}
									<span className='relative inline-block z-[2]'>
										{t(`${item.key}.date`)}
										<span className='absolute w-[90%] bottom-0 left-2 h-3 bg-accent -z-[1] rounded-full ' />
									</span>
									.
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Projects
