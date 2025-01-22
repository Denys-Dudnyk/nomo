import { getCompanies } from '@/app/actions/companies'
import { CompanyList } from '@/components/elements/dashboard/companies/CompanyList'

export default async function CompaniesPage() {
	const companies = await getCompanies()

	return (
		<div className='min-h-screen bg-[#0f0f0f] text-white p-6'>
			<div className='max-w-5xl mx-auto'>
				<div className='flex justify-between items-center flex-col md:flex-row mb-8 gap-5  md:gap-0'>
					<h1 className='text-[20px] font-bold'>Керування бізнесами</h1>
					<div className='bg-accent text-[#fff] text-[20px] px-[60px] py-[20px] rounded-md w-full max-w-[380px] text-center '>
						{companies.length}
					</div>
				</div>

				<CompanyList initialCompanies={companies} />
			</div>
		</div>
	)
}
