

"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight } from "lucide-react"

// Define interface for product data
interface Product {
  id: number
  name: string
  price?: string
  prices?: [string, string] // Tuple type for special pricing
  unit: string
}

// Sample data with proper typing
const products: Product[] = [
  { id: 1, name: "Phone 123", price: "$150.50", unit: "Штука" },
  { id: 2, name: "Phone 123", price: "$150.50", unit: "Штука" },
  { id: 3, name: "Phone 123", prices: ["$150.50", "$200.00"], unit: "Штука" },
  { id: 4, name: "Phone 123", price: "$150.50", unit: "Штука" },
  { id: 5, name: "Phone 123", price: "$150.50", unit: "Штука" },
  { id: 6, name: "Phone 123", price: "$150.50", unit: "Штука" },
  { id: 7, name: "Phone 123", price: "$150.50", unit: "Штука" },
  { id: 8, name: "Phone 123", price: "$150.50", unit: "Штука" },
  { id: 9, name: "Phone 123", price: "$150.50", unit: "Штука" },
  { id: 10, name: "Phone 123", price: "$150.50", unit: "Штука" },
  { id: 11, name: "Phone 123", price: "$150.50", unit: "Штука" },
  { id: 12, name: "Phone 123", price: "$150.50", unit: "Штука" },
]

export function ProductsTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-normal text-gray-400">Назва</h2>
          <span className="text-orange-500">*</span>
        </div>
        <Select defaultValue="category">
          <SelectTrigger className="w-[120px] bg-[#FF8D2A] text-white hover:bg-[#b35429] border-none text-xs py-1 h-8">
            <SelectValue placeholder="Категорії" />
          </SelectTrigger>
          <SelectContent className="bg-[#1c1d20]  border-gray-800">
            <SelectItem value="category">Категорії</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-none border-x border-b border-gray-800 bg-[#121315]">
        <Table>
          <TableHeader>
            <TableRow className="border-t border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal text-xs h-8">Назва</TableHead>
              <TableHead className="text-gray-400 font-normal text-xs h-8">Ціна</TableHead>
              <TableHead className="text-gray-400 font-normal text-xs h-8">Одиниця</TableHead>
              <TableHead className="text-gray-400 font-normal text-xs h-8">Складники</TableHead>
              <TableHead className="text-gray-400 font-normal text-xs h-8">Деталі</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-gray-800 hover:bg-[#252629]">
                <TableCell className="font-normal text-gray-400 text-xs py-2">{product.name}</TableCell>
                <TableCell className="text-gray-400 text-xs py-2">
                  {product.prices ? (
                    <div className="flex flex-col">
                      <span className="order-gray-600 pb-0.5">
                        {product.prices[0]}
                      </span>
                      <span className="text-[#FF8D2A] pt-0.5">{product.price}</span>
                    </div>
                  ) : (
                    product.price
                  )}
                </TableCell>
                <TableCell className="text-gray-400 text-xs py-2">{product.unit}</TableCell>
                <TableCell className="py-2">
                   <Button
                     variant="ghost"
                     className="bg-[#FF8D2A]   bg-opacity-60 text-orange-400 hover:bg-[#FF8D2A] hover:bg-opacity-90 rounded-sm h-6 px-3 text-xs font-normal"
                     >
                     Складники
                     <ChevronRight />
                   </Button>
                 </TableCell>
                 <TableCell className="py-2">
                   <Button
                     variant="ghost"
                     className="bg-[#FF8D2A]  bg-opacity-60   text-orange-400 hover:bg-[#FF8D2A] hover:bg-opacity-90 rounded-sm h-6 px-3 text-xs font-normal"
                     >
                     Деталі
                     <ChevronRight />

                   </Button>
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-xs">Відображати по:</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-[50px] bg-transparent border-gray-800 text-gray-400 h-7 text-xs pl-2">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="bg-[#1c1d20] border-gray-800">
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <button className="px-2 py-1 text-gray-400 hover:text-gray-300">←</button>
          <button className="px-2 py-1 bg-[#FF8D2A] text-white">1</button>
          <button className="px-2 py-1 text-gray-400 hover:text-gray-300">2</button>
          <button className="px-2 py-1 text-gray-400 hover:text-gray-300">3</button>
          <span className="text-gray-400">...</span>
          <button className="px-2 py-1 text-gray-400 hover:text-gray-300">15</button>
          <button className="px-2 py-1 text-gray-400 hover:text-gray-300">→</button>
        </div>
      </div>
    </div>
  )
}

