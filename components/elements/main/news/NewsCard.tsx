import Image from 'next/image'

interface NewsCardProps {
	image: string
	title: string
	description: string
	date: string
}

const NewsCard: React.FC<NewsCardProps> = ({
	image,
	title,
	description,
	date,
}) => {
	return (
		<div className='group relative rounded-[28px] bg-gradient-to-r from-[#000] to-[#666666] overflow-hidden transition-all duration-300 hover:translate-y-[-4px]'>
			<div className='flex flex-col md:flex-row items-start  gap-6  h-[245px] w-full'>
				<div className=' '>
					<Image
						src={image}
						alt={title}
						className=''
						width={355}
						height={245}
					/>
				</div>
				<div className='flex flex-col flex-1 text-left space-y-6 py-6 mr-[22px] '>
					<h3 className='text-[18px] lg:text-[24px] font-bold text-[#fff]'>
						{title}
					</h3>
					<p className='text-[#fff] text-[14px] lg:text-[16px] leading-[24px]'>
						{description}
					</p>
					<p className='text-[#fff] text-[16px] leading-[24px] absolute bottom-6 right-[22px] self-end'>
						{date}
					</p>
				</div>
			</div>
		</div>
	)
}

export default NewsCard
