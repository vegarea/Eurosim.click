import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react"

interface SocialMediaInputsProps {
  whatsapp: string
  setWhatsapp: (value: string) => void
  facebookUrl: string
  setFacebookUrl: (value: string) => void
  instagramUrl: string
  setInstagramUrl: (value: string) => void
  youtubeUrl: string
  setYoutubeUrl: (value: string) => void
  tiktokUrl: string
  setTiktokUrl: (value: string) => void
}

export function SocialMediaInputs({
  whatsapp,
  setWhatsapp,
  facebookUrl,
  setFacebookUrl,
  instagramUrl,
  setInstagramUrl,
  youtubeUrl,
  setYoutubeUrl,
  tiktokUrl,
  setTiktokUrl
}: SocialMediaInputsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp de atención al cliente</Label>
        <div className="flex items-center">
          <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
          <Input
            id="whatsapp"
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+34600000000"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="facebook">Link de Facebook</Label>
        <div className="flex items-center">
          <Facebook className="h-4 w-4 mr-2 text-blue-600" />
          <Input
            id="facebook"
            type="url"
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
            placeholder="https://facebook.com/tu-pagina"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="instagram">Link de Instagram</Label>
        <div className="flex items-center">
          <Instagram className="h-4 w-4 mr-2 text-pink-600" />
          <Input
            id="instagram"
            type="url"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            placeholder="https://instagram.com/tu-cuenta"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="youtube">Link de YouTube</Label>
        <div className="flex items-center">
          <Youtube className="h-4 w-4 mr-2 text-red-600" />
          <Input
            id="youtube"
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://youtube.com/tu-canal"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="tiktok">Link de TikTok</Label>
        <div className="flex items-center">
          <MessageCircle className="h-4 w-4 mr-2 text-gray-900" />
          <Input
            id="tiktok"
            type="url"
            value={tiktokUrl}
            onChange={(e) => setTiktokUrl(e.target.value)}
            placeholder="https://tiktok.com/@tu-cuenta"
          />
        </div>
      </div>
    </>
  )
}