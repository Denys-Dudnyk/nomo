import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { DialogTitle } from '@radix-ui/react-dialog'
import { KeyRound } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function PasswordChangeDialog() {
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const supabase = createClient()

	const handlePasswordChange = async () => {
		if (password !== confirmPassword) {
			toast.error('Паролі не співпадають')
			return
		}

		setLoading(true)
		try {
			const { error } = await supabase.auth.updateUser({
				password: password,
			})

			if (error) throw error

			toast.success('Пароль успішно змінено')
			setPassword('')
			setConfirmPassword('')
		} catch (error) {
			console.error('Error updating password:', error)
			toast.error(
				error instanceof Error ? error.message : 'Помилка зміни паролю'
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='w-full border-[#2C2F36] text-white hover:bg-[#2C2F36] p-3'>
					<KeyRound className='mr-2 h-4 w-4 ' />
					Змінити пароль
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-[#1C1E22] border-[#2C2F36] text-white'>
				<DialogHeader>
					<DialogTitle>Зміна паролю</DialogTitle>
				</DialogHeader>
				<div className='space-y-4 pt-4'>
					<Input
						type='password'
						placeholder='Новий пароль'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='bg-transparent border-[#2C2F36] text-white rounded-lg'
					/>
					<Input
						type='password'
						placeholder='Підтвердіть пароль'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						className='bg-transparent border-[#2C2F36] text-white rounded-lg'
					/>
					<Button
						onClick={handlePasswordChange}
						disabled={loading}
						className='w-full bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white p-3'
					>
						{loading ? 'Збереження...' : 'Зберегти'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
