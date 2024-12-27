import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ArticlesFilterProps {
  dateFilter: string
  viewsFilter: string
  onDateFilterChange: (value: string) => void
  onViewsFilterChange: (value: string) => void
}

export function ArticlesFilter({
  dateFilter,
  viewsFilter,
  onDateFilterChange,
  onViewsFilterChange,
}: ArticlesFilterProps) {
  return (
    <div className="flex gap-4">
      <Select value={dateFilter} onValueChange={onDateFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por fecha" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las fechas</SelectItem>
          <SelectItem value="today">Hoy</SelectItem>
          <SelectItem value="week">Esta semana</SelectItem>
          <SelectItem value="month">Este mes</SelectItem>
        </SelectContent>
      </Select>

      <Select value={viewsFilter} onValueChange={onViewsFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por vistas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las vistas</SelectItem>
          <SelectItem value="high">Más de 1000 vistas</SelectItem>
          <SelectItem value="medium">Entre 500 y 1000 vistas</SelectItem>
          <SelectItem value="low">Menos de 500 vistas</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}