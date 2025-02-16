// "use client"

// import { useEffect, useCallback } from "react"
// import { createClient } from "@/lib/supabase/client"
// import { useRouter } from "next/navigation"

// export function useInvestmentSync(
//   userId: string,
//   onUpdate: (data: any) => void,
//   currentAccumulated: number,
//   skipAccumulatedUpdate = false, // Новый параметр для пропуска обновления accumulated
// ) {
//   const supabase = createClient()
//   const router = useRouter()

//   const setupSubscription = useCallback(() => {
//     console.log("Setting up Supabase subscription for user:", userId)

//     const subscription = supabase
//       .channel("investment_changes")
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "user_profiles",
//           filter: `user_id=eq.${userId}`,
//         },
//         (payload) => {
//           console.log("Real-time update received:", payload)

//           // Если skipAccumulatedUpdate true, сохраняем текущее значение accumulated
//           if (skipAccumulatedUpdate) {
//             onUpdate({
//               ...payload.new,
//               current_accumulated: currentAccumulated,
//             })
//           } else {
//             onUpdate(payload.new)
//           }

//           router.refresh()
//         },
//       )
//       .subscribe((status) => {
//         console.log("Subscription status:", status)
//       })

//     return () => {
//       console.log("Cleaning up subscription")
//       subscription.unsubscribe()
//     }
//   }, [userId, onUpdate, currentAccumulated, skipAccumulatedUpdate, supabase, router])

//   useEffect(() => {
//     const cleanup = setupSubscription()
//     return () => {
//       cleanup()
//     }
//   }, [setupSubscription])
// }

// "use client"

// import { useEffect, useCallback } from "react"
// import { createClient } from "@/lib/supabase/client"
// import { checkAccumulationStatus } from "@/app/actions/investment"

// export function useInvestmentSync(
//   userId: string,
//   onUpdate: (data: any) => void,
//   onAccumulationUpdate: (accumulated: number) => void,
// ) {
//   const supabase = createClient()
//   //const router = useRouter() // Removed unnecessary dependency

//   // Функция для проверки статуса
//   const checkStatus = useCallback(async () => {
//     const result = await checkAccumulationStatus(userId)
//     if (result.success && result.data) {
//       console.log("Accumulation status:", result.data)
//       onUpdate(result.data.profile)

//       // Возвращаем данные для локального расчета
//       return {
//         currentAmount: result.data.profile.current_amount,
//         currentAccumulated: result.data.profile.current_accumulated,
//         lastUpdate: result.data.profile.last_accumulation_update,
//       }
//     }
//     return null
//   }, [userId, onUpdate])

//   // Подписка на изменения в базе
//   useEffect(() => {
//     console.log("Setting up Supabase subscription for user:", userId)

//     const subscription = supabase
//       .channel("investment_changes")
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "user_profiles",
//           filter: `user_id=eq.${userId}`,
//         },
//         (payload) => {
//           console.log("Real-time update received:", payload)
//           onUpdate(payload.new)
//           checkStatus() // Проверяем статус при получении обновления
//         },
//       )
//       .subscribe((status) => {
//         console.log("Subscription status:", status)
//       })

//     return () => {
//       console.log("Cleaning up subscription")
//       subscription.unsubscribe()
//     }
//   }, [userId, onUpdate, checkStatus, supabase])

//   // Возвращаем функцию проверки статуса
//   return { checkStatus }
// }

// 'use client'

// import { useEffect, useCallback, useRef } from 'react'
// import { createClient } from '@/lib/supabase/client'
// import { checkAccumulationStatus } from '@/app/actions/investment'
// import { useRouter } from 'next/navigation'

// export function useInvestmentSync(
// 	userId: string,
// 	onUpdate: (data: any) => void,
// 	onAccumulationUpdate: (accumulated: number) => void
// ) {
// 	const supabase = createClient()
// 	const router = useRouter()
// 	const subscriptionRef = useRef<ReturnType<typeof supabase.channel> | null>(
// 		null
// 	)
// 	const lastUpdateRef = useRef<number>(Date.now())
// 	const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

// 	// Функция для проверки статуса с debounce
// 	const checkStatus = useCallback(
// 		async (force = false) => {
// 			const now = Date.now()
// 			const timeSinceLastUpdate = now - lastUpdateRef.current

// 			// Если прошло менее 2 секунд с последнего обновления и это не принудительное обновление
// 			if (!force && timeSinceLastUpdate < 2000) {
// 				if (updateTimeoutRef.current) {
// 					clearTimeout(updateTimeoutRef.current)
// 				}

// 				updateTimeoutRef.current = setTimeout(() => {
// 					checkStatus(true)
// 				}, 2000 - timeSinceLastUpdate)

// 				return null
// 			}

// 			try {
// 				// console.log('Checking investment status for user:', userId)
// 				const result = await checkAccumulationStatus(userId)

// 				if (result.success && result.data) {
// 					const { profile } = result.data
// 					onUpdate(profile)
// 					lastUpdateRef.current = now

// 					return {
// 						currentAmount: profile.current_amount,
// 						currentAccumulated: profile.current_accumulated,
// 						lastUpdate: profile.last_accumulation_update,
// 					}
// 				}
// 			} catch (error) {
// 				console.error('Error checking status:', error)
// 			}
// 			return null
// 		},
// 		[userId, onUpdate]
// 	)

// 	// Настройка подписки с переподключением
// 	const setupSubscription = useCallback(() => {
// 		if (subscriptionRef.current) {
// 			subscriptionRef.current.unsubscribe()
// 		}

// 		// console.log('Setting up Supabase subscription for user:', userId)

// 		subscriptionRef.current = supabase
// 			.channel(`investment_${userId}`)
// 			.on(
// 				'postgres_changes',
// 				{
// 					event: '*',
// 					schema: 'public',
// 					table: 'user_profiles',
// 					filter: `user_id=eq.${userId}`,
// 				},
// 				async payload => {
// 					// console.log('Real-time update received')
// 					await checkStatus(true)
// 				}
// 			)
// 			.subscribe(status => {
// 				// console.log('Subscription status:', status)
// 				if (status !== 'SUBSCRIBED') {
// 					// Переподключаемся при потере соединения
// 					setTimeout(() => {
// 						setupSubscription()
// 					}, 5000)
// 				}
// 			})

// 		return () => {
// 			if (subscriptionRef.current) {
// 				subscriptionRef.current.unsubscribe()
// 				subscriptionRef.current = null
// 			}
// 		}
// 	}, [userId, supabase, checkStatus])

// 	// Эффект для подписки
// 	useEffect(() => {
// 		const cleanup = setupSubscription()
// 		return () => {
// 			cleanup()
// 			if (updateTimeoutRef.current) {
// 				clearTimeout(updateTimeoutRef.current)
// 			}
// 		}
// 	}, [setupSubscription])

// 	// Периодическая проверка состояния
// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			checkStatus(true)
// 		}, 30000) // Проверяем каждые 30 секунд

// 		return () => clearInterval(interval)
// 	}, [checkStatus])

// 	return {
// 		checkStatus: () => checkStatus(true),
// 		refreshSubscription: setupSubscription,
// 	}
// }


'use client'

import { useEffect, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { checkAccumulationStatus } from '@/app/actions/investment'

export function useInvestmentSync(
	userId: string,
	onUpdate: (data: any) => void,
	_onAccumulationUpdate: (accumulated: number) => void
) {
	const supabase = createClient()
	const subscriptionRef = useRef<ReturnType<typeof supabase.channel> | null>(
		null
	)
	const lastUpdateRef = useRef<number>(Date.now())
	const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const errorCountRef = useRef(0)
	const mountedRef = useRef(true)

	// Функция для проверки статуса с debounce и обработкой ошибок
	const checkStatus = useCallback(
		async (force = false) => {
			const now = Date.now()
			const timeSinceLastUpdate = now - lastUpdateRef.current

			if (!force && timeSinceLastUpdate < 2000) {
				if (updateTimeoutRef.current) {
					clearTimeout(updateTimeoutRef.current)
				}

				updateTimeoutRef.current = setTimeout(() => {
					if (mountedRef.current) {
						checkStatus(true)
					}
				}, 2000 - timeSinceLastUpdate)

				return null
			}

			try {
				const result = await checkAccumulationStatus(userId)

				if (result.success && result.data) {
					const { profile } = result.data
					if (mountedRef.current) {
						onUpdate(profile)
						lastUpdateRef.current = now
						errorCountRef.current = 0 // Сбрасываем счетчик ошибок при успешном обновлении
					}

					return {
						currentAmount: profile.current_amount,
						currentAccumulated: profile.current_accumulated,
						lastUpdate: profile.last_accumulation_update,
					}
				}
			} catch (error) {
				console.error('Error checking status:', error)
				errorCountRef.current += 1

				// Если произошло 3 ошибки подряд, пробуем переподключиться
				if (errorCountRef.current >= 3) {
					console.log('Multiple errors detected, attempting to reconnect...')
					setupSubscription()
					errorCountRef.current = 0
				}
			}
			return null
		},
		[userId, onUpdate]
	)

	// Настройка подписки с улучшенной обработкой ошибок
	const setupSubscription = useCallback(() => {
		if (subscriptionRef.current) {
			subscriptionRef.current.unsubscribe()
		}

		const channel = supabase
			.channel(`investment_${userId}_${Date.now()}`) // Уникальный канал для каждой подписки
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'user_profiles',
					filter: `user_id=eq.${userId}`,
				},
				//@ts-ignore
				async payload => {
					if (mountedRef.current) {
						await checkStatus(true)
					}
				}
			)
			//@ts-ignore
			.subscribe(status => {
				console.log('Subscription status:', status)
				if (status !== 'SUBSCRIBED' && mountedRef.current) {
					setTimeout(setupSubscription, 5000)
				}
			})

		subscriptionRef.current = channel
		return () => {
			channel.unsubscribe()
		}
	}, [userId, supabase, checkStatus])

	// Эффект для подписки с cleanup
	useEffect(() => {
		mountedRef.current = true
		const cleanup = setupSubscription()

		// Периодическая проверка состояния
		const statusInterval = setInterval(() => {
			if (mountedRef.current) {
				checkStatus(true)
			}
		}, 30000)

		// Периодическое обновление подписки
		const subscriptionInterval = setInterval(() => {
			if (mountedRef.current) {
				setupSubscription()
			}
		}, 5 * 60 * 1000) // Обновляем подписку каждые 5 минут

		return () => {
			mountedRef.current = false
			cleanup()
			clearInterval(statusInterval)
			clearInterval(subscriptionInterval)
			if (updateTimeoutRef.current) {
				clearTimeout(updateTimeoutRef.current)
			}
		}
	}, [setupSubscription, checkStatus])

	return {
		checkStatus: () => checkStatus(true),
		refreshSubscription: setupSubscription,
	}
}

