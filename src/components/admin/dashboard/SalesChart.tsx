import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { formatCurrency } from "@/utils/currency"

interface SalesChartProps {
  data: Array<{
    date: string
    ventas: number
  }>
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card className="col-span-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50/50 to-white">
      <CardHeader>
        <CardTitle>Resumen de Ventas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E02653" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#E02653" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#666', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fill: '#666', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 shadow-lg rounded-lg border">
                        <p className="text-sm font-medium">{payload[0].payload.date}</p>
                        <p className="text-sm text-primary">
                          {formatCurrency(payload[0].value)}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="ventas"
                stroke="#E02653"
                strokeWidth={2}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}