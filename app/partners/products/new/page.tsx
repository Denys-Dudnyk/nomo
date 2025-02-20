import { getCategories } from '@/app/actions/products'
import ProductDetails from '@/components/elements/business/products/ProductsItems/ProductsDetail'

const emptyProduct = {
	id: '', // Пустой id для нового продукта
	name: '',
	price: 0,
	unit: 'Item',
	description: '',
	price_without_vat: 0,
	vat_percentage: 20,
	cashback_percentage: 0,
	cashback_amount: 0,
	product_id: '', // Будет сгенерирован автоматически
	internal_id: '', // Будет сгенерирован автоматически
}

export default async function NewProductPage() {
	const categoriesResult = await getCategories()
	const categories = categoriesResult.success ? categoriesResult.data : []

	return (
		<ProductDetails
			product={emptyProduct}
			categories={categories || []}
			isNew={true}
		/>
	)
}
