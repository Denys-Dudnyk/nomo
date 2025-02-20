'use client'

// import { AppSidebar } from "@/components/app-sidebar"
import { AppSidebar } from '@/components/elements/business/BusinessItems/app-sidebar'
// import { AppHeader } from "@/components/app-header"
import { AppHeader } from '@/components/elements/business/BusinessItems/app-header'
import { SidebarProvider } from '@/components/ui/sidebar'
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider>
			<div className='flex h-screen w-full bg-[#0f0f0f] text-foreground'>
				<AppSidebar />
				<div className='flex flex-col flex-1 overflow-hidden'>
					<AppHeader />
					<main className='flex-1  overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-lg'>
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}
