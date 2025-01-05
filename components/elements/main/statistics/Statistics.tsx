import StatsCard from './StatsCard'

const generateMockData = (points: number) => {
	return Array.from({ length: points }, (_, i) => ({
		value: 40000 + Math.random() * 20000,
		compareValue: 40000 + Math.random() * 20000,
		month: new Date(2024, i).toLocaleString('uk-UA', { month: 'short' }),
	}))
}

const Statistics = () => {
	const mockData = {
		visits: generateMockData(12),
		users: generateMockData(12),
		transactions: generateMockData(12),
		crypto: generateMockData(12),
	}

	return (
		<section className={'mt-16'}>
			<div className='containers '>
				<h2 className='text-[52px] leading-[62.93px] text-[#000]'>
					<span className='text-[#7F7F7F]  font-normal  '>Block</span> N{' '}
					<span className='text-[#7F7F7F]  font-normal  '>сьогодні</span>
				</h2>
				<h3 className='text-[30px] sm:text-[52px] font-bold   leading-tight sm:leading-[62.93px] text-[#1D2733] mb-12'>
					Найновіша статистика мережі
				</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-[70px]'>
					<StatsCard title='Відвідано сайт' data={mockData.visits} />
					<StatsCard title='Користувачів зареєстровано' data={mockData.users} />
					<StatsCard
						title='Здійснено транзакцій'
						data={mockData.transactions}
					/>
					<StatsCard title='Нараховано криптвалюти' data={mockData.crypto} />
				</div>
			</div>
		</section>
	)
}
export default Statistics
