'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import BrandLogo from './brandlogo'
import VerificationModal from '@/components/ui/VerificationModal/VerificationModal'
import { LuLoader } from 'react-icons/lu'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type UserRole = 'user' | 'partner'

interface FormData {
	fullName: string
	phone: string
	email: string
	password: string
	referralCode: string
	edrpou?: string
}

export default function RegisterForm() {
	const [role, setRole] = useState<UserRole>('user')
	const [formData, setFormData] = useState<FormData>({
		fullName: '',
		phone: '',
		email: '',
		password: '',
		referralCode: '',
		edrpou: '',
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

	const handleRoleChange = (newRole: UserRole) => {
		setRole(newRole)
		setError(null)
		// Reset form when switching roles
		setFormData({
			fullName: '',
			phone: '',
			email: '',
			password: '',
			referralCode: '',
			edrpou: '',
		})
	}

	const validateEdrpou = (edrpou: string): boolean => {
		return /^\d{8}$/.test(edrpou)
	}

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			if (role === 'partner') {
				if (!formData.edrpou) {
					throw new Error("ЄДРПОУ є обов'язковим для партнерів")
				}
				if (!validateEdrpou(formData.edrpou)) {
					throw new Error('ЄДРПОУ повинен містити 8 цифр')
				}
			}

			// Check for existing user
			const { data: existingUser } = await supabase
				.from('user_profiles')
				.select('user_id')
				.eq('email', formData.email)
				.single()

			// if (existingUserError && existingUserError.code !== 'PGRST116') {
			// 	console.error('Error checking existing user:', existingUserError)
			// 	throw new Error('Помилка при перевірці існуючого користувача')
			// }

			if (existingUser) {
				const { data: authUser } = await supabase.auth.admin.getUserById(
					existingUser.user_id
				)

				if (authUser && !authUser.user?.email_confirmed_at) {
					const { error: resendError } = await supabase.auth.resend({
						type: 'signup',
						email: formData.email,
					})

					if (resendError) {
						console.error('Error resending verification:', resendError)
						throw resendError
					}

					setShowVerification(true)
					return
				} else {
					throw new Error('Користувач з такою електронною поштою вже існує')
				}
			}

			// Create auth user
			const { data: authData, error: authError } = await supabase.auth.signUp({
				email: formData.email,
				password: formData.password,
			})

			if (authError) {
				console.error('Auth error:', authError)
				throw authError
			}

			const userId = authData.user?.id
			if (!userId) {
				console.error('No user ID returned from auth signup')
				throw new Error('Failed to create user')
			}

			console.log('Auth user created successfully:', userId)

			if (role === 'partner') {
				// Create partner profile
				const { error: profileError } = await supabase
					.from('partner_profiles')
					.insert([
						{
							user_id: userId,
							phone_number: formData.phone,
							edrpou: formData.edrpou,
							role: 'partner',
						},
					])

				if (profileError) {
					console.error('Partner profile creation error:', profileError)
					// Don't throw here, continue to show verification modal
					setError(
						'Профіль створено, але виникла помилка при збереженні деяких даних. Будь ласка, оновіть їх після входу.'
					)
				} else {
					console.log('Partner profile created successfully')
				}
			} else {
				// Create user profile (unchanged)
				const referralCode =
					formData.referralCode ||
					`REF${Math.random().toString(36).slice(2, 8).toUpperCase()}`

				const { error: profileError } = await supabase
					.from('user_profiles')
					.insert([
						{
							user_id: userId,
							full_name: formData.fullName,
							phone_number: formData.phone,
							referral_code: referralCode,
							referred_by: formData.referralCode || null,
						},
					])

				if (profileError) {
					console.error('User profile creation error:', profileError)
					setError(
						'Профіль створено, але виникла помилка при збереженні деяких даних. Будь ласка, оновіть їх після входу.'
					)
				}
			}

			// Show verification modal regardless of profile creation errors
			setShowVerification(true)
		} catch (err) {
			console.error('Registration error:', err)
			setError(
				err instanceof Error ? err.message : 'Виникла помилка при реєстрації'
			)
		} finally {
			setLoading(false)
		}
	}

	const t = useTranslations('auth.register')

	return (
		<>
			<div className='w-full max-w-[386px] p-8 rounded-3xl bg-[#1C1C1C] text-white'>
				<h1 className='text-[31px] font-bold text-center mb-6'>
					{t('register')}
				</h1>

				<Tabs
					value={role}
					onValueChange={value => handleRoleChange(value as UserRole)}
					className='mb-6'
				>
					<TabsList className='grid w-full grid-cols-2 bg-transparent'>
						<TabsTrigger
							value='user'
							className={`py-2 rounded-none border-b-2 ${
								role === 'user'
									? 'border-accent text-accent'
									: 'border-transparent text-[#fff]'
							}`}
						>
							{t('userRole')}
						</TabsTrigger>
						<TabsTrigger
							value='partner'
							className={`py-2 rounded-none border-b-2 ${
								role === 'partner'
									? 'border-accent text-accent'
									: 'border-transparent text-[#fff]'
							}`}
						>
							{t('partnerRole')}
						</TabsTrigger>
					</TabsList>
				</Tabs>

				<form onSubmit={handleRegister} className='space-y-[30px]'>
					{role === 'partner' ? (
						// Partner registration fields
						<>
							<Input
								type='text'
								name='edrpou'
								placeholder={t('edrpouPlaceholder')}
								value={formData.edrpou}
								onChange={handleChange}
								className='bg-transparent text-[#fff] placeholder:text-[#fff]'
								required
								maxLength={8}
								pattern='\d{8}'
							/>
							<Input
								type='tel'
								name='phone'
								placeholder={t('phonePlaceholder')}
								value={formData.phone}
								onChange={handleChange}
								className='bg-transparent text-[#fff] placeholder:text-[#fff]'
								required
							/>
							<Input
								type='email'
								name='email'
								placeholder={t('emailPlaceholder')}
								value={formData.email}
								onChange={handleChange}
								className='bg-transparent text-[#fff] placeholder:text-[#fff]'
								required
							/>
							<Input
								type='password'
								name='password'
								placeholder={t('passwordPlaceholder')}
								value={formData.password}
								onChange={handleChange}
								className='bg-transparent text-[#fff] placeholder:text-[#fff]'
								required
							/>
						</>
					) : (
						// User registration fields
						<>
							<Input
								type='text'
								name='fullName'
								placeholder={t('fullNamePlaceholder')}
								value={formData.fullName}
								onChange={handleChange}
								className='bg-transparent text-[#fff] placeholder:text-[#fff]'
								required
							/>
							<Input
								type='tel'
								name='phone'
								placeholder={t('phonePlaceholder')}
								value={formData.phone}
								onChange={handleChange}
								className='bg-transparent text-[#fff] placeholder:text-[#fff]'
								required
							/>
							<Input
								type='email'
								name='email'
								placeholder={t('emailPlaceholder')}
								value={formData.email}
								onChange={handleChange}
								className='bg-transparent text-[#fff] placeholder:text-[#fff]'
								required
							/>
							<Input
								type='password'
								name='password'
								placeholder={t('passwordPlaceholder')}
								value={formData.password}
								onChange={handleChange}
								className='bg-transparent text-[#fff] placeholder:text-[#fff]'
								required
							/>
							<Input
								type='text'
								name='referralCode'
								placeholder={t('referralCodePlaceholder')}
								value={formData.referralCode}
								onChange={handleChange}
								className='bg-transparent text-[#fff]'
							/>
						</>
					)}

					<Button
						type='submit'
						className='w-full bg-[#FF8A00] hover:bg-accenthover rounded-[40px] px-[30px] py-[10px]'
						disabled={loading}
					>
						{loading ? (
							<LuLoader className='size-[17px] animate-spin' />
						) : (
							t('registerButton')
						)}
					</Button>
				</form>

				{error && (
					<p className='mt-4 text-sm text-red-500 text-center'>{error}</p>
				)}

				<div className='mt-6 text-center'>
					<div className='text-sm text-gray-400'>
						{t('alreadyHaveAccount')}{' '}
						<Link
							href='/auth/login'
							className='text-[#FF8A00] hover:text-accenthover'
						>
							{t('login')}
						</Link>
					</div>
				</div>
			</div>

			<VerificationModal
				email={formData.email}
				isOpen={showVerification}
				onClose={() => setShowVerification(false)}
				type='signup'
				role={role}
			/>
		</>
	)
}
