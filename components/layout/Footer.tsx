import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Footer = () => {
	const t = useTranslations('footer')

	return (
		<footer className='bg-[#0F0F0F] text-[#fff] pt-5 pb-[80px] md:pb-[98px]'>
			<div className='containers mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-[90px] md:gap-[216px]'>
					{/* Contact Section */}
					<div className='mx-auto'>
						<h3 className='text-[25px] font-bold leading-[126%] tracking-[-4%] text-center mb-[13px]'>
							{t('contactTitle')}
						</h3>
						<div className='space-y-[27px]'>
							<div className='flex items-center gap-[30px]'>
								<Image
									src={'/footer/map.svg'}
									alt={t('altMap')}
									className=''
									width={38}
									height={55}
								/>
								<p className='text-[#fff] text-[16px] sm:text-[21px] font-medium'>
									{t('address')}
									<br />
									{t('address2')}
								</p>
							</div>
							<div className='flex items-center gap-[30px]'>
								<Image
									src={'/footer/phone.svg'}
									alt={t('altPhone')}
									className=''
									width={48}
									height={48}
								/>
								<p className='text-[#fff] text-[21px] font-medium'>
									{t('phone')}
								</p>
							</div>
							<div className='flex items-center gap-[30px]'>
								<Image
									src={'/footer/email.svg'}
									alt={t('altEmail')}
									className=''
									width={55}
									height={44}
								/>
								<p className='text-[#fff] text-[14px] sm:text-[21px] font-medium'>
									{t('email')}
								</p>
							</div>
						</div>
					</div>
					{/* Social Media Links */}
					<div className='mx-auto'>
						<h3 className='text-[25px] font-bold leading-[126%] tracking-[-4%] mb-6 uppercase text-center'>
							{t('socialMediaTitle')}
						</h3>
						<div className='flex gap-[12px] items-center justify-center'>
							<Link
								href='#'
								className='bg-white rounded-full hover:bg-gray-200 transition-colors'
							>
								<Image
									src={'/footer/facebook.svg'}
									alt={t('altFacebook')}
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
									alt={t('altInstagram')}
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
									alt={t('altTelegram')}
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
									alt={t('altX')}
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
