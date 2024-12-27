import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface WebhookItemProps {
  label: string;
  description: string;
  onTest: () => void;
}

export function WebhookItem({ label, description, onTest }: WebhookItemProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>{label}</Label>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <Switch />
      </div>
      <Input placeholder="URL del webhook de Make" />
      <Button
        variant="outline"
        size="sm"
        onClick={onTest}
      >
        Probar webhook
      </Button>
    </div>
  )
}