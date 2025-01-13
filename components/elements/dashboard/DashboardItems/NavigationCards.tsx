'use client'

import { Card } from '@/components/ui/card'
import { QrCode, UserPlus, Database, Wallet, Settings } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserProfile } from '@/types/database'
import { useEffect, useState } from 'react'
import SettingsModal from '@/components/ui/settings-modal'
import {
	getUserQRCode,
	getUserQRCodeId,
	isQRCodeVerified,
} from '@/app/actions/qr-code'
import { User } from '@supabase/supabase-js'
import { QRCodeModal } from '@/components/ui/QrModal/qr-code-modal'

interface NavigationCardsProps {
	userProfile?: UserProfile | null
	user: User
}

export default function NavigationCards({
	userProfile,
	user,
}: NavigationCardsProps) {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
	const isAdmin = userProfile?.role === 'admin'

	const [showQRCode, setShowQRCode] = useState(false)
	const [qrCodeId, setQrCodeId] = useState<string | null>(null)
	const [id, setId] = useState<string | null>(null)

	const [isVerified, setIsVerified] = useState(false)

	useEffect(() => {
		const fetchQRCode = async () => {
			try {
				const qrId = await getUserQRCode(user.id)
				setQrCodeId(qrId)
				const id = await getUserQRCodeId(qrId)

				setId(id)

				const verified = await isQRCodeVerified(qrId)
				setIsVerified(verified)
			} catch (error) {
				console.error('Error fetching QR code:', error)
			}
		}

		fetchQRCode()
	}, [user.id])

	return (
		<>
			<div className='flex justify-between gap-[10px]'>
				<div className='order-last sm:order-first'>
					{isAdmin && (
						<button
							className='text-accent hover:text-accenthover transition-colors'
							onClick={() => setIsSettingsOpen(true)}
						>
							<Settings className='h-[32px] w-[32px]' />
						</button>
					)}
				</div>
				<div
					className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-[10px]'
					style={{ maxWidth: '100%', width: '100%', height: 'auto' }}
				>
					{/* Первая карточка N-Inwest */}
					<Card
						className='flex items-center justify-center p-4 bg-[#1E2128] border-none  hover:bg-gray-800/50 transition-colors cursor-pointer rounded-[16px]'
						style={{ width: '100%', maxWidth: '386px', height: '214px' }}
					>
						<h3 className='font-light text-[#FFFFFF] text-[19px]'>N-Inwest</h3>
					</Card>

					{/* Остальные карточки */}
					<div className='grid grid-cols-2 gap-4 sm:gap-[10px] col-span-1 sm:col-span-2'>
						<button onClick={() => setShowQRCode(true)}>
							<Card
								className='flex items-center justify-center p-4 bg-[#1E2128] border-none  hover:bg-gray-800/50 transition-colors cursor-pointer rounded-[16px]'
								style={{ width: '100%', maxWidth: '185px', height: '103px' }}
							>
								<h3 className='font-medium text-gray-200'>QR-код</h3>
							</Card>
						</button>
						<Card
							className='flex items-center justify-center p-4 bg-[#1E2128] border-none  hover:bg-gray-800/50 transition-colors cursor-pointer rounded-[16px]'
							style={{ width: '100%', maxWidth: '185px', height: '103px' }}
						>
							<h3 className='font-medium text-gray-200'>Запросити друга</h3>
						</Card>

						<Card
							className='flex items-center justify-center p-4 bg-[#1E2128] border-none  hover:bg-gray-800/50 transition-colors cursor-pointer rounded-[16px]'
							style={{ width: '100%', maxWidth: '185px', height: '103px' }}
						>
							<h3 className='font-medium text-gray-200'>Дані</h3>
						</Card>

						<Card
							className='flex items-center justify-center p-4 bg-[#1E2128] border-none  hover:bg-gray-800/50 transition-colors cursor-pointer rounded-[16px]'
							style={{ width: '100%', maxWidth: '185px', height: '103px' }}
						>
							<h3 className='font-medium text-gray-200'>Баланс</h3>
						</Card>
					</div>
				</div>

				<SettingsModal
					isOpen={isSettingsOpen}
					onClose={() => setIsSettingsOpen(false)}
				/>
			</div>

			{qrCodeId && (
				<QRCodeModal
					isOpen={showQRCode}
					onClose={() => setShowQRCode(false)}
					qrValue={qrCodeId}
					isVerified={isVerified}
					id={id ?? ''}
				/>
			)}
		</>
	)
}
