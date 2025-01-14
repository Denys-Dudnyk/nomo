'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'
import {
	AlertCircle,
	Bookmark,
	Building2,
	ChevronDown,
	Search,
	Infinity,
	TrendingUp,
	Rocket,
	Banknote,
	LineChart,
	Bitcoin,
	Sparkles,
	GraduationCap,
	BookOpen,
	HelpCircle,
	ArrowRight,
} from 'lucide-react'
import { User } from '@supabase/supabase-js'
import { UserProfile } from '@/types/database'
const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6 },
}

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
}

interface NInwestContentProps {
	session: {
		user: User
	}
	profile: UserProfile
}

export default function NInwest({ session, profile }: NInwestContentProps) {
	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('opacity-100', 'translate-y-0')
					entry.target.classList.remove('opacity-0', 'translate-y-4')
				}
			})
		})

		document
			.querySelectorAll('.transition-all')
			.forEach(el => observer.observe(el))

		return () => observer.disconnect()
	}, [])

	return (
		<div className='min-h-screen bg-gradient-to-b from-black to-[#0A0A0A] text-white'>
			<div className='border-b border-orange-500/20 backdrop-blur-sm sticky -top-[1px] z-50'>
				<div className='container mx-auto px-4 py-4'>
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='text-2xl font-bold text-center'
					>
						<span className='text-white'>N</span>
						<span className='text-[#FF6B00]'>Inwest</span>
					</motion.h1>
				</div>
			</div>

			<main className='container mx-auto px-4 py-12 space-y-32'>
				<motion.section
					initial='initial'
					animate='animate'
					variants={fadeIn}
					className='max-w-4xl mx-auto px-6 py-12 text-left space-y-6'
				>
					<h1 className='text-center text-4xl sm:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B00]'>
						Інвестуйте в Майбутнє
					</h1>
					<div className='space-y-6 bg-[#1A1A1A] rounded-2xl p-8 border border-orange-500/10 shadow-2xl shadow-orange-500/5'>
						<p className='text-lg'>
							<span className='text-[#FF6B00] font-medium'>
								Інноваційний онлайн-додаток
							</span>
							<span className='text-white'>
								, який надає користувачам можливість легко інвестувати свої
								кошти в різні фінансові інструменти та проекти.
							</span>
						</p>
						<p className='text-lg'>
							<span className='text-[#FF6B00] font-medium'>Платформа</span>
							<span className='text-white'>
								{' '}
								для тих, хто прагне збільшити свої капітали, отримуючи доступ до
								перевірених інвестиційних можливостей у різних сферах.
							</span>
						</p>
						<div className='relative'>
							<div className='absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent blur-xl'></div>
							<p className='relative text-sm text-gray-400 text-center mt-4'>
								Натисніть кнопку нижче, щоб перевести свої{' '}
								<span className='text-[#FF6B00] font-medium'>Ncoin</span> бонуси
								на дану платформу
							</p>
						</div>
						<div className='text-center mt-6'>
							<Button className='bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] hover:opacity-90 text-white px-8 py-6 rounded-full text-sm uppercase font-medium transition-all duration-300 hover:scale-105 w-full gap-0 sm:gap-2'>
								Перевести зараз
								<ArrowRight className='ml-2 h-4 w-4' />
							</Button>
						</div>
					</div>
				</motion.section>

				<motion.section
					initial='initial'
					whileInView='animate'
					variants={staggerContainer}
					viewport={{ once: true }}
					className='max-w-4xl mx-auto px-6'
				>
					<div className='text-center mb-16 space-y-4'>
						<motion.h2
							variants={fadeIn}
							className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B00]'
						>
							Список Доступних Сфер
						</motion.h2>
						<motion.p variants={fadeIn} className='text-xl text-gray-400'>
							Сфери Інвестицій
						</motion.p>
					</div>

					<motion.div
						variants={staggerContainer}
						className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'
					>
						{[
							{
								title: 'НЕРУХОМІСТЬ',
								icon: Building2,
								description:
									'Опис різних типів нерухомості, плюси та мінуси, середній дохідність.',
							},
							{
								title: 'СТАРТАПИ',
								icon: Rocket,
								description:
									'Пояснення, як інвестувати в стартапи, рівень ризику, прибутковість.',
							},
							{
								title: 'ОБЛІГАЦІЇ',
								icon: Banknote,
								description: 'Види облігацій, як вони працюють, та дохідність.',
							},
							{
								title: 'АКЦІЇ',
								icon: LineChart,
								description:
									'Основні торгові акціями, їх потенційна прибутковість.',
							},
						].map((item, index) => (
							<motion.div
								key={item.title}
								variants={fadeIn}
								whileHover={{ scale: 1.02 }}
								className='group'
							>
								<Card className='bg-[#1A1A1A] border-none rounded-2xl overflow-hidden'>
									<CardContent className='p-8 space-y-6 relative'>
										<div className='absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
										<h3 className='text-xl font-bold text-center text-white'>
											{item.title}
										</h3>
										<div className='flex justify-center'>
											<item.icon className='w-12 h-12 text-[#FF6B00]' />
										</div>
										<p className='text-gray-400 text-center text-sm'>
											{item.description}
										</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>

					<motion.div variants={fadeIn} className='max-w-md mx-auto'>
						<Card className='bg-[#1A1A1A] border-none rounded-2xl overflow-hidden group'>
							<CardContent className='p-8 space-y-6 relative'>
								<div className='absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
								<h3 className='text-xl font-bold text-center text-white'>
									КРИПТОВАЛЮТИ
								</h3>
								<div className='flex justify-center'>
									<Bitcoin className='w-12 h-12 text-[#FF6B00]' />
								</div>
								<p className='text-gray-400 text-center text-sm'>
									Огляд ринку криптовалют, ризики та можливості.
								</p>
							</CardContent>
						</Card>
					</motion.div>
				</motion.section>

				<motion.section
					initial='initial'
					whileInView='animate'
					variants={staggerContainer}
					viewport={{ once: true }}
					className='max-w-4xl mx-auto px-6'
				>
					<motion.h2
						variants={fadeIn}
						className='text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B00]'
					>
						Проценти
					</motion.h2>

					<motion.div
						variants={staggerContainer}
						className='grid grid-cols-1 md:grid-cols-3 gap-8'
					>
						{[
							{
								number: '1',
								description:
									'Зібрати статистику про середню дохідність для кожної сфери.',
							},
							{
								number: '2',
								description:
									'Надавати деталі про те, чому відсотки можуть варіюватися.',
							},
							{
								number: '3',
								description:
									'Кожна сфера має короткий опис, переваги та ризики.',
							},
						].map((item, index) => (
							<motion.div
								key={item.number}
								variants={fadeIn}
								className='flex flex-col items-center text-center'
							>
								<div className='w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-6'>
									<span className='text-white text-xl'>{item.number}</span>
								</div>
								<p className='text-gray-400 text-sm'>{item.description}</p>
							</motion.div>
						))}
					</motion.div>
				</motion.section>

				<motion.section
					initial='initial'
					whileInView='animate'
					variants={staggerContainer}
					viewport={{ once: true }}
					className='max-w-4xl mx-auto px-6'
				>
					<motion.h2
						variants={fadeIn}
						className='text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B00]'
					>
						Інвестиційні можливості
					</motion.h2>
					<motion.p
						variants={fadeIn}
						className='text-sm font-light text-center mb-12'
					>
						Оберіть категорію Сфери
					</motion.p>

					<motion.div
						variants={fadeIn}
						className='w-full bg-[#1C1C1C] text-white rounded-2xl overflow-hidden'
					>
						<div className='space-y-4 py-4'>
							<div className='flex items-center justify-between px-4 py-2'>
								<span className='text-sm'>Категорія Сфери</span>
								<ChevronDown className='h-4 w-4' />
							</div>
							<div className='px-3 py-2'>
								<div className='relative'>
									<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
									<Input
										placeholder='Введіть категорію'
										className='pl-8 bg-[#2C2C2C] border-0 text-sm'
									/>
								</div>
							</div>

							<Accordion type='multiple' className='w-full space-y-1'>
								<AccordionItem value='bookmarks' className='border-0'>
									<AccordionTrigger className='px-4 py-2 text-sm hover:bg-[#2C2C2C] hover:no-underline'>
										<div className='flex items-center gap-2'>
											<Bookmark className='h-4 w-4' />
											<span>Закладки</span>
										</div>
									</AccordionTrigger>
								</AccordionItem>

								<AccordionItem value='real-estate' className='border-0'>
									<AccordionTrigger className='px-4 py-2 text-sm hover:bg-[#2C2C2C] hover:no-underline'>
										<div className='flex items-center gap-2'>
											<Building2 className='h-4 w-4' />
											<span>Нерухомості</span>
										</div>
									</AccordionTrigger>
									<AccordionContent className='pt-1'>
										<Button
											variant='ghost'
											className='w-full justify-start px-6 py-2 text-sm font-normal hover:bg-[#2C2C2C]'
										>
											Житлова
										</Button>
										<Button
											variant='ghost'
											className='w-full justify-start px-6 py-2 text-sm font-normal hover:bg-[#2C2C2C]'
										>
											Комерційна
										</Button>
										<Accordion type='single' className='w-full'>
											<AccordionItem value='new-buildings' className='border-0'>
												<AccordionTrigger className='px-6 py-2 text-sm bg-[#F76707] hover:bg-[#F76707] hover:no-underline'>
													<div className='flex items-center gap-2'>
														<Infinity className='h-4 w-4' />
														<span>Новобудови</span>
													</div>
												</AccordionTrigger>
												<AccordionContent>
													<Button
														variant='ghost'
														className='w-full justify-start px-8 py-2 text-sm font-normal hover:bg-[#2C2C2C]'
													>
														Опис проекту
													</Button>
													{/* <Button variant="ghost" className="w-full justify-start px-8 py-2 text-sm font-normal hover:bg-[#2C2C2C]">
                            Мінtext-sm font-normal hover:bg-[#2C2C2C]">
                            Мінімальна сума інвестиції
                          </Button> */}
													<Button
														variant='ghost'
														className='w-full justify-start px-8 py-2 text-sm font-normal hover:bg-[#2C2C2C]'
													>
														Орієнтовна доходність (%)
													</Button>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value='risks' className='border-0'>
									<AccordionTrigger className='px-4 py-2 text-sm hover:bg-[#2C2C2C] hover:no-underline'>
										<div className='flex items-center gap-2'>
											<AlertCircle className='h-4 w-4' />
											<span>Ризики</span>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<Button
											variant='ghost'
											className='w-full justify-start px-6 py-2 text-sm font-normal hover:bg-[#2C2C2C]'
										>
											Низький ризик (3-5%)
										</Button>
										<Button
											variant='ghost'
											className='w-full justify-start px-6 py-2 text-sm font-normal hover:bg-[#2C2C2C]'
										>
											Середній ризик (6-10%)
										</Button>
										<Button
											variant='ghost'
											className='w-full justify-start px-6 py-2 text-sm font-normal hover:bg-[#2C2C2C]'
										>
											Високий ризик (11% і більше)
										</Button>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</motion.div>
				</motion.section>

				<motion.section
					initial='initial'
					whileInView='animate'
					variants={staggerContainer}
					viewport={{ once: true }}
					className='max-w-4xl mx-auto px-6 space-y-16'
				>
					<div className='space-y-8'>
						<motion.h2
							variants={fadeIn}
							className='text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B00]'
						>
							Профіль Користувача
						</motion.h2>
						<motion.div
							variants={staggerContainer}
							className='grid grid-cols-1 md:grid-cols-2 gap-6'
						>
							<motion.div variants={fadeIn}>
								<Card className='bg-[#1A1A1A] border-none rounded-2xl hover:bg-[#252525] transition-colors'>
									<CardContent className='p-8 space-y-6'>
										<div className='flex justify-center'>
											<Sparkles className='w-12 h-12 text-[#FF6B00]' />
										</div>
										<p className='text-gray-400 text-sm text-center'>
											Персоналізовані рекомендації на основі попередніх
											інвестицій
										</p>
									</CardContent>
								</Card>
							</motion.div>
							<motion.div variants={fadeIn}>
								<Card className='bg-[#1A1A1A] border-none rounded-2xl hover:bg-[#252525] transition-colors'>
									<CardContent className='p-8 space-y-6'>
										<div className='flex justify-center'>
											<TrendingUp className='w-12 h-12 text-[#FF6B00]' />
										</div>
										<p className='text-gray-400 text-sm text-center'>
											Можливість слідкувати за інвестиціями, отримувати звіти
											про прибутки/збитки
										</p>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					</div>

					<div className='space-y-8'>
						<motion.h2
							variants={fadeIn}
							className='text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B00]'
						>
							Навчальні Матеріали
						</motion.h2>
						<motion.div
							variants={staggerContainer}
							className='grid grid-cols-1 md:grid-cols-2 gap-6'
						>
							<motion.div variants={fadeIn}>
								<Card className='bg-[#1A1A1A] border-none rounded-2xl hover:bg-[#252525] transition-colors'>
									<CardContent className='p-8 space-y-6'>
										<div className='flex justify-center'>
											<BookOpen className='w-12 h-12 text-[#FF6B00]' />
										</div>
										<p className='text-gray-400 text-sm text-center'>
											Статті та відео про інвестування
										</p>
									</CardContent>
								</Card>
							</motion.div>
							<motion.div variants={fadeIn}>
								<Card className='bg-[#1A1A1A] border-none rounded-2xl hover:bg-[#252525] transition-colors'>
									<CardContent className='p-8 space-y-6'>
										<div className='flex justify-center'>
											<HelpCircle className='w-12 h-12 text-[#FF6B00]' />
										</div>
										<p className='text-gray-400 text-sm text-center'>
											Часті запитання
										</p>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					</div>
				</motion.section>
			</main>
		</div>
	)
}
