'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import DevelopModal from '../ui/DevelopModal/DevelopModal'

const Footer = () => {
	const t = useTranslations('footer')
	const [showDev, setShowDev] = useState(false)

	const footerSections = [
		{
			title: t('sections.gettingStarted.title'),
			links: [
				{ text: t('sections.gettingStarted.freePlans'), href: '' },
				{ text: t('sections.gettingStarted.forBusiness'), href: '' },
				{ text: t('sections.gettingStarted.forBlogger'), href: '' },
				{ text: t('sections.gettingStarted.forMedia'), href: '' },
				{ text: t('sections.gettingStarted.getRecommendation'), href: '' },
				{ text: t('sections.gettingStarted.demoRequest'), href: '' },
				{ text: t('sections.gettingStarted.contactSales'), href: '' },
			],
		},
		{
			title: t('sections.solutions.title'),
			links: [
				{ text: t('sections.solutions.applicationServices'), href: '' },
				{ text: t('sections.solutions.networkServices'), href: '' },
				{ text: t('sections.solutions.developerServices'), href: '' },
				{ text: t('sections.solutions.softwareDevelopment'), href: '' },
				{ text: t('sections.solutions.cashback'), href: '' },
				{ text: t('sections.solutions.crmSystems'), href: '' },
				{ text: t('sections.solutions.legalServices'), href: '' },
				{ text: t('sections.solutions.accountingServices'), href: '' },
			],
		},
		{
			title: t('sections.community.title'),
			links: [
				{ text: t('sections.community.communityCenter'), href: '' },
				{ text: t('sections.community.nomoProject'), href: '' },
				{ text: t('sections.community.newBitcoin'), href: '' },
				{ text: t('sections.community.nInvest'), href: '' },
			],
		},
		{
			title: t('sections.support.title'),
			links: [
				{ text: t('sections.support.supportCenter'), href: '' },
				{ text: t('sections.support.trustAndSafety'), href: '' },
			],
		},
		{
			title: t('sections.company.title'),
			links: [
				{ text: t('sections.company.aboutCompany'), href: '' },
				{ text: t('sections.company.ourTeam'), href: '/team' },
				{ text: t('sections.company.investorRelations'), href: '' },
				{ text: t('sections.company.career'), href: '' },
				{ text: t('sections.company.diversity'), href: '' },
				{ text: t('sections.company.networkMap'), href: '' },
				{ text: t('sections.company.becomePartner'), href: '' },
			],
		},
	]

	const socialLinks = [
		{ icon: '/footer/instagram.svg', href: '', alt: t('altInstagram') },
		{ icon: '/footer/telegram.svg', href: '', alt: t('altTelegram') },
		{ icon: '/footer/facebook.svg', href: '', alt: t('altFacebook') },
		{ icon: '/footer/x.svg', href: '', alt: t('altX') },
	]

	const openDevelopModal = () => {
		setShowDev(true)
	}

	return (
		<>
			<footer className='bg-[#000000] text-[#fff] pt-16 pb-8'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16 mx-auto'>
						{footerSections.map(section => (
							<div key={section.title}>
								<h3 className='text-[24px] font-semibold mb-4'>
									{section.title}
								</h3>
								<ul className='space-y-2'>
									{section.links.map(link => (
										<li key={link.text}>
											<Link
												key={link.text}
												onClick={e => {
													if (!link.href) {
														e.preventDefault() // предотвращаем переход по пустому href
														openDevelopModal()
													}
												}}
												href={link.href || '#'}
												className='text-[fff] hover:text-accent transition-all text-[18px] font-normal'
											>
												{link.text}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}

						<div className='flex space-x-4'>
							{socialLinks.map(social => (
								<Link
									key={social.alt}
									onClick={e => {
										if (!social.href) {
											e.preventDefault() // предотвращаем переход по пустому href
											openDevelopModal()
										}
									}}
									href={social.href || '#'}
									className='hover:opacity-80 transition-opacity'
								>
									<Image
										src={social.icon || '/placeholder.svg'}
										alt={social.alt}
										width={50}
										height={50}
										className='w-[50px] h-[50px]'
									/>
								</Link>
							))}
						</div>
					</div>

					<div className='pt-8'>
						<div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
							<div className='flex flex-wrap justify-center items-center mx-auto gap-5 text-[16px] text-[#fff]'>
								<span>©2025BlockN, Inc.</span>
								<div className='w-[25px] h-[1px] rotate-90 bg-[#fff]' />
								<Link
									href='/privacy-policy'
									className='hover:text-accent transition-colors'
								>
									{t('legal.privacyPolicy')}
								</Link>
								<div className='w-[25px] h-[1px] rotate-90 bg-[#fff]' />

								<Link
									href='/terms-of-use'
									className='hover:text-accent transition-colors'
								>
									{t('legal.termsOfUse')}
								</Link>
								<div className='w-[25px] h-[1px] rotate-90 bg-[#fff]' />

								<Link
									href=''
									className='flex justify-center items-center gap-[14px] hover:text-accent transition-colors'
									onClick={openDevelopModal}
								>
									<Image
										src={'/footer/cookies.svg'}
										alt={'Cookies'}
										width={34}
										height={17}
										className='w-[34px] h-[17px]'
									/>
									{t('legal.cookieSettings')}
								</Link>
								<div className='w-[25px] h-[1px] rotate-90 bg-[#fff]' />

								<Link
									href=''
									className='hover:text-accent transition-colors'
									onClick={openDevelopModal}
								>
									{t('legal.trademark')}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</footer>

			<DevelopModal isOpen={showDev} onClose={() => setShowDev(false)} />
		</>
	)
}

export default Footer
