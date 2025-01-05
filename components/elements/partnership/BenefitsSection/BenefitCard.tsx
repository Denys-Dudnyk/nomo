import { cn } from '@/lib/utils'
import Image from 'next/image'

interface BenefitCardProps {
	icon: string
	title: string
	description: string
	className?: string
}

const BenefitCard = ({
	icon,
	title,
	description,
	className,
}: BenefitCardProps) => {
	return (
		<div className='relative w-full max-w-[350px]'>
			<div className='absolute -top-[35px] left-1/2 -translate-x-1/2 '>
				<div className='bg-[#0F0F0F] rounded-[38px] gradient-border  benefit-shadow'>
					<div className=' gradient-text text-[16px] leading-[126%] tracking-[-4%] font-bold py-[15px] px-[30px] rounded-[38px] w-fit uppercase text-center'>
						{title}
					</div>
				</div>
			</div>
			<div
				className={cn(
					'bg-[#D2D2DA] rounded-3xl px-[30px] shadow-lg transition-all duration-300',
					'flex flex-col gap-4 h-[585px]',
					className
				)}
			>
				<div className=' flex flex-col h-full mx-auto'>
					<p className=' text-[14px] leading-[23px] flex-grow text-[#000000] mt-[60px]'>
						{description}
					</p>

					<div className='flex items-center justify-center'>
						<Image src={icon} alt='' width={96} height={96} />
					</div>

					<div className='h-3 w-full bg-accent rounded-t-full mt-4' />
				</div>
			</div>
		</div>
	)
}

export default BenefitCard
