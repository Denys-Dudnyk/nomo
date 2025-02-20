import { getProduct, getCategories } from '@/app/actions/products'
import ProductDetails from '@/components/elements/business/products/ProductsItems/ProductsDetail'
import { notFound } from 'next/navigation'

interface ProductPageProps {
	params: Promise<{
		id: string
	}>
}

// Указываем, что маршрут динамический (SSR):
export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params

	const [productResult, categoriesResult] = await Promise.all([
		getProduct(id),
		getCategories(),
	])

	if (!productResult.success || !productResult.data) {
		notFound()
	}

	const categories = categoriesResult.success ? categoriesResult.data : []

	return (
		<ProductDetails
			product={productResult.data}
			categories={categories || []}
		/>
	)
}
