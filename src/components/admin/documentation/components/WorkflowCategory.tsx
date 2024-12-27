import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { WorkflowCategory as WorkflowCategoryType } from "../types/WorkflowTypes"
import { WorkflowItem } from "./WorkflowItem"

interface WorkflowCategoryProps {
  category: WorkflowCategoryType;
}

export function WorkflowCategory({ category }: WorkflowCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const totalFlows = category.items.length;
  const pendingFlows = category.items.filter(item => item.status === 'pending').length;
  
  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">{category.title}</span>
          <span className="text-sm text-muted-foreground">
            ({totalFlows} flujos, {pendingFlows} pendientes)
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      
      {isExpanded && (
        <div className="space-y-2 ml-4">
          {category.items.map((item) => (
            <WorkflowItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}