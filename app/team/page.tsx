'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { ChevronDown } from 'lucide-react'

const leaders = [
	{
		name: 'Метью Прінс',
		role: 'Співзасновник і генеральний директор',
		description:
			'«Кожного року у кожному про ринку створення та більш проектами та розвитком технологіям. Ми наші стандарт допомагають визначити цілі, завдання та можливості для розвитку бізнесу. Ми працюємо з досвідом з найсильнішими і передачі подібних в інтернет. Ми вчимо, щоб нові і також дали досягнення, реакцій роботі, тому ми передаємо досвід і знання для розвитку технологій та бізнесу в цілому».',
		image: '/dashboard/user.svg',
	},
	{
		name: 'Денис Дудник',
		role: 'Старший віце-президент',
		description:
			'«Історія завжди була критично важливим для навчання у Block N - саме ще та пристрасть, які нові практики, допоможуть нам навчитися мислити по-новому, щоб досягти більших цілей. Реалізація проектів - це не тільки процес бачити, як наші стандарт продовжують розвиватися у своїй карєрі, але й бачити, як багато ми можемо з ми навчатись».',
		image: '/team/Dudnys Dudnyk.jpg',
	},
	{
		name: 'Дейн Кнехт',
		role: 'Старший віце-президент',
		description:
			'«Історія завжди була критично важливим для навчання у Block N - саме ще та пристрасть, які нові практики, допоможуть нам навчитися мислити по-новому, щоб досягти більших цілей. Реалізація проектів - це не тільки процес бачити, як наші стандарт продовжують розвиватися у своїй карєрі, але й бачити, як багато ми можемо з ми навчатись».',
		image: '/dashboard/user.svg',
	},

	{
		name: 'Дейн Кнехт',
		role: 'Старший віце-президент',
		description:
			'«Історія завжди була критично важливим для навчання у Block N - саме ще та пристрасть, які нові практики, допоможуть нам навчитися мислити по-новому, щоб досягти більших цілей. Реалізація проектів - це не тільки процес бачити, як наші стандарт продовжують розвиватися у своїй карєрі, але й бачити, як багато ми можемо з ми навчатись».',
		image: '/dashboard/user.svg',
	},
	{
		name: 'Дейн Кнехт',
		role: 'Старший віце-президент',
		description:
			'«Історія завжди була критично важливим для навчання у Block N - саме ще та пристрасть, які нові практики, допоможуть нам навчитися мислити по-новому, щоб досягти більших цілей. Реалізація проектів - це не тільки процес бачити, як наші стандарт продовжують розвиватися у своїй карєрі, але й бачити, як багато ми можемо з ми навчатись».',
		image: '/dashboard/user.svg',
	},
	{
		name: 'Дейн Кнехт',
		role: 'Старший віце-президент',
		description:
			'«Історія завжди була критично важливим для навчання у Block N - саме ще та пристрасть, які нові практики, допоможуть нам навчитися мислити по-новому, щоб досягти більших цілей. Реалізація проектів - це не тільки процес бачити, як наші стандарт продовжують розвиватися у своїй карєрі, але й бачити, як багато ми можемо з ми навчатись».',
		image: '/dashboard/user.svg',
	},
	{
		name: 'Дейн Кнехт',
		role: 'Старший віце-президент',
		description:
			'«Історія завжди була критично важливим для навчання у Block N - саме ще та пристрасть, які нові практики, допоможуть нам навчитися мислити по-новому, щоб досягти більших цілей. Реалізація проектів - це не тільки процес бачити, як наші стандарт продовжують розвиватися у своїй карєрі, але й бачити, як багато ми можемо з ми навчатись».',
		image: '/dashboard/user.svg',
	},
	{
		name: 'Дейн Кнехт',
		role: 'Старший віце-президент',
		description:
			'«Історія завжди була критично важливим для навчання у Block N - саме ще та пристрасть, які нові практики, допоможуть нам навчитися мислити по-новому, щоб досягти більших цілей. Реалізація проектів - це не тільки процес бачити, як наші стандарт продовжують розвиватися у своїй карєрі, але й бачити, як багато ми можемо з ми навчатись».',
		image: '/dashboard/user.svg',
	},
]

const departments = [
	{
		id: 'operations',
		name: 'Відділ операційної діяльності',
		description:
			'Відділ операційної діяльності - це підрозділ організації, що займається управлінням та оптимізацією щоденних операційних процесів компанії.',
		members: [
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
		],
	},
	{
		id: 'sales',
		name: 'Відділ продажів',
		description:
			"Відділ продажів - відповідає за продаж товарів або послуг, пошук нових клієнтів, підтримку зв'язків з існуючими клієнтами та виконання планів продажу.",
		members: [
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
		],
	},

	{
		id: 'Manage',
		name: 'Відділ маркетингу',
		description:
			'Відділ маркетингу – займається розробкою та реалізацією маркетингових стратегій, рекламою, дослідженнями ринку, брендингом та залученням клієнтів.',
		members: [
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
		],
	},

	{
		id: 'IT',
		name: 'Відділ ІТ',
		description:
			'Відділ ІТ – відповідає за управління інформаційними технологіями, підтримку та розвиток програмного забезпечення, захист даних, мережеву інфраструктуру та технічну підтримку співробітників.',
		members: [
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
		],
	},

	{
		id: 'tec',
		name: 'Відділ юриспруденції',
		description:
			'Відділ юриспруденції – відповідає за правову підтримку компанії, складання договорів, захист інтересів організації в судових справах та консультації з юридичних питань.',
		members: [
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
		],
	},

	{
		id: 'sales2',
		name: 'Відділ фінансів',
		description:
			'Відділ фінансів – займається управлінням фінансами компанії, складанням бюджету, фінансовим плануванням, аналізом витрат і доходів, а також звітністю.',
		members: [
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
		],
	},

	{
		id: 'new1',
		name: 'Відділ дизайну',
		description:
			'Відділ дизайну — це підрозділ, що відповідає за створення та розробку візуальних матеріалів для бренду або продукту компанії.',
		members: [
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
		],
	},

	{
		id: 'new2',
		name: 'Відділ франчайзі',
		description:
			'Відділ франчайзі – це підрозділ компанії, який займається управлінням та підтримкою франчайзингової мережі.',
		members: [
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
		],
	},

	{
		id: 'new3',
		name: 'Відділ франчайзі',
		description:
			'Відділ франчайзі – це підрозділ компанії, який займається управлінням та підтримкою франчайзингової мережі.',
		members: [
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
			{ name: 'Марія', image: '/team/operations/image1.png' },
			{ name: 'Джастін', image: '/team/operations/image2.png' },
			{ name: 'Лі', image: '/team/operations/image3.png' },
			{ name: 'Меган', image: '/team/operations/image4.png' },
		],
	},
]

export default function TeamPage() {
	return (
		<div className='min-h-screen bg-[#0f0f0f] p-10'>
			<div className='container mx-auto px-4 py-12'>
				{/* Hero Section */}
				<div className='grid lg:grid-cols-2 gap-8 mb-20'>
					<div className='space-y-4 max-w-[500px]'>
						<h1 className='text-3xl md:text-[50px] font-semibold text-[#fff] leading-tight'>
							Познайомтеся з нашою командою в Block N
						</h1>
						<p className='text-[20px] text-[#fff]'>
							Наша місія - допомогти та створити спільну інтеграції
						</p>
						<Button className='bg-[#FF8012] text-[20px] font-normal hover:bg-accenthover text-[#fff] border-none h-12 px-6 rounded-[12px] py-[30px] w-full'>
							Приєднатись до нашої команди
						</Button>
					</div>
					<div className='relative aspect-[4/3] w-auto'>
						<Image
							src='/main/hello-nomo.png'
							alt='Team hero'
							// fill
							// className='object-cover'
							width={459}
							height={459}
							priority
						/>
					</div>
				</div>

				{/* Leaders Section d */}
				<div className='space-y-12 mb-20'>
					<h1 className='text-3xl font-bold text-center text-white'>
						Наші лідери
					</h1>
					<div className='space-y-12'>
						{leaders.map((leader, index) => (
							<Card key={index} className='bg-transparent border-none'>
								<CardContent className='flex flex-col md:flex-row gap-6 p-0'>
									<div className='flex-shrink-0'>
										<Image
											src={leader.image || '/placeholder.svg'}
											alt={leader.name}
											width={140}
											height={140}
											className='rounded-full object-cover  max-h-[140px]'
										/>
									</div>
									<div className='space-y-2 max-w-3xl'>
										<h3 className='text-xl font-medium text-white'>
											{leader.name}
										</h3>
										<p className='text-sm text-gray-400'>{leader.role}</p>
										<p className='text-sm text-gray-400 leading-relaxed'>
											{leader.description}
										</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Departments Section */}
				<div className='space-y-4'>
					<h2 className='text-2xl font-medium text-white mb-8'>Наша команда</h2>
					<Accordion type='single' collapsible className='space-y-4'>
						{departments.map(dept => (
							<AccordionItem
								key={dept.id}
								value={dept.id}
								className='border-gray-800'
							>
								<AccordionTrigger className='text-white hover:no-underline'>
									<span className='text-left font-medium'>{dept.name}</span>
								</AccordionTrigger>
								<AccordionContent>
									<div className='space-y-6 pt-4'>
										<p className='text-sm text-gray-400'>{dept.description}</p>
										<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
											{dept.members.map((member, index) => (
												<div key={index} className='space-y-2'>
													<div className='relative aspect-square w-full overflow-hidden'>
														<Image
															src={member.image || '/placeholder.svg'}
															alt={member.name}
															fill
															className='object-cover'
														/>
													</div>
													<p className='text-sm text-center text-white'>
														{member.name}
													</p>
												</div>
											))}
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	)
}
