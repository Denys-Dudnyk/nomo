import { Bell, Search, Settings, Settings2, SettingsIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function AppHeader() {
	return (
		<header className='sticky top-0 z-10  flex h-16 border-none shadow-none items-center gap-4 border-b border-border bg-[#121315] px-6 backdrop-blur'>
			{/* <SidebarTrigger className="bg-[#FF8D2A] text-white" /> */}
			<div>
				<SidebarTrigger className=' text-[#FF8D2A] block sm:hidden item-center z-50' />
			</div>
			<div className='ml-auto flex items-center gap-4'>
				{/* <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Пошук..." className="pl-8 bg-[#121315] border-gray w-[200px] lg:w-[300px] rounded-lg" />

          </div> */}
				<div className='relative w-[200px] lg:w-[300px]'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
					<Input
						placeholder='Пошук...'
						className='pl-10 bg-[#121315] border border-gray-600 w-full rounded-lg'
					/>
				</div>

				<Button variant='ghost' size='icon' className='relative'>
					<SettingsIcon className='h-5 w-5 text-white' />
					<span className='absolute top-1.5 right-1.5 h-2 w-2 bg-[#FF8D2A] rounded-full' />
				</Button>
				<Button variant='ghost' size='icon' className='relative'>
					<Bell className='h-5 w-5 text-white' />
					<span className='absolute top-1.5 right-1.5 h-2 w-2 bg-[#FF8D2A] rounded-full' />
				</Button>
			</div>
		</header>
	)
}
