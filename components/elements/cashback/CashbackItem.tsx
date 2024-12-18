import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

interface CashbackCardProps {
	id: number
	name: string
	logoUrl: string
	discount: number
	category?: string
	description?: string
	isActive: boolean
}

const CashbackItem = ({
	name,
	logoUrl,
	discount,
	category,
	isActive,
}: CashbackCardProps) => {
	return (
		<div className='bg-[#fff] rounded-[24px]  shadow-cashback hover:shadow-lg transition-all  w-[269px] '>
			<div className='flex flex-col justify-center items-center space-y-4 '>
				<Image src={logoUrl} alt={name} className='' width={269} height={183} />

				<div className=' flex items-center justify-center gap-2 mt-1'>
					<Image
						src={'/cashback/N.svg'}
						alt={name}
						className=''
						width={27}
						height={27}
					/>

					<span className='text-accent font-bold text-[25px]'>
						-{discount}%
					</span>
				</div>

				<div className='flex justify-between w-full mt-[10px] px-[44.5px] pb-[10px]'>
					<button
						className={`text-gray-600 hover:text-custom-orange transition-colors ${
							!isActive && 'opacity-50 cursor-not-allowed'
						}`}
						disabled={!isActive}
					>
						<Image
							src={'/cashback/cart.svg'}
							alt={name}
							className=''
							width={37}
							height={36}
						/>
					</button>
					<div className='w-[3px] bg-[#CECECE] rounded-full h-9' />
					<button
						className={`text-gray-600 hover:text-custom-orange transition-colors ${
							!isActive && 'opacity-50 cursor-not-allowed'
						}`}
						disabled={!isActive}
					>
						<Image
							src={'/cashback/favorite.svg'}
							alt={name}
							className=''
							width={37}
							height={36}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default CashbackItem
