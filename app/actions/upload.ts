'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

export async function uploadProductImage(file: File) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		// Convert File to Buffer
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		// Generate unique filename
		const fileExt = file.name.split('.').pop()
		const fileName = `${uuidv4()}.${fileExt}`
		const filePath = `products/${fileName}`

		// Upload to Supabase Storage
		const { error: uploadError } = await supabase.storage
			.from('products')
			.upload(filePath, buffer, {
				contentType: file.type,
				upsert: true,
			})

		if (uploadError) throw uploadError

		// Get public URL
		const {
			data: { publicUrl },
		} = supabase.storage.from('products').getPublicUrl(filePath)

		return { success: true, url: publicUrl }
	} catch (error) {
		console.error('Error uploading image:', error)
		return { success: false, error }
	}
}
