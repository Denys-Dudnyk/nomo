'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Infinity,
	Users,
	Check,
	Copy,
	UserCircleIcon,
	PersonStandingIcon,
	CheckCheck,
	CoinsIcon,
	ThumbsUp,
} from 'lucide-react'
import Image from 'next/image'
import { User } from '@supabase/supabase-js'
import { UserProfile } from '@/types/database'

interface ReferalContentProps {
	session: {
		user: User
	}
	profile: UserProfile
}

export default function ReferralPage({
	session,
	profile,
}: ReferalContentProps) {
	const [copied, setCopied] = useState(false)
	const referralLink = 'https://example.com/ref/123456'

	const handleCopy = () => {
		navigator.clipboard.writeText(referralLink)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] text-white py-12 px-4 overflow-x-hidden'
		>
			<div className='max-w-6xl mx-auto space-y-24'>
				{/* Header Section */}
				<section className='flex flex-col md:flex-row items-center justify-between gap-12'>
					<motion.div
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='space-y-6 flex-1'
					>
						<h1 className='text-4xl md:text-5xl font-bold leading-tight'>
							Запросіть друга та отримуйте{' '}
							<span className='text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9900]'>
								10% кешбеку!
							</span>
						</h1>
						<p className='text-gray-300 text-lg'>
							Ми хочемо представити вам нашу нову реферальну програму, яка дає
							вам можливість заробляти кешбек, коли ви ділитесь своїм унікальним
							реферальним посиланням з друзями. Це простий спосіб отримати
							додатковий дохід!
						</p>
						<Button className='bg-gradient-to-r from-[#FF6B00] to-[#FF9900] hover:from-[#FF9900] hover:to-[#FF6B00] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105'>
							РЕФЕРАЛЬНА ПАНЕЛЬ
						</Button>
					</motion.div>

					<motion.div
						initial={{ x: 50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className='flex flex-col items-center gap-6'
					>
						<div className='relative w-full max-w-md'>
							<Input
								value={referralLink}
								readOnly
								className='bg-[#2A2A2A] border-2 border-[#FF6B00] rounded-lg py-3 pl-4 pr-28 text-white w-full text-lg'
							/>
							<Button
								onClick={handleCopy}
								className='absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF6B00] to-[#FF9900] hover:from-[#FF9900] hover:to-[#FF6B00] text-white rounded-md px-4 py-2 transition-all duration-300'
							>
								<AnimatePresence mode='wait'>
									{copied ? (
										<motion.div
											key='check'
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											exit={{ scale: 0 }}
										>
											<Check className='w-5 h-5' />
										</motion.div>
									) : (
										<motion.div
											key='copy'
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											exit={{ scale: 0 }}
										>
											<Copy className='w-5 h-5' />
										</motion.div>
									)}
								</AnimatePresence>
							</Button>
						</div>
						<div className='w-48 h-48 bg-white p-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300'>
							<Image
								src='/dashboard/Qr.png'
								alt='QR Code'
								width={192}
								height={192}
								className='w-full h-full'
							/>
						</div>
					</motion.div>
				</section>

				{/* How It Works Section */}
				<section className='space-y-12 max-w-4xl mx-auto'>
					<motion.h2
						initial={{ y: 20, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className='text-3xl md:text-4xl font-bold text-center text-white mb-12'
					>
						Як Це Працює
					</motion.h2>
					<div className='space-y-12'>
						{[
							{
								icon: <Users className='w-8 h-8 text-[#FF6B00]' />,
								title: 'ЗАПРОСІТЬ ДРУГА',
								description:
									'Запросіть своїх друзів приєднатися до нашого сервісу, використовуючи ваш унікальний реферальний код. Поділіться кодом через електронну пошту, соціальні мережі або інші зручні для вас способи.',
							},
							{
								icon: <UserCircleIcon className='w-8 h-8 text-[#FF6B00]' />,
								title: 'ДРУГ РЕЄСТРУЄТЬСЯ',
								description:
									'Кожний друг скористається вашим кодом реферальної програми і зареєструється в нашій системі, він отримає спеціальну пропозицію, яка допоможе йому розпочати в нашій системі швидше ніж будь-хто інший.',
							},
							{
								icon: <PersonStandingIcon className='w-8 h-8 text-[#FF6B00]' />,
								title: 'ОТРИМУЙТЕ КЕШБЕК',
								description:
									'За кожну покупку, яку ваш запрошений друг зробить на нашій платформі, ви будете отримувати 10% кешбеку від суми покупки, який вам друг отримає від своїх покупок. Це означає, що чим більше ваш друг купує, тим більше ви заробляєте!',
							},
						].map((step, index) => (
							<motion.div
								key={index}
								initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
								whileInView={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className='flex items-start gap-6 relative'
							>
								<div className='relative'>
									<div className='w-16 h-16 rounded-full border-2 border-[#FF6B00] flex items-center justify-center flex-shrink-0 bg-[#2A2A2A]'>
										{step.icon}
									</div>
									<div className='absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF9900] flex items-center justify-center'>
										<span className='text-white text-lg font-bold'>
											{index + 1}
										</span>
									</div>
								</div>
								<div className='flex-1'>
									<h3 className='text-xl font-bold mb-3 text-white'>
										{step.title}
									</h3>
									<p className='text-gray-300'>{step.description}</p>
								</div>
								{index < 2 && (
									<div className='absolute left-8 top-16 w-[2px] h-24 bg-gradient-to-b from-[#FF6B00] to-transparent'></div>
								)}
							</motion.div>
						))}
					</div>
				</section>

				{/* Benefits Section */}
				<section className='space-y-12 max-w-6xl mx-auto'>
					<motion.h2
						initial={{ y: 20, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className='text-3xl md:text-4xl font-bold text-center text-white mb-12'
					>
						Переваги Для Вас
					</motion.h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{[
							{
								title: 'БЕЗ ОБМЕЖЕНЬ',
								description:
									'Ви можете запросити скільки завгодно друзів і отримувати кешбек з кожної їхньої покупки.',
								icon: <Infinity color='white' size={64} />,
							},
							{
								title: 'ПРОСТОТА',
								description:
									'Немає жодних складних умов або прихованих платежів. Просто запрошуйте друзів і насолоджуйтеся своїм кешбеком.',
								icon: <ThumbsUp color='white' size={64} />,
							},
							{
								title: 'МОМЕНТАЛЬНІ БОНУСИ',
								description:
									'Ваші кешбек-бонуси будуть нараховані на ваш рахунок відразу після покупки вашого друга.',
								icon: <CoinsIcon color='white' size={64} />,
							},
							// <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-[2px] bg-[#FF6B00]" />
						].map((benefit, index) => (
							<motion.div
								key={index}
								initial={{ y: 50, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Card className='bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border-2 border-opacity-25   border-[#FF6B00] rounded-t-xl overflow-hidden h-full transform hover:scale-105 transition-all duration-300'>
									<CardContent className='p-8 flex flex-col items-center text-center h-full'>
										<h3 className='text-2xl font-bold text-white mb-4 relative pb-2'>
											{benefit.title}
											{/* Underline with padding */}
											<div className='absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-16 h-[2px] bg-[#FF6B00]' />
										</h3>

										<p className='text-gray-300 flex-grow'>
											{benefit.description}
										</p>
										<div className='mb-6'>{benefit.icon}</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</section>

				{/* How to Start Section */}
				<section className='space-y-12'>
					<motion.h2
						initial={{ y: 20, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className='text-3xl md:text-4xl font-bold text-center text-white mb-12'
					>
						Як Почати
					</motion.h2>
					<motion.div
						initial={{ y: 50, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border-2 border-[#FF6B00] border-opacity-20 rounded-xl p-8 shadow-2xl'
					>
						{[
							'Увійдіть у свій обліковий запис NInwest',
							'Перейдіть до розділу «Реферальна програма»',
							'Скопіюйте своє унікальне посилання',
							'Поділіться своїм посиланням з друзями та почніть заробляти',
						].map((step, index) => (
							<div key={index} className='flex items-start gap-4'>
								<div className='w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF9900] flex items-center justify-center flex-shrink-0'>
									<span className='text-white font-bold text-lg'>
										{index + 1}
									</span>
								</div>
								<p className='text-gray-300'>{step}</p>
							</div>
						))}
					</motion.div>
				</section>

				{/* Important Details Section */}
				<section className='space-y-8 border-2 border-[#FF6B00] border-opacity-20 p-10 rounded-xl bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] shadow-2xl'>
					<motion.h2
						initial={{ y: 20, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className='text-3xl md:text-4xl font-bold text-center text-white mb-8'
					>
						Важливі Деталі
					</motion.h2>
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='space-y-4'
					>
						{[
							'Кешбек нараховується від суми інвестиції друга, здійсненої протягом перших трьох місяців.',
							'Реферальна програма діє лише для нових користувачів, які раніше не були зареєстровані на платформі.',
							'Ви можете відстежити статус своїх рефералів та їхні інвестиції в будь-який час через свій особистий кабінет.',
						].map((detail, index) => (
							<div key={index} className='flex items-start gap-4'>
								<div className='w-3 h-3 bg-gradient-to-r from-[#FF6B00] to-[#FF9900] rounded-full mt-1.5'></div>
								<p className='text-gray-300'>{detail}</p>
							</div>
						))}
					</motion.div>
				</section>

				{/* Thank You Section */}
				<motion.section
					initial={{ y: 20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className='text-center space-y-6'
				>
					<h2 className='text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9900]'>
						Дякуємо, що ви з нами!
					</h2>
					<p className='text-gray-300 max-w-2xl mx-auto'>
						Ми цінуємо вашу підтримку і сподіваємося, що ви будете
						насолоджуватися всіма перевагами нашої реферальної програми.
						Запрошуйте друзів, заробляйте кешбек і отримуйте більше від нашого
						сервісу!
					</p>
				</motion.section>
			</div>
		</motion.div>
	)
}
