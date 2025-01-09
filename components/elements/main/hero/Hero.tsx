'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Hero = () => {
	const t = useTranslations('mainpage.hero')

	return (
		<section className={'main-hero bg-black'}>
			<div className='mx-auto flex flex-col items-center'>
				{/* <div> */}
				<Image
					src={'/main/main.png'}
					alt=''
					width={423}
					height={352}
					className='mt-20 mb-2 sm:mb-4 w-full max-w-[300px] sm:max-w-[423px]'
				/>
				<h1 className='mt-5 sm:mt-0 relative bottom-16 hero-h1 sm:text-[60px] md:text-[70px] lg:text-[86px] font-extrabold leading-tight lg:leading-[104.08px]  text-center w-full max-w-[420px] sm:max-w-[591px]'>
					{t('title1')} <span className='text-accent'>{t('title2')}</span>{' '}
					{t('title3')}
				</h1>
				<p className='relative bottom-4 px-[21px] py-[7px] bg-accent  leading-[43.57px] text-background font-bold rounded-2xl hero-text sm:text-[20px] md:text-[25px] lg:text-[36px]'>
					{t('subtitle')}
				</p>

				<div className='mt-[49px] mb-[94px] w-full max-w-[972px] flex flex-col hero-btn items-center justify-between gap-6  md:px-5 lg:px-0'>
					<Link href={'/we'} className={`font-light text-center`}>
						<span className='text-[18px] text-[#fff] text-opacity-[66%]'>
							Nomo
						</span>

						<Image
							src='main/line1.svg'
							alt=''
							width={291}
							height={1}
							className='relative top-[12px] w-full max-w-[250px] sm:w-[291px] mb-6 mb'
							draggable={false}
						/>
					</Link>
					<button>
						<Link
							href={'/auth/login'}
							className='px-[44px] py-[14px] border-r-[1px] border-b-[1.5px] border-accent rounded-2xl text-[18px] leading-[21.78px] font-normal'
						>
							{t('joinNow')}
						</Link>
					</button>
					<Link href={'/portfolio'} className={`font-light text-center`}>
						<span className='text-[18px] text-[#fff] text-opacity-[66%]'>
							Portfolio
						</span>

						<Image
							src='main/line2.svg'
							alt=''
							width={291}
							height={1}
							className='relative top-[12px] w-full max-w-[250px] sm:w-[291px]'
							draggable={false}
						/>
					</Link>
				</div>
				{/* </div> */}
			</div>
		</section>
	)
}
export default Hero
