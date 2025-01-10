'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { QrCode } from 'lucide-react'
import { QRScanner } from './qr-scanner'

export function ScanButton() {
	const [showScanner, setShowScanner] = useState(false)

	const handleSuccess = () => {
		// Optionally refresh the transactions list or update UI
		window.location.reload()
	}

	return (
		<>
			<Button
				onClick={() => setShowScanner(true)}
				className='bg-[#ff6b00] hover:bg-[#ff6b00]/90 py-3'
			>
				<QrCode className='w-4 h-4 mr-2' />
				Scan QR Code
			</Button>

			<QRScanner
				isOpen={showScanner}
				onClose={() => setShowScanner(false)}
				onSuccess={handleSuccess}
			/>
		</>
	)
}
