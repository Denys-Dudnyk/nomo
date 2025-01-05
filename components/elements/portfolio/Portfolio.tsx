'use client'

import { PortfolioHeader } from './PortfolioItems/PortfolioHeader'
import { LeftPanel } from './PortfolioItems/Panels/LeftPanel'
import { RightPanel } from './PortfolioItems/Panels/RightPanel'

export default function HomePage() {
	return (
		<div className='bg-[#0F0F0F] min-h-screen text-white p-2'>
			{/* <PortfolioHeader /> */}
			<main className='p-4 flex flex-col justify-center items-center lg:items-start lg:justify-between lg:flex-row gap-[40px] mt-5 pt-5'>
				<LeftPanel />
				<RightPanel />
			</main>
		</div>
	)
}
