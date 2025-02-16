'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface InvestmentProgramModalProps {
	isOpen: boolean
	onClose: () => void
}

export function InvestmentProgramModal({
	isOpen,
	onClose,
}: InvestmentProgramModalProps) {
	const [needsScroll, setNeedsScroll] = useState(false)

	const contentRef = useRef<HTMLDivElement>(null)

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

	return (
		<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
			<DialogContent className='bg-[#121315] text-white border-none max-w-2xl p-7 sm:p-10 rounded-[24px] max-h-[100vh] overflow-hidden flex flex-col '>
				<div
					ref={contentRef}
					className={`
            flex-1 pr-2 -mr-2
            ${
							needsScroll
								? 'overflow-y-auto invisible-scrollbar'
								: 'overflow-y-hidden'
						}
          `}
				>
					<button
						onClick={onClose}
						className='absolute right-8 top-8 text-[#767785] hover:text-white transition-colors'
					>
						<X className='h-6 w-6' />
					</button>

					<div className='space-y-[48px]'>
						<DialogTitle className='text-[24px] text-center font-medium text-[#F4F4F4]'>
							Програма накопичення
						</DialogTitle>

						<div className='space-y-[32px]'>
							<div>
								<h3 className='text-[18px] font-medium text-[#F4F4F4] mb-4'>
									Інвестиційна програма:
								</h3>
								<p className='text-[14px] text-[#D7D7D7] leading-relaxed'>
									На даний момент кешбек, який ви накопичуєте, підпадає під
									інвестиційну програму з доходністю 0,4% річних в доларах.
									Однак протягом наступних 3 місяців ми плануємо укласти
									партнерства з міжнародними проектами, що дозволить вам
									отримувати до 10% в доларі річних на ваш кешбек. Це значно
									вигідніше за традиційні банківські пропозиції.
								</p>
							</div>

							<div>
								<h3 className='text-[16px] font-medium text-[#F4F4F4] mb-4'>
									Як здійснюється накопичення та інвестування кешбеку:
								</h3>
								<p className='text-[14px] text-[#D7D7D7] leading-relaxed'>
									Щоб процес накопичення та інвестування вашого кешбеку
									відбувався, вам необхідно активувати вільні кошти через кнопку
									"Invest". Після натискання цієї кнопки, вільні кошти з вашого
									кешбеку будуть додані до інвестиційного накопичення.
								</p>
							</div>

							<div>
								<h3 className='text-[16px] font-medium text-[#F4F4F4] mb-4'>
									Важливо:
								</h3>
								<p className='text-[14px] text-[#D7D7D7] leading-relaxed'>
									Незабаром ми оновимо систему та додамо нові інвестиційні
									портфелі. У рамках цих портфелів ваші кошти будуть заморожені
									на певний період часу під визначену процентну ставку, яка
									забезпечить значний дохід.
								</p>
							</div>

							<div>
								<h3 className='text-[16px] font-medium text-[#F4F4F4] mb-4'>
									Гарантія:
								</h3>
								<p className='text-[14px] text-[#D7D7D7] leading-relaxed'>
									Ми надаємо гарантію на ці інвестиції з нашого боку, незалежно
									від суми.
								</p>
							</div>
						</div>
					</div>
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
