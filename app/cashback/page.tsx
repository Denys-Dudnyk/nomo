import Cashback from '@/components/elements/cashback/Cashback'
import { getCompanies } from '../actions/companies'
import { getUserProfile } from '@/lib/database'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
	//const supabase = await createClient() // Добавляем await

	// Получаем компании
	const companies = await getCompanies()

	// Получаем текущую сессию
	// const {
	// 	data: { session },
	// } = await supabase.auth.getSession()

	// let userProfile = null

	// if (session && session.user) {
	// 	// Получаем профиль пользователя
	// 	userProfile = await getUserProfile(session.user.id)
	// }

	return <Cashback initialCompanies={companies} />
}
