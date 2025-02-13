'use client'

import { getUserAcknowledgment } from '@/app/actions/users'
import { useState, useEffect } from 'react'

export function useAcknowledgmentStatus(userId: string) {
	const [hasAcknowledged, setHasAcknowledged] = useState<boolean | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const checkStatus = async () => {
			try {
				const status = await getUserAcknowledgment(userId)
				setHasAcknowledged(status)
			} catch (error) {
				console.error('Error checking acknowledgment status:', error)
				setHasAcknowledged(false)
			} finally {
				setLoading(false)
			}
		}

		checkStatus()
	}, [userId])

	return { hasAcknowledged, loading }
}
