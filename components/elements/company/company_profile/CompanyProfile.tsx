'use client'

import { useEffect, useState } from 'react'
import { Globe, Edit2, Check, X, KeyRound } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FaShareAlt } from 'react-icons/fa'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'react-hot-toast'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface BaseProfile {
	user_id: string
	phone_number: string
	email: string
	full_name: string
	edrpou: string
	company_name?: string
}

interface UserProfile extends BaseProfile {
	full_name: string
	referral_code: string
}

interface PartnerProfile extends BaseProfile {
	edrpou: string
	company_name?: string
}

type EditableField = keyof Omit<
	UserProfile | PartnerProfile,
	'user_id' | 'referral_code'
>

interface CompanyProfileProps {
	profile: UserProfile | PartnerProfile
	profileType: 'user' | 'partner'
}

function PasswordChangeDialog() {
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const supabase = createClient()

	const handlePasswordChange = async () => {
		if (password !== confirmPassword) {
			toast.error('Паролі не співпадають')
			return
		}

		setLoading(true)
		try {
			const { error } = await supabase.auth.updateUser({
				password: password,
			})

			if (error) throw error

			toast.success('Пароль успішно змінено')
			setPassword('')
			setConfirmPassword('')
		} catch (error) {
			console.error('Error updating password:', error)
			toast.error(
				error instanceof Error ? error.message : 'Помилка зміни паролю'
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='w-full border-[#2C2F36] text-white hover:bg-[#2C2F36] p-3'>
					<KeyRound className='mr-2 h-4 w-4 ' />
					Змінити пароль
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-[#1C1E22] border-[#2C2F36] text-white'>
				<DialogHeader>
					<DialogTitle>Зміна паролю</DialogTitle>
				</DialogHeader>
				<div className='space-y-4 pt-4'>
					<Input
						type='password'
						placeholder='Новий пароль'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='bg-transparent border-[#2C2F36] text-white rounded-lg'
					/>
					<Input
						type='password'
						placeholder='Підтвердіть пароль'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						className='bg-transparent border-[#2C2F36] text-white rounded-lg'
					/>
					<Button
						onClick={handlePasswordChange}
						disabled={loading}
						className='w-full bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white p-3'
					>
						{loading ? 'Збереження...' : 'Зберегти'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default function CompanyProfile({
	profile,
	profileType,
}: CompanyProfileProps) {
	const [editMode, setEditMode] = useState<Record<EditableField, boolean>>(
		{} as Record<EditableField, boolean>
	)
	const [formData, setFormData] = useState(profile)
	const [email, setEmail] = useState('')

	const [loading, setLoading] = useState<Record<EditableField, boolean>>(
		{} as Record<EditableField, boolean>
	)

	const supabase = createClient()

	const handleEdit = (field: EditableField) => {
		setEditMode(prev => ({ ...prev, [field]: true }))
	}

	const handleChange = (field: EditableField, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleSave = async (field: EditableField) => {
		setLoading(prev => ({ ...prev, [field]: true }))
		try {
			// Handle email updates separately since it's in Auth
			if (field === 'email') {
				// First, check if the email is different
				const {
					data: { session },
				} = await supabase.auth.getSession()
				if (!session?.user) throw new Error('No session found')

				if (session.user.email === formData[field]) {
					throw new Error('Новий email співпадає з поточним')
				}

				// Get the current URL for the redirect
				const redirectTo = `${window.location.origin}/auth/edit/verify-email`

				// Update email through Auth API
				const { error: authError } = await supabase.auth.updateUser({
					email: formData[field],
				})

				if (authError) throw authError

				toast.success(
					'На вашу поточну та нову пошту відправлено лист для підтвердження. Будь ласка, перейдіть за посиланням у листі для завершення зміни email, та підтвердіть на обох поштах.',
					{ duration: 10000 }
				)
				setEditMode(prev => ({ ...prev, [field]: false }))
				return
			}

			// For other fields, update the profile table
			const table =
				profileType === 'partner' ? 'partner_profiles' : 'user_profiles'
			const updateData = { [field]: formData[field] }

			const { error: profileError } = await supabase
				.from(table)
				.update(updateData)
				.eq('user_id', profile.user_id)

			if (profileError) throw profileError

			setEditMode(prev => ({ ...prev, [field]: false }))
			toast.success('Дані оновлено успішно')
		} catch (error) {
			console.error('Error updating profile:', error)
			toast.error(
				error instanceof Error ? error.message : 'Помилка оновлення даних'
			)
			setFormData(prev => ({
				...prev,
				[field]: profile[field],
			}))
		} finally {
			setLoading(prev => ({ ...prev, [field]: false }))
		}
	}

	const handleCancel = async (field: EditableField) => {
		if (field === 'email') {
			// Get current email from auth session when canceling email edit
			const {
				data: { session },
			} = await supabase.auth.getSession()
			setFormData(prev => ({
				...prev,
				[field]: session?.user?.email || prev[field],
			}))
		} else {
			// For other fields, restore from profile data
			setFormData(prev => ({
				...prev,
				[field]: profile[field],
			}))
		}
		setEditMode(prev => ({ ...prev, [field]: false }))
	}

	useEffect(() => {
		async function getCurrentEmail() {
			const {
				data: { session },
			} = await supabase.auth.getSession()
			if (session?.user?.email) {
				setFormData(prev => ({
					...prev,
					email: session.user.email || '',
				}))
			}
		}

		getCurrentEmail()
	}, [])

	const renderField = (field: EditableField, label: string, type = 'text') => (
		<div>
			{label && <div className='text-[#6D7380] text-sm mb-2'>{label}</div>}
			<div className='relative'>
				<input
					type={type}
					value={formData[field] || ''}
					readOnly={!editMode[field]}
					onChange={e => handleChange(field, e.target.value)}
					className='w-full bg-transparent border border-[#2C2F36] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2C2F36]'
				/>
				{editMode[field] ? (
					<div className='absolute right-2 top-1/2 -translate-y-1/2 flex gap-2'>
						<Button
							size='icon'
							onClick={() => handleSave(field)}
							disabled={loading[field]}
							className='text-green-500 hover:text-green-400 bg-[#2C2F36]'
						>
							<Check className='h-4 w-4' />
						</Button>
						<Button
							size='icon'
							onClick={() => handleCancel(field)}
							disabled={loading[field]}
							className='text-red-500 hover:text-red-400 bg-[#2C2F36]'
						>
							<X className='h-4 w-4' />
						</Button>
					</div>
				) : (
					<Button
						size='icon'
						onClick={() => handleEdit(field)}
						className='absolute right-2 top-1/2 -translate-y-1/2 text-[#6D7380] bg-transparent  hover:bg-[#2C2F36] hover:text-white'
					>
						<Edit2 className='h-4 w-4' />
					</Button>
				)}
			</div>
		</div>
	)

	return (
		<div className='min-h-screen bg-black p-0 sm:p-16'>
			<main className='max-w-[1440px] mx-auto px-4 py-6'>
				<Card className='bg-[#1C1E22] border-0 rounded-xl mb-4'>
					<div className='p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4'>
						<div className='flex items-center gap-4'>
							<div className='relative'>
								<div className='w-12 h-12 rounded-full bg-[#2C2F36] flex items-center justify-center'>
									<img
										src='/cashback/item.svg'
										alt='Profile'
										className='w-full h-full rounded-full object-cover'
									/>
								</div>
							</div>
							<div>
								<div className='flex flex-col sm:flex-row gap-4 sm:gap-12'>
									<div className='flex flex-col sm:flex-row gap-1 sm:gap-8'>
										<div className='block items-center'>
											<h2 className='text-white text-base font-normal mb-1'>
												{profileType === 'user'
													? (formData as UserProfile).full_name
													: (formData as PartnerProfile).company_name ||
													  'Компанія'}
											</h2>
											<FaShareAlt className='text-white' />
										</div>
										<div className='block items-center'>
											<div className='text-[#6D7380] text-xs mr-2'>UID:</div>
											<div className='text-white text-md'>
												{profile.user_id}
											</div>
										</div>
										<div className='block items-center'>
											<div className='text-[#6D7380] text-xs mr-2'>
												Рахунок:
											</div>
											<div className='text-white text-md'>497994402</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Card>

				<Card className='bg-[#1C1E22] border-0 rounded-xl'>
					<div className='p-4 md:p-6'>
						<h3 className='text-white text-base font-normal mb-6'>
							{profileType === 'partner' ? 'Дані компанії' : 'Особисті дані'}
						</h3>
						<div className='space-y-6'>
							{profileType === 'user' ? (
								renderField('full_name', 'ПІБ')
							) : (
								<>
									{renderField('company_name', 'Назва компанії')}
									{renderField('edrpou', 'ЄДРПОУ')}
								</>
							)}
							{renderField('phone_number', 'Номер Телефону', 'tel')}
							{renderField('email', 'Електронна Пошта', 'email')}
							<PasswordChangeDialog />
						</div>
					</div>
				</Card>
			</main>
		</div>
	)
}
