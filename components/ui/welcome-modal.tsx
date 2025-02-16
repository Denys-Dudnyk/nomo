'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronRight } from 'lucide-react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import {
	getUserAcknowledgment,
	updateUserAcknowledgment,
} from '@/app/actions/users'
import Link from 'next/link'

interface WelcomeModalProps {
	isOpen: boolean
	onClose: () => void
	userId: string
	isFirstLogin?: boolean
}

export function WelcomeModal({
	isOpen,
	onClose,
	userId,
	isFirstLogin = false,
}: WelcomeModalProps) {
	const [privacyChecked, setPrivacyChecked] = useState(false)
	const [termsChecked, setTermsChecked] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [hasAcknowledged, setHasAcknowledged] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [isAccordionOpen, setIsAccordionOpen] = useState(false)
	const [needsScroll, setNeedsScroll] = useState(false)

	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const checkAcknowledgment = async () => {
			setIsLoading(true)
			try {
				const status = await getUserAcknowledgment(userId)
				// console.log('Received acknowledgment status:', status)
				setHasAcknowledged(status)
				if (status) {
					setPrivacyChecked(true)
					setTermsChecked(true)
				}
			} catch (error) {
				console.error('Error checking acknowledgment status:', error)
				setError('Помилка при завантаженні даних')
			} finally {
				setIsLoading(false)
			}
		}

		checkAcknowledgment()
	}, [userId])

	const handleContinue = async () => {
		if (hasAcknowledged) {
			onClose()
			return
		}

		if (!privacyChecked || !termsChecked) return

		setIsSubmitting(true)
		setError(null)

		try {
			const result = await updateUserAcknowledgment(userId)
			if (result.success) {
				setHasAcknowledged(true)
				onClose()
			} else {
				setError('Не вдалося зберегти ваш вибір. Спробуйте ще раз.')
				console.error('Failed to update acknowledgment:', result.error)
			}
		} catch (error) {
			setError('Виникла помилка. Спробуйте ще раз.')
			console.error('Error updating acknowledgment:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleOpenChange = (open: boolean) => {
		if (!open && (hasAcknowledged || (privacyChecked && termsChecked))) {
			onClose()
		}
	}

	useEffect(() => {
		const checkIfNeedsScroll = () => {
			if (contentRef.current) {
				const contentHeight = contentRef.current.scrollHeight
				const viewportHeight = window.innerHeight * 0.9
				setNeedsScroll(contentHeight > viewportHeight)
			}
		}

		checkIfNeedsScroll()
		window.addEventListener('resize', checkIfNeedsScroll)

		return () => {
			window.removeEventListener('resize', checkIfNeedsScroll)
		}
	}, [])

	if (isLoading) {
		return (
			<Dialog open={isOpen} onOpenChange={handleOpenChange}>
				<DialogContent className='bg-[#1C1D21] text-white border-none max-w-xl'>
					<DialogTitle></DialogTitle>
					<div className='text-white flex items-center justify-center'>
						<div className='animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white'></div>
					</div>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className='bg-[#121315] text-white border-none max-w-xl p-10 rounded-[24px] max-h-[100vh] overflow-hidden flex flex-col'>
				<div
					ref={contentRef}
					className={`
            flex-1 pr-2 -mr-2
            ${
							needsScroll || isAccordionOpen
								? 'overflow-y-auto invisible-scrollbar'
								: 'overflow-y-hidden'
						}
          `}
				>
					<div className='space-y-[48px]'>
						<DialogTitle className='text-[24px] font-medium text-[#F4F4F4] text-center sticky top-[-1px] bg-[#121315] py-2 z-10 '>
							Вітаємо
						</DialogTitle>

						<Accordion
							type='single'
							collapsible
							onValueChange={value => setIsAccordionOpen(!!value)}
						>
							<AccordionItem value='about' className='border-0'>
								<AccordionTrigger className='text-[#F4F4F4] text-[16px] hover:no-underline'>
									<span>Більше про нас</span>
									<ChevronRight className='h-6 w-6 duration-200 ml-2' />
								</AccordionTrigger>
								<AccordionContent className='text-[#D7D7D7] text-[14px] font-normal'>
									Накопичувати кешбек у вигляді бонусів (у гривнях або
									криптовалюті) за повсякденні покупки у партнерських компаніях.
									Наші партнери пропонують широкий вибір товарів та послуг, що
									дозволяє зручно накопичувати бонуси за покупки, які ви робите
									щодня.
									<br /> <br /> Примножувати кешбек через інвестиційні програми.
									Завдяки нашим інвестиційним можливостям ви зможете отримувати
									до 10% річних на ваш поточний баланс в доларах. Це ідеальний
									спосіб збільшити свої доходи від накопичених бонусів.
									<br /> <br /> Запрошувати друзів і отримувати пасивний дохід.
									Приєднуйтесь до нашої партнерської програми і отримуйте 10%
									від доходу, який ми отримуємо з транзакцій ваших друзів. Це
									дозволить вам заробляти без додаткових зусиль. <br /> <br />{' '}
									Заробляти на інвестиціях при лістингу нашої монети. Придбати
									нашу монету до її лістингу може стати вигідним інвестиційним
									кроком, що дозволить вам отримувати додатковий прибуток після
									успішного запуску на біржах.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='notes' className='border-0'>
								<AccordionTrigger className='text-[#F4F4F4] text-[16px] hover:no-underline'>
									<span>Примітки</span>
									<ChevronRight className='h-6 w-6 shrink-0 transition-transform duration-200 ml-2' />
								</AccordionTrigger>
								<AccordionContent className='text-gray-400'>
									Кешбек вже запущено, проте на даному етапі ми активно
									залучаємо нових партнерів для розширення мережі. На цей момент
									кількість партнерів ще обмежена, але ми постійно працюємо над
									розширенням партнерської бази, і будемо зростати разом із
									вами.
									<br /> <br /> Наші фахівці щоденно працюють над поліпшенням
									функціоналу для користувачів. Зазначимо, що можливість
									використовувати накопичений кешбек для оплати покупок стане
									доступною через 3 місяці, а можливість виводити кешбек на
									банківські картки — через 6 місяців.
									<br /> <br /> Наразі кешбек, який ви накопичуєте, підпадає під
									інвестиційну програму з доходністю 0,1% річних в доларах.
									Проте протягом 3 місяців ми плануємо укласти партнерства з
									міжнародними проектами, що дозволить вам отримувати до 10%
									річних на ваш кешбек. Це буде значно вигідніше за традиційні
									банківські пропозиції.
									<br /> <br /> 1Ncoin = 1грн
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						<div className='space-y-[48px]'>
							<div className='space-y-[24px]'>
								<h3 className='text-[16px] text-[#F4F4F4] font-medium'>
									Політика конфіденційності
								</h3>
								<p className='text-[#F4F4F4] text-[14px] font-normal pb-4'>
									Ви можете ознайомитися з політикою конфіденційності в файлі
									нижче
								</p>
								<Link
									href='https://nomocashback.com/privacy-policy'
									target='_blank'
									rel='noopener noreferrer'
									className='text-[#5490FF] hover:underline'
								>
									nomocashback.com/privacy-policy
								</Link>
								<div className='flex items-center space-x-2'>
									<Checkbox
										id='privacy'
										checked={privacyChecked}
										onCheckedChange={checked =>
											!hasAcknowledged && setPrivacyChecked(checked as boolean)
										}
										disabled={hasAcknowledged || isSubmitting}
										className='border-[#D7D7D7] data-[state=checked]:bg-[#FF8A00] data-[state=checked]:border-[#FF8A00] data-[state=checked]:text-[#161518]'
									/>
									<label
										htmlFor='privacy'
										className={`text-[14px] text-[#F4F4F4] font-normal leading-none ${
											hasAcknowledged ? 'cursor-not-allowed opacity-70' : ''
										}`}
									>
										Я прочитав та погоджуюсь з політикою конфіденційності та даю
										свій дозвіл на обробку моїх персональних даних
									</label>
								</div>
							</div>

							<div className='space-y-[24px]'>
								<h3 className='text-[16px] text-[#F4F4F4] font-medium'>
									Угода про використання
								</h3>
								<p className='text-[#F4F4F4] text-[14px] font-normal pb-4'>
									Ви можете ознайомитися з угодою про використання в файлі нижче
								</p>
								<Link
									href='https://nomocashback.com/terms-of-use'
									target='_blank'
									rel='noopener noreferrer'
									className='text-[#5490FF] hover:underline'
								>
									nomocashback.com/terms-of-use
								</Link>
								<div className='flex items-center space-x-2'>
									<Checkbox
										id='terms'
										checked={termsChecked}
										onCheckedChange={checked =>
											!hasAcknowledged && setTermsChecked(checked as boolean)
										}
										disabled={hasAcknowledged || isSubmitting}
										className='border-[#D7D7D7] data-[state=checked]:bg-[#FF8A00] data-[state=checked]:border-[#FF8A00] data-[state=checked]:text-[#161518]'
									/>
									<label
										htmlFor='terms'
										className={`text-[14px] text-[#F4F4F4] leading-none ${
											hasAcknowledged ? 'cursor-not-allowed opacity-70' : ''
										}`}
									>
										Я прочитав та погоджуюсь з угодою про використання та даю
										свій дозвіл на обробку моїх персональних даних
									</label>
								</div>
							</div>
						</div>

						{error && (
							<div className='text-red-500 text-sm text-center'>{error}</div>
						)}
					</div>
				</div>

				<div className='pt-6 mt-auto'>
					<Button
						onClick={handleContinue}
						disabled={(!privacyChecked || !termsChecked) && !hasAcknowledged}
						className='w-full bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-[#121315] font-medium text-[16px] py-[18px] rounded-[18px]'
					>
						{hasAcknowledged
							? 'Закрити'
							: isSubmitting
							? 'Збереження...'
							: 'Продовжити'}
					</Button>
				</div>
			</DialogContent>

			<style jsx global>{`
				.invisible-scrollbar {
					-ms-overflow-style: none; /* IE and Edge */
					scrollbar-width: none; /* Firefox */
				}

				.invisible-scrollbar::-webkit-scrollbar {
					display: none; /* Chrome, Safari and Opera */
				}

				/* Добавляем поддержку тач-скролла для мобильных устройств */
				.invisible-scrollbar {
					-webkit-overflow-scrolling: touch;
				}
			`}</style>
		</Dialog>
	)
}
