'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
	MapPin,
	Phone,
	Mail,
	Clock,
	Map,
	Shield,
	SpadeIcon as Spa,
	Share2,
	BookmarkPlus,
	Barcode,
	Edit,
	QrCode,
	X,
	Star,
	Slash,
	LucideIcon,
	Building2,
	Wallet,
	Gift,
	Coffee,
	Pizza,
	Car,
	Plane,
	Hotel,
	ShoppingBag,
} from 'lucide-react'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Company } from '@/types/company'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getStorageUrl } from '@/lib/supabase/storage'
import { useIsAdmin } from '@/hooks/useIsAdmin'

interface CompanyItemProps {
	company: Company
}

const iconList: LucideIcon[] = [
	Clock,
	Shield,
	Map,
	Spa,
	Building2,
	Wallet,
	Gift,
	Star,
	Coffee,
	Pizza,
	Car,
	Plane,
	Hotel,
	ShoppingBag,
]
export default function CompanyItem({ company }: CompanyItemProps) {
	const [activeTab, setActiveTab] = useState('about')
	const [showQRCode, setShowQRCode] = useState(false)

	const toggleQRCode = () => setShowQRCode(!showQRCode)

	const router = useRouter()

	const handleEditClick = () => {
		router.push(`/company/${company.id}/edit`)
	}

	const bannerUrl = getStorageUrl(company.banner_url)
	const logoUrl = getStorageUrl(company.logo_url)
	const { isAdmin } = useIsAdmin()

	const getRandomIcon = () => {
		const randomIndex = Math.floor(Math.random() * iconList.length)
		return iconList[randomIndex]
	}

	return (
		<div className='min-h-screen bg-[#1C1C1C] text-white'>
			<div className='relative h-[200px] md:h-[400px] w-full'>
				<Image
					src={bannerUrl || '/placeholder.svg?height=400&width=1200'}
					alt={company.name}
					fill
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#1C1C1C]'></div>

				<div className='absolute inset-0 flex flex-col justify-between p-4 md:p-6'>
					<Breadcrumb className='text-white text-sm md:text-base'>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href='/' style={{ fontSize: '12px' }}>
									Головна
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink href='/companies' style={{ fontSize: '12px' }}>
									Компанії
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink
									className='text-accent'
									href='#'
									style={{ fontSize: '12px' }}
								>
									{company.name}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
						<h3 className=' md:text-2xl font-bold text-white mt-2'>
							Карточка-превью Компанії
						</h3>
					</Breadcrumb>

					<div></div>
				</div>
			</div>
			{/* Company Info Header */}
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 -mt-20 md:-mt-32'>
				<div className='bg-[#252525] rounded-xl p-6 shadow-lg'>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
						<div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
							<div className='relative'>
								<Image
									src={logoUrl ?? ''}
									alt={company.name}
									width={120}
									height={120}
									className='rounded-full border-4 border-white shadow-md'
								/>
								{company.is_active && (
									<span className='absolute bottom-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full'>
										Active
									</span>
								)}
							</div>
							<div>
								<h1 className='text-2xl md:text-3xl font-bold mb-2'>
									{company.name}
								</h1>
								<div className='flex items-center gap-4 text-sm text-gray-300'>
									<div className='flex items-center'>
										<MapPin className='w-4 h-4 mr-1' />
										{/* <span>{company.location}</span> */}
									</div>
									<div className='flex items-center'>
										<Star className='w-4 h-4 mr-1 text-yellow-400' />
										{/* <span>{company.rating} ({company.reviewCount} reviews)</span> */}
									</div>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex flex-wrap items-center gap-3'>
							<Button
								size='icon'
								className='w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white'
								onClick={toggleQRCode}
							>
								<QrCode className='h-5 w-5' />
							</Button>
							{isAdmin && (
								<Button
									size='icon'
									className='w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white'
									onClick={handleEditClick}
								>
									<Edit className='h-5 w-5' />
								</Button>
							)}

							<Button className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 w-full md:w-auto'>
								Contact Us
							</Button>
						</div>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className='flex flex-wrap justify-between items-center gap-6 mt-8 border-b border-gray-700'>
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
							About Company
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
							Catalog
						</button>
					</div>
					<div>
						<Button className='bg-gray-700 hover:bg-gray-600 text-white px-4 py-2'>
							My Promocode
						</Button>
					</div>
				</div>

				{/* Content */}
				<div className='py-8'>
					{activeTab === 'about' && (
						<div className='space-y-8 max-w-3xl'>
							{/* Description */}
							<p className='text-gray-300 leading-relaxed'>
								{company.description}
							</p>

							{/* Advantages */}
							<div className='bg-[#252525] rounded-xl p-6'>
								<h2 className='text-xl font-bold mb-6'>Advantages</h2>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
									{company.advantages.map((advantage, index) => {
										const IconComponent = getRandomIcon()
										return (
											<div key={index} className='flex items-center gap-3'>
												<div className='w-10 h-10 rounded-full bg-[#303030] flex items-center justify-center'>
													<IconComponent className='w-6 h-6 text-orange-500' />
												</div>
												<span>{advantage}</span>
											</div>
		
										)
									})}
								</div>
							</div>

							{/* Contacts */}
							<div className='bg-[#252525] rounded-xl p-6'>
								<h2 className='text-xl font-bold mb-6'>Contacts</h2>
								<div className='space-y-4'>
									{[
										{ icon: MapPin, value: company.contacts.address },
										{ icon: Phone, value: company.contacts.phone },
										{ icon: Mail, value: company.contacts.email },
									].map(({ icon: Icon, value }, index) => (
										<div key={index} className='flex items-center gap-3'>
											<div className='w-10 h-10 rounded-full bg-[#303030] flex items-center justify-center'>
												<Icon className='w-5 h-5 text-orange-500' />
											</div>
											<span>{value}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className='border-t border-gray-700 py-8 mt-8'>
					<div className='flex flex-wrap justify-between items-center gap-4'></div>
				</div>
			</div>

			{/* QR Code Modal */}
			{showQRCode && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-[#252525] p-8 rounded-xl relative'>
						<Button
							onClick={toggleQRCode}
							className='absolute top-2 right-2 text-gray-400 hover:text-white'
							variant='ghost'
							size='icon'
						>
							<X className='h-6 w-6' />
						</Button>
						<h2 className='text-xl font-bold mb-4'>QR Code</h2>
						<div className='bg-white p-4 rounded-lg'>
							<QrCode className='h-48 w-48 text-black' />
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
