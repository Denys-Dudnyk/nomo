import { getProduct, getCategories } from '@/app/actions/products'
import ProductDetails from '@/components/elements/business/products/ProductsItems/ProductsDetail'

import { notFound } from 'next/navigation'

interface ProductPageProps {
	params: {
		id: string
	}
}

export default async function ProductPage({ params }: ProductPageProps) {
	const [productResult, categoriesResult] = await Promise.all([
		await getProduct(params.id),
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
