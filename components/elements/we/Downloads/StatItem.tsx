import Image from 'next/image'
import { FC } from 'react'

interface StatItemProps {
	id: number
	image: string
	rate: string
	rateTitle: string
	width: number
	height: number
	paddingX: string
	paddingY: string
}

const StatItem = ({
	image,
	rate,
	rateTitle,
	width,
	height,
	paddingX,
	paddingY,
}: StatItemProps) => {
	return (
		<div
			className={`flex justify-center text-center items-center flex-col gap-[28px] bg-accent ${paddingX} ${paddingY}  rounded-[13px] w-full sm:w-[170px] h-[180px]`}
		>
			<Image src={image} alt={rateTitle} width={width} height={height} />
			<p className='text-[26px] font-bold text-[#fff] leading-[15px] tracking-wide'>
				{rate}
			</p>
			<p className='text-[18px] font-normal text-[#fff] leading-[15px] tracking-wide uppercase'>
				{rateTitle}
			</p>
		</div>
	)
}
export default StatItem
