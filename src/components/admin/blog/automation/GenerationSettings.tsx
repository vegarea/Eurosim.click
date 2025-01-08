import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface GenerationSettingsProps {
  stylePrompt: string
  onStylePromptChange: (value: string) => void
  imagesStylePrompt: string
  onImagesStylePromptChange: (value: string) => void
  imagesPerParagraph: number
  onImagesPerParagraphChange: (value: number) => void
  generationFrequency: string
  onGenerationFrequencyChange: (value: string) => void
}

export function GenerationSettings({
  stylePrompt,
  onStylePromptChange,
  imagesStylePrompt,
  onImagesStylePromptChange,
  imagesPerParagraph,
  onImagesPerParagraphChange,
  generationFrequency,
  onGenerationFrequencyChange
}: GenerationSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Frecuencia de generación</Label>
        <select
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          value={generationFrequency}
          onChange={(e) => onGenerationFrequencyChange(e.target.value)}
        >
          <option value="7 days">7 días</option>
          <option value="14 days">14 días</option>
          <option value="1 month">1 mes</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Prompt general del estilo</Label>
        <Textarea 
          value={stylePrompt}
          onChange={(e) => onStylePromptChange(e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">
          Este prompt se usará como base para definir el estilo y tono de todos los artículos generados
        </p>
      </div>

      <div className="space-y-2">
        <Label>Estilo de imágenes</Label>
        <Textarea 
          value={imagesStylePrompt}
          onChange={(e) => onImagesStylePromptChange(e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">
          Este prompt se usará como base para generar las imágenes de los artículos
        </p>
      </div>

      <div className="space-y-2">
        <Label>Imágenes por párrafo</Label>
        <Input
          type="number"
          min={0}
          max={3}
          value={imagesPerParagraph}
          onChange={(e) => onImagesPerParagraphChange(parseInt(e.target.value))}
        />
      </div>
    </div>
  )
}