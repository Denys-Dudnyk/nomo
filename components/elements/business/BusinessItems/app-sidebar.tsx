'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	BarChart3,
	Box,
	Building2,
	CircleDollarSign,
	FileText,
	Users,
	Settings,
	BookOpen,
	Users2,
	ArrowDownToLine,
	ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

import { OperationModal } from './Dialog/operation-modal'
import { useState } from 'react'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar'
import { useCompany } from '@/hooks/useCompany'

const sidebarItems = [
	// { title: "Аналітика", icon: BarChart3, path: "/business", hasDropdown: true },
	{
		title: 'Аналітика',
		icon: '/business/side.svg',
		path: '/partners',
		hasDropdown: true,
	},

	{
		title: 'Панель приладів',
		icon: '/business/side2.svg',
		path: '/partners/',
		hasDropdown: true,
	},
	{
		title: 'Продукти',
		icon: '/business/side3.svg',
		path: '/partners/products',
		hasDropdown: true,
	},
	{
		title: 'Постачальники',
		icon: '/business/side4.svg',
		path: '/partners/suppliers',
	},
	{ title: 'Склад', icon: '/business/side5.svg', path: '/business/inventory' },
	{
		title: 'Співробітники',
		icon: '/business/side6.svg',
		path: '/partners/employees',
	},
	{ title: 'Продажі', icon: '/business/side7.svg', path: '/business/sales' },
	{
		title: 'Бухгалтерський облік',
		icon: '/business/side8.svg',
		path: '/partners/accounting',
	},
	{ title: 'Клієнти', icon: '/business/side9.svg', path: '/business/clients' },
	{
		title: 'Інтеграції',
		icon: '/business/side10.svg',
		path: '/partners/integrations',
	},
]

export function AppSidebar() {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const pathname = usePathname()

	const [isModalOpen, setIsModalOpen] = useState(false)

	const { company } = useCompany()

	return (
		<Sidebar className='border-r  border-border bg-[#121315] leading-[2rem] border-none shadow-none text-white w-[257px] flex flex-col justify-between p-0'>
			{/* Sidebar Header */}
			<SidebarHeader className=' border-border py-4 pb-5 px-4 bg-[#121315]'>
				<div
					className={`flex items-center gap-3 ${
						isCollapsed ? 'justify-center' : ''
					}`}
				>
					{!isCollapsed && (
						<div className='flex items-center justify-end'>
							<img
								src='/business/Logo business.svg'
								alt='Nomocash Logo'
								className='w-32 h-auto object-contain'
							/>
						</div>
					)}
				</div>
			</SidebarHeader>

			{/* Sidebar Content */}
			<SidebarContent className='bg-[#121315] flex-grow py-2'>
				<SidebarMenu>
					{sidebarItems.map(item => (
						<SidebarMenuItem key={item.title} className='px-0'>
							<Button
								asChild
								variant='ghost'
								className={`w-full justify-between gap-2 px-4 py-2 rounded-none text-zinc-400 hover:bg-[#FF8D2A] hover:text-white group ${
									pathname === item.path ? 'text-[#FF8D2A]' : ''
								} ${isCollapsed ? 'justify-center' : ''}`}
							>
								{/* <Link href={item.path} className="flex items-center w-full">
                  <div className="flex items-center gap-3 flex-1">
                    <item.icon className="h-4 w-4 flex-shrink-0" />


                    <img src='/business/side.svg' alt="icon" className="h-5 w-5" />

                    {!isCollapsed && <span className="text-sm flex-grow text-left">{item.title}</span>}
                  </div>
                  {!isCollapsed && item.hasDropdown && <ChevronRight className="h-4 w-4" />}
                </Link> */}

								<Link
									key={item.title}
									href={item.path}
									className='flex items-center w-full'
								>
									<div className='flex items-center gap-3 flex-1'>
										{/* Conditionally render icon */}
										{typeof item.icon === 'string' ? (
											// Render the SVG image if item.icon is a string (SVG path)
											<img src={item.icon} alt='icon' className='h-5 w-5' />
										) : (
											// Render the React component if item.icon is a component
											<span>logo</span>
										)}

										{/* Display title */}
										{!isCollapsed && (
											<span className='text-sm flex-grow text-left'>
												{item.title}
											</span>
										)}
									</div>
									{!isCollapsed && item.hasDropdown && (
										<ChevronRight className='h-4 w-4' />
									)}
								</Link>
							</Button>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>

			{/* Sidebar Footer */}
			<SidebarFooter className='px-4 py-3 bg-[#121315] flex flex-col gap-2 '>
				{!isCollapsed && (
					<>
						<Button
							variant='default'
							className='bg-[#FF8D2A] text-white w-full py-2 px-3 rounded hover:bg-orange-600'
							onClick={() => setIsModalOpen(true)}
						>
							Сканувати
						</Button>
						<OperationModal
							isOpen={isModalOpen}
							onOpenChange={setIsModalOpen}
						/>
						<Button
							variant='default'
							className='bg-[#FF8D2A] text-white w-full py-2 px-3 rounded hover:bg-orange-600'
						>
							<Link href={`/partners/${company?.id}/settings`}>Дані</Link>
						</Button>
					</>
				)}
			</SidebarFooter>

			{/* Sidebar Rail */}
			<SidebarRail />
		</Sidebar>
	)
}
