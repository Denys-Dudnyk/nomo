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
		],
	},
}

export default withNextIntl(nextConfig)
