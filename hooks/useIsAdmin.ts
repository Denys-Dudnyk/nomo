'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function useIsAdmin() {
	const [isAdmin, setIsAdmin] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const checkAdminStatus = async () => {
			const supabase = createClient()

			try {
				const {
					data: { session },
				} = await supabase.auth.getSession()
				if (!session?.user) {
					setIsAdmin(false)
					return
				}

				const { data, error } = await supabase
					.from('user_profiles')
					.select('role')
					.eq('user_id', session.user.id)
					.single()

				if (error) throw error

				setIsAdmin(data?.role === 'admin')
			} catch (error) {
				console.error('Error checking admin status:', error)
				setIsAdmin(false)
			} finally {
				setLoading(false)
			}
		}

		checkAdminStatus()
	}, [])

	return { isAdmin, loading }
}
