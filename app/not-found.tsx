import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {
	return (
		<div className='flex flex-col items-center justify-center  text-foreground'>
			<Image src={'/404.svg'} alt='404' width={600} height={600} />
			<h2 className='text-[54px] font-extrabold leading-[72.9px] mb-[37px] text-black'>
				<span className='relative z-10'>
					Упссс... У{' '}
					<span className='absolute -bottom-[15px] left-0 h-[9px] w-[90%] bg-accent  -z-10 rounded-full'></span>
				</span>
				<span className='relative z-10'>
					р
					<span className='absolute  -bottom-[15px] -left-[13px] h-[9px] w-[49px] bg-accent -z-10 rounded-full '></span>
				</span>
				<span className='relative z-10'>
					озробці
					<span className='absolute  -bottom-[15px] left-5 h-[9px] w-[90%] bg-accent -z-10 rounded-full '></span>
				</span>
			</h2>

			<Link
				href='/'
				className='text-accent px-[60px] py-[14px] leading-[24.2px] text-[20px] font-bold border rounded-[41px] border-accent hover:border-accenthover hover:text-accenthover transition-colors mb-[160px]'
			>
				Повернутися на головну сторінку
			</Link>
		</div>
	)
}
