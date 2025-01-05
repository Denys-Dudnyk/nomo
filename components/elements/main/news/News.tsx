import { FC } from 'react'
import NewsCard from './NewsCard'
import Image from 'next/image'

const news = [
	{
		image: '/main/news-1.svg',
		title: 'Закінчилася розробка сайту Version 1.6.3',
		description:
			'Поняття "сайт" охоплює безліч різних проєктів: від простеньких посадкових сторінок до складних онлайн-сервісів, що складаються із сотень екранів і тисяч функцій.',
		date: 'Вчора, 10:46',
	},
	{
		image: '/main/news-3.svg',
		title: 'Зареєструйся зараз!',
		description:
			'Всім зареєстрованим користувачам нарахується 10Ncoin в Потрфоліо.',
		date: '01.01.2025',
	},
	{
		image: '/main/news-2.svg',
		title: 'Про майбутнє',
		description: 'Починається розробка додатка Ncoin Кешбек/Біржа.',
		date: '18.01.2025',
	},
]

const News: FC = () => {
	return (
		<section className='bg-[#0f0f0f]'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<h2 className='pt-[240px] pb-[81px] text-[30px] sm:text-[54px] leading-[64px] text-[#fff] font-extrabold text-center'>
					Слідкуйте за новинами разом з Номо
				</h2>
				<div className='flex flex-col space-y-6 w-full mx-auto pb-[149px]'>
					{news.map((item, index) => (
						<NewsCard key={index} {...item} />
					))}
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-[256px]'>
					<div className='flex justify-between items-center flex-col'>
						<h3 className='text-[18px] sm:text-[25px] text-center leading-[126%] tracking-[-4%] uppercase font-bold w-full max-w-[300px]  sm:max-w-[453px]'>
							З нами ти не просто клієнт, ти - частина нашої сім'ї, наш
							безцінний
						</h3>
						<Image
							src={'/main/number1.png'}
							alt={'№1'}
							className='mx-auto'
							width={500}
							height={500}
						/>
					</div>
					<div className=' flex justify-center items-end mb-[120px] '>
						<div className='relative text-center'>
							<p className='text-[14px] top-[0] '>З кожною покупкою в</p>
							<Image
								src={'/main/nomo.svg'}
								alt={'№1'}
								className=''
								width={228}
								height={90}
							/>
							<p className='text-[13px] w-full sm:w-[167px] mx-auto '>
								ваш кешбек зростає.
							</p>
							<div className='relative  '>
								<Image
									src={'/main/cat.png'}
									alt={'Cat'}
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
