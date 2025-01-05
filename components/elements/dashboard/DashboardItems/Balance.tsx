import { Button } from '@/components/ui/button'
import { FC } from 'react'
import CardPreview from './CardPreview'
import { UserProfile } from '@/types/database'
import { useMediaQuery } from 'react-responsive'
interface NavigationCardsProps {
	balance: number
	profile: UserProfile
}

const Balance = ({ balance, profile }: NavigationCardsProps) => {
	const isMobile = useMediaQuery({ maxWidth: 1200 })

	return (
		<>
			<div className='flex justify-between items-center gap-[14px] flex-col md:flex-row text-center md:text-left'>
				<p className='text-[15px] text-[#919191] max-w-[700px] w-full'>
					Інвестор - особа або організація (зокрема комерційне підприємство,
					держава тощо), які розміщують капітал з метою подальшого отримання
					прибутку.
				</p>

				<div className='flex items-center gap-7 w-full max-w-[573px] bg-[#121212] px-[11px] py-[12px] rounded-[19px] h-[87px] balance-direction'>
					<Button className='bg-[#D9D9D9] text-[#000] text-[19px] font-normal  hover:bg-gray-200 rounded-none px-[35px] sm:px-[52px] py-[15px] sm:py-[20px]'>
						NomoGPT
					</Button>
					<div className='w-[1.5px] h-[52px] bg-[#2F2F2F] balance-line'></div>
					<div className='text-right flex justify-center items-center gap-7'>
						<div className='text-[15px] font-normal text-[#fff]'>Баланс:</div>
						<div className='text-[16px] font-normal text-[#80F8BF]'>
							${balance}
						</div>
					</div>
				</div>
			</div>
			{isMobile && (
				<div className='flex justify-center items-center'>
					<CardPreview cardHolder={profile?.full_name} />
				</div>
			)}
		</>
	)
}
export default Balance
