import { Check, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { WorkflowItem as WorkflowItemType } from "../types/WorkflowTypes"

interface WorkflowItemProps {
  item: WorkflowItemType;
}

export function WorkflowItem({ item }: WorkflowItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 space-y-2 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-gray-500">{item.id}</span>
          <span className="font-medium">{item.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {item.status === 'working' ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <X className="h-5 w-5 text-red-500" />
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-600">{item.description}</p>
          {item.details && (
            <div className="text-sm bg-gray-50 p-2 rounded border text-gray-600">
              {item.details}
            </div>
          )}
        </div>
      )}
    </div>
  )
}