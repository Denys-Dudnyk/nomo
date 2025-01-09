import Image from 'next/image'
import { useTranslations } from 'next-intl'

const About = () => {
	const t = useTranslations('mainpage.about')

	return (
		<>
			<section className={'mt-40 mb-16 flex items-center justify-center'}>
				<div className='containers text-[#1D2733]'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
						<div className='max-w-4xl'>
							<h2 className='text-[35px] sm:text-[52px] leading-tight sm:leading-[62.93px] font-bold mb-[30px]'>
								{t('section1.title')}
							</h2>
							<p className='text-base'>{t('section1.text')}</p>
						</div>
						<div className='relative h-[400px] lg:h-[500px] flex justify-center items-center'>
							<Image
								src='/main/bg-about.png'
								alt={t('section1.alt')}
								width={598}
								height={417}
								priority
								className='absolute'
							/>
						</div>
					</div>
				</div>
			</section>

			<section
				className={'pt-40 pb-16 flex items-center justify-center bg-[#799FFF]'}
			>
				<div className='containers text-[#1D2733]'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
						<div className='relative h-[400px] lg:h-[500px] flex justify-center items-center'>
							<Image
								src='/main/bg-about2.png'
								alt={t('section2.alt')}
								width={645}
								height={387}
								priority
								className='absolute'
							/>
						</div>
						<div className='max-w-4xl'>
							<h2 className='text-[35px] sm:text-[52px] leading-tight sm:leading-[62.93px] font-bold mb-[30px]'>
								{t('section2.title')}
							</h2>
							<p className='text-base'>{t('section2.text')}</p>
						</div>
					</div>
				</div>
			</section>

			<section className={'mt-40 mb-16 flex items-center justify-center'}>
				<div className='containers text-[#1D2733]'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
						<div className='max-w-4xl'>
							<h2 className='text-[35px] sm:text-[48px] lg:text-[52px] w-auto lg:w-[800px] font-bold mb-[30px] leading-tight sm:leading-[62.93px]'>
								{t('section3.title')}
							</h2>
							<p className='text-base'>{t('section3.text')}</p>
						</div>
						<div className='relative h-[400px] lg:h-[500px] flex justify-center items-center'>
							<Image
								src='/main/bg-about3.png'
								alt={t('section3.alt')}
								width={662}
								height={377}
								priority
								className='absolute'
							/>
						</div>
					</div>
				</div>
			</section>

			<section
				className={'pt-40 pb-16 flex items-center justify-center bg-[#AB93CB]'}
			>
				<div className='containers text-[#1D2733]'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
						<div className='relative h-[400px] lg:h-[500px] flex justify-center items-center'>
							<Image
								src='/main/bg-about4.png'
								alt={t('section4.alt')}
								width={379}
								height={404}
								priority
								className='absolute'
							/>
						</div>
						<div className='max-w-4xl'>
							<h2 className='text-[35px] sm:text-[52px] leading-tight sm:leading-[62.93px] font-bold mb-[30px]'>
								{t('section4.title')}
							</h2>
							<p className='text-base'>{t('section4.text')}</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default About
