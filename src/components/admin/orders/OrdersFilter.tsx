import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { statusConfig } from "./OrderStatusBadge"
import { OrderStatus } from "./types"

interface OrdersFilterProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: OrderStatus | "all"
  onStatusFilterChange: (value: OrderStatus | "all") => void
}

export function OrdersFilter({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: OrdersFilterProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Buscar por ID o cliente..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Select
        value={statusFilter}
        onValueChange={(value) => onStatusFilterChange(value as OrderStatus | "all")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          {Object.entries(statusConfig).map(([key, { label }]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}