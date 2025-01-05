import Image from 'next/image'
import { StarRating } from './StarRating'

interface TestimonialCardProps {
	name: string
	surname: string
	avatar: string
	rating: number
	text: string
}

export const ReviewsItem = ({
	name,
	surname,
	avatar,
	rating,
	text,
}: TestimonialCardProps) => {
	return (
		<div className='bg-white rounded-3xl review-shadow pt-[26px] pb-[52px]  flex flex-col items-center w-full mx-auto max-w-[362px] h-full xl:max-h-[488px]'>
			<img
				src={avatar}
				alt={`${name} ${surname}`}
				className='w-[90px] h-[90px] rounded-full object-cover'
			/>
			<p className='text-[31px] font-bold m-0 max-w-[133px] text-center'>
				{name}
			</p>
			<div className='mt-[17px] mb-[17px] relative z-10'>
				<StarRating rating={rating} />
			</div>

			<div className='relative z-[1]'>
				<Image
					src={'/we/quotes-left.svg'}
					alt='Quotes Left'
					width={68}
					height={62}
					className='absolute left-[14px] -top-[30px]  -z-[1]'
				/>
				<p className='text-[18px] font-medium text-left px-[48px] '>{text}</p>
				<Image
					src={'/we/quotes-right.svg'}
					alt='Quotes Right'
					width={68}
					height={62}
					className='absolute right-[14px] -bottom-[10px]  -z-[1]'
				/>
			</div>
		</div>
	)
}
