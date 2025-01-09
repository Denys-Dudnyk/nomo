import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcherDropdown from './language-switcher'
import LanguageSwitcher from './language-switcher'

export default function LocaleSwitcher() {
	const t = useTranslations('LocaleSwitcher')
	const locale = useLocale()

	return (
		<LanguageSwitcher
			defaultValue={locale}
			items={[
				{
					value: 'ua',
					label: t('ua'),
				},
				{
					value: 'en',
					label: t('en'),
				},
				{
					value: 'pl',
					label: t('pl'),
				},
				{
					value: 'es',
					label: t('es'),
				},
			]}
			label={t('label')}
		/>
	)
}
