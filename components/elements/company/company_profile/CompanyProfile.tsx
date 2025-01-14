'use client'

import { Globe, Edit2 } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FaShareAlt, FaShareAltSquare } from 'react-icons/fa'

export default function CompanyProfile() {
    return (
        <div className="min-h-screen bg-black p-16">


            {/* Main Content */}
            <main className="max-w-[1440px] mx-auto px-4 py-6">
                <Card className="bg-[#1C1E22] border-0 rounded-xl mb-4">
                    <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-[#2C2F36] flex items-center justify-center">
                                    <img src="/cashback/item.svg" alt="Profile" className="w-full h-full rounded-full object-cover" />
                                </div>

                            </div>
                            <div>
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">

                                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-8">
                                        <div className="block items-center">

                                            <h2 className="text-white text-base font-normal mb-1">Максим Миколайчук</h2>
                                               
                                            <FaShareAlt className='text-white' />
                                               


                                        </div>
                                        <div className="block items-center">
                                            <div className="text-[#6D7380] text-xs mr-2">UID:</div>
                                            <div className="text-white text-md">497984402</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-8">
                                        <div className="block items-center">
                                            <div className="text-[#6D7380] text-xs mr-2">Рахунок:</div>
                                            <div className="text-white text-md">497984402</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Button
                            variant="outline"
                            className="border-[#FF6B08] text-[#FF6B08] hover:bg-[#FF6B08] hover:text-white rounded-lg px-6 h-9 text-sm"
                        >
                            Зберегти
                        </Button>
                    </div>
                </Card>

                <Card className="bg-[#1C1E22] border-0 rounded-xl">
                    <div className="p-4 md:p-6">
                        <h3 className="text-white text-base font-normal mb-6">ПІБ</h3>
                        <div className="space-y-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value="Максим Миколайчук"
                                    readOnly
                                    className="w-full bg-transparent border border-[#2C2F36] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2C2F36]"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6D7380] hover:text-white"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div>
                                <div className="text-[#6D7380] text-sm mb-2">Номер Телефону</div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value="+38 (068) 270-3170"
                                        readOnly
                                        className="w-full bg-transparent border border-[#2C2F36] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2C2F36]"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6D7380] hover:text-white"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <div className="text-[#6D7380] text-sm mb-2">Електронна Пошта</div>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value="qwerty@gmail.com"
                                        readOnly
                                        className="w-full bg-transparent border border-[#2C2F36] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2C2F36]"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6D7380] hover:text-white"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <div className="text-[#6D7380] text-sm mb-2">Пароль</div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value="••••••••••"
                                        readOnly
                                        className="w-full bg-transparent border border-[#2C2F36] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2C2F36]"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6D7380] hover:text-white"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    )
}

