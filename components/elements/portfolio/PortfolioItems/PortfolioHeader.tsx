

"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Search, Bell, Settings, User } from 'lucide-react';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



export function PortfolioHeader() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className=" top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 px-10 relative">
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            <div className="container flex h-14 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="hidden font-bold sm:inline-block"> PORTFOLIO</span>
                </Link>

                {/* Search Input (Desktop) */}
                <div className="hidden md:flex md:w-1/3 md:max-w-sm">
                    <div className="relative w-full">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Пошук"
                            className="w-64 pl-10 bg-[#0F0F0F] text-gray-300 placeholder-gray-500 border-0 border-b-2 border-gray-500 focus:outline-none focus:border-gray-300"
                        />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">


                    {/* Notification Icon */}
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>

                    {/* Settings Icon */}
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>

                    {/* User Profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/main/cropped_image.png" alt="@johndoe" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">John Doe</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        john.doe@example.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <Link href="/dashboard" passHref>
                                Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Mobile Menu Toggle Button */}
                <Button
                    variant="ghost"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </div>

            {/* Mobile Navigation and Search */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {/* Search Input (Mobile) */}
                        <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full pl-9"
                            />
                        </div>

                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="/placeholder.svg?heigh&width=40" alt="@johndoe" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">John Doe</div>
                                    <div className="text-sm font-medium text-gray-500">john.doe@example.com</div>
                                </div>
                                <Button variant="ghost" size="icon" className="ml-auto">
                                    <Bell className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                <Button variant="ghost" className="w-full justify-start">
                                    <User className="mr-2 h-4 w-4" />
                                    <Link href="/dashboard" passHref>

                                    <span>Profile</span>
                                    </Link>
                                </Button>
                                <Button variant="ghost" className="w-full justify-start">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </Button>
                                <Button variant="ghost" className="w-full justify-start">
                                    Log out
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

