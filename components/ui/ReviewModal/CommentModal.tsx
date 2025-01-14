'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Image, Star, User } from 'lucide-react'
import { motion } from 'framer-motion'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'

interface CommentModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit?: (comment: { text: string; rating: number }) => void
	userId: string // ID текущего пользователя
	name: string
}

export function CommentModal({
	isOpen,
	onClose,
	onSubmit,
	userId,
	name,
}: CommentModalProps) {
	const [comment, setComment] = useState('')
	const [rating, setRating] = useState(0)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Предотвращаем отправку, если комментарий пуст или рейтинг не указан
		if (!comment.trim() || rating === 0) {
			alert('Please add a comment and rating before submitting.')
			return
		}

		setIsSubmitting(true)

		const supabase = await createClient()

		// Добавление комментария в базу данных Supabase
		try {
			const { data, error } = await supabase
				.from('comments') // Укажите вашу таблицу
				.insert([
					{
						text: comment,
						rating,
						user_id: userId, // ID текущего пользователя
						name: name,
					},
				])

			if (error) throw error

			// Если есть обработчик onSubmit, вызываем его
			if (onSubmit) {
				onSubmit({ text: comment, rating })
			}

			// Сбрасываем поля
			setComment('')
			setRating(0)
			onClose() // Закрываем модалку
		} catch (err) {
			console.error('Error submitting comment:', err)
			alert('Failed to submit the comment. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleBackdropClick = (e: React.MouseEvent) => {
		// Закрываем модалку при клике вне ее содержимого
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
			role='dialog'
			aria-modal='true'
			onClick={handleBackdropClick}
		>
			<div className='bg-white rounded-xl sm:p-5 max-w-xl sm:max-w-2xl w-full mx-2 sm:mx-4 relative'>
				<div className='flex flex-col items-center mb-6'>
					<div className='w-18 h-18 rounded-full overflow-hidden mb-2'>
						<Avatar className='w-16 h-16 mb-2'>
							<AvatarImage src='/we/user1.svg' alt='User profile' />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
					</div>
					<span className='text-lg font-bold text-gray-800 '>{name}</span>
				</div>
				<form onSubmit={handleSubmit} className='space-y-6 p-3'>
					<div className='relative w-full min-h-[200px] bg-gray-100 border-gray-300 rounded-lg shadow-inner focus-within:border-orange-500 focus-within:ring focus-within:ring-orange-200 focus-within:ring-opacity-50'>
						<Textarea
							value={comment}
							onChange={e => setComment(e.target.value)}
							className='w-full p-5 h-full text-gray-600 text-lg bg-transparent border-none focus:outline-none focus:ring-0 resize-none'
							placeholder='Add a comment...'
							required
							style={{
								outline: 'none',
								border: 'none',
								boxShadow: 'none',
							}}
						/>

						<TooltipProvider>
							<div className='absolute bottom-2 left-2 flex space-x-2'>
								{[1, 2, 3, 4, 5].map(star => (
									<Tooltip key={star}>
										<TooltipTrigger asChild>
											<motion.button
												type='button'
												onClick={() => setRating(star)}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												className={`focus:outline-none transition-colors duration-200 ${
													star <= rating ? 'text-accent' : 'text-gray-400'
												}`}
											>
												<Star className='w-6 h-6 fill-current' />
											</motion.button>
										</TooltipTrigger>
										<TooltipContent>
											<p>
												{star} {star === 1 ? 'Star' : 'Stars'}
											</p>
										</TooltipContent>
									</Tooltip>
								))}
							</div>
						</TooltipProvider>

						<div className='absolute bottom-2 right-2'>
							<Button
								type='submit'
								disabled={isSubmitting}
								className='bg-accent from-orange-400 to-pink-600 hover:from-orange-500 hover:to-pink-700 text-white text-sm font-bold py-2 px-6 w-30 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
							>
								{isSubmitting ? 'Submitting...' : 'Send'}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
