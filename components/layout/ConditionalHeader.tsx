'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'

export default function ConditionalHeader() {
	const pathname = usePathname()

	// Only render Header if not on the portfolio page
	if (
		pathname === '/portfolio' ||
		pathname === '/partners' ||
		pathname === '/partners/products' ||
		pathname.startsWith('/partners/products/') ||
		pathname.startsWith('/partners/')
	)
		return null

	return <Header />
}
