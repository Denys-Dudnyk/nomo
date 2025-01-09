'use client'

import { useState } from 'react'
import { LuLoader } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BrandLogo from './brandlogo'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import DevelopModal from '@/components/ui/DevelopModal/DevelopModal'
import { useTranslations } from 'next-intl'

export default function LoginForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()
	const [showDev, setShowDev] = useState(false)
	const [resetEmail, setResetEmail] = useState('')
	const [showVerification, setShowVerification] = useState(false)

	const supabase = createClient()

	// Загружаем переводы
	const t = useTranslations('auth.login')

	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})

			if (error) throw error

			router.push('/dashboard')
		} catch (error) {
			setError(error instanceof Error ? error.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	const handleTelegramLogin = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
				},
			})
			if (error) throw error
		} catch (error) {
			setError(error instanceof Error ? error.message : 'An error occurred')
		}
	}

	const openDevelopModal = () => {
		setShowDev(true)
	}

	const handleForgotPassword = () => {
		router.push('/forgot-password')
	}

	return (
		<>
			<div className='w-full max-w-[428px] p-8 rounded-3xl bg-[#1C1C1C] text-white'>
				<h1 className='text-[31px] font-bold text-center mb-[18px]'>
					{t('loginButton')}
				</h1>

				<button
					onClick={openDevelopModal}
					className='flex items-center justify-between w-full mb-[18px] px-[20px] sm:px-[60px] rounded-[41px] py-[10px] sm:py-[19.5px] bg-transparent border border-[#fff] hover:bg-gray-800 text-[15px] sm:text-[18px] font-bold'
				>
					<span>{t('continueWith')}</span>
					<Image
						src={'/auth/tg.svg'}
						alt='Telegram Auth'
						className=''
						width={51}
						height={51}
					/>
				</button>

				<div className='relative mb-[18px]'>
					<div className='relative flex justify-center text-[19px] font-bold'>
						<span className='px-2 bg-[#1C1C1C] text-gray-400'>{t('or')}</span>
					</div>
				</div>

				<form onSubmit={handleEmailLogin} className='space-y-4'>
					<Input
						type='email'
						placeholder={t('emailPlaceholder')}
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='bg-transparent '
					/>
					<Input
						type='password'
						placeholder={t('passwordPlaceholder')}
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='bg-transparent '
					/>

					<Button
						type='submit'
						className='w-full bg-[#FF8A00] hover:bg-accenthover rounded-[40px] px-[30px] py-[10px]'
						disabled={loading}
					>
						{loading ? (
							<LuLoader className='size-[17px] animate-spin' />
						) : (
							t('loginButton')
						)}
					</Button>
				</form>

				{error && (
					<p className='mt-4 text-sm text-red-500 text-center'>{error}</p>
				)}

				<div className='mt-6 text-left space-y-2'>
					<a
						href='#'
						className='text-sm text-gray-400 hover:text-white'
						onClick={handleForgotPassword}
					>
						{t('forgotPassword')}
					</a>
					<div className='text-sm text-gray-400'>
						{t('notWithUs')}{' '}
						<Link
							href='/auth/register'
							className='text-[#FF8A00] hover:text-accenthover'
						>
							{t('register')}
						</Link>
					</div>
				</div>
			</div>

			<DevelopModal isOpen={showDev} onClose={() => setShowDev(false)} />
		</>
	)
}
