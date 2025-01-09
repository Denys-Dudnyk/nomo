// 'use client'

// import { useEffect, useState } from 'react'
// import { notFound } from 'next/navigation'
// import CompanyItem from './CompanyItem'
// import { Company } from '@/types/company'

// interface CompanyPageProps {
// 	id: string
// }

// async function getCompanyData(id: string): Promise<Company | null> {
// 	// Simulating an API call
// 	await new Promise(resolve => setTimeout(resolve, 1000))

// 	const companies: Record<string, Company> = {
// 		'1': {
// 			id: '1',
// 			name: 'Hyatt Regency',
// 			logoUrl: '/cashback/item.svg',
// 			bannerUrl: '/company/image.png',
// 			description:
// 				'Hyatt Regency - це готель класу люкс, який пропонує високоякісні послуги та комфортне проживання. Наші номери обладнані всім необхідним для вашого комфортного перебування.',
// 			advantages: [
// 				{ icon: 'clock', text: 'Послуги 24/7' },
// 				{ icon: 'shield', text: 'Захищеність з оплати' },
// 				{ icon: 'map', text: 'Зручність доступу та бар' },
// 				{ icon: 'spa', text: 'Spa & Оздоровлення' },
// 			],
// 			contacts: {
// 				address: 'вулиці Володимирська, 24, Київ',
// 				phone: '+380661234567',
// 				email: 'kyiv@hyatt.com',
// 			},
// 			isActive: true,
// 		},
// 		'2': {
// 			id: '1',
// 			name: 'Hyatt Regency',
// 			logoUrl: '/cashback/item.svg',
// 			bannerUrl: '/company/image.png',
// 			description:
// 				'Hyatt Regency - це готель класу люкс, який пропонує високоякісні послуги та комфортне проживання. Наші номери обладнані всім необхідним для вашого комфортного перебування.',
// 			advantages: [
// 				{ icon: 'clock', text: 'Послуги 24/7' },
// 				{ icon: 'shield', text: 'Захищеність з оплати' },
// 				{ icon: 'map', text: 'Зручність доступу та бар' },
// 				{ icon: 'spa', text: 'Spa & Оздоровлення' },
// 			],
// 			contacts: {
// 				address: 'вулиці Володимирська, 24, Київ',
// 				phone: '+380661234567',
// 				email: 'kyiv@hyatt.com',
// 			},
// 			isActive: true,
// 		},
// 		'3': {
// 			id: '1',
// 			name: 'Hyatt Regency',
// 			logoUrl: '/cashback/item.svg',
// 			bannerUrl: '/company/image.png',
// 			description:
// 				'Hyatt Regency - це готель класу люкс, який пропонує високоякісні послуги та комфортне проживання. Наші номери обладнані всім необхідним для вашого комфортного перебування.',
// 			advantages: [
// 				{ icon: 'clock', text: 'Послуги 24/7' },
// 				{ icon: 'shield', text: 'Захищеність з оплати' },
// 				{ icon: 'map', text: 'Зручність доступу та бар' },
// 				{ icon: 'spa', text: 'Spa & Оздоровлення' },
// 			],
// 			contacts: {
// 				address: 'вулиці Володимирська, 24, Київ',
// 				phone: '+380661234567',
// 				email: 'kyiv@hyatt.com',
// 			},
// 			isActive: true,
// 		},
// 		'4': {
// 			id: '1',
// 			name: 'Hyatt Regency',
// 			logoUrl: '/cashback/item.svg',
// 			bannerUrl: '/company/image.png',
// 			description:
// 				'Hyatt Regency - це готель класу люкс, який пропонує високоякісні послуги та комфортне проживання. Наші номери обладнані всім необхідним для вашого комфортного перебування.',
// 			advantages: [
// 				{ icon: 'clock', text: 'Послуги 24/7' },
// 				{ icon: 'shield', text: 'Захищеність з оплати' },
// 				{ icon: 'map', text: 'Зручність доступу та бар' },
// 				{ icon: 'spa', text: 'Spa & Оздоровлення' },
// 			],
// 			contacts: {
// 				address: 'вулиці Володимирська, 24, Київ',
// 				phone: '+380661234567',
// 				email: 'kyiv@hyatt.com',
// 			},
// 			isActive: true,
// 		},
// 		'5': {
// 			id: '1',
// 			name: 'Hyatt Regency',
// 			logoUrl: '/cashback/item.svg',
// 			bannerUrl: '/company/image.png',
// 			description:
// 				'Hyatt Regency - це готель класу люкс, який пропонує високоякісні послуги та комфортне проживання. Наші номери обладнані всім необхідним для вашого комфортного перебування.',
// 			advantages: [
// 				{ icon: 'clock', text: 'Послуги 24/7' },
// 				{ icon: 'shield', text: 'Захищеність з оплати' },
// 				{ icon: 'map', text: 'Зручність доступу та бар' },
// 				{ icon: 'spa', text: 'Spa & Оздоровлення' },
// 			],
// 			contacts: {
// 				address: 'вулиці Володимирська, 24, Київ',
// 				phone: '+380661234567',
// 				email: 'kyiv@hyatt.com',
// 			},
// 			isActive: true,
// 		},
// 		'6': {
// 			id: '1',
// 			name: 'Hyatt Regency',
// 			logoUrl: '/cashback/item.svg',
// 			bannerUrl: '/company/image.png',
// 			description:
// 				'Hyatt Regency - це готель класу люкс, який пропонує високоякісні послуги та комфортне проживання. Наші номери обладнані всім необхідним для вашого комфортного перебування.',
// 			advantages: [
// 				{ icon: 'clock', text: 'Послуги 24/7' },
// 				{ icon: 'shield', text: 'Захищеність з оплати' },
// 				{ icon: 'map', text: 'Зручність доступу та бар' },
// 				{ icon: 'spa', text: 'Spa & Оздоровлення' },
// 			],
// 			contacts: {
// 				address: 'вулиці Володимирська, 24, Київ',
// 				phone: '+380661234567',
// 				email: 'kyiv@hyatt.com',
// 			},
// 			isActive: true,
// 		},
// 		'7': {
// 			id: '1',
// 			name: 'Hyatt Regency',
// 			logoUrl: '/cashback/item.svg',
// 			bannerUrl: '/company/image.png',
// 			description:
// 				'Hyatt Regency - це готель класу люкс, який пропонує високоякісні послуги та комфортне проживання. Наші номери обладнані всім необхідним для вашого комфортного перебування.',
// 			advantages: [
// 				{ icon: 'clock', text: 'Послуги 24/7' },
// 				{ icon: 'shield', text: 'Захищеність з оплати' },
// 				{ icon: 'map', text: 'Зручність доступу та бар' },
// 				{ icon: 'spa', text: 'Spa & Оздоровлення' },
// 			],
// 			contacts: {
// 				address: 'вулиці Володимирська, 24, Київ',
// 				phone: '+380661234567',
// 				email: 'kyiv@hyatt.com',
// 			},
// 			isActive: true,
// 		},
// 		'8': {
// 			id: '1',
// 			name: 'Hyatt Regency',
// 			logoUrl: '/cashback/item.svg',
// 			bannerUrl: '/company/image.png',
// 			description:
// 				'Hyatt Regency - це готель класу люкс, який пропонує високоякісні послуги та комфортне проживання. Наші номери обладнані всім необхідним для вашого комфортного перебування.',
// 			advantages: [
// 				{ icon: 'clock', text: 'Послуги 24/7' },
// 				{ icon: 'shield', text: 'Захищеність з оплати' },
// 				{ icon: 'map', text: 'Зручність доступу та бар' },
// 				{ icon: 'spa', text: 'Spa & Оздоровлення' },
// 			],
// 			contacts: {
// 				address: 'вулиці Володимирська, 24, Київ',
// 				phone: '+380661234567',
// 				email: 'kyiv@hyatt.com',
// 			},
// 			isActive: true,
// 		},
// 	}

// 	return companies[id] || null
// }

// export default function CompanyPage({ id }: CompanyPageProps) {
// 	const [company, setCompany] = useState<Company | null>(null)
// 	const [loading, setLoading] = useState(true)

// 	useEffect(() => {
// 		const fetchCompany = async () => {
// 			const data = await getCompanyData(id)
// 			setCompany(data)
// 			setLoading(false)
// 		}

// 		fetchCompany()
// 	}, [id])

// 	if (loading) {
// 		return (
// 			<div className='min-h-screen bg-[#1C1C1C] text-white flex items-center justify-center'>
// 				Loading...
// 			</div>
// 		)
// 	}

// 	if (!company) {
// 		notFound()
// 	}

// 	return <CompanyItem company={company} />
// }
