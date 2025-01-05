import { cookies } from 'next/headers'
import ResetPasswordForm from '@/components/elements/auth/reset-password-form'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
// import ResetPasswordLayout from './layout'
// import ResetPasswordProtection from '@/components/elements/auth/reset-password-protection'

export default async function ResetPasswordPage() {
	const cookieStore = cookies()
	// @ts-ignore
	const supabase = await createClient(cookieStore)

	// Check if there's a recovery session
	// const {
	// 	data: { session },
	// } = await supabase.auth.getSession()

	// If no session and no recovery email in query params, redirect to login
	// if (!session) {
	// 	redirect('/auth/login')
	// }

	const isResetting =
		(await cookieStore).get('resetting_password')?.value === 'true'

	if (!isResetting) {
		redirect('/auth/login')
	}

	return (
		<div className='min-h-screen flex items-center justify-center flex-col bg-[#fff]'>
			<div className='flex justify-center mb-[41px]'>
				<Image src={'/auth/logo.svg'} alt='Nomo' width={275} height={35} />
			</div>
			{/* <ResetPasswordProtection /> */}
			<ResetPasswordForm />
		</div>
	)
}
