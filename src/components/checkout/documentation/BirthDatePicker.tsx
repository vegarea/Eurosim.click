import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BirthDatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function BirthDatePicker({ value, onChange }: BirthDatePickerProps) {
  const [selectedYear, setSelectedYear] = useState<number>(value?.getFullYear() || 1990)
  const [selectedMonth, setSelectedMonth] = useState<number>(value?.getMonth() || 0)
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date())

  const handleYearChange = (year: string) => {
    const yearNum = parseInt(year)
    setSelectedYear(yearNum)
    
    const newDate = new Date(selectedDate)
    newDate.setFullYear(yearNum)
    setSelectedDate(newDate)
    onChange(newDate)
  }

  const handleMonthChange = (month: string) => {
    const monthNum = parseInt(month)
    setSelectedMonth(monthNum)
    
    const newDate = new Date(selectedDate)
    newDate.setMonth(monthNum)
    setSelectedDate(newDate)
    onChange(newDate)
  }

  const handleDaySelect = (date: Date | undefined) => {
    if (date) {
      const newDate = new Date(date)
      newDate.setFullYear(selectedYear)
      newDate.setMonth(selectedMonth)
      setSelectedDate(newDate)
      onChange(newDate)
    }
  }

  return (
    <div className="p-3 bg-white rounded-md border shadow-md">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Año</label>
          <Select
            value={selectedYear.toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 84 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Mes</label>
          <Select
            value={selectedMonth.toString()}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date(2000, i, 1)
                return (
                  <SelectItem key={i} value={i.toString()}>
                    {format(date, "MMMM", { locale: es })}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDaySelect}
        disabled={(date) =>
          date > new Date() || date < new Date("1940-01-01")
        }
        defaultMonth={selectedDate}
        className="rounded-md"
      />
    </div>
  )
}