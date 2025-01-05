import {
	MapPin,
	Phone,
	Mail,
	Facebook,
	Instagram,
	Twitter,
	Send,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
	return (
		<footer className='bg-[#0F0F0F] text-[#fff] pt-5 pb-[80px] md:pb-[98px]'>
			<div className='containers mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-[90px] md:gap-[216px]'>
					<div className='mx-auto'>
						<h3 className='text-[25px] font-bold leading-[126%] tracking-[-4%] text-center  mb-[13px]'>
							Зв’язок з нами
						</h3>
						<div className='space-y-[27px]'>
							<div className='flex items-center gap-[30px]'>
								<Image
									src={'/footer/map.svg'}
									alt={'map'}
									className=''
									width={38}
									height={55}
								/>
								<p className='text-[#fff] text-[16px] sm:text-[21px] font-medium'>
									вул. Івасюка, 84, Івано-Франківськ,
									<br />
									Івано-Франківська область, 76000
								</p>
							</div>
							<div className='flex items-center gap-[30px]'>
								<Image
									src={'/footer/phone.svg'}
									alt={'№1'}
									className=''
									width={48}
									height={48}
								/>
								<p className='text-[#fff] text-[21px] font-medium'>
									(480) 555-0103
								</p>
							</div>
							<div className='flex items-center gap-[30px]'>
								<Image
									src={'/footer/email.svg'}
									alt={'№1'}
									className=''
									width={55}
									height={44}
								/>
								<p className='text-[#fff] text-[14px] sm:text-[21px] font-medium'>
									curtis.weaver@example.com
								</p>
							</div>
						</div>
					</div>
					{/* Social Media Links */}
					<div className='mx-auto'>
						<h3 className='text-[25px] font-bold  leading-[126%] tracking-[-4%] mb-6 uppercase'>
							Слідкуй за нами у соцмережах!
						</h3>
						<div className='flex gap-[12px] items-center justify-center'>
							<Link
								href='#'
								className='bg-white  rounded-full hover:bg-gray-200 transition-colors'
							>
								<Image
									src={'/footer/facebook.svg'}
									alt={'Facebook'}
									className=''
									width={80}
									height={80}
								/>
							</Link>
							<Link
								href='#'
								className='rounded-full hover:bg-gray-200 transition-colors'
							>
								<Image
									src={'/footer/instagram.svg'}
									alt={'Facebook'}
									className=''
									width={80}
									height={80}
								/>
							</Link>
							<Link
								href='#'
								className='rounded-full hover:bg-gray-200 transition-colors'
							>
								<Image
									src={'/footer/telegram.svg'}
									alt={'Facebook'}
									className=''
									width={80}
									height={80}
								/>
							</Link>
							<Link
								href='#'
								className='rounded-full hover:bg-gray-200 transition-colors'
							>
								<Image
									src={'/footer/x.svg'}
									alt={'Facebook'}
									className=''
									width={80}
									height={80}
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
export default Footer
