'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import {
	uploadCompanyImage,
	createCompany,
	updateCompany,
} from '@/app/actions/companies'
import { CompanyFormData } from '@/types/company'
// import { toast } from 'sonner'
import {
	MapPin,
	Phone,
	Mail,
	Save,
	X,
	Plus,
	Minus,
	Upload,
	Slash,
	Clock,
	Shield,
	Map,
	Space,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { createClient } from '@/lib/supabase/client'
import { getStorageUrl } from '@/lib/supabase/storage'

export default function CompanyEditForm({
	params,
}: {
	params?: { id?: string }
}) {
	const [loading, setLoading] = useState(false)
	const [activeTab, setActiveTab] = useState('about')
	const [isCatalogueEnabled, setIsCatalogueEnabled] = useState(false)
	const [company, setCompany] = useState<CompanyFormData>({
		name: '',
		description: '',
		logo_url: '',
		banner_url: '',
		is_active: true,
		location: '',
		rating: 0,
		review_count: 0,
		advantages: [],
		cashback: 0,
		promocode: '',
		contacts: {
			address: '',
			phone: '',
			email: '',
		},
	})

	const router = useRouter()
	const isEditing = !!params?.id
	const bannerUrl = getStorageUrl(company.banner_url)
	const logoUrl = getStorageUrl(company.logo_url)

	useEffect(() => {
		if (isEditing) {
			const fetchCompany = async () => {
				try {
					const supabase = createClient()
					const { data, error } = await supabase
						.from('companies')
						.select('*')
						.eq('id', params.id)
						.single()

					if (error) throw error
					setCompany(data)
					setIsCatalogueEnabled(!!data.catalogue_enabled)
				} catch (error) {
					console.error('Error fetching company:', error)
					// toast.error('Error loading company data')
				}
			}

			fetchCompany()
		}
	}, [isEditing, params?.id])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setCompany(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setCompany(prev => ({
			...prev,
			contacts: {
				...prev.contacts,
				[name]: value,
			},
		}))
	}

	const handleUploadClick = (inputId: string) => {
		const input = document.getElementById(inputId)
		if (input) {
			input.click()
		}
	}

	// const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const { name, files } = e.target
	// 	if (files && files[0]) {
	// 		try {
	// 			setLoading(true)
	// 			const url = await uploadCompanyImage(
	// 				files[0],
	// 				`${name}/${Date.now()}-${files[0].name}`
	// 			)

	// 			setCompany(prev => ({
	// 				...prev,
	// 				[name]: url,
	// 			}))
	// 		} catch (error) {
	// 			console.error('Error uploading image:', error)
	// 			// toast.error('Failed to upload image')
	// 		} finally {
	// 			setLoading(false)
	// 		}
	// 	}
	// }

	// const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const { name, files } = e.target
	// 	if (files && files[0]) {
	// 		try {
	// 			setLoading(true)
	// 			const path = `${name}/${Date.now()}-${files[0].name}`
	// 			const url = await uploadCompanyImage(files[0], path)

	// 			if (url) {
	// 				setCompany(prev => ({
	// 					...prev,
	// 					[`${name}`]: path, // Store the path, not the full URL
	// 				}))
	// 			}
	// 		} catch (error) {
	// 			console.error('Error uploading image:', error)
	// 			// toast.error('Failed to upload image')
	// 		} finally {
	// 			setLoading(false)
	// 		}
	// 	}
	// }

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target
		if (files && files[0]) {
			try {
				setLoading(true)

				// Create a more reliable file path
				const fileExt = files[0].name.split('.').pop()
				const fileName = `${Date.now()}-${Math.random()
					.toString(36)
					.substring(7)}.${fileExt}`
				const filePath = `${name}/${fileName}`

				const url = await uploadCompanyImage(files[0], filePath)

				if (url) {
					setCompany(prev => ({
						...prev,
						[`${name}`]: filePath, // Store the path, not the full URL
					}))
				}
			} catch (error) {
				console.error('Error uploading image:', error)
				// toast.error('Failed to upload image')
			} finally {
				setLoading(false)
			}
		}
	}

	const handleAdvantageChange = (index: number, value: string) => {
		const newAdvantages = [...company.advantages]
		newAdvantages[index] = value
		setCompany(prev => ({
			...prev,
			advantages: newAdvantages,
		}))
	}

	// 	const iconComponents = [
	// 	clock: Clock,
	// 	shield: Shield,
	// 	map: Map,
	// 	spa: Space,
	// ]

	const addAdvantage = () => {
		setCompany(prev => ({
			...prev,
			advantages: [...prev.advantages, ''],
		}))
	}

	const removeAdvantage = (index: number) => {
		setCompany(prev => ({
			...prev,
			advantages: prev.advantages.filter((_, i) => i !== index),
		}))
	}

	const handleCatalogueToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsCatalogueEnabled(e.target.checked)
		setCompany(prev => ({
			...prev,
			catalogue_enabled: e.target.checked,
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		try {
			if (isEditing) {
				await updateCompany(params.id!, company)
				// toast.success('Company updated successfully')
			} else {
				await createCompany(company)
				// toast.success('Company created successfully')
			}

			router.push('/cashback')
		} catch (error) {
			console.error('Error saving company:', error)
			// toast.error('Failed to save company')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-[#1C1C1C] text-white'>
			{/* Hero Banner */}
			<div className='relative h-[400px] w-full'>
				<img
					src={bannerUrl ?? ''}
					alt={company.name}
					// fill
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#1C1C1C]'></div>
				<div className='absolute inset-0 flex flex-col justify-between p-4 md:p-6 max-w-[1400px]'>
					<Breadcrumb className='text-white'>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href='/'>Головна</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink href='/companies'>Компанії</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink className='text-accent' href='#'>
									{company.name}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
						<h2 className=' md:text-2xl font-bold text-white mt-2'>
							Карточка-превью Компанії
						</h2>
					</Breadcrumb>

					<div></div>
				</div>
			</div>

			{/* Company Info Header */}
			<div className='w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10 -mt-32'>
				<div className='bg-[#252525] rounded-xl p-6 shadow-lg'>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
						<div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
							<div className='relative w-[120px] h-[120px]'>
								{company.logo_url ? (
									<img
										src={logoUrl ?? ''}
										alt={company.name}
										// fill
										className='rounded-full border-4 border-white shadow-md object-cover'
									/>
								) : (
									<div className='w-full h-full rounded-full border-4 border-white shadow-md bg-gray-300 flex items-center justify-center'>
										<Upload className='w-8 h-8 text-gray-500' />
									</div>
								)}
							</div>
							<div>
								<Input
									id='name'
									name='name'
									value={company.name}
									onChange={handleChange}
									className='text-3xl font-bold mb-2 bg-[#303030] border-none'
									required
								/>
							</div>
						</div>
					</div>
				</div>

				<div className='flex justify-between items-center gap-6 mt-8 border-b border-gray-700'>
					<div className='flex gap-6'>
						<button
							onClick={() => setActiveTab('about')}
							className={cn(
								'pb-4 px-2 transition-colors',
								activeTab === 'about'
									? 'border-b-2 border-orange-500 text-white'
									: 'text-gray-400 hover:text-gray-300'
							)}
						>
							Про Компанію
						</button>
						<button
							onClick={() => setActiveTab('catalog')}
							className={cn(
								'pb-4 px-2 transition-colors',
								activeTab === 'catalog'
									? 'border-b-2 border-orange-500 text-white'
									: 'text-gray-400 hover:text-gray-300'
							)}
						>
							Каталог
						</button>
					</div>
				</div>

				{/* Edit Form */}
				{/* Edit Form */}
				<form
					onSubmit={handleSubmit}
					className='space-y-8 pt-10 max-w-4xl mx-auto'
				>
					<div className=' rounded-lg p-6 transition-all duration-300 '>
						<div className='flex items-center gap-4'>
							<input
								type='checkbox'
								id='catalogue'
								checked={isCatalogueEnabled}
								onChange={handleCatalogueToggle}
								className='w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
							/>
							<label htmlFor='catalogue' className='text-lg text-gray-300'>
								Enable Catalogue Function
							</label>
						</div>
						{isCatalogueEnabled && (
							<p className='text-gray-400 mt-2'>
								The catalogue functionality is now enabled. You can use it to
								manage your product or service listings.
							</p>
						)}
					</div>

					{/* Description */}
					<div className='bg-[#252525] rounded-lg p-6  shadow-md transition-all duration-300 hover:shadow-lg'>
						<Label
							htmlFor='description'
							className='text-xl font-bold mb-4 block'
						>
							Description
						</Label>
						<Textarea
							id='description'
							name='description'
							value={company.description ?? ''}
							onChange={handleChange}
							className='w-full bg-[#303030] border-none text-gray-300 leading-relaxed hover:bg-[#3a3a3a] transition-colors duration-200'
							rows={6}
							required
						/>
					</div>

					{/* Avatar and Background Image */}
					<div className='rounded-xl p-6 flex flex-col md:flex-row gap-6'>
						<div className='flex-1 flex flex-col mb-6 md:mb-0'>
							<Label htmlFor='logo_url' className='block mb-2'>
								Avatar
							</Label>
							<div
								className='relative w-full h-60 rounded-xl bg-[#303030] flex items-center justify-center overflow-hidden cursor-pointer'
								onClick={() => handleUploadClick('logo_url')}
							>
								<Input
									id='logo_url'
									name='logo_url'
									type='file'
									onChange={handleFileChange}
									className='hidden'
									accept='image/*'
								/>
								{company.logo_url ? (
									<img
										src={logoUrl ?? ''}
										alt='Company Avatar'
										// layout='fill'
										// objectFit='cover'
										className='object-cover'
									/>
								) : (
									<div className='flex flex-col items-center'>
										<Upload className='w-12 h-12 text-gray-400 mb-2' />
										<span className='text-gray-400 text-sm'>Upload Avatar</span>
									</div>
								)}
							</div>
						</div>

						<div className='flex-1 flex flex-col'>
							<Label htmlFor='banner_url' className='block mb-2'>
								Background Image
							</Label>
							<div
								className='relative w-full h-60 rounded-xl bg-[#303030] flex items-center justify-center overflow-hidden cursor-pointer'
								onClick={() => handleUploadClick('banner_url')}
							>
								<Input
									id='banner_url'
									name='banner_url'
									type='file'
									onChange={handleFileChange}
									className='hidden'
									accept='image/*'
								/>
								{company.banner_url ? (
									<img
										src={bannerUrl ?? ''}
										alt='Company Banner'
										// layout='fill'
										// objectFit='cover'
										className='object-cover'
									/>
								) : (
									<div className='flex flex-col items-center'>
										<Upload className='w-12 h-12 text-gray-400 mb-2' />
										<span className='text-gray-400 text-sm'>
											Upload Background
										</span>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Your Advantages */}
					<div className='bg-[#252525] rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg'>
						<h2 className='text-xl font-bold mb-4'>Your Advantages</h2>
						{company.advantages.map((advantage, index) => (
							<div key={index} className='flex items-center gap-3 mb-4'>
								<Input
									value={advantage}
									onChange={e => handleAdvantageChange(index, e.target.value)}
									className='bg-[#303030] border-none flex-grow p-3 text-lg focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:bg-[#3a3a3a] transition-colors duration-200'
									placeholder={`Advantage ${index + 1}`}
								/>
								<Button
									type='button'
									onClick={() => removeAdvantage(index)}
									className='bg-red-500 hover:bg-red-600 p-3 transition-all duration-300'
								>
									<Minus className='h-5 w-5' />
								</Button>
							</div>
						))}
						<Button
							type='button'
							onClick={addAdvantage}
							className='mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center'
						>
							<Plus className='h-5 w-5 mr-2' />
							Add Advantage
						</Button>
					</div>

					{/* Cashback and Promocode */}
					<div className='bg-[#252525] rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div>
								<Label htmlFor='cashback' className='block mb-2'>
									Cashback for Clients (%)
								</Label>
								<Input
									id='cashback'
									name='cashback'
									type='number'
									min='0'
									max='100'
									value={company.cashback}
									onChange={handleChange}
									className='bg-[#303030] border-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:bg-[#3a3a3a] transition-colors duration-200'
									required
								/>
							</div>
							<div>
								<Label htmlFor='promocode' className='block mb-2'>
									Create Promocode
								</Label>
								<Input
									id='promocode'
									name='promocode'
									value={company.promocode ?? ''}
									onChange={handleChange}
									className='bg-[#303030] border-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:bg-[#3a3a3a] transition-colors duration-200'
									required
								/>
							</div>
						</div>
					</div>

					{/* Contacts for Clients */}
					<div className='bg-[#252525] rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg'>
						<h2 className='text-xl font-bold mb-6'>Contacts for Clients</h2>
						<div className='space-y-4'>
							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 bg-[#303030] flex items-center justify-center rounded-full'>
									<MapPin className='w-5 h-5 text-orange-500' />
								</div>
								<Input
									id='address'
									name='address'
									value={company.contacts.address}
									onChange={handleContactChange}
									className='bg-[#303030] border-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:bg-[#3a3a3a] transition-colors duration-200'
									required
								/>
							</div>
							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 bg-[#303030] flex items-center justify-center rounded-full'>
									<Phone className='w-5 h-5 text-orange-500' />
								</div>
								<Input
									id='phone'
									name='phone'
									value={company.contacts.phone}
									onChange={handleContactChange}
									className='bg-[#303030] border-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:bg-[#3a3a3a] transition-colors duration-200'
									required
								/>
							</div>
							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 bg-[#303030] flex items-center justify-center rounded-full'>
									<Mail className='w-5 h-5 text-orange-500' />
								</div>
								<Input
									id='email'
									name='email'
									type='email'
									value={company.contacts.email}
									onChange={handleContactChange}
									className='bg-[#303030] border-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:bg-[#3a3a3a] transition-colors duration-200'
									required
								/>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col sm:flex-row justify-end gap-4'>
						<Button
							type='button'
							onClick={() => router.back()}
							className='bg-[#303030] hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-[#3a3a3a] transition-colors duration-200'
						>
							<X className='h-5 w-5 mr-2' />
							Cancel
						</Button>
						<Button
							type='submit'
							className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-[#3a3a3a] transition-colors duration-200'
						>
							<Save className='h-5 w-5 mr-2' />
							Save Changes
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
