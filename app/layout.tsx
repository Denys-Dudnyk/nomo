import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Head from 'next/head'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
	subsets: ['cyrillic'],
})

export const metadata: Metadata = {
	title: 'NomoCashback',
	description:
		'Кешбек за твоїми правилами. З nomo ти контролюєш свої вигоди. Обирай кешбек, який пасує твоїм потребам та отримуєш поверненя грошей за кожну покупку.',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages()
	return (
		<html lang={locale}>
			<Head>
				<meta
					name='google-site-verification'
					content='aW3Xlc5OqSPPscmVbpQrK3HXEbZ1_PLsVa-TMf-Ian4'
				/>
			</Head>

			<body className={`${inter.className} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<Header />
					{children}
					<Footer />
				</NextIntlClientProvider>
				<Analytics />
			</body>
		</html>
	)
}
