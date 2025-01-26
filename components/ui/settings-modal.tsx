'use client'

import { ChevronLeft, ChevronDown } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import Link from 'next/link'

interface SettingsModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
	const [activeMenu, setActiveMenu] = useState<string | null>(null)

	const menuItems = [
		{
			title: 'Дашборд',
			// href: '/admin/dashboard',
			subMenu: [
				{ href: '/dashboard/companies/analysis', text: 'Огляд показників' },
				{ href: '', text: 'Ключові метрики' },
				{ href: '', text: 'Тренди та статистика' },
				{ href: '', text: 'Список останніх активностей' },
				{ href: '', text: 'Показники користувачів' },
			],
		},
		{
			title: 'Користувачі',
			// href: '/admin/users',
			subMenu: [
				{ href: '/dashboard/users', text: 'Керування користувачами' },
				{ href: '/dashboard/companies', text: 'Керування бізнесами' },
				{ href: '', text: 'Ролі та дозволи' },
				{ href: '', text: 'Історія активностей' },
				{ href: '', text: 'Налаштування сповіщень' },
			],
		},
		{
			title: 'Контент',
			// href: '/admin/content',
			subMenu: [
				{ href: '', text: 'Статті та блоги' },
				{ href: '', text: 'Опис компаній' },
				{ href: '', text: 'Зображення та медіа' },
				{ href: '', text: 'Оновлення контенту' },
				{ href: '', text: 'Рецензії та відгуки' },
			],
		},
		{
			title: 'Продукти/Послуги',
			// href: '/admin/products',
			subMenu: [
				{ href: '', text: 'Список продуктів/послуг' },
				{ href: '', text: 'Додавання нових продуктів' },
				{ href: '', text: 'Оновлення продуктів' },
				{ href: '', text: 'Статистика по продажах' },
				{ href: '', text: 'Управління цінами та знижками' },
			],
		},
		{
			title: 'Фінанси',
			// href: '/admin/finances',
			subMenu: [
				{ href: '', text: 'Звіт по доходах' },
				{ href: '', text: 'Витрати та баланси' },
				{ href: '', text: 'Обробка платежів' },
				{ href: '', text: 'Статистика транзакцій' },
				{ href: '', text: 'Інтеграція з платіжними системами' },
			],
		},
		{
			title: 'Звіти',
			// href: '/admin/reports',
			subMenu: [
				{ href: '', text: 'Фінансові звіти' },
				{ href: '', text: 'Звіти по користувачах' },
				{ href: '', text: 'Аналітика за періоди' },
				{ href: '', text: 'Виведення на експорт' },
				{ href: '', text: 'Візуалізація даних' },
			],
		},
		{
			title: 'Інтеграції',
			// href: '/admin/integrations',
			subMenu: [
				{ href: '', text: 'API' },
				{ href: '', text: 'З’єднання з партнерами' },
				{ href: '', text: 'Налаштування платіжних систем' },
				{ href: '', text: 'Синхронізація даних' },
				{ href: '', text: 'Імпорт/експорт даних' },
			],
		},
		{
			title: 'Налаштування',
			// href: '/admin/settings',
			subMenu: [
				{ href: '', text: 'Налаштування профілю' },
				{ href: '', text: 'Повідомлення та сповіщення' },
				{ href: '', text: 'Вибір мови та регіону' },
				{ href: '', text: 'Безпека та доступ' },
				{ href: '', text: 'Інтеграція з іншими платформами' },
			],
		},
	]

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-3xl p-0 gap-0 bg-[#1E2128] border-none rounded-3xl'>
				<DialogHeader className='p-6 flex-row items-center gap-4'>
					<button
						onClick={onClose}
						className='hover:opacity-70 transition-opacity'
					>
						<ChevronLeft className='h-6 w-6 text-white' />
					</button>

					<DialogTitle className='text-2xl font-semibold text-white m-0'>
						Адмін Панель
					</DialogTitle>
				</DialogHeader>

				<div className='p-6 pt-0 grid grid-cols-2 gap-4'>
					{menuItems.map((item, index) => (
						<Collapsible
							key={index}
							open={activeMenu === item.title}
							onOpenChange={() =>
								setActiveMenu(activeMenu === item.title ? null : item.title)
							}
						>
							<CollapsibleTrigger asChild className='z-10 relative'>
								<Button className='w-full h-auto p-6 bg-accent hover:bg-accent rounded-2xl flex items-center justify-between text-white text-xl font-medium shadow-admin'>
									{item.title}
									<ChevronDown
										className={`h-6 w-6 transition-transform ${
											activeMenu === item.title ? 'rotate-180' : ''
										}`}
									/>
								</Button>
							</CollapsibleTrigger>

							<CollapsibleContent className='bg-accent rounded-b-[22px] '>
								<div className='-mt-4 pb-5 transition-all'>
									{item.subMenu.map((subItem, subIndex) => (
										<div className='pt-[25px]' key={subIndex}>
											<Link
												href={subItem.href}
												className='w-full justify-start text-left text-[#fff] text-[20px] font-semibold px-6  rounded-[22px] bg-accent hover:bg-accenthover'
											>
												{subItem.text}
											</Link>
										</div>
									))}
								</div>
							</CollapsibleContent>
						</Collapsible>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}
