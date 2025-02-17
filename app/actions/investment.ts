'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Start investment by moving funds from balance to current_amount
// export async function startInvestment(userId: string) {
// 	const cookieStore = cookies()
// 	//@ts-ignore
// 	const supabase = await createClient(cookieStore)

// 	try {
// 		// Get current profile
// 		const { data: profile, error: profileError } = await supabase
// 			.from('user_profiles')
// 			.select('cashback_balance')
// 			.eq('user_id', userId)
// 			.single()

// 		if (profileError) throw profileError

// 		// Start transaction to move funds
// 		const { data, error } = await supabase
// 			.from('user_profiles')
// 			.update({
// 				cashback_balance: 0,
// 				current_amount: profile.cashback_balance,
// 				current_accumulated: 0,
// 				investment_start_time: new Date().toISOString(),
// 				is_accumulating: true,
// 				timer_state: '0:00:01:00', // 7 days in D:HH:MM:SS format
// 			})
// 			.eq('user_id', userId)

// 		if (error) throw error

// 		revalidatePath('/dashboard')
// 		return { success: true, data }
// 	} catch (error) {
// 		console.error('Error starting investment:', error)
// 		return { success: false, error }
// 	}
// }

// // Add funds to existing investment
// export async function addToInvestment(userId: string) {
// 	const cookieStore = cookies()
// 	//@ts-ignore
// 	const supabase = await createClient(cookieStore)
// 	try {
// 		// Get current profile
// 		const { data: profile, error: profileError } = await supabase
// 			.from('user_profiles')
// 			.select('cashback_balance, current_amount')
// 			.eq('user_id', userId)
// 			.single()

// 		if (profileError) throw profileError

// 		// Add new funds to current investment
// 		const { data, error } = await supabase
// 			.from('user_profiles')
// 			.update({
// 				cashback_balance: 0,
// 				current_amount: profile.current_amount + profile.cashback_balance,
// 			})
// 			.eq('user_id', userId)

// 		if (error) throw error

// 		revalidatePath('/dashboard')
// 		return { success: true, data }
// 	} catch (error) {
// 		console.error('Error adding to investment:', error)
// 		return { success: false, error }
// 	}
// }

// // Complete investment and return funds
// export async function completeInvestment(userId: string) {
// 	const cookieStore = cookies()
// 	//@ts-ignore
// 	const supabase = await createClient(cookieStore)

// 	try {
// 		// Get current investment state
// 		const { data: profile, error: profileError } = await supabase
// 			.from('user_profiles')
// 			.select('current_amount, current_accumulated')
// 			.eq('user_id', userId)
// 			.single()

// 		if (profileError) throw profileError

// 		// Return funds plus accumulated amount
// 		const { data, error } = await supabase
// 			.from('user_profiles')
// 			.update({
// 				cashback_balance: profile.current_amount + profile.current_accumulated,
// 				current_amount: 0,
// 				current_accumulated: 0,
// 				investment_start_time: null,
// 				is_accumulating: false,
// 				timer_state: null,
// 			})
// 			.eq('user_id', userId)

// 		if (error) throw error

// 		revalidatePath('/dashboard')
// 		return { success: true, data }
// 	} catch (error) {
// 		console.error('Error completing investment:', error)
// 		return { success: false, error }
// 	}
// }

// // Update accumulated amount// Update accumulated amount with better error handling and logging
// export async function updateAccumulated(userId: string, accumulated: number) {
// 	const cookieStore = cookies()
// 	//@ts-ignore
// 	const supabase = await createClient(cookieStore)

// 	try {
// 		// Format the number to ensure consistent decimal places
// 		const formattedAccumulated = Number(accumulated.toFixed(7))

// 		console.log('Updating accumulated amount:', {
// 			userId,
// 			accumulated: formattedAccumulated,
// 		})

// 		const { data, error } = await supabase
// 			.from('user_profiles')
// 			.update({
// 				current_accumulated: formattedAccumulated,
// 			})
// 			.eq('user_id', userId)
// 			.select()

// 		if (error) {
// 			console.error('Database error while updating accumulated:', error)
// 			throw error
// 		}

// 		console.log('Update result:', data)

// 		// Force immediate revalidation
// 		revalidatePath('/dashboard')

// 		return { success: true, data }
// 	} catch (error) {
// 		console.error('Error updating accumulated amount:', error)
// 		return { success: false, error }
// 	}
// }

// // Add a new function to verify current state
// export async function verifyInvestmentState(userId: string) {
// 	const cookieStore = cookies()
// 	//@ts-ignore
// 	const supabase = await createClient(cookieStore)

// 	try {
// 		const { data, error } = await supabase
// 			.from('user_profiles')
// 			.select('current_amount, current_accumulated, is_accumulating')
// 			.eq('user_id', userId)
// 			.single()

// 		if (error) throw error

// 		console.log('Current investment state:', data)
// 		return { success: true, data }
// 	} catch (error) {
// 		console.error('Error verifying investment state:', error)
// 		return { success: false, error }
// 	}
// }

// export async function updateInvestmentState(
// 	userId: string,
// 	data: {
// 		currentAmount: number
// 		currentAccumulated: number
// 		timer: string | null
// 		isAccumulating: boolean
// 		balance: number
// 	}
// ) {
// 	const cookieStore = cookies()
// 	//@ts-ignore
// 	const supabase = await createClient(cookieStore)

// 	try {
// 		const { error } = await supabase
// 			.from('user_profiles')
// 			.update({
// 				current_amount: data.currentAmount,
// 				current_accumulated: data.currentAccumulated,
// 				timer_state: data.timer,
// 				is_accumulating: data.isAccumulating,
// 				balance: data.balance,
// 			})
// 			.eq('user_id', userId)

// 		if (error) throw error

// 		revalidatePath('/dashboard')
// 		return { success: true }
// 	} catch (error) {
// 		console.error('Error updating investment state:', error)
// 		return { success: false, error }
// 	}
// }

// // Get current investment state
// export async function getInvestmentState(userId: string) {
// 	const cookieStore = cookies()
// 	//@ts-ignore
// 	const supabase = await createClient(cookieStore)

// 	try {
// 		const { data, error } = await supabase
// 			.from('user_profiles')
// 			.select(
// 				'current_amount, current_accumulated, investment_start_time, timer_state, is_accumulating'
// 			)
// 			.eq('user_id', userId)
// 			.single()

// 		if (error) throw error

// 		return { success: true, data }
// 	} catch (error) {
// 		console.error('Error getting investment state:', error)
// 		return { success: false, error }
// 	}
// }

// Функция для завершения инвестиции
export async function completeInvestment(userId: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		const { data: profile, error: profileError } = await supabase
			.from('user_profiles')
			.select('current_amount, current_accumulated')
			.eq('user_id', userId)
			.single()

		if (profileError) throw profileError

		const { data, error } = await supabase
			.from('user_profiles')
			.update({
				is_accumulating: false,
				current_accumulated:
					profile.current_amount + profile.current_accumulated,
				updated_at: new Date().toISOString(),
			})
			.eq('user_id', userId)

		if (error) throw error

		revalidatePath('/dashboard')
		return { success: true, data }
	} catch (error) {
		console.error('Error completing investment:', error)
		return { success: false, error }
	}
}

// Обновленная функция startInvestment
export async function startInvestment(userId: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		// Get current profile
		const { data: profile, error: profileError } = await supabase
			.from('user_profiles')
			.select('cashback_balance')
			.eq('user_id', userId)
			.single()

		if (profileError) throw profileError

		const now = new Date().toISOString()

		// Start investment
		const { data, error } = await supabase
			.from('user_profiles')
			.update({
				cashback_balance: 0,
				current_amount: profile.cashback_balance,
				current_accumulated: 0,
				investment_start_time: now,
				is_accumulating: true,
				timer_state: '7:00:00:00',
				last_accumulation_update: now, // Добавляем время последнего обновления
			})
			.eq('user_id', userId)

		if (error) throw error

		// Запускаем первое обновление накопления
		const { error: rpcError } = await supabase.rpc('update_user_accumulation', {
			user_id_input: userId,
		})

		if (rpcError) {
			console.error('Error updating accumulation:', rpcError)
		}

		revalidatePath('/dashboard')
		return { success: true, data }
	} catch (error) {
		console.error('Error starting investment:', error)
		return { success: false, error }
	}
}

// Функция для проверки состояния накопления
export async function checkAccumulationStatus(userId: string) {
	const cookieStore = cookies() //@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		// Получаем логи накопления
		const { data: logs, error: logsError } = await supabase
			.from('accumulation_logs')
			.select('*')
			.eq('user_id', userId)
			.order('calculation_time', { ascending: false })
			.limit(5)

		if (logsError) throw logsError

		// Получаем текущее состояние
		const { data: profile, error: profileError } = await supabase
			.from('user_profiles')
			.select(
				`
        current_amount,
        current_accumulated,
        is_accumulating,
        last_accumulation_update,
				investment_start_time,
				cashback_balance
      `
			)
			.eq('user_id', userId)
			.single()

		if (profileError) throw profileError

		// Принудительно запускаем обновление
		const { error: rpcError } = await supabase.rpc('update_user_accumulation', {
			user_id_input: userId,
		})

		if (rpcError) throw rpcError

		return {
			success: true,
			data: {
				profile,
				logs,
			},
		}
	} catch (error) {
		console.error('Error checking accumulation status:', error)
		return { success: false, error }
	}
}

// Обновленная функция addToInvestment
// Обновленная функция addToInvestment
export async function addToInvestment(userId: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		// Получаем текущее состояние профиля
		const { data: profile, error: profileError } = await supabase
			.from('user_profiles')
			.select('cashback_balance, current_amount, current_accumulated')
			.eq('user_id', userId)
			.single()

		if (profileError) {
			console.error('Error fetching profile:', profileError)
			throw profileError
		}

		// console.log('Current state:', {
		// 	cashback_balance: profile.cashback_balance,
		// 	current_amount: profile.current_amount,
		// 	current_accumulated: profile.current_accumulated,
		// })

		// Добавляем новые средства к текущей инвестиции
		const { data, error } = await supabase
			.from('user_profiles')
			.update({
				current_amount: profile.current_amount + profile.cashback_balance, // Добавляем к текущей сумме
				cashback_balance: 0, // Обнуляем баланс кешбэка
				last_accumulation_update: new Date().toISOString(), // Обновляем время последнего обновления
			})
			.eq('user_id', userId)
			.select()

		if (error) {
			console.error('Error updating investment:', error)
			throw error
		}

		// console.log('Updated state:', data)

		// Принудительно обновляем кэш страницы
		revalidatePath('/dashboard')

		return {
			success: true,
			data: {
				newAmount: profile.current_amount + profile.cashback_balance,
				previousAmount: profile.current_amount,
				addedAmount: profile.cashback_balance,
			},
		}
	} catch (error) {
		console.error('Error adding to investment:', error)
		return { success: false, error }
	}
}

// Получение текущего состояния инвестиции
export async function getInvestmentState(userId: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		const { data, error } = await supabase
			.from('user_profiles')
			.select(
				`
        current_amount,
        current_accumulated,
        investment_start_time,
        timer_state,
        is_accumulating,
        updated_at
      `
			)
			.eq('user_id', userId)
			.single()

		if (error) throw error

		// Если есть активная инвестиция, проверяем не истек ли срок
		if (data.is_accumulating && data.investment_start_time) {
			const startTime = new Date(data.investment_start_time)
			const now = new Date()
			const diff = now.getTime() - startTime.getTime()
			const daysElapsed = diff / (1000 * 60 * 60 * 24)

			if (daysElapsed >= 7) {
				// Если прошло 7 дней, завершаем инвестицию
				await completeInvestment(userId)
				return getInvestmentState(userId)
			}
		}

		return { success: true, data }
	} catch (error) {
		console.error('Error getting investment state:', error)
		return { success: false, error }
	}
}
