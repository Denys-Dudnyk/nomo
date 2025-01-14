'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { ReviewsItem } from './ReviewsItem'
import Image from 'next/image'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Session } from '@supabase/supabase-js'
import { LoginPromptModal } from '@/components/ui/ReviewModal/LoginPromptModal'
import { CommentModal } from '@/components/ui/ReviewModal/CommentModal'
import { useTranslations } from 'next-intl'

export const ReviewsSection = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const isMobile = useIsMobile()
	const itemsPerPage = isMobile ? 1 : 3
	const [totalPages, setTotalPages] = useState(0)
	const [comments, setComments] = useState<any[]>([]) // Список комментариев из Supabase
	const [showCommentModal, setShowCommentModal] = useState(false)
	const [showLoginPrompt, setShowLoginPrompt] = useState(false)
	const [session, setSession] = useState<Session | null>(null)
	const [userId, setUserId] = useState<string>()
	const [userName, setUserName] = useState<string>()

	const t = useTranslations('we.review')

	// Инициализация клиента Supabase
	const supabase = createClient()

	useEffect(() => {
		const checkSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession()
			setSession(session)
			const {
				data: { user },
			} = await supabase.auth.getUser()
			setUserId(user?.id)

			const { data: name } = await supabase
				.from('user_profiles') // Название таблицы
				.select('full_name')
				.eq('user_id', user?.id)
				.single()
			setUserName(name?.full_name)
		}
		checkSession()
	}, [supabase])

	// Получение комментариев из базы данных
	useEffect(() => {
		const fetchComments = async () => {
			const { data, error } = await supabase
				.from('comments') // Название таблицы
				.select('id, text, rating, user_id, created_at, name')
				.order('created_at', { ascending: false }) // Последние комментарии первыми

			if (error) {
				console.error('Error fetching comments:', error)
			} else {
				setComments(data || [])

				console.log(data)
				setTotalPages(Math.ceil((data?.length || 0) / itemsPerPage))
			}
		}

		// Реалтайм-подписка на новые комментарии
		const subscribeToComments = () => {
			const subscription = supabase
				.channel('realtime:comments')
				.on(
					'postgres_changes',
					{ event: 'INSERT', schema: 'public', table: 'comments' },
					payload => {
						// Обновляем список комментариев, добавляя новый комментарий в начало
						setComments(prev => {
							const updatedComments = [payload.new, ...prev]

							// Пересчитываем количество страниц
							setTotalPages(Math.ceil(updatedComments.length / itemsPerPage))

							return updatedComments
						})
					}
				)
				.subscribe()

			// Возвращаем функцию отписки
			return () => {
				supabase.removeChannel(subscription)
			}
		}

		fetchComments()

		const unsubscribe = subscribeToComments()

		// Очистка подписки при размонтировании компонента
		return () => {
			unsubscribe()
		}
	}, [supabase, itemsPerPage])

	const nextSlide = () => {
		setCurrentIndex(prev => (prev + 1) % totalPages)
	}

	const prevSlide = () => {
		setCurrentIndex(prev => (prev === 0 ? totalPages - 1 : prev - 1))
	}

	const getCurrentTestimonials = () => {
		const start = currentIndex * itemsPerPage
		const end = start + itemsPerPage
		return comments.slice(start, end)
	}

	const visibleTestimonials = getCurrentTestimonials()

	// Отправка нового комментария в базу данных
	// const handleCommentSubmit = async (comment: {
	// 	text: string
	// 	rating: number
	// }) => {
	// 	if (!userId) return

	// 	const { data, error } = await supabase.from('comments').insert([
	// 		{
	// 			text: comment.text,
	// 			rating: comment.rating,
	// 			user_id: userId,
	// 		},
	// 	])

	// 	if (error) {
	// 		console.error('Error adding comment:', error)
	// 	} else {
	// 		console.log('New Comment Added:', data)
	// 		// Обновляем список комментариев после добавления
	// 		//@ts-ignore
	// 		setComments(prev => [data[0], ...prev])
	// 	}

	// 	setShowCommentModal(false)
	// }

	const handleOpenCommentModal = () => {
		if (!session) {
			setShowLoginPrompt(true)
		} else {
			setShowCommentModal(true)
		}
	}

	return (
		<>
			<section className='py-8 sm:py-16 px-4 max-w-7xl mx-auto text-[#0f0f0f]'>
				<h2 className='text-3xl sm:text-4xl md:text-[54px] font-extrabold text-center mb-8 sm:mb-[56px] leading-tight'>
					<span className='relative inline-block'>
						{t('what_says_our')}
						<span className='absolute -bottom-1 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-full h-[6px] sm:h-[9px] bg-accent rounded-full'></span>
					</span>{' '}
					<span className='relative inline-block'>
						{t('clients')}
						<span className='absolute -bottom-1 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-[55%] h-[6px] sm:h-[9px] bg-accent rounded-full'></span>
					</span>
				</h2>

				<div className='relative'>
					<div className='flex items-center justify-center gap-4 sm:gap-8'>
						<button
							onClick={prevSlide}
							className='hidden sm:flex items-center justify-center'
							aria-label='Previous slide'
						>
							<Image src='/we/arrow-left.svg' alt='' width={26} height={31} />
						</button>

						<div className='overflow-hidden w-full sm:w-auto'>
							<div className='flex gap-4 sm:gap-[36px] py-6 px-4'>
								{visibleTestimonials.map(testimonial => (
									<div
										key={testimonial.id}
										className='min-w-full sm:min-w-[calc(50%-0.5rem)] md:min-w-[calc(33.333%-1.5rem)] flex justify-center'
									>
										<ReviewsItem {...testimonial} />
									</div>
								))}
							</div>
							<div className='text-left mt-4 sm:mt-8'>
								<button
									className='text-[#919191] font-bold text-base sm:text-[18px] underline transition-colors'
									onClick={handleOpenCommentModal}
								>
									{t('create_review')}
								</button>
							</div>
						</div>

						<button
							onClick={nextSlide}
							className='hidden sm:flex items-center justify-center'
							aria-label='Next slide'
						>
							<Image src='/we/arrow-right.svg' alt='' width={26} height={31} />
						</button>
					</div>

					{/* Mobile Navigation */}
					<div className='flex justify-center gap-4 mt-6 sm:hidden'>
						<button
							onClick={prevSlide}
							className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors'
						>
							<ChevronLeft className='w-5 h-5' />
						</button>
						<button
							onClick={nextSlide}
							className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors'
						>
							<ChevronRight className='w-5 h-5' />
						</button>
					</div>

					{/* Pagination Dots */}
					<div className='flex justify-center gap-2 mt-4 sm:mt-8'>
						{Array.from({ length: totalPages }).map((_, index) => (
							<button
								key={index}
								className={`w-2 h-2 rounded-full transition-colors ${
									index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
								}`}
								onClick={() => setCurrentIndex(index)}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Comment Modal */}
			{session && (
				<CommentModal
					isOpen={showCommentModal}
					onClose={() => setShowCommentModal(false)}
					// onSubmit={handleCommentSubmit}
					userId={userId ?? ''}
					name={userName ?? ''}
				/>
			)}

			{/* Login Prompt Modal */}
			<LoginPromptModal
				isOpen={showLoginPrompt}
				onClose={() => setShowLoginPrompt(false)}
			/>
		</>
	)
}
