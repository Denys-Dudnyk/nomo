
export function LoadingSpinner() {
	return (
		<div className='flex items-center justify-center'>
			<div className='relative size-8'>
				<div className='absolute inset-0 rounded-full border-2 border-[#FF8A00] opacity-20'></div>
				<div className='absolute inset-0 rounded-full border-2 border-[#FF8A00] border-t-transparent animate-spin'></div>
			</div>
		</div>
	)
}

