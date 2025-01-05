'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
	{ label: 'Кешбек', href: '/cashback' },
	{ label: 'Карта', href: '/map' },
	{ label: 'Криптовалюта', href: '/' },
	{ label: 'Партнерство', href: '/partnership' },
	{ label: 'Хто Ми', href: '/we' },
]

interface NavbarProps {
	isResettingPassword?: boolean
}

const Navbar = ({ isResettingPassword = false }: NavbarProps) => {
	const pathname = usePathname()
	const router = useRouter()
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const supabase = createClient()

	useEffect(() => {
		const checkAuth = async () => {
			if (!isResettingPassword) {
				const {
					data: { session },
				} = await supabase.auth.getSession()
				setIsAuthenticated(!!session)
			} else {
				setIsAuthenticated(false)
			}
		}

		checkAuth()

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (!isResettingPassword) {
				setIsAuthenticated(!!session)
			}
		})

		return () => subscription.unsubscribe()
	}, [isResettingPassword])

	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (isResettingPassword) {
			e.preventDefault()
			router.push('/reset-password')
		}
	}

	const allNavItems =
		!isResettingPassword && isAuthenticated
			? [{ label: 'Мій кабінет', href: '/dashboard' }, ...navItems]
			: navItems

	return (
		<nav>
			<ul className='flex items-start lg:items-center flex-col lg:flex-row font-bold gap-[38px] md:space-y-0'>
				{allNavItems.map(item => (
					<li key={item.href}>
						<Link
							href={item.href}
							className={`hover:text-accent transition-colors ${
								pathname === item.href ? 'text-accent' : ''
							}`}
							onClick={handleNavigation}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
export default Navbar
