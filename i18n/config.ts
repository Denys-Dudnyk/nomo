export type Locale = (typeof locales)[number]

export const locales = ['ua', 'en', 'pl', 'es'] as const
export const defaultLocale: Locale = 'ua'
