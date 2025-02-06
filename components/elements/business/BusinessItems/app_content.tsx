

"use client"
import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const chartData = [
    { date: "01-08", value: 20 },
    { date: "07-10", value: 25 },
    { date: "07-11", value: 15 },
    { date: "07-12", value: 30 },
    { date: "07-13", value: 22 },
    { date: "07-14", value: 28 },
    { date: "07-15", value: 18 },
]

const transactions = [
    {
        id: "3321",
        image: "/main/ss.jpg", // Add the image path or URL here
        product: "Phone 123",
        price: "$150.50",
        total: "$469.89",
    },
    { id: "3322", image: "/main/ss.jpg", product: "Phone with long...", price: "$150.50", total: "$469.89" },
    { id: "3323", image: "/main/ss.jpg", product: "Phone 123", price: "$150.50", total: "$469.89" },
    { id: "3324", image: "/main/ss.jpg", product: "Phone 123", price: "$150.50", total: "$469.89" },
    { id: "3325", image: "/main/ss.jpg", product: "Phone 123", price: "$150.50", total: "$469.89" },
]

const popularItems = [
    {
        id: "product_code",
        image: "/main/ss.jpg",
        product: "Phone 123",
        code: "product_code",
        price: "$150.50",
        sold: 3321,
        profit: "$499,810.50",
        total: "$469.89",
    },
    {
        id: "w2r12fh",
        image: "/main/ss.jpg",
        product: "Phone with long name...",
        code: "w2r12fh",
        price: "$150.50",
        sold: 3321,
        profit: "$499,810.50",
        total: "$469.89",
    },
    {
        id: "k6m39hm",
        image: "/main/ss.jpg",
        product: "Phone 123",
        code: "k6m39hm",
        price: "$150.50",
        sold: 3321,
        profit: "$499,810.50",
        total: "$469.89",
    },
    {
        id: "m36b4d6",
        image: "/main/ss.jpg",
        product: "Phone 123",
        code: "m36b4d6",
        price: "$150.50",
        sold: 3321,
        profit: "$499,810.50",
        total: "$469.89",
    },
    {
        id: "n47b2t8",
        image: "/main/ss.jpg",
        product: "Phone 123",
        code: "n47b2t8",
        price: "$150.50",
        sold: 3321,
        profit: "$499,810.50",
        total: "$469.89",
    },
]

const metrics = [
    { label: "Баланс", amount: "$32,123.00", change: 2.2, isPositive: true },
    { label: "Дохід", amount: "$32,123.00", change: 1.1, isPositive: false },
    { label: "Витрати", amount: "$32,123.00", change: 2.2, isPositive: true },
]

export function MainContents() {
    const [colors, setColors] = useState({ background: "", foreground: "" })

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement)
        const background = rootStyles.getPropertyValue("--background").trim()
        const foreground = rootStyles.getPropertyValue("--foreground").trim()
        setColors({ background, foreground })
    }, [])

    return (
        <div className="content " style={{ backgroundColor: colors.background, color: colors.foreground }}>
            <div className="space-y-8 ">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-[#121315] text-[var(--foreground)] border-none shadow-none rounded-lg">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="space-y-1">
                                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Всього замовлень</p>
                                <p className="text-lg sm:text-2xl font-bold">142K</p>
                            </div>
                            <img
                                src="/business/save-money-finance-business-svgrepo-com.svg"
                                alt="Icon"
                                className="h-12 w-12 object-contain"
                            />
                        </CardContent>
                    </Card>
                    <Card className="bg-[#121315] text-[var(--foreground)] border-none shadow-none rounded-lg">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="space-y-1">
                                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Обсяг продажів</p>
                                <p className="text-lg sm:text-2xl font-bold">142K</p>
                            </div>
                            <img
                                src="/business/dollar-tag-finance-business-svgrepo-com.svg"
                                alt="Icon"
                                className="h-12 w-12 object-contain"
                            />
                        </CardContent>
                    </Card>
                    <Card className="bg-[#121315] text-[var(--foreground)] border-none shadow-none rounded-lg">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="space-y-1">
                                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Кількість клієнтів</p>
                                <p className="text-lg sm:text-2xl font-bold">142K</p>
                            </div>

                            <img
                                src="/business/structure-organization-finance-svgrepo-com.svg"
                                alt="Icon"
                                className="h-12 w-12 object-contain"
                            />
                        </CardContent>
                    </Card>
                    <Card className="bg-[#121315] text-[var(--foreground)] border-none shadow-none rounded-lg">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="space-y-1">
                                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Охоплений ринці</p>
                                <p className="text-lg sm:text-2xl font-bold">142K</p>
                            </div>

                            <img
                                src="/business/money-bag-finance-business-svgrepo-com.svg"
                                alt="Icon"
                                className="h-12 w-12 object-contain"
                            />
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-[#121315] text-[var(--foreground)] border-none shadow-none rounded-lg">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5">
                            <h3 className="text-lg text-white">Аналітика продажів</h3>
                            <Select defaultValue="week">
                                <SelectTrigger className="w-full sm:w-[180px] bg-transparent border-gray-700 text-gray-500">
                                    <SelectValue placeholder="Select timeframe" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1c1d20] text-white">
                                    <SelectItem value="day">День</SelectItem>
                                    <SelectItem value="week">Тиждень</SelectItem>
                                    <SelectItem value="month">Місяць</SelectItem>
                                    <SelectItem value="year">Рік</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="space-y-4 w-full sm:w-auto">

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {metrics.map((metric, index) => (
                                            <div key={index} className="flex flex-col items-start gap-2 p-2 rounded-lg">
                                                {/* Metric label on top */}
                                                <p className="text-sm text-gray-400">{metric.label}</p>

                                                <div className="flex items-center gap-4">
                                                    {/* Metric amount */}
                                                    <p className="text-lg font-medium text-white">{metric.amount}</p>

                                                    <div
                                                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${metric.isPositive ? "text-green-500 bg-green-900" : "text-red-500 bg-red-900"
                                                            }`}
                                                    >
                                                        {metric.isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                                                        <span>{`${metric.isPositive ? "+" : "-"}${metric.change}%`}</span>
                                                    </div>
                                                    {index < metrics.length - 1 && <div className="border-l border-gray-700 h-8"></div>}


                                                </div>

                                                {/* Conditionally render the divider only if it's not the last item */}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="h-[300px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#f97316" fill="url(#gradient)" strokeWidth={2} />
                                    <defs>
                                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#f97316" stopOpacity={0.2} />
                                            <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-5 lg:grid-cols-[1fr,2fr]">
                    <Card className="bg-[#121315] text-[var(--foreground)] border-none shadow-none rounded-lg">
                        <CardContent className="p-0 h-full rounded-lg">
                            <Table className="rounded-lg overflow-hidden">
                                <TableHeader>
                                    <TableRow className="bg-[#121315]">
                                        <TableHead>
                                            Аналітика продажів
                                        </TableHead>
                                        <TableHead className="text-right">•••</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="bg-[#121315] ">
                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id} className="hover:bg-[#1c1d1f]">
                                            <TableCell className="font-medium ">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={transaction.image || "/placeholder.svg"}
                                                        alt={transaction.product}
                                                        className="h-10 w-10 rounded-lg bg-gray-800"
                                                    />
                                                    <span className="whitespace-nowrap text-ellipsis max-w-[150px]">{transaction.product}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right whitespace-nowrap">{transaction.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#121315]  text-[var(--foreground)] border-none shadow-none rounded-lg">
                        <CardContent className="p-0 h-full rounded-lg">
                            <div className="flex justify-between items-center px-4 py-2">
                                <h2 className="text-lg font-bold">
                                Аналітика продажів


                                    
                                </h2>
                                <a href="#" className="text-sm text-gray-400 hover:underline">
                                    View all
                                </a>
                            </div>
                            <Table className="w-full rounded-lg overflow-hidden">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Назва товару</TableHead>
                                        <TableHead className="text-right">Ціна</TableHead>
                                        <TableHead className="text-right">Продано</TableHead>
                                        <TableHead className="text-right">Прибуток</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {popularItems.map((item) => (
                                        <TableRow key={item.id} className="bg-[#121315] hover:bg-[#1c1d1f]">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.image || "/placeholder.svg"}
                                                        alt={item.product}
                                                        className="h-10 w-10 rounded-lg bg-gray-800"
                                                    />
                                                    <div>
                                                        <p>{item.product}</p>
                                                        <span className="text-sm text-gray-500">{item.code}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">{item.price}</TableCell>
                                            <TableCell className="text-right">{item.sold}</TableCell>
                                            <TableCell className="text-right">{item.profit}</TableCell>
                                            <TableCell className="text-center text-gray-500">•••</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

