'use client'

import { useState, useEffect } from 'react'
import { LuLoader } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BrandLogo from './brandlogo'
import SuccessModal from '@/components/ui/SuccessModal/success-modal'
import { NextRequest, NextResponse } from 'next/server'

export default function ResetPasswordForm() {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [showSuccess, setShowSuccess] = useState(false)
	const [email, setEmail] = useState<string>('')
	const router = useRouter()
	const supabase = createClient()

	// Function to clean up reset state
	const cleanupResetState = async () => {
		await supabase.auth.signOut()
		document.cookie =
			'resetting_password=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
		localStorage.removeItem('resetEmail')

		router.push('/auth/login')
		return
	}

	useEffect(() => {
		const resetEmail = localStorage.getItem('resetEmail')
		if (!resetEmail) {
			router.push('/auth/login')
			return
		}

		// Function to handle navigation attempts
		const handleNavigation = async () => {
			const currentPath = window.location.pathname
			if (currentPath !== '/reset-password') {
				const shouldLeave = window.confirm(
					'Якщо ви залишите цю сторінку, ваш пароль не буде змінено. Ви впевнені?'
				)
				const {
					data: { session },
				} = await supabase.auth.getSession()

				if (shouldLeave) {
					await cleanupResetState()

					return true
				} else {
					window.history.pushState(null, '', '/reset-password')
					return false
				}
			}
			return false
		}

		// Watch for URL changes
		let lastUrl = window.location.href
		const observer = new MutationObserver(async () => {
			if (window.location.href !== lastUrl) {
				lastUrl = window.location.href
				await handleNavigation()
			}
		})

		observer.observe(document, { subtree: true, childList: true })

		// Handle browser back/forward buttons
		window.onpopstate = async () => {
			await handleNavigation()
		}

		// Handle direct URL changes
		const originalPushState = window.history.pushState
		const originalReplaceState = window.history.replaceState

		window.history.pushState = function () {
			originalPushState.apply(this, arguments as any)
			handleNavigation()
		}

		window.history.replaceState = function () {
			originalReplaceState.apply(this, arguments as any)
			handleNavigation()
		}

		// Handle page unload
		window.onbeforeunload = async e => {
			await cleanupResetState()
			e.preventDefault()
			e.returnValue =
				'Якщо ви залишите цю сторінку, ваш пароль не буде змінено. Ви впевнені?'
			return e.returnValue
		}

		return () => {
			observer.disconnect()
			window.onpopstate = null
			window.history.pushState = originalPushState
			window.history.replaceState = originalReplaceState
			window.onbeforeunload = null
		}
	}, [router])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setError('Паролі не співпадають')
			return
		}

		setLoading(true)
		setError(null)

		try {
			// First ensure we're signed out
			// await supabase.auth.signOut()

			const resetEmail = localStorage.getItem('resetEmail')
			if (!resetEmail) {
				throw new Error('Reset email not found')
			}

			// Update the password using email and new password
			const { error } = await supabase.auth.updateUser({
				password,
			})

			if (error) throw error

			// Clear the reset email from localStorage
			window.onbeforeunload = null
			await cleanupResetState()
			// Show success modal
			setShowSuccess(true)
		} catch (error) {
			setError(error instanceof Error ? error.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className='w-full max-w-[428px] p-8 rounded-3xl bg-[#1C1C1C] text-white'>
				<div className='flex justify-center mb-8'>
					<BrandLogo />
				</div>

				<h1 className='text-[31px] font-bold text-center mb-[18px]'>
					Скинути пароль облікового запису
				</h1>

				<p className='text-center text-gray-400 mb-8'>Введіть новий пароль</p>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<Input
						type='password'
						placeholder='Пароль'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='bg-transparent border-gray-600'
						required
					/>
					<Input
						type='password'
						placeholder='Підтвердити пароль'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						className='bg-transparent border-gray-600'
						required
					/>

					<Button
						type='submit'
						className='w-full bg-[#FF8A00] hover:bg-[#FF8A00]/90 rounded-[40px] px-[30px] py-[10px]'
						disabled={loading}
					>
						{loading ? (
							<LuLoader className='size-[17px] animate-spin' />
						) : (
							'Скинути пароль'
						)}
					</Button>
				</form>

				{error && (
					<p className='mt-4 text-sm text-red-500 text-center'>{error}</p>
				)}
			</div>

			<SuccessModal
				isOpen={showSuccess}
				onClose={() => {
					setShowSuccess(false)
					router.push('/login')
				}}
			/>
		</>
	)
}
