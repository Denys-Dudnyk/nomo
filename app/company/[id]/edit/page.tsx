'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
// import CompanyEditForm from '@/components/CompanyEditForm'
import CompanyEditForm from '@/components/elements/company/Edit/company-edit-form'

interface EditPageProps {
	params: Promise<{ id: string }>
}

export default function EditCompanyPage({ params }: EditPageProps) {
	const { id } = use(params)
	const router = useRouter()

	const handleBack = () => {
		router.back()
	}

	return (
		<div>
			<CompanyEditForm params={{ id }} />
		</div>
	)
}
