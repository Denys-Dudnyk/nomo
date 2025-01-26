'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Pencil } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import type { Company, CompanyFormData } from '@/types/company' // Adjust the import path as needed
import { getStorageUrl } from '@/lib/supabase/storage'

interface CompanySettingsFormProps {
	company: Company
}

export default function CompanySettingsForm({
	company,
}: CompanySettingsFormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState<CompanyFormData>({
		name: company.name,
		description: company.description,
		logo_url: company.logo_url,
		banner_url: company.banner_url,
		is_active: company.is_active,
		location: company.location,
		rating: company.rating,
		review_count: company.review_count,
		advantages: company.advantages,
		cashback: company.cashback,
		promocode: company.promocode,
		contacts: company.contacts,
		// New fields
		short_name: company.short_name || null,
		business_category: company.business_category || null,
		legal_address: company.legal_address || null,
		physical_address: company.physical_address || null,
		edrpou: company.edrpou || null,
		tax_scheme: company.tax_scheme || null,
		tax_group: company.tax_group || null,
		certificate: company.certificate || null,
		vat_enabled: company.vat_enabled || false,
		base_discount: company.base_discount || 0,
		additional_discount: company.additional_discount || 0,
		bonus_discount: company.bonus_discount || 0,
		catalogue_enabled: company.catalogue_enabled || false,
	})

	const handleChange = (field: keyof CompanyFormData, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleCancel = () => {
		router.back()
	}

	const handleSubmit = async () => {
		setLoading(true)
		try {
			const supabase = createClient()

			// Prepare the update data
			const updateData: Partial<CompanyFormData> = {
				name: formData.name,
				description: formData.description,
				contacts: {
					phone: formData.contacts.phone,
					email: formData.contacts.email,
					address: formData.contacts.address,
				},
				short_name: formData.short_name,
				business_category: formData.business_category,
				legal_address: formData.legal_address,
				physical_address: formData.physical_address,
				edrpou: formData.edrpou,
				tax_scheme: formData.tax_scheme,
				tax_group: formData.tax_group,
				certificate: formData.certificate,
				vat_enabled: formData.vat_enabled,
				base_discount: formData.base_discount,
				additional_discount: formData.additional_discount,
				bonus_discount: formData.bonus_discount,
				catalogue_enabled: formData.catalogue_enabled,
			}

			const { error } = await supabase
				.from('companies')
				.update(updateData)
				.eq('id', company.id)

			if (error) throw error

			toast.success('Налаштування збережено')
			router.refresh()
		} catch (error) {
			console.error('Error updating company:', error)
			toast.error('Помилка при збереженні налаштувань')
		} finally {
			setLoading(false)
		}
	}

	const logoUrl = getStorageUrl(formData.logo_url)

	return (
		<div className='min-h-screen bg-[#1A1A1A] text-white p-6 sm:p-8 md:p-10'>
			<div className='max-w-6xl mx-auto space-y-4 sm:space-y-6'>
				{/* Breadcrumb */}
				<div className='flex items-center gap-1 text-xs sm:text-sm text-gray-400'>
					<span>Мій кабінет</span>
					<span>/</span>
					<span className='text-[#FF6B00]'>Керування Компанією</span>
				</div>

				<h1 className='text-lg sm:text-xl font-medium mb-4 sm:mb-8'>
					Налаштування облікового запису Компанії
				</h1>

				<div className='space-y-4 sm:space-y-6'>
					{/* Company Logo and Name */}
					<div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8'>
						<div className='relative'>
							<div className='w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-lg flex items-center justify-center'>
								<div className='relative'>
									{formData.logo_url ? (
										<img
											src={logoUrl || '/placeholder.svg'}
											alt={formData.name}
											className='w-[120px] max-w-[120px] h-[120px] max-h-[120px] sm:w-40 sm:h-40 rounded-full object-cover'
										/>
									) : (
										<div className='w-[120px] h-[120px] sm:w-40 sm:h-40 rounded-full bg-[#333333] flex items-center justify-center text-3xl sm:text-4xl font-bold'>
											{formData.name.charAt(0)}
										</div>
									)}
									<button className='absolute -bottom-2 -right-2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2A2A2A] flex items-center justify-center border border-[#333333]'>
										<Pencil className='w-6 h-6 sm:w-8 sm:h-8' />
									</button>
								</div>
							</div>
						</div>

						<div className='flex-1 text-center sm:text-left'>
							<h2 className='text-base sm:text-lg mb-3 sm:mb-4'>
								{formData.name}
							</h2>
							<div className='flex flex-wrap justify-center sm:justify-start gap-2'>
								<button className='px-4 sm:px-6 py-2 bg-[#2A2A2A] rounded text-xs sm:text-sm'>
									API Інтеграція
								</button>
								<Button
									onClick={() =>
										router.push(
											`/dashboard/companies/${company.id}/transactions`
										)
									}
									className='px-4 sm:px-6 py-2 bg-[#FF6B00] rounded text-xs sm:text-sm'
								>
									Транзакції Користувача
								</Button>
							</div>
						</div>
					</div>

					{/* Form Sections */}
					<div className='space-y-6 sm:space-y-8'>
						{/* Company Information */}
						<section>
							<h3 className='text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4'>
								Інформація Про Компанію
							</h3>
							<div className='space-y-3'>
								<Input
									placeholder='Номер Телефону'
									value={formData.contacts.phone}
									onChange={e =>
										handleChange('contacts', {
											...formData.contacts,
											phone: e.target.value,
										})
									}
									className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm'
								/>
								<Input
									type='email'
									placeholder='Email'
									value={formData.contacts.email}
									onChange={e =>
										handleChange('contacts', {
											...formData.contacts,
											email: e.target.value,
										})
									}
									className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm'
								/>
								<Input
									placeholder='Адреса'
									value={formData.contacts.address}
									onChange={e =>
										handleChange('contacts', {
											...formData.contacts,
											address: e.target.value,
										})
									}
									className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm'
								/>
							</div>
						</section>

						{/* Additional Information */}
						<section>
							<h3 className='text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4'>
								Додатково
							</h3>
							<div className='space-y-3'>
								<Input
									placeholder='Коротка Назва Компанії'
									value={formData.short_name || ''}
									onChange={e => handleChange('short_name', e.target.value)}
									className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm'
								/>
								<Input
									placeholder='Повна Назва Компанії'
									value={formData.name}
									onChange={e => handleChange('name', e.target.value)}
									className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm'
								/>
								<Select
									value={formData.business_category || ''}
									onValueChange={value =>
										handleChange('business_category', value)
									}
								>
									<SelectTrigger className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-gray-400 rounded-sm'>
										<SelectValue placeholder='Категорія Бізнесу' />
									</SelectTrigger>
									<SelectContent className='bg-[#2A2A2A] border-[#333333] rounded-sm'>
										<SelectItem value='retail'>Роздрібна торгівля</SelectItem>
										<SelectItem value='wholesale'>Оптова торгівля</SelectItem>
										<SelectItem value='services'>Послуги</SelectItem>
									</SelectContent>
								</Select>
								<Input
									placeholder='Юридична Адреса'
									value={formData.legal_address || ''}
									onChange={e => handleChange('legal_address', e.target.value)}
									className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm'
								/>
								<Input
									placeholder='Фізична Адреса'
									value={formData.physical_address || ''}
									onChange={e =>
										handleChange('physical_address', e.target.value)
									}
									className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm'
								/>
								<Input
									placeholder='ЄДРПОУ'
									value={formData.edrpou || ''}
									onChange={e => handleChange('edrpou', e.target.value)}
									className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm'
								/>
								<Select
									value={formData.tax_scheme || ''}
									onValueChange={value => handleChange('tax_scheme', value)}
								>
									<SelectTrigger className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-gray-400 rounded-sm'>
										<SelectValue placeholder='Схема Оподаткування' />
									</SelectTrigger>
									<SelectContent className='bg-[#2A2A2A] border-[#333333] rounded-sm'>
										<SelectItem value='scheme1'>Схема 1</SelectItem>
										<SelectItem value='scheme2'>Схема 2</SelectItem>
									</SelectContent>
								</Select>
								<Select
									value={formData.tax_group || ''}
									onValueChange={value => handleChange('tax_group', value)}
								>
									<SelectTrigger className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-gray-400 rounded-sm'>
										<SelectValue placeholder='Група Оподаткування' />
									</SelectTrigger>
									<SelectContent className='bg-[#2A2A2A] border-[#333333] rounded-sm'>
										<SelectItem value='group1'>Група 1</SelectItem>
										<SelectItem value='group2'>Група 2</SelectItem>
									</SelectContent>
								</Select>
								<Input
									placeholder='Свідоцтво'
									value={formData.certificate || ''}
									onChange={e => handleChange('certificate', e.target.value)}
									className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm'
								/>
								<Select
									value={formData.vat_enabled ? 'yes' : 'no'}
									onValueChange={value =>
										handleChange('vat_enabled', value === 'yes')
									}
								>
									<SelectTrigger className='w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-gray-400 rounded-sm'>
										<SelectValue placeholder='ПДВ' />
									</SelectTrigger>
									<SelectContent className='bg-[#2A2A2A] border-[#333333] rounded-sm'>
										<SelectItem value='yes'>Так</SelectItem>
										<SelectItem value='no'>Ні</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</section>

						{/* Partner Discount */}
						<section>
							<h3 className='text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4'>
								Партнерська Знижка
							</h3>
							<div className='space-y-3'>
								<div className='flex items-center gap-4'>
									<div className='flex-1 bg-accent h-10 sm:h-12 flex items-center px-3 rounded-sm'>
										<span className='text-sm sm:text-base text-white'>
											Повна %
										</span>
									</div>
									<Input
										type='number'
										value={formData.base_discount || 0}
										onChange={e =>
											handleChange(
												'base_discount',
												Number.parseFloat(e.target.value)
											)
										}
										className='w-24 bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-[#FF6B00] text-right'
										min='0'
										max='100'
										step='0.01'
									/>
									<span className='text-[#FF6B00] w-4'>%</span>
								</div>
								<div className='flex items-center gap-4'>
									<div className='flex-1 bg-accent h-10 sm:h-12 flex items-center px-3 rounded-sm'>
										<span className='text-sm sm:text-base text-white'>
											Кліентський %
										</span>
									</div>
									<Input
										type='number'
										value={formData.additional_discount || 0}
										onChange={e =>
											handleChange(
												'additional_discount',
												Number.parseFloat(e.target.value)
											)
										}
										className='w-24 bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-[#FF6B00] text-right'
										min='0'
										max='100'
										step='0.01'
									/>
									<span className='text-[#FF6B00] w-4'>%</span>
								</div>
								<div className='flex items-center gap-4'>
									<div className='flex-1 bg-accent h-10 sm:h-12 flex items-center px-3 rounded-sm'>
										<span className='text-sm sm:text-base text-white'>
											Наш %
										</span>
									</div>
									<Input
										type='number'
										value={formData.bonus_discount || 0}
										onChange={e =>
											handleChange(
												'bonus_discount',
												Number.parseFloat(e.target.value)
											)
										}
										className='w-24 bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-[#FF6B00] text-right'
										min='0'
										max='100'
										step='0.01'
									/>
									<span className='text-[#FF6B00] w-4'>%</span>
								</div>
							</div>
						</section>

						{/* Action Buttons */}
						<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
							<Button
								onClick={handleCancel}
								className='w-full sm:w-60 h-10 sm:h-12 bg-[#2A2A2A] hover:bg-[#333333] text-white border-0 text-sm sm:text-base'
							>
								Відмінити
							</Button>
							<Button
								onClick={handleSubmit}
								disabled={loading}
								className='w-full sm:w-60 h-10 sm:h-12 bg-accent hover:bg-[#FF7B1A] text-white border-0 text-sm sm:text-base'
							>
								{loading ? 'Збереження...' : 'Застосувати'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
