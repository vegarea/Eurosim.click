import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Pencil, Check } from "lucide-react"

interface ReviewFieldProps {
  label: string
  value: string | Date
  onUpdate: (value: string | Date) => void
  type?: "text" | "date"
}

export function ReviewField({ label, value, onUpdate, type = "text" }: ReviewFieldProps) {
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
    <div className="flex items-center justify-between py-3 border-b">
      <span className="text-gray-600">{label}</span>
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
          <span className="font-medium">{displayValue}</span>
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}