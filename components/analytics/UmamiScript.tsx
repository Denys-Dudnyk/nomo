'use client'

import Script from 'next/script'

export function UmamiScript() {
	return (
		<Script
			async
			src={`${process.env.NEXT_PUBLIC_UMAMI_HOST}/script.js`}
			data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
			strategy='afterInteractive'
		/>
	)
}
