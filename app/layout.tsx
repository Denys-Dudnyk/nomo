import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Head from 'next/head'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
// import { Toaster } from 'sonner'
import { Toaster } from 'react-hot-toast'
import { UmamiScript } from '@/components/analytics/UmamiScript'

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
				<script
					defer
					src='https://cloud.umami.is/script.js'
					data-website-id='df605b01-6889-4d62-8805-e02c4962edfe'
				></script>
			</Head>

			<body className={`${inter.className} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<Header />
					{children}
					<UmamiScript />
					<Footer />
					<Toaster
						position='top-center'
						toastOptions={{
							style: {
								background: '#1f1f1f',
								color: '#fff',
								maxWidth: '600px',
								width: '100%',
							},
							success: {
								iconTheme: {
									primary: '#ff8d2a',
									secondary: '#1f1f1f',
								},
							},
						}}
					/>
				</NextIntlClientProvider>
				<Analytics />
			</body>
		</html>
	)
}
