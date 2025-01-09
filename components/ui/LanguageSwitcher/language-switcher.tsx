'use client'

import { useState } from 'react'
import { useTransition } from 'react'
import clsx from 'clsx'
import { Locale } from '@/i18n/config'
import { setUserLocale } from '@/services/locale'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CheckIcon, LanguagesIcon } from 'lucide-react'
import Image from 'next/image'

type Props = {
	defaultValue: string
	items: Array<{ value: string; label: string }>
	label: string
}

export default function LanguageSwitcher({
	defaultValue,
	items,
	label,
}: Props) {
	const [isPending, startTransition] = useTransition()
	const [isOpen, setIsOpen] = useState(false)

	function onChange(value: string) {
		const locale = value as Locale
		startTransition(() => {
			setUserLocale(locale)
		})
	}

	return (
		<div className='relative'>
			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger
					aria-label={label}
					className={clsx(
						'rounded-sm p-2 transition-colors hover:bg-slate-200',
						isPending && 'pointer-events-none opacity-60'
					)}
				>
					{/* <LanguagesIcon className='h-6 w-6 text-slate-600 transition-colors' /> */}
					<Image
						src={'/header/language.svg'}
						alt='Логотип Nomo'
						width={42}
						height={42}
						className='w-8 h-8 sm:w-[42px] sm:h-[42px]'
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md'>
					{items.map(item => (
						<DropdownMenuItem
							key={item.value}
							className='flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100'
							onClick={() => onChange(item.value)}
						>
							<div className='mr-2 w-[1rem]'>
								{item.value === defaultValue && (
									<CheckIcon className='h-5 w-5 text-slate-600' />
								)}
							</div>
							<span className='text-slate-900'>{item.label}</span>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
