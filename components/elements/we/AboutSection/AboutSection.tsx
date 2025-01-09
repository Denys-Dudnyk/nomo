import Image from 'next/image'
import { FC } from 'react'
import { useTranslations } from 'next-intl'

const AboutSection: FC = () => {
	const t = useTranslations('we.about')

	return (
		<section className={'mt-[150px] mb-[78px]'}>
			<div className='containers'>
				<div className='lg:w-2/3 mt-[150px] lg:ml-[158px] mb-[75px]'>
					<div className='grid grid-cols-1'>
						<div className='flex items-center gap-4'>
							<span className='text-[#FF8D2A] text-[30px] sm:text-[58px] tracking-tight font-bold whitespace-nowrap'>
								{t('stats.ncoin.value')}
							</span>
							<span className='text-[#0f0f0f] font-bold text-[15px] sm:text-[19px]'>
								{t('stats.ncoin.label')}
							</span>
						</div>
						<div className='flex items-center gap-4'>
							<span className='text-[#FF8D2A] text-[30px] sm:text-[58px] tracking-tight font-bold whitespace-nowrap'>
								{t('stats.users.value')}
							</span>
							<span className='text-[#0f0f0f] font-bold text-[15px] sm:text-[19px]'>
								{t('stats.users.label')}
							</span>
						</div>
						<div className='flex items-center gap-4'>
							<span className='text-[#FF8D2A] text-[30px] sm:text-[58px] tracking-tight font-bold whitespace-nowrap'>
								{t('stats.partners.value')}
							</span>
							<span className='text-[#0f0f0f] font-bold text-[15px] sm:text-[19px]'>
								{t('stats.partners.label')}
							</span>
						</div>
					</div>
				</div>

				<div className='grid-about'>
					{['customCashback', 'instantAccess', 'wideNetwork'].map(key => (
						<div
							key={key}
							className='bg-[#212121] rounded-[33px] px-5 py-[33px] max-w-[389px]'
						>
							<div className='flex items-center gap-[10px]'>
								<Image
									src={'/we/about-icon.svg'}
									alt=''
									width={28}
									height={22}
								/>
								<p className='text-[21px] text-[#FFFFFF] font-normal tracking-normal'>
									{t(`features.${key}.title`)}
								</p>
							</div>
							<p className='text-[14px] leading-[160%] -tracking-wider mt-[23px]'>
								{t(`features.${key}.description`)}
							</p>
						</div>
					))}
				</div>

				<div className='flex flex-col lg:flex-row items-center justify-between gap-8 text-[#0F0F0F] mt-[78px]'>
					{/* Left content */}
					<div className='lg:w-1/2'>
						<div className='mb-8'>
							<h1 className='text-[40px] md:text-[54px] font-extrabold mb-[21px] leading-[135%] flex flex-col items-start gap-2'>
								<div className='flex items-center gap-2'>
									<span>{t('reveal.headline.line1')}</span>
									<span className='text-accent'>nomo:</span>
								</div>
								<span>{t('reveal.headline.line2')}</span>
							</h1>
							<p className='text-[20px] md:text-[24px] text-[#4F4F4F] text-left leading-[140%] -tracking-[0.04em] font-semibold w-full max-w-[720px]'>
								{t('reveal.description')}
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
