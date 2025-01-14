'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const generateData = (points: number) => {
  return Array.from({ length: points }, (_, i) => ({
    name: i.toString(),
    value: Math.floor(Math.random() * (60 - 40) + 40),
  }))
}

export default function CompanyAnalysis() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white p-8 sm:p-8 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Статистика</span>
          <span className="text-gray-400">/</span>
          <Select defaultValue="silpo">
            <SelectTrigger className="w-[180px] bg-transparent border-0 text-white">
              <SelectValue placeholder="ТОВ 'Сільпо'" />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A2A] border-[#333333]">
              <SelectItem value="silpo">ТОВ "Сільпо"</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Клієнтів за день"
          value="372"
        />
        <MetricCard
          title="Клієнтів за місяць"
          value="13 000"
        />
        <MetricCard
          title="Оборот за сьогодні"
          value="12 000"
        />
        <MetricCard
          title="Оборот за місяць"
          value="321 000"
        />
        <MetricCard
          title="Дохід Кешбеку Nomo за Сьогодні"
          value="12 000"
        />
        <MetricCard
          title="Дохід Кешбеку Nomo за Місяць"
          value="321 000"
        />
        <MetricCard
          title="NCoin за день"
          value="22 000"
        />
        <MetricCard
          title="NCoin за місяць"
          value="321 000"
        />
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <ChartSection title="Оборот" data={generateData(12)} />
        <ChartSection title="Клієнти" data={generateData(24)} />
        
        <ChartSection title="Ncoin(Нараховано)" data={generateData(12)} />
        <ChartSection title="Ncoin(Ціна)" data={generateData(12)} />
      </div>
    </div>
  )
}

function MetricCard({ title, value }: { 
  title: string
  value: string
}) {
  return (
    <div className="bg-[#2A2A2A] p-4 rounded">
      <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}

function ChartSection({ title, data }: { title: string; data: any[] }) {
  return (
    <div className="bg-[#2A2A2A] p-4 rounded">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg">{title}</h2>
        <div className="flex items-center gap-2 text-sm">
          <button className="text-[#FF6B00]">День</button>
          <button className="text-gray-400">Місяць</button>
          <button className="text-gray-400">Рік</button>
        </div>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`gradient${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9333EA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#9333EA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              stroke="#333333" 
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              stroke="#666666"
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#666666"
              axisLine={false}
              tickLine={false}
              dx={-10}
              domain={[40, 60]}
              ticks={[40, 50, 60]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#9333EA"
              strokeWidth={2}
              fill={`url(#gradient${title})`}
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

