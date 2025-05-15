
import * as React from "react"
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from "recharts"

interface ChartProps {
  data: any[];
  options?: any;
  className?: string;
}

export const BarChart = ({ data, options, className }: ChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data && data.length > 0 && data[0] && Object.keys(data[0]).map(key => {
            if (key !== 'name') {
              return (
                <Bar key={key} dataKey={key} fill={options?.datasets?.[0]?.backgroundColor || '#82ca9d'} />
              )
            }
            return null
          })}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export const LineChart = ({ data, options, className }: ChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data && data.length > 0 && data[0] && Object.keys(data[0]).map(key => {
            if (key !== 'name') {
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={options?.datasets?.[0]?.borderColor || '#8884d8'}
                  fill={options?.datasets?.[0]?.backgroundColor}
                  activeDot={{ r: 8 }}
                />
              )
            }
            return null
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const PieChart = ({ data, options, className }: ChartProps) => {
  const COLORS = options?.datasets?.[0]?.backgroundColor || ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}
