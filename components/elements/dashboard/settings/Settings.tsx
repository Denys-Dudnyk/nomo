'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ChevronRight, Copy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { User } from '@supabase/supabase-js'
import { UserProfile } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { HelpAccordion } from './help-accordion'

interface SettingsContentProps {
	session: {
		user: User
	}
	profile: UserProfile
}

export default function Settings({ session, profile }: SettingsContentProps) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
	//   const { toast } = useToast()
	const [apiKeyCopied, setApiKeyCopied] = useState(false)

	return (
		<div className='min-h-screen bg-[#0f0f0f] py-4'>
			<div className='max-w-4xl mx-auto px-4'>
				<div className='flex items-center text-sm mb-6 text-muted-foreground'>
					<span>Мій Кабінет</span>
					<span className='mx-2'>/</span>
					<span>Settings</span>
				</div>

				<h1 className='text-4xl font-bold text-primary-foreground mb-8'>
					General profile settings
				</h1>

				<div className='space-y-4'>
					<SettingsCard title='Main options'>
						<SettingsItem
							label='Language'
							value='English'
							options={['English', 'Spanish', 'French', 'German']}
						/>
						<SettingsItem
							label='Currency'
							value='USD'
							options={['USD', 'EUR', 'GBP', 'JPY']}
						/>
						<SettingsItem
							label='Notifications'
							value='Important only'
							options={['All', 'Important only', 'None']}
						/>
					</SettingsCard>

					<SettingsCard title='Privacy'>
						<SettingsToggle label='Two-factor authentication' />
						<SettingsToggle label='Data access control' />
						<SettingsItem label='Activity history log' value='Enabled' />
					</SettingsCard>

					<SettingsCard title='Integrations'>
						<SettingsItem label='External services' value='None' />
						<div className='flex justify-between items-center py-2'>
							<Label className='text-primary-foreground'>API key</Label>
							<div className='flex items-center space-x-2'>
								<span className='text-muted-foreground'>#1a4c5d6</span>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => {
										navigator.clipboard.writeText('#1a4c5d6')
										setApiKeyCopied(true)
										setTimeout(() => setApiKeyCopied(false), 2000)
									}}
								>
									{apiKeyCopied ? (
										<Check className='h-4 w-4 text-green-500' />
									) : (
										<Copy className='h-4 w-4' />
									)}
								</Button>
							</div>
						</div>
					</SettingsCard>

					<SettingsCard title='Help'>
						<div className='space-y-4 block'>
							<HelpAccordion />
						</div>
					</SettingsCard>

					<SettingsCard title='Account control'>
						<SettingsItem label='Change password' value='Change' />
						<Button
							variant='ghost'
							className='w-full justify-between text-red-400 hover:text-red-300 hover:bg-red-900/20 py-4'
							onClick={() => setDeleteDialogOpen(true)}
						>
							Delete account
							<ChevronRight className='h-5 w-5 ml-2' />
						</Button>
						<Separator className='bg-muted/20 my-4' />
						<Button
							variant='ghost'
							className='w-full text-orange-400 hover:text-orange-300 hover:bg-orange-900/20 py-4'
							onClick={() => setLogoutDialogOpen(true)}
						>
							Log out
						</Button>
					</SettingsCard>
				</div>
			</div>

			<DeleteAccountDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
			/>
			<LogoutDialog
				open={logoutDialogOpen}
				onOpenChange={setLogoutDialogOpen}
			/>
			{/* <Toaster /> */}
		</div>
	)
}
// asdds
// bg-[#1a1a1a]
function SettingsCard({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) {
	return (
		<Card className='border border-gray-800 bg-[#0f0f0f] shadow-lg hover:shadow-xl transition-shadow duration-300'>
			<CardHeader className='px-6 py-4'>
				<CardTitle className='text-xl font-semibold text-primary-foreground'>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className='p-6 space-y-4'>{children}</CardContent>
		</Card>
	)
}

function SettingsItem({
	label,
	value,
	options,
}: {
	label: string
	value: string
	options?: string[]
}) {
	return (
		<div className='flex justify-between items-center py-2'>
			<Label className='text-primary-foreground'>{label}</Label>
			{options ? (
				<Select defaultValue={value}>
					{/* <SelectTrigger className="w-[180px]"> */}
					<SelectTrigger className='w-[180px] bg-transparent border border-gray-700 text-primary-foreground'>
						<SelectValue placeholder={value} />
					</SelectTrigger>
					<SelectContent>
						{options.map(option => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			) : (
				<span className='text-muted-foreground'>{value}</span>
			)}
		</div>
	)
}

function SettingsToggle({ label }: { label: string }) {
	return (
		<div className='flex justify-between items-center py-1'>
			<Label className='text-lg text-primary-foreground'>{label}</Label>
			<Switch className='data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 scale-125' />
		</div>
	)
}

function HelpLink({
	href,
	children,
}: {
	href: string
	children: React.ReactNode
}) {
	return (
		<Button
			variant='link'
			className='text-muted-foreground hover:text-primary-foreground p-0 h-auto text-lg block'
			asChild
		>
			<Link href={href}>{children}</Link>
		</Button>
	)
}

function DeleteAccountDialog({
	open,
	onOpenChange,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
}) {
	const [confirmation, setConfirmation] = useState('')
	const isConfirmed = confirmation === 'I agree'
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[500px] bg-[#1a1a1a] border border-[#0066FF]/20 p-10  rounded-sm'>
				<DialogHeader>
					<DialogTitle className='text-2xl text-[#FF3B3B] font-normal'>
						Delete account
					</DialogTitle>
				</DialogHeader>

				<div className='space-y-6 mt-2'>
					<p className='text-gray-200'>
						Are you sure, you want delete account?
					</p>

					<p className='text-gray-400 text-sm'>
						If you do this, all your personal information will be deleted and
						your wallet will be closed
					</p>

					<div className='space-y-2'>
						<p className='text-sm text-gray-400'>Type "I agree" to continue</p>
						<Input
							value={confirmation}
							onChange={e => setConfirmation(e.target.value)}
							placeholder='Enter confirmation'
							className='bg-[#1a1a1a] border-gray-700 text-gray-200'
						/>
					</div>

					<div className='grid grid-cols-2 gap-3'>
						<button
							onClick={() => onOpenChange(false)}
							className='w-full px-4 py-2 text-sm text-gray-200 border border-gray-700 rounded hover:bg-gray-800 transition-colors'
						>
							Cancel
						</button>
						<button
							onClick={() => {
								// Handle delete account logic here
								onOpenChange(false)
							}}
							disabled={!isConfirmed}
							className='w-full px-4 py-2 text-sm text-gray-200 bg-[#FF3B3B] rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF3B3B]/90 transition-colors'
						>
							Delete
						</button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

function LogoutDialog({
	open,
	onOpenChange,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[400px] bg-[#1a1a1a] border border-[#0066FF]/20 p-10'>
				<DialogHeader>
					<DialogTitle className='text-2xl text-center font-normal text-white'>
						Exit
					</DialogTitle>
				</DialogHeader>

				<div className='space-y-6'>
					<p className='text-center text-gray-200'>
						Are you sure, you want to exit?
					</p>

					<div className='grid grid-cols-2 gap-3'>
						<button
							onClick={() => onOpenChange(false)}
							className='w-full px-4 py-2 text-sm text-gray-200 border border-gray-700 rounded hover:bg-gray-800 transition-colors'
						>
							Cancel
						</button>
						<button
							onClick={() => {
								// Handle logout logic here
								onOpenChange(false)
							}}
							className='w-full px-4 py-2 text-sm text-[#FF3B3B] border border-gray-700 rounded hover:bg-gray-800 transition-colors'
						>
							Exit
						</button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
