'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import { ThumbsUp, DollarSign, Users, TrendingUp } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import BenefitCard from './BenefitCard'

import 'swiper/css'
import 'swiper/css/pagination'

const benefits = [
	{
		icon: '/partnership/item1.svg',
		title: 'Привабливість для клієнтів',
		description:
			'Підвищуйте рівень залученості клієнтів за допомогою Nomo - нашого передового криптовалютного кешбек-додатку, який пропонує покупцям можливість отримувати криптовалютні винагороди за покупки у вашому магазині. Інтуїтивно зрозумілий додаток підвищує лояльність клієнтів і стимулює повторні покупки, адже він розроблений з думкою про зручність користування. Надайте своїм клієнтам інноваційний та безпечний досвід отримання кешбеку і виокремте свій бізнес серед конкурентів вже сьогодні!',
	},
	{
		icon: '/partnership/item2.svg',
		title: 'СТИМУЛЮВАННЯ ПРОДАЖІВ',
		description:
			'Підвищуйте свої продажі за допомогою Nomo - криптовалютного кешбеку, який заохочує клієнтів криптовалютною винагородою за кожну покупку. Повертаючи частину їхніх витрат у криптовалюті, наш додаток заохочує частіші транзакції та сприяє розвитку довгострокових відносин з клієнтами. Використовуйте передові рішення Nomo, щоб підвищити рівень утримання клієнтів і збільшити обсяги продажів.',
	},
	{
		icon: '/partnership/item3.svg',
		title: 'РОЗШИРЕННЯ АУДИТОРІЇ',
		description:
			'Розширюйте своє охоплення ринку за допомогою Nomo - нашого передового криптовалютного кешбек-додатку, який приваблює користувачів з усього світу, що цікавляться криптовалютою. Наша платформа дозволяє залучати нових клієнтів, пропонуючи їм сучасний і вигідний досвід отримання кешбеку. Інтегруйте Nomo у свою бізнес-стратегію, щоб відкрити нові можливості для зростання та ефективно розширити клієнтську базу.',
	},
	{
		icon: '/partnership/item4.svg',
		title: 'КОНКУРЕНТНА ПЕРЕВАГА',
		description:
			'Отримайте значну конкурентну перевагу з Nomo - нашим інноваційним криптовалютним кешбек-додатком, який надає унікальну криптовалютну винагороду за покупки. Диференціюючи ваш бізнес за допомогою унікальних та цінних пропозицій, Nomo підвищує вашу присутність на ринку та привабливість. Впровадьте Nomo, щоб підвищити впізнаваність та привабливість вашого бренду на переповненому ринку.',
	},
]

const BenefitsSection = () => {
	const isMobile = useIsMobile()

	return (
		<section className='py-16 px-4 '>
			<div className='max-w-7xl mx-auto'>
				<h2 className='text-[30px] sm:text-[55px] lg:text-[64px]  text-[#0f0f0f] font-bold text-center mb-[30px]'>
					Партнерська програма{' '}
					<span className='relative '>
						Nomo
						<span className='absolute bg-text'></span>
					</span>
				</h2>
				<p className='text-[#4e4e4e] text-center text-[20px] sm:text-[25px]  max-w-[750px] mx-auto mb-[90px]'>
					Пропозиція для digital, маркетингових та брендингових агенцій. Ставши
					партнером, ви отримуєте
				</p>

				{/* {isMobile ? (
					<Swiper
						modules={[Pagination]}
						spaceBetween={20}
						slidesPerView={1}
						pagination={{ clickable: true }}
						className='w-full pb-12'
					>
						{benefits.map((benefit, index) => (
							<SwiperSlide key={index}>
								<BenefitCard {...benefit} />
							</SwiperSlide>
						))}
					</Swiper>
				) : ( */}
				<div className='grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-6'>
					{benefits.map((benefit, index) => (
						<div key={index} className='mx-auto'>
							<BenefitCard {...benefit} />
						</div>
					))}
				</div>
				{/* )} */}
			</div>
		</section>
	)
}

export default BenefitsSection
