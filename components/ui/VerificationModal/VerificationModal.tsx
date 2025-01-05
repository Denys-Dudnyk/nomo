import { useEffect, useState } from 'react'
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

interface VerificationModalProps {
	email: string
	isOpen: boolean
	onClose: () => void
	type: 'signup' | 'reset'
}

export default function VerificationModal({
	email,
	isOpen,
	onClose,
	type,
}: VerificationModalProps) {
	const [code, setCode] = useState(['', '', '', '', '', ''])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const supabase = createClient()

	// useEffect(() => {
	// 	if (type === 'reset') {
	// 		const {
	// 			data: { subscription },
	// 		} = supabase.auth.onAuthStateChange(async (event, session) => {
	// 			if (event === 'PASSWORD_RECOVERY') {
	// 				// Отключаем авторизацию в процессе сброса
	// 				await supabase.auth.signOut()
	// 			}
	// 		})

	// 		return () => subscription.unsubscribe()
	// 	}
	// }, [type])

	const handleCodeChange = (index: number, value: string) => {
		if (value.length <= 1) {
			const newCode = [...code]
			newCode[index] = value
			setCode(newCode)

			if (value && index < 5) {
				const nextInput = document.getElementById(`code-${index + 1}`)
				nextInput?.focus()
			}
		}
	}

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === 'Backspace' && !code[index] && index > 0) {
			const prevInput = document.getElementById(`code-${index - 1}`)
			prevInput?.focus()
		}
	}

	const handleVerification = async () => {
		const verificationCode = code.join('')
		if (verificationCode.length !== 6) {
			setError('Будь ласка, введіть повний код')
			return
		}

		setLoading(true)
		setError(null)

		try {
			const { error } = await supabase.auth.verifyOtp({
				email,
				token: verificationCode,
				type: type === 'reset' ? 'recovery' : 'signup',
			})

			if (error) throw error

			//onClose()
			if (type === 'reset') {
				// For password reset, redirect without waiting for auth state change
				router.push('/reset-password')
				onClose()
			} else {
				// For signup, allow normal flow
				router.push('/dashboard')
				onClose()
			}
		} catch (error) {
			setError(error instanceof Error ? error.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	const handleResendCode = async () => {
		try {
			if (type === 'reset') {
				const { error } = await supabase.auth.resetPasswordForEmail(email, {
					redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
				})
				if (error) throw error
			} else {
				const { error } = await supabase.auth.resend({
					type: 'signup',
					email,
				})
				if (error) throw error
			}
			alert('Код відправлено повторно')
		} catch (error) {
			setError(error instanceof Error ? error.message : 'An error occurred')
		}
	}

	return (
		<>
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className='w-full h-auto sm:max-w-md bg-[#1C1C1C] text-white border-[#1c1c1c] rounded-[32px] px-0 sm:p-6'>
					<DialogHeader className='px-4'>
						<div className='flex justify-center mb-8'>
							<BrandLogo />
						</div>
						<DialogTitle className='text-[18px] sm:text-2xl font-bold text-center'>
							Введіть код підтвердження
						</DialogTitle>
					</DialogHeader>

					<div className='flex flex-col items-center'>
						<p className='text-center text-gray-400 mb-8'>
							Ми відправили код підтвердження на вашу пошту {email}. Перевірте
							вашу поштову скриньку та введіть отриманий код для продовження.
						</p>

						<div className='flex justify-center gap-2 sm:gap-3 mb-6 w-auto'>
							{code.map((digit, index) => (
								<input
									key={index}
									id={`code-${index}`}
									type='tel'
									maxLength={1}
									value={digit}
									onChange={e => handleCodeChange(index, e.target.value)}
									onKeyDown={e => handleKeyDown(index, e)}
									className='w-11 h-11 sm:w-12 sm:h-12 text-center text-xl bg-transparent border-2 border-gray-600 rounded-lg focus:border-accent focus:outline-none'
								/>
							))}
						</div>

						<div className='text-center mb-6'>
							<button
								onClick={handleResendCode}
								className='text-accent hover:text-accenthover'
							>
								Надіслати повторно
							</button>
						</div>

						<Button
							onClick={handleVerification}
							className='w-auto sm:w-full bg-accent hover:bg-accenthover px-[30px] py-[10px]'
							disabled={loading}
						>
							{loading ? (
								<LuLoader className='size-[17px] animate-spin' />
							) : (
								'Підтвердити'
							)}
						</Button>

						{error && (
							<p className='mt-4 text-sm text-red-500 text-center'>{error}</p>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
