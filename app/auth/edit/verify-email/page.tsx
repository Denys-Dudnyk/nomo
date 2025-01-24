'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function VerifyEmail() {
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		async function verifyEmail() {
			try {
				const token = searchParams.get('token')
				const email = searchParams.get('email')
				const type = searchParams.get('type')

				if (!token || !email || type !== 'email_change') {
					throw new Error('Невірне посилання для підтвердження')
				}

				const response = await fetch('/api/verify-email', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						token,
						email,
						type,
					}),
				})

				const result = await response.json()

				if (!response.ok) {
					throw new Error(result.error || 'Что-то пошло не так')
				}

				toast.success('Email успешно подтвержден!')
				setTimeout(() => router.push('/dashboard/profile'), 2000)
			} catch (err) {
				console.error('Verification error:', err)
				setError(err instanceof Error ? err.message : 'Ошибка подтверждения')
			} finally {
				setIsLoading(false)
			}
		}

		verifyEmail()
	}, [searchParams, router])

	return (
		<div className='min-h-screen bg-black flex items-center justify-center p-4'>
			<Card className='w-full max-w-md p-6 bg-[#1C1E22] border-0'>
				{isLoading ? (
					<div className='text-center'>
						<Loader2 className='h-8 w-8 animate-spin text-[#FF8A00] mx-auto' />
						<p className='mt-4 text-white'>Верифікація email...</p>
					</div>
				) : error ? (
					<div className='text-center'>
						<p className='text-red-500 mb-4'>{error}</p>
						<Button
							onClick={() => router.push('/dashboard/profile')}
							className='bg-[#FF8A00] hover:bg-[#FF8A00]/90'
						>
							Повернутися до профілю
						</Button>
					</div>
				) : (
					<div className='text-center'>
						<h2 className='text-xl font-semibold text-white mb-4'>
							Email успішно підтверджено
						</h2>
						<p className='text-gray-400 mb-6'>
							Ваш email було успішно оновлено
						</p>
						<Button
							onClick={() => router.push('/dashboard/profile')}
							className='bg-[#FF8A00] hover:bg-[#FF8A00]/90'
						>
							Повернутися до профілю
						</Button>
					</div>
				)}
			</Card>
		</div>
	)
}
