'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { Product } from '@/types/database'

// Получение текущего партнера
async function getCurrentPartner() {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	const {
		data: { session },
	} = await supabase.auth.getSession()
	if (!session?.user) throw new Error('Not authenticated')

	const { data: partner } = await supabase
		.from('partner_profiles')
		.select('*')
		.eq('user_id', session.user.id)
		.single()

	if (!partner) throw new Error('Not a partner')
	return partner
}

// Получение продуктов с правильным join категорий
export async function getProducts() {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		const partner = await getCurrentPartner()

		const { data, error } = await supabase
			.from('products')
			.select(
				`
        *,
        category:category_id (
          id,
          name
        )
      `
			)
			.eq('partner_id', partner.user_id)
			.order('created_at', { ascending: false })

		if (error) throw error

		// Преобразуем данные для совместимости с интерфейсом
		const formattedData = data.map(product => ({
			...product,
			category: product.categories?.name,
		}))

		return { success: true, data: formattedData }
	} catch (error) {
		console.error('Error fetching products:', error)
		return { success: false, error }
	}
}

// Получение одного продукта с правильным join категорий
export async function getProduct(id: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		const partner = await getCurrentPartner()

		const { data, error } = await supabase
			.from('products')
			.select(
				`
        *,
        category:category_id (
          id,
          name
        )
      `
			)
			.eq('id', id)
			.eq('partner_id', partner.user_id)
			.single()

		if (error) throw error

		// Преобразуем данные для совместимости с интерфейсом
		const formattedData = {
			...data,
			category: data.categories?.name,
		}

		return { success: true, data: formattedData }
	} catch (error) {
		console.error('Error fetching product:', error)
		return { success: false, error }
	}
}

// Создание продукта
export async function createProduct(product: Partial<Product>) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		const partner = await getCurrentPartner()

		// Удаляем лишние поля и правильно обрабатываем category_id
		const { id, category, ...productData } = product

		const newProduct = {
			...productData,
			partner_id: partner.user_id,
			product_id: productData.product_id || `PRD-${Date.now()}`,
			internal_id: productData.internal_id || `INT-${Date.now()}`,
			// Убеждаемся, что category_id установлен
			category_id: productData.category_id || null,
		}

		const { data, error } = await supabase
			.from('products')
			.insert([newProduct])
			.select(
				`
        *,
        category:category_id (
          id,
          name
        )
      `
			)
			.single()

		if (error) throw error

		// Преобразуем данные для совместимости с интерфейсом
		const formattedData = {
			...data,
			category: data.categories?.name,
		}

		revalidatePath('/products')
		return { success: true, data: formattedData }
	} catch (error) {
		console.error('Error creating product:', error)
		return { success: false, error }
	}
}

// Обновление продукта
export async function updateProduct(id: string, updates: Partial<Product>) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		const partner = await getCurrentPartner()

		// Проверяем, принадлежит ли продукт партнеру
		const { data: existingProduct } = await supabase
			.from('products')
			.select('id')
			.eq('id', id)
			.eq('partner_id', partner.user_id)
			.single()

		if (!existingProduct) {
			throw new Error('Product not found or access denied')
		}

		// Удаляем поля, которые не должны быть в запросе обновления
		const { id: _, partner_id, category, ...updateData } = updates

		const { data, error } = await supabase
			.from('products')
			.update(updateData)
			.eq('id', id)
			.eq('partner_id', partner.user_id)
			.select(
				`
        *,
        category:category_id (
          id,
          name
        )
      `
			)
			.single()

		if (error) throw error

		// Преобразуем данные для совместимости с интерфейсом
		const formattedData = {
			...data,
			category: data.categories?.name,
		}

		revalidatePath('/products')
		revalidatePath(`/products/${id}`)
		return { success: true, data: formattedData }
	} catch (error) {
		console.error('Error updating product:', error)
		return { success: false, error }
	}
}

// Удаление продукта
export async function deleteProduct(id: string) {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		const partner = await getCurrentPartner()

		// Проверяем, принадлежит ли продукт партнеру
		const { data: existingProduct } = await supabase
			.from('products')
			.select('id')
			.eq('id', id)
			.eq('partner_id', partner.user_id)
			.single()

		if (!existingProduct) {
			throw new Error('Product not found or access denied')
		}

		const { error } = await supabase
			.from('products')
			.delete()
			.eq('id', id)
			.eq('partner_id', partner.user_id)

		if (error) throw error

		revalidatePath('/products')
		return { success: true }
	} catch (error) {
		console.error('Error deleting product:', error)
		return { success: false, error }
	}
}

// Получение категорий
export async function getCategories() {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		const { data, error } = await supabase
			.from('categories')
			.select('*')
			.order('name', { ascending: true })

		if (error) throw error

		return { success: true, data }
	} catch (error) {
		console.error('Error fetching categories:', error)
		return { success: false, error }
	}
}

// Получение продуктов для операции
export async function getProductsForOperation() {
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	try {
		const { data, error } = await supabase
			.from('products')
			.select(
				`
        id,
        name,
        description,
        price,
        image_path,
        category,
        unit
      `
			)
			.order('created_at', { ascending: false })

		if (error) throw error

		return { success: true, data }
	} catch (error) {
		console.error('Error fetching products:', error)
		return { success: false, error }
	}
}
