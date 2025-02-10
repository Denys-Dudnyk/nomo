'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const supabase = createClient()

	useEffect(() => {
		const handleCallback = async () => {
			try {
				const email = searchParams.get('email')
				const next = searchParams.get('next') || '/dashboard'

				if (!email) {
					throw new Error('Data not provided')
				}

				const {
					data: { session },
					error: signInError,
				} = await supabase.auth.signInWithPassword({
					email: email,
					password: `${process.env.NEXT_PUBLIC_PASS_AUTO}`,
				})

				if (signInError) {
					console.error('Sign in error:', signInError)
					throw signInError
				}

				if (!session) {
					throw new Error('No session created')
				}

				router.push(next)
			} catch (error) {
				console.error('Error:', error)
				router.push('/auth/error')
			}
		}

		handleCallback()
	}, [router, searchParams, supabase.auth])

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='text-center'>
				<h2 className='text-2xl font-semibold mb-2'>Виконується вхід...</h2>
				<p className='text-gray-500'>Будь ласка, зачекайте</p>
			</div>
		</div>
	)
}
