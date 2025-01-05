'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import BrandLogo from './brandlogo'
import VerificationModal from '@/components/ui/VerificationModal/VerificationModal'
import { LuLoader } from 'react-icons/lu'
import Link from 'next/link'

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		email: '',
		password: '',
		referralCode: '',
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [showVerification, setShowVerification] = useState(false)

	const supabase = createClient()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			const { data: existingUser } = await supabase
				.from('user_profiles')
				.select('user_id')
				.eq('email', formData.email)
				.single()

			if (existingUser) {
				// Проверяем статус подтверждения email
				const { data: authUser } = await supabase.auth.admin.getUserById(
					existingUser.user_id
				)

				if (authUser && !authUser.user?.email_confirmed_at) {
					// Email не подтвержден, отправляем код повторно
					const { error: resendError } = await supabase.auth.resend({
						type: 'signup',
						email: formData.email,
					})

					if (resendError) throw resendError

					setShowVerification(true)
					return
				} else {
					setError('Користувач з такою електронною поштою вже існує')
					return
				}
			}

			const { data: authData, error: authError } = await supabase.auth.signUp({
				email: formData.email,
				password: formData.password,
			})

			if (authError) {
				setError(authError.message)
				return
			}

			// const user = authData.user

			const userId = authData.user?.id
			console.log('Auth UID:', userId) // Для отладки

			// if (user) {
			const referralCode =
				formData.referralCode ||
				`REF${Math.random().toString(36).slice(2, 8).toUpperCase()}`

			const { error: profileError } = await supabase
				.from('user_profiles')
				.insert([
					{
						user_id: userId, // ID пользователя
						full_name: formData.fullName,
						phone_number: formData.phone,
						referral_code: referralCode,
						referred_by: formData.referralCode || null,
					},
				])

			if (profileError) {
				setError(profileError.message)
				return
				// }
			}

			setShowVerification(true)
		} catch (err) {
			// Убедимся, что мы всегда сохраняем только строку
			setError(
				err instanceof Error ? err.message : 'Виникла помилка при реєстрації'
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className='w-full max-w-[386px] p-8 rounded-3xl bg-[#1C1C1C] text-white'>
				<h1 className='text-[31px] font-bold text-center mb-6'>Реєстрація</h1>

				<form onSubmit={handleRegister} className='space-y-[30px]'>
					<Input
						type='text'
						name='fullName'
						placeholder='ПІБ'
						value={formData.fullName}
						onChange={handleChange}
						className='bg-transparent text-[#fff] placeholder:text-[#fff] '
						required
					/>
					<Input
						type='tel'
						name='phone'
						placeholder='Номер телефону'
						value={formData.phone}
						onChange={handleChange}
						className='bg-transparent text-[#fff] placeholder:text-[#fff] '
						required
					/>
					<Input
						type='email'
						name='email'
						placeholder='Електронна пошта'
						value={formData.email}
						onChange={handleChange}
						className='bg-transparent text-[#fff] placeholder:text-[#fff] '
						required
					/>
					<Input
						type='password'
						name='password'
						placeholder='Пароль'
						value={formData.password}
						onChange={handleChange}
						className='bg-transparent text-[#fff] placeholder:text-[#fff] '
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
							'Увійти'
						)}
					</Button>
					<Input
						type='text'
						name='referralCode'
						placeholder='Ваш реферал'
						value={formData.referralCode}
						onChange={handleChange}
						className='bg-transparent text-[#fff]  '
					/>
				</form>

				{error && (
					<p className='mt-4 text-sm text-red-500 text-center'>{error}</p>
				)}

				<div className='mt-6 text-center'>
					<div className='text-sm text-gray-400'>
						Вже є аккаунт?{' '}
						<Link
							href='/auth/login'
							className='text-[#FF8A00] hover:text-accenthover'
						>
							Увійти
						</Link>
					</div>
				</div>
			</div>

			<VerificationModal
				email={formData.email}
				isOpen={showVerification}
				onClose={() => setShowVerification(false)}
				type='signup'
			/>
		</>
	)
}
