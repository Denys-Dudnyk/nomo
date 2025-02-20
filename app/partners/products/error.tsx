'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	const router = useRouter()

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-[#121315] text-white p-4'>
			<h2 className='text-2xl font-semibold mb-4'>Щось пішло не так!</h2>
			<p className='text-[#767785] mb-8'>
				{error.message === 'Not a partner'
					? 'У вас немає доступу до цієї сторінки. Тільки партнери можуть переглядати продукти.'
					: 'Виникла помилка при завантаженні сторінки.'}
			</p>
			<div className='flex gap-4'>
				<Button
					onClick={() => router.push('/dashboard')}
					className='bg-[#B35429] hover:bg-[#B35429]/90'
				>
					На головну
				</Button>
				<Button
					onClick={() => reset()}
					variant='outline'
					className='border-[#252629] text-white hover:bg-[#252629]'
				>
					Спробувати знову
				</Button>
			</div>
		</div>
	)
}
