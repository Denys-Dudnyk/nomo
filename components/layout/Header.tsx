'use client'

import Image from 'next/image'
import Navbar from '../ui/Navbar/Navbar'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import DevelopModal from '../ui/DevelopModal/DevelopModal'
import { useMediaQuery } from 'react-responsive'
import { Menu } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcher from '../ui/LanguageSwitcher/LocaleSwitcher'

const Header = () => {
	const navigation = usePathname()
	const router = useRouter()
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isResettingPassword, setIsResettingPassword] = useState(false)
	const supabase = createClient()

	const mainPage = navigation === '/' ? 'absolute' : ''
	const wePage = navigation === '/we' ? 'absolute' : ''
	const mainPageHeader = navigation === '/' ? 'bg-header' : 'bg-[#0f0f0f]'
	const wePageHeader = navigation === '/we' ? 'bg-header' : 'bg-[#0f0f0f]'
	const companiesHeader =
		navigation === '/dashboard/companies' ? 'bg-[#212121]' : 'bg-[#0f0f0f]'
	const usersHeader =
		navigation === '/dashboard/users' ? 'bg-[#212121]' : 'bg-[#0f0f0f]'

	const [showDev, setShowDev] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const isMobile = useMediaQuery({ maxWidth: 1024 })

	const isResetPasswordFlow =
		navigation === '/reset-password' || navigation === '/forgot-password'

	useEffect(() => {
		const checkAuthAndResetState = async () => {
			// Check if user is in reset password flow
			const isResetting = document.cookie.includes('resetting_password=true')
			setIsResettingPassword(isResetting)

			// Only check auth if not resetting password
			if (!isResetting) {
				const {
					data: { session },
				} = await supabase.auth.getSession()
				setIsAuthenticated(!!session)
			} else {
				setIsAuthenticated(false)
			}
		}

		checkAuthAndResetState()

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (!isResettingPassword) {
				setIsAuthenticated(!!session)
			}
		})

		return () => subscription.unsubscribe()
	}, [navigation])

	const handleLogout = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if (error) throw error

			// Force a router refresh to update the auth state
			router.refresh()
			// Redirect to home page
			router.push('/')
		} catch (error) {
			console.error('Error signing out:', error)
		}
	}

	const openDevelopModal = () => {
		setShowDev(true)
	}

	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (isResettingPassword) {
			e.preventDefault()
			router.push('/reset-password')
		}
	}
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	// const t = useTranslations('HomePage')
	const t = useTranslations('header')

	return (
		<>
			<header className={`${mainPage} ${wePage} w-full z-[3]`}>
				<div
					className={`flex justify-between items-center px-[33px] sm:px-[34px] md:px-10 lg:px-20 py-[14px] sm:py-[21px] ${mainPageHeader} ${wePageHeader} ${companiesHeader} ${usersHeader}`}
				>
					<div>
						<Link href={'/'}>
							<Image
								src={'/header/logo.svg'}
								alt='NomoCashback'
								width={82.5}
								height={83.5}
								className='w-[82.5px] h-[83.5px] sm:w-[82.5px] sm:h-[83.5px]'
							/>
						</Link>
					</div>
					{!isMobile && (
						<Navbar
							isResettingPassword={isResettingPassword}
							closeMenu={() => setIsMenuOpen(false)}
						/>
					)}
					<div className='flex items-center gap-[10px]'>
						{!isResettingPassword && isAuthenticated ? (
							<button
								onClick={handleLogout}
								className='bg-accent px-[30px] sm:px-[30px] py-[10px] sm:py-[10px] font-bold rounded-[40px] hover:bg-[#FFBF88] transition-colors   text-[17px] sm:text-[17px]'
							>
								{t('auth.logout')}
							</button>
						) : (
							<Link
								href={'/auth/login'}
								className='bg-accent px-[30px] sm:px-[30px] py-[10px] sm:py-[10px] font-bold rounded-[40px] hover:bg-[#FFBF88] transition-colors  text-[17px] sm:text-[17px]'
								onClick={handleNavigation}
							>
								{t('auth.login')}
							</Link>
						)}
						{!isMobile && (
							// <button
							// 	className='flex items-center gap-[9px] md:gap-[11px] text-[24px] font-normal'
							// 	onClick={openDevelopModal}
							// >
							// 	<Image
							// 		src={'/header/language.svg'}
							// 		alt='Логотип Nomo'
							// 		width={42}
							// 		height={42}
							// 		className='w-8 h-8 sm:w-[42px] sm:h-[42px]'
							// 	/>
							// 	<span className='hidden sm:inline'>Українська</span>
							// </button>
							<LocaleSwitcher />
						)}
						{isMobile && (
							<button onClick={toggleMenu} className='text-accent'>
								<Menu size={40} />
							</button>
						)}
					</div>
				</div>
			</header>

			{isMobile && isMenuOpen && (
				<div className='fixed overflow-hidden inset-0 bg-[#0f0f0f] z-50 px-[33px] sm:px-[34px] md:px-10 lg:px-20 py-[14px] sm:py-[21px]'>
					<div className='flex flex-col h-full'>
						<div className='flex justify-between items-center mb-8'>
							<Link href={'/'} onClick={() => setIsMenuOpen(false)}>
								<Image
									src={'/header/logo.svg'}
									alt='NomoCashback'
									width={82.5}
									height={83.5}
									className='w-[82.5px] h-[83.5px] sm:w-[82.5px] sm:h-[83.5px]'
								/>
							</Link>
							<button onClick={toggleMenu} className='text-accent'>
								<Menu size={40} />
							</button>
						</div>
						<Navbar
							isResettingPassword={isResettingPassword}
							closeMenu={() => setIsMenuOpen(false)}
						/>
						<div className='mt-10'>
							{/* <button
								className='flex items-center gap-2 text-[24px] font-normal mb-4'
								onClick={() => {
									openDevelopModal()
									setIsMenuOpen(false)
								}}
							>
								<Image
									src={'/header/language.svg'}
									alt='Логотип Nomo'
									width={32}
									height={32}
								/>
								Українська
							</button> */}
							<LocaleSwitcher />
						</div>
					</div>
				</div>
			)}

			<DevelopModal isOpen={showDev} onClose={() => setShowDev(false)} />
		</>
	)
}
export default Header
