'use client'

import { useState } from 'react'
import { LuLoader } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import BrandLogo from './brandlogo'
import ResetPasswordVerificationModal from '@/components/ui/ResetverificationModal/reset-password-verification-modal'
import { useTranslations } from 'next-intl'

export default function ForgotPasswordForm() {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [showVerification, setShowVerification] = useState(false)
	const t = useTranslations('auth.forgot')
	const supabase = createClient()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			// First ensure we're signed out
			// await supabase.auth.signOut()

			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/reset-password`,
			})

			if (error) throw error

			setShowVerification(true)
		} catch (error) {
			setError(error instanceof Error ? error.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className='w-full max-w-[428px] p-8 rounded-3xl bg-[#1C1C1C] text-white'>
				<h1 className='text-[31px] font-bold text-center mb-[18px]'>
					{t('title')}
				</h1>

				<p className='text-center text-gray-400 mb-8'>{t('instruction')}</p>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<Input
						type='email'
						placeholder={t('emailPlaceholder')}
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='bg-transparent'
						required
					/>

					<Button
						type='submit'
						className='w-full bg-[#FF8A00] hover:bg-accenthover rounded-[40px] px-[30px] py-[10px]'
						disabled={loading}
					>
						{loading ? (
							<LuLoader className='size-[17px] animate-spin' />
						) : (
							t('submitButton')
						)}
					</Button>
				</form>

				{error && (
					<p className='mt-4 text-sm text-red-500 text-center'>{error}</p>
				)}

				<div className='mt-6 text-center'>
					<Link
						href='/auth/login'
						className='text-[#FF8A00] hover:text-accenthover'
					>
						{t('backToLogin')}
					</Link>
				</div>
			</div>

			<ResetPasswordVerificationModal
				email={email}
				isOpen={showVerification}
				onClose={() => setShowVerification(false)}
			/>
		</>
	)
}
