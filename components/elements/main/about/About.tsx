import Image from 'next/image'

const About = () => {
	return (
		<>
			<section className={'mt-40 mb-16  flex items-center justify-center '}>
				<div className='containers text-[#1D2733]'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
						<div className='max-w-4xl'>
							<h2 className='text-[35px] sm:text-[52px]  leading-tight sm:leading-[62.93px]  font-bold mb-[30px]'>
								Інноваційна програма кешбеку
							</h2>
							<p className='text-base'>
								Наш проект пропонує інноваційну можливість отримувати кешбек за
								покупки через криптовалюту, що революціонує спосіб отримання
								винагороди за покупки.
							</p>
						</div>
						<div className='relative h-[400px] lg:h-[500px] flex justify-center items-center'>
							<Image
								src='/main/bg-about.png'
								alt='Кешбек програма ілюстрація'
								width={598}
								height={417}
								priority
								className='absolute'
							/>
						</div>
					</div>
				</div>
			</section>
			<section
				className={'pt-40 pb-16  flex items-center justify-center bg-[#799FFF]'}
			>
				<div className='containers text-[#1D2733]'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
						<div className='relative h-[400px] lg:h-[500px] flex justify-center items-center'>
							<Image
								src='/main/bg-about2.png'
								alt='Кешбек програма ілюстрація'
								width={645}
								height={387}
								priority
								className='absolute'
							/>
						</div>
						<div className='max-w-4xl'>
							<h2 className='text-[35px] sm:text-[52px]  leading-tight sm:leading-[62.93px] font-bold mb-[30px]'>
								Фінансова свобода
							</h2>
							<p className='text-base'>
								Наша програма кешбеку в криптовалюті дозволяє користувачам
								отримувати винагороду у вигляді криптовалюти, що забезпечує
								більшу фінансову свободу та контроль над їхніми активами.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className={'mt-40 mb-16  flex items-center justify-center '}>
				<div className='containers text-[#1D2733]'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
						<div className='max-w-4xl'>
							<h2 className='text-[35px] sm:text-[48px] lg:text-[52px] w-auto lg:w-[800px] font-bold mb-[30px] leading-tight sm:leading-[62.93px]'>
								Заохочення використання криптовалюти
							</h2>
							<p className='text-base'>
								Шляхом надання кешбеку через криптовалюту ми стимулюємо більше
								користувачів приймати участь у криптовалютних транзакціях та
								розвивати глобальну екосистему криптовалют.
							</p>
						</div>
						<div className='relative h-[400px] lg:h-[500px] flex justify-center items-center'>
							<Image
								src='/main/bg-about3.png'
								alt='Кешбек програма ілюстрація'
								width={662}
								height={377}
								priority
								className='absolute'
							/>
						</div>
					</div>
				</div>
			</section>

			<section
				className={'pt-40 pb-16  flex items-center justify-center bg-[#AB93CB]'}
			>
				<div className='containers text-[#1D2733]'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
						<div className='relative h-[400px] lg:h-[500px] flex justify-center items-center'>
							<Image
								src='/main/bg-about4.png'
								alt='Кешбек програма ілюстрація'
								width={379}
								height={404}
								priority
								className='absolute'
							/>
						</div>
						<div className='max-w-4xl'>
							<h2 className='text-[35px] sm:text-[52px]  leading-tight sm:leading-[62.93px] font-bold mb-[30px]'>
								Прозорість та безпека
							</h2>
							<p className='text-base'>
								Наша програма кешбеку працює на базі блокчейн-технології, що
								забезпечує високий рівень прозорості та безпеки транзакцій для
								всіх учасників.
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
export default About
