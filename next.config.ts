import createNextIntlPlugin from 'next-intl/plugin'

import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')
const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '5mb',
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'nndgocwwteltezwmynvh.supabase.co',
				// port: '',
				pathname: '/storage/v1/object/public/company-images/**',
				// search: '',
			},
			{
				protocol: 'https',
				hostname: 'nndgocwwteltezwmynvh.supabase.co',
				pathname: '/storage/v1/object/public/user-image/**', // Добавлено новое хранилище
			},
			{
				protocol: 'https',
				hostname: 'nndgocwwteltezwmynvh.supabase.co',
				pathname: '/storage/v1/object/public/products/**', // Добавлено новое хранилище
			},
		],
	},
}

export default withNextIntl(nextConfig)
