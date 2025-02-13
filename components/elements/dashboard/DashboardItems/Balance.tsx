import { Button } from '@/components/ui/button'
import { FC, useEffect, useState } from 'react'
import CardPreview from './CardPreview'
import { UserProfile } from '@/types/database'
import { useMediaQuery } from 'react-responsive'
import InvestmentCard from './InvestmentCard'
import { useTranslations } from 'next-intl'

interface NavigationCardsProps {
	balance: number
	profile: UserProfile
}

const motivationalPhrases = [
	'Ти не повинен бути кращим за інших, ти маєш бути кращим за себе вчора.',
	'Всі труднощі - це можливість стати сильнішим.',
	'Якщо ти хочеш досягти великого, будь готовий до великих зусиль.',
	'Не чекай ідеальних умов - вони ніколи не будуть ідеальними. Почни зараз!',
	'Перемога не приходить до тих, хто чекає, а до тих, хто діє.',
	'Ти здатен на більше, ніж думаєш.',
	'Вір у свої сили, навіть коли інших у тебе немає.',
	'Не бійся помилок — вони твої кроки до успіху.',
	'Твій успіх залежить від того, наскільки сильно ти хочеш досягти мети.',
	'Ніколи не здавайся, бо саме в найтемніші моменти розцвітає найбільше світла.',
]

const Balance: FC<NavigationCardsProps> = ({ balance, profile }) => {
	const [currentPhrase, setCurrentPhrase] = useState('')
	const [typedText, setTypedText] = useState('')
	const [phraseIndex, setPhraseIndex] = useState(0)
	const isMobile = useMediaQuery({ maxWidth: 1200 })

	const t = useTranslations('dashboard')

	// Функция для получения мотивационной фразы по индексу
	const getMotivationalPhrase = (index: number): string =>
		t(`motivationalPhrases.${index}`)

	// Предположим, что всего определено 10 фраз (ключи 0...9)
	const totalPhrases = 10

	useEffect(() => {
		let typingTimeout: NodeJS.Timeout
		let phraseChangeTimeout: NodeJS.Timeout

		const currentPhrase = getMotivationalPhrase(phraseIndex)

		const typePhrase = (index: number = 0) => {
			if (index === 0) {
				setTypedText('') // Очищаем текст перед началом набора новой фразы
			}

			if (index < currentPhrase.length) {
				setTypedText(prev => prev + currentPhrase[index]) // Добавляем следующий символ
				typingTimeout = setTimeout(() => typePhrase(index + 1), 100) // Задержка между символами
			} else {
				// Через 10 секунд переключаемся на следующую фразу
				phraseChangeTimeout = setTimeout(() => {
					setPhraseIndex(prev => (prev + 1) % motivationalPhrases.length) // Следующий индекс
				}, 10000)
			}
		}

		typePhrase()

		return () => {
			clearTimeout(typingTimeout)
			clearTimeout(phraseChangeTimeout)
		}
	}, [phraseIndex]) // Перезапуск при изменении индекса

	return (
		<>
			<div className='flex justify-between items-center gap-[14px] flex-col md:flex-row text-center md:text-left'>
				<p className='text-[15px]  max-w-[700px] w-full bg-clip-text text-[#919191]'>
					{typedText}
				</p>

				<div className='flex items-center gap-7 w-full max-w-[573px] bg-[#121212] px-[11px] py-[12px] rounded-[19px] h-[87px] balance-direction'>
					<Button className='bg-[#D9D9D9] text-[#000] text-[19px] font-normal hover:bg-gray-200 rounded-none px-[35px] sm:px-[52px] py-[15px] sm:py-[20px]'>
						NomoGPT
					</Button>
					<div className='w-[1.5px] h-[52px] bg-[#2F2F2F] balance-line'></div>
					<div className='text-right flex justify-center items-center gap-7'>
						<div className='text-[15px] font-normal text-[#fff]'>
							{t('balanceLabel')}
						</div>
						<div className='text-[16px] font-normal text-[#80F8BF]'>
							₴{balance}
						</div>
					</div>
				</div>
			</div>
			{isMobile && (
				<div className='flex justify-center items-center '>
					{/* <CardPreview cardHolder={profile?.full_name} /> */}
					<InvestmentCard balance={profile?.cashback_balance} />
				</div>
			)}
		</>
	)
}

export default Balance
