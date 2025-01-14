'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pencil } from 'lucide-react'

export default function CompanySettingsForm() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white p-6 sm:p-8 md:p-10">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400">
          <span>Мій кабінет</span>
          <span>/</span>
          <span className="text-[#FF6B00]">Керування Білінгом</span>
        </div>
        
        <h1 className="text-lg sm:text-xl font-medium mb-4 sm:mb-8">Налаштування облікового запису Компанії</h1>

        <div className="space-y-4 sm:space-y-6">
          {/* Company Logo and Name */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
            <div className="relative">
              <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-lg flex items-center justify-center">
                <div className="relative">
                  <div className="w-[120px] h-[120px] sm:w-40 sm:h-40 rounded-full bg-[#333333] flex items-center justify-center text-3xl sm:text-4xl font-bold">
                    N
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center border border-[#333333]">
                    <Pencil className="w-6 h-6 sm:w-8 sm:h-8" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-base sm:text-lg mb-3 sm:mb-4">Наша Компанія</h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <button className="px-4 sm:px-6 py-2 bg-[#2A2A2A] rounded text-xs sm:text-sm">
                  API Інтеграція
                </button>
                <button className="px-4 sm:px-6 py-2 bg-[#FF6B00] rounded text-xs sm:text-sm">
                  Транзакції Користувача
                </button>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="space-y-6 sm:space-y-8">
            {/* Company Information */}
            <section>
              <h3 className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Інформація Про Компанію</h3>
              <div className="space-y-3">
                <Input 
                  placeholder="Номер Телефону" 
                  className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm"
                />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm"
                />
                <Input 
                  placeholder="Адреса" 
                  className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm"
                />
              </div>
            </section>

            {/* Additional Information */}
            <section>
              <h3 className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Додатково</h3>
              <div className="space-y-3">
                <Input 
                  placeholder="Коротка Назва Компанії" 
                  className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm"
                />
                <Input 
                  placeholder="Повна Назва Компанії" 
                  className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm"
                />
                <Select>
                  <SelectTrigger className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-gray-400 rounded-sm">
                    <SelectValue placeholder="Категорія Бізнесу" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-[#333333] rounded-sm">
                    <SelectItem value="retail">Роздрібна торгівля</SelectItem>
                    <SelectItem value="wholesale">Оптова торгівля</SelectItem>
                    <SelectItem value="services">Послуги</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder="Юридична Адреса" 
                  className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm"
                />
                <Input 
                  placeholder="Фізична Адреса" 
                  className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm"
                />
                <Input 
                  placeholder="ЄДРПОУ" 
                  className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm"
                />
                <Select>
                  <SelectTrigger className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-gray-400 rounded-sm">
                    <SelectValue placeholder="Схема Оподаткування" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-[#333333] rounded-sm">
                  <SelectItem value="scheme1">Схема Оподаткування</SelectItem>
                    <SelectItem value="scheme1">Схема 1</SelectItem>
                    <SelectItem value="scheme2">Схема 2</SelectItem>
                  </SelectContent>
                </Select>
                 <Select>
                  <SelectTrigger className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-gray-400 rounded-sm">
                    <SelectValue placeholder="Група Оподаткування" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-[#333333] rounded-sm">
                  <SelectItem value="group1">Група Оподаткування</SelectItem>

                    <SelectItem value="group1">Група 1</SelectItem>
                    <SelectItem value="group2">Група 2</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder="Свідоцтво" 
                  className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-gray-500 rounded-sm"
                />
                
               
                <Select>
                  <SelectTrigger className="w-full bg-[#2A2A2A] border-0 h-10 sm:h-12 text-sm sm:text-base text-gray-400 rounded-sm">
                    <SelectValue placeholder="ПДВ" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-[#333333] rounded-sm">
                    <SelectItem value="yes">Так</SelectItem>
                    <SelectItem value="no">Ні</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            {/* Partner Discount */}
            <section>
              <h3 className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Партнерська Знижка</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-accent h-10 sm:h-12 flex items-center px-3 rounded-sm">
                    <span className="text-sm sm:text-base text-white">Базова знижка</span>
                  </div>
                  <input 
                    type="hidden" 
                    name="baseDiscount"
                    value="0.00"
                  />
                  <span className="text-[#FF6B00] w-16 text-right text-sm sm:text-base">0.00%</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-accent h-10 sm:h-12 flex items-center px-3 rounded-sm">
                    <span className="text-sm sm:text-base text-white">Додаткова знижка</span>
                  </div>
                  <input 
                    type="hidden" 
                    name="additionalDiscount"
                    value="0.00"
                  />
                  <span className="text-[#FF6B00] w-16 text-right text-sm sm:text-base">0.00%</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-accent h-10 sm:h-12 flex items-center px-3 rounded-sm">
                    <span className="text-sm sm:text-base text-white">Бонус</span>
                  </div>
                  <input 
                    type="hidden" 
                    name="bonus"
                    value="0.00"
                  />
                  <span className="text-[#FF6B00] w-16 text-right text-sm sm:text-base">0.00%</span>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                className="w-full sm:w-60 h-10 sm:h-12 bg-[#2A2A2A] hover:bg-[#333333] text-white border-0 text-sm sm:text-base"
              >
                Відмінити
              </Button>
              <Button 
                className="w-full sm:w-60 h-10 sm:h-12 bg-accent hover:bg-[#FF7B1A] text-white border-0 text-sm sm:text-base"
              >
                Застосувати
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

