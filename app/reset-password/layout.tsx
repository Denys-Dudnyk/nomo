'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetPasswordLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()

	// useEffect(() => {
	// 	// Check if we're in reset password flow
	// 	const resetEmail = localStorage.getItem('resetEmail')
	// 	const isResetting = document.cookie.includes('resetting_password=true')

	// 	if (!resetEmail || !isResetting) {
	// 		router.push('/auth/login')
	// 	}

	// 	// Prevent navigation during reset
	// 	const handlePopState = (e: PopStateEvent) => {
	// 		e.preventDefault()
	// 		router.push('/reset-password')
	// 	}

	// 	window.addEventListener('popstate', handlePopState)

	// 	return () => {
	// 		window.removeEventListener('popstate', handlePopState)
	// 	}
	// }, [router])

	return children
}
