'use client'

import { useState, useEffect } from 'react'
import { LuLoader } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BrandLogo from './brandlogo'
import SuccessModal from '@/components/ui/SuccessModal/success-modal'
import { useTranslations } from 'next-intl'

export default function ResetPasswordForm() {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [showSuccess, setShowSuccess] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const router = useRouter()
	const supabase = createClient()
	const t = useTranslations('auth.reset')

	const cleanupResetState = async () => {
		await supabase.auth.signOut()
		document.cookie =
			'resetting_password=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
		localStorage.removeItem('resetEmail')
	}

	useEffect(() => {
		const resetEmail = localStorage.getItem('resetEmail')
		if (!resetEmail) {
			router.push('/auth/login')
			return
		}

		const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
			if (!isSubmitting) {
				e.preventDefault()
				e.returnValue =
					'Якщо ви залишите цю сторінку, ваш пароль не буде змінено. Ви впевнені?'

				await cleanupResetState()
			}
		}

		const handlePopState = async () => {
			if (!isSubmitting) {
				const shouldLeave = window.confirm(
					'Якщо ви залишите цю сторінку, ваш пароль не буде змінено. Ви впевнені?'
				)

				if (shouldLeave) {
					await cleanupResetState()
				} else {
					window.location.href = '/reset-password'
				}
			}
		}

		window.addEventListener('beforeunload', handleBeforeUnload)
		window.addEventListener('popstate', handlePopState)

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
			window.removeEventListener('popstate', handlePopState)
		}
	}, [router, isSubmitting])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setError('Паролі не співпадають')
			return
		}

		setLoading(true)
		setError(null)
		setIsSubmitting(true) // Устанавливаем состояние отправки

		try {
			const resetEmail = localStorage.getItem('resetEmail')
			if (!resetEmail) {
				throw new Error('Reset email not found')
			}

			const { error } = await supabase.auth.updateUser({
				password,
			})

			if (error) throw error

			// Очищаем состояние после успешного сброса
			await cleanupResetState()

			// Показываем модальное окно успешного сброса
			setShowSuccess(true)
		} catch (error) {
			setError(error instanceof Error ? error.message : 'An error occurred')
			setIsSubmitting(false) // Сбрасываем состояние отправки при ошибке
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className='w-full max-w-[428px] p-8 rounded-3xl bg-[#1C1C1C] text-white'>
				<div className='flex justify-center mb-8'>
					<BrandLogo />
				</div>

				<h1 className='text-[31px] font-bold text-center mb-[18px]'>
					{t('title')}
				</h1>

				<p className='text-center text-gray-400 mb-8'>{t('description')}</p>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<Input
						type='password'
						placeholder={t('passwordPlaceholder')}
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='bg-transparent border-gray-600'
						required
					/>
					<Input
						type='password'
						placeholder={t('passwordPlaceholder2')}
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						className='bg-transparent border-gray-600'
						required
					/>

					<Button
						type='submit'
						className='w-full bg-[#FF8A00] hover:bg-[#FF8A00]/90 rounded-[40px] px-[30px] py-[10px]'
						disabled={loading}
					>
						{loading ? (
							<LuLoader className='size-[17px] animate-spin' />
						) : (
							t('resetPass')
						)}
					</Button>
				</form>

				{error && (
					<p className='mt-4 text-sm text-red-500 text-center'>{error}</p>
				)}
			</div>

			<SuccessModal
				isOpen={showSuccess}
				onClose={() => {
					setShowSuccess(false)
					setIsSubmitting(false) // Сбрасываем состояние отправки при редиректе
					router.push('/auth/login')
				}}
			/>
		</>
	)
}
