import { useTranslations } from 'next-intl'

interface FilterModalProps {
	isFilterModalOpen: boolean
	handleCloseFilterModal: () => void
}

const FilterModal: React.FC<FilterModalProps> = ({
	isFilterModalOpen,
	handleCloseFilterModal,
}) => {
	if (!isFilterModalOpen) return null

	const t = useTranslations('cashback')

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
			role='dialog'
			aria-modal='true'
		>
			<div className='bg-white rounded-lg p-3 sm:p-4 max-w-xs sm:max-w-sm w-full mx-2 sm:mx-4'>
				<h2 className='text-sm sm:text-base font-bold text-accent mb-3 sm:mb-4 text-start'>
					{t('filtres')}
				</h2>
				<form className='grid grid-cols-1 gap-3 sm:gap-4'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
						<div>
							<h3 className='text-xs sm:text-sm font-medium text-gray-700 mb-2'>
								{t('categories')}:
							</h3>
							<div className='space-y-2'>
								{[
									{ key: 'electronic', label: t('electronic') },
									{ key: 'clothing', label: t('clothing') },
									{ key: 'travel', label: t('travel') },
									{ key: 'beauty_health', label: t('beauty_health') },
									{
										key: 'games_entertainment',
										label: t('games_entertainment'),
									},
								].map(({ key, label }) => (
									<label
										key={key}
										className='flex items-center text-gray-700 text-xs sm:text-sm'
									>
										<input type='checkbox' value={key} className='mr-2' />
										{label}
									</label>
								))}
							</div>
						</div>
						<div>
							<h3 className='text-xs sm:text-sm font-medium text-gray-700 mb-2'>
								{t('sorting_options')}:
							</h3>
							<div className='space-y-2'>
								{[
									{ key: 'by_max_cashback', label: t('by_max_cashback') },
									{ key: 'by_min_cashback', label: t('by_min_cashback') },
									{ key: 'by_new_companies', label: t('by_new_companies') },
								].map(({ key, label }) => (
									<label
										key={key}
										className='flex items-center text-gray-700 text-xs sm:text-sm'
									>
										<input type='checkbox' value={key} className='mr-2' />
										{label}
									</label>
								))}
							</div>
						</div>
					</div>

					<div>
						<h3 className='text-xs sm:text-sm font-medium text-gray-700 mb-2'>
							{t('offers')}:
						</h3>
						<div className='grid grid-cols-2 gap-3'>
							{[
								{ key: 'new', label: t('new') },
								{ key: 'hits', label: t('hits') },
							].map(({ key, label }) => (
								<label
									key={key}
									className='flex items-center text-gray-700 text-xs sm:text-sm'
								>
									<input type='checkbox' value={key} className='mr-2' />
									{label}
								</label>
							))}
						</div>
					</div>

					<div className='flex justify-end gap-3'>
						<button
							type='button'
							className='bg-gray-300 text-black text-xs sm:text-sm px-3 py-2 rounded hover:bg-gray-400 transition'
							onClick={handleCloseFilterModal}
						>
							{t('cancel')}
						</button>
						<button
							type='button'
							className='bg-accent text-white text-xs sm:text-sm px-3 py-2 rounded hover:bg-blue-600 transition'
							onClick={handleCloseFilterModal}
						>
							{t('apply')}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FilterModal
