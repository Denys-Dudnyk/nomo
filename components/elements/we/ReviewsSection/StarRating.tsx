import { Star } from 'lucide-react'
import Image from 'next/image'

interface StarRatingProps {
	rating: number
}

export const StarRating = ({ rating }: StarRatingProps) => {
	return (
		<div className='flex gap-1 '>
			{[...Array(5)].map((_, index) => (
				<Image
					src={'/we/star.svg'}
					alt=''
					width={29}
					height={29}
					key={index}
					className={` ${
						index < rating ? 'fill-accent text-accent' : 'text-gray-300'
					}`}
				/>
			))}
		</div>
	)
}
