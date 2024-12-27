import React from 'react'
import { Input } from "@/components/ui/input"

interface TableSearchProps {
  value: string
  onChange: (value: string) => void
}

export function TableSearch({ value, onChange }: TableSearchProps) {
  return (
    <Input
      placeholder="Buscar tablas..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-sm"
    />
  )
}