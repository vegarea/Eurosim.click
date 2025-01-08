import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TopicsManagerProps {
  topics: string[]
  onTopicsChange: (topics: string[]) => void
}

export function TopicsManager({ topics, onTopicsChange }: TopicsManagerProps) {
  const [newTopic, setNewTopic] = useState("")

  const handleAddTopic = () => {
    if (!newTopic.trim()) return
    onTopicsChange([...topics, newTopic.trim()])
    setNewTopic("")
  }

  const handleRemoveTopic = (topicToRemove: string) => {
    onTopicsChange(topics.filter(topic => topic !== topicToRemove))
  }

  return (
    <div className="space-y-2">
      <Label>Temas para generar artículos</Label>
      <div className="flex gap-2">
        <Input
          placeholder="Añadir nuevo tema..."
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddTopic()}
        />
        <Button 
          onClick={handleAddTopic}
          disabled={!newTopic.trim()}
        >
          Añadir
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {topics.map((topic) => (
          <div
            key={topic}
            className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
          >
            <span>{topic}</span>
            <button
              onClick={() => handleRemoveTopic(topic)}
              className="text-secondary-foreground/70 hover:text-secondary-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}