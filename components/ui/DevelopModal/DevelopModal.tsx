'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase/client'
import BrandLogo from '@/components/elements/auth/brandlogo'
import Image from 'next/image'
import { LuLoader } from 'react-icons/lu'
import Link from 'next/link'

interface VerificationModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function DevelopModal({
	isOpen,
	onClose,
}: VerificationModalProps) {
	return (
		<>
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className='w-[100%] sm:max-w-[628px] max-h-[528px]  text-white '>
					<DialogHeader>
						<DialogTitle className='text-2xl font-bold text-center'></DialogTitle>
					</DialogHeader>
					<div className='flex flex-col items-center justify-center  text-foreground'>
						<Image
							src={'/dev.png'}
							alt='404'
							width={240}
							height={220}
							className='mb-[45px]'
						/>
						<h2 className='text-[24px] sm:text-[38px] font-extrabold leading-[135%] mb-[45px] text-black'>
							Упссс... У розробці
						</h2>

						<Link
							href='/'
							className='text-accent px-5 sm:px-[60px] py-5 sm:py-[14px] leading-[24.2px] text-[18px] sm:text-[26px] font-bold underline hover:text-accenthover transition-colors mb-[79px] text-center'
						>
							Повернутися на головну сторінку
						</Link>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
