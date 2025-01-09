import { FC } from 'react'
import NewsCard from './NewsCard'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const news = [
	{
		image: '/main/news-1.svg',
		titleKey: 'news1.title',
		descriptionKey: 'news1.description',
		dateKey: 'news1.date',
	},
	{
		image: '/main/news-3.svg',
		titleKey: 'news2.title',
		descriptionKey: 'news2.description',
		dateKey: 'news2.date',
	},
	{
		image: '/main/news-2.svg',
		titleKey: 'news3.title',
		descriptionKey: 'news3.description',
		dateKey: 'news3.date',
	},
]

const News: FC = () => {
	const t = useTranslations('mainpage.news')

	return (
		<section className='bg-[#0f0f0f]'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<h2 className='pt-[240px] pb-[81px] text-[30px] sm:text-[54px] leading-[64px] text-[#fff] font-extrabold text-center'>
					{t('header')}
				</h2>
				<div className='flex flex-col space-y-6 w-full mx-auto pb-[149px]'>
					{news.map((item, index) => (
						<NewsCard
							key={index}
							image={item.image}
							title={t(item.titleKey)}
							description={t(item.descriptionKey)}
							date={t(item.dateKey)}
						/>
					))}
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-[256px]'>
					<div className='flex justify-between items-center flex-col'>
						<h3 className='text-[18px] sm:text-[25px] text-center leading-[126%] tracking-[-4%] uppercase font-bold w-full max-w-[300px] sm:max-w-[453px]'>
							{t('familyMessage')}
						</h3>
						<Image
							src={'/main/number1.png'}
							alt={t('alt1')}
							className='mx-auto'
							width={500}
							height={500}
						/>
					</div>
					<div className='flex justify-center items-end mb-[120px]'>
						<div className='relative text-center'>
							<p className='text-[14px] top-[0]'>{t('purchaseMessage')}</p>
							<Image
								src={'/main/nomo.svg'}
								alt={t('alt2')}
								className=''
								width={228}
								height={90}
							/>
							<p className='text-[13px] w-full sm:w-[167px] mx-auto'>
								{t('cashbackMessage')}
							</p>
							<div className='relative'>
								<Image
									src={'/main/cat.png'}
									alt={t('altCat')}
									className='absolute bottom-[30px] -right-[110px] cat-hidden'
									width={111}
									height={228}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default News
