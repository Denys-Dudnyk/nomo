import { createClient } from './client'

export function getStorageUrl(path: string | null): string | null {
	if (!path) return null

	// If the path is already a full URL, return it
	if (path.startsWith('http')) return path

	const supabase = createClient()

	try {
		const { data } = supabase.storage.from('company-images').getPublicUrl(path)

		return data?.publicUrl || null
	} catch (error) {
		console.error('Error getting storage URL:', error)
		return null
	}
}
