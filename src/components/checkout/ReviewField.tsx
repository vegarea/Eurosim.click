import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Pencil, Check, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReviewFieldProps {
  label: string
  value: string | Date
  onUpdate: (value: string | Date) => void
  type?: "text" | "date"
  isActivationDate?: boolean
}

export function ReviewField({ label, value, onUpdate, type = "text", isActivationDate = false }: ReviewFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(
    type === "date" && value instanceof Date ? format(value, "yyyy-MM-dd") : String(value)
  )

  const handleSave = () => {
    if (type === "date") {
      onUpdate(new Date(tempValue))
    } else {
      onUpdate(tempValue)
    }
    setIsEditing(false)
  }

  const displayValue = type === "date" && value instanceof Date
    ? format(value, "PPP", { locale: es })
    : String(value)

  return (
    <div className={cn(
      "flex items-center justify-between py-3 border-b transition-all duration-300",
      isActivationDate && "relative bg-blue-50/50 rounded-lg px-4 animate-float"
    )}>
      {isActivationDate && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full animate-pulse" />
      )}
      <div className="flex items-center gap-2">
        {isActivationDate && <Calendar className="h-4 w-4 text-blue-500" />}
        <span className={cn(
          "text-gray-600",
          isActivationDate && "font-medium text-blue-700"
        )}>{label}</span>
      </div>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="max-w-[200px]"
          />
          <Button size="icon" variant="ghost" onClick={handleSave}>
            <Check className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-medium",
            isActivationDate && "text-blue-700"
          )}>{displayValue}</span>
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}