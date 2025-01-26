import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import TransactionsTable from './transactions-table'

interface PageProps {
	params: Promise<{ id: string }>
}

export default async function CompanyTransactionsPage({ params }: PageProps) {
	const { id } = await params
	const cookieStore = cookies()
	//@ts-ignore
	const supabase = await createClient(cookieStore)

	// Get current session for admin check
	const {
		data: { session },
	} = await supabase.auth.getSession()
	if (!session) {
		redirect('/auth/login')
	}

	// Get company data
	const { data: company } = await supabase
		.from('companies')
		.select('name')
		.eq('id', id)
		.single()

	if (!company) {
		redirect('/dashboard/companies')
	}

	return (
		<div className='min-h-screen bg-[#1A1A1A] text-white p-6'>
			<div className='max-w-[1200px] mx-auto'>
				<div className='mb-6'>
					<div className='flex items-center gap-1 text-sm text-gray-400 mb-2'>
						<span>Мій кабінет</span>
						<span>/</span>
						<span>Компанії</span>
						<span>/</span>
						<span className='text-[#FF6B00]'>Транзакції</span>
					</div>
					<h1 className='text-xl font-medium'>
						Транзакції компанії {company.name}
					</h1>
				</div>
				<TransactionsTable companyId={id} />
			</div>
		</div>
	)
}
