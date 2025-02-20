import { getProducts, getCategories } from '@/app/actions/products'
import { ProductsView } from '@/components/elements/business/products/Products'

export default async function ProductsPage() {
	const [productsResult, categoriesResult] = await Promise.all([
		getProducts(),
		getCategories(),
	])

	const products = productsResult.success ? productsResult.data : []
	const categories = categoriesResult.success ? categoriesResult.data : []

	return (
		<ProductsView
			initialProducts={products || []}
			categories={categories || []}
		/>
	)
}
