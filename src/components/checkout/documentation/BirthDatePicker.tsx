import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRef } from "react"

interface BirthDatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function BirthDatePicker({ value, onChange }: BirthDatePickerProps) {
  const [currentDate, setCurrentDate] = useState<Date>(value || new Date())
  const [isOpen, setIsOpen] = useState(false)

  const handleYearChange = (year: string) => {
    const yearNum = parseInt(year)
    const newDate = new Date(currentDate)
    newDate.setFullYear(yearNum)
    setCurrentDate(newDate)
    onChange(newDate)
  }

  const handleMonthChange = (month: string) => {
    const monthNum = parseInt(month)
    const newDate = new Date(currentDate)
    newDate.setMonth(monthNum)
    setCurrentDate(newDate)
    onChange(newDate)
  }

  const handleDaySelect = (date: Date | undefined) => {
    if (date) {
      const newDate = new Date(date)
      // Mantener el año y mes seleccionados
      newDate.setFullYear(currentDate.getFullYear())
      newDate.setMonth(currentDate.getMonth())
      setCurrentDate(newDate)
      onChange(newDate)
      // Cerrar el calendario después de seleccionar una fecha
      setIsOpen(false)
    }
  }

  return (
    <div className="p-3 bg-white rounded-md border shadow-md">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Año</label>
          <Select
            value={currentDate.getFullYear().toString()}
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
            value={currentDate.getMonth().toString()}
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
        selected={value}
        onSelect={handleDaySelect}
        month={currentDate}
        disabled={(date) =>
          date > new Date() || date < new Date("1940-01-01")
        }
        className="rounded-md"
      />
    </div>
  )
}