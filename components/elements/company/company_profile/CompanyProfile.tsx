'use client'

import { useEffect, useState } from 'react'
import { Globe, Edit2, Check, X, KeyRound } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FaShareAlt } from 'react-icons/fa'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import PasswordChangeDialog from './PasswordChangeDialog'

interface BaseProfile {
	user_id: string
	phone_number: string
	email: string
	full_name: string
	edrpou: string
	company_name?: string
	profile_image?: string
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

	const [profileImage, setProfileImage] = useState(profile.profile_image || '')
	const [previewImage, setPreviewImage] = useState<string | null>(null)
	const [imageLoading, setImageLoading] = useState(false)

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0]
		if (!file) return

		setImageLoading(true)

		try {
			// Check file size (max 5MB)
			const fileSize = file.size / 1024 / 1024
			if (fileSize > 5) {
				throw new Error('Файл занадто великий. Максимальний розмір: 5MB')
			}

			// Check file type
			if (!file.type.startsWith('image/')) {
				throw new Error('Дозволені тільки зображення')
			}

			// Get current session and check authorization
			const {
				data: { session },
				error: sessionError,
			} = await supabase.auth.getSession()
			if (sessionError) throw sessionError
			if (!session?.user) throw new Error('Необхідно авторизуватися')

			const userId = session.user.id
			const bucketName = 'user-image'

			// Create metadata for the file
			const fileMetadata = {
				owner: userId,
				createdAt: new Date().toISOString(),
				contentType: file.type,
				size: file.size,
			}

			// 1. First, list all existing files for this user
			const { data: existingFiles, error: listError } = await supabase.storage
				.from(bucketName)
				.list(userId, {
					limit: 100,
					offset: 0,
					sortBy: { column: 'name', order: 'asc' },
				})

			if (listError) throw listError

			// 2. Delete all existing files if any exist
			if (existingFiles && existingFiles.length > 0) {
				const filesToDelete = existingFiles.map(
					file => `${userId}/${file.name}`
				)
				const { error: deleteError } = await supabase.storage
					.from(bucketName)
					.remove(filesToDelete)

				if (deleteError) {
					console.error('Error deleting old files:', deleteError)
					throw deleteError
				}
			}

			// 3. Upload new file with a clean name and metadata
			const folderName = formData.full_name.replace(/\s+/g, '_')
			const fileExt = file.name.split('.').pop()
			const fileName = `${folderName}/${userId}-${Date.now()}${fileExt}`

			const { error: uploadError } = await supabase.storage
				.from(bucketName)
				.upload(fileName, file, {
					cacheControl: '3600',
					upsert: true,
					contentType: file.type,
					duplex: 'half',
					metadata: fileMetadata,
				})

			if (uploadError) throw uploadError

			// 4. Get the public URL
			const { data: publicUrlData } = supabase.storage
				.from(bucketName)
				.getPublicUrl(fileName)

			if (!publicUrlData?.publicUrl) {
				throw new Error('Не вдалося отримати публічний URL')
			}

			// 5. Update profile in database
			const table =
				profileType === 'partner' ? 'partner_profiles' : 'user_profiles'
			const { error: updateError } = await supabase
				.from(table)
				.update({
					profile_image: publicUrlData.publicUrl,
					updated_at: new Date().toISOString(),
				})
				.eq('user_id', userId)

			if (updateError) throw updateError

			// 6. Update local state
			setProfileImage(publicUrlData.publicUrl)
			toast.success('Фото профілю успішно оновлено!')
		} catch (error) {
			console.error('Помилка при завантаженні фото профілю:', error)
			toast.error(
				error instanceof Error ? error.message : 'Помилка завантаження фото'
			)
		} finally {
			setImageLoading(false)
		}
	}

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
		<div className=' bg-black p-0 sm:p-16'>
			<main className='max-w-[1440px] mx-auto px-4 py-6'>
				<Card className='bg-[#1C1E22] border-0 rounded-xl mb-4'>
					<div className='p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4'>
						<div className='flex items-center flex-col sm:flex-row gap-5 sm:gap-4'>
							<div className='relative'>
								<div className='w-20 h-20 rounded-full bg-[#2C2F36] flex items-center justify-center overflow-hidden'>
									{previewImage ? (
										<motion.img
											src={previewImage}
											alt='Preview'
											className='w-full h-full rounded-full object-cover'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.3 }}
										/>
									) : (
										<img
											src={profileImage || '/dashboard/user.svg'}
											alt='Profile'
											className='w-full h-full rounded-full object-cover'
										/>
									)}
								</div>
								<div className='absolute -bottom-3 right-0 bg-[#2C2F36] w-8 h-8 rounded-full hover:bg-[#444B55]'>
									<label
										htmlFor='upload-profile-image'
										className='cursor-pointer  text-sm text-white '
									>
										<Image
											src={'/dashboard/icon-edit.svg'}
											alt='Edit Profile'
											width={28}
											height={28}
											className='absolute bottom-0 right-[1px]'
										/>
									</label>
									<input
										id='upload-profile-image'
										type='file'
										accept='image/*'
										className='hidden'
										onChange={handleImageUpload}
										disabled={imageLoading}
									/>
								</div>
							</div>
							<div>
								<div className='flex flex-col sm:flex-row gap-4 sm:gap-12'>
									<div className='flex flex-col sm:flex-row gap-1 sm:gap-8'>
										<div className='block items-center'>
											<h2 className='text-[#fff] text-base text-center  sm:text-left font-normal mb-1'>
												{profileType === 'user'
													? (formData as UserProfile).full_name
													: (formData as PartnerProfile).company_name ||
													  'Компанія'}
											</h2>
											<FaShareAlt className='text-[#fff]' />
										</div>
										<div className='block items-center'>
											<div className='text-[#6D7380] text-xs mr-2'>UID:</div>
											<div className='text-[#fff] text-md'>
												{profile.user_id}
											</div>
										</div>
										<div className='block items-center'>
											<div className='text-[#6D7380] text-xs mr-2'>
												Рахунок:
											</div>
											<div className='text-[#fff] text-md'>497994402</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Card>

				<Card className='bg-[#1C1E22] border-0 rounded-xl'>
					<div className='p-4 md:p-6'>
						<h3 className='text-[#fff] text-base font-normal mb-6'>
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
