import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MapPin } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect: (address: google.maps.places.PlaceResult) => void;
}

export function AddressAutocomplete({ value, onChange, onAddressSelect }: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const scriptLoadedRef = useRef(false)
  const { toast } = useToast()

  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;

    const loadGoogleMapsScript = async () => {
      try {
        // Evitar cargar el script múltiples veces
        if (window.google?.maps || scriptLoadedRef.current) {
          initializeAutocomplete();
          return;
        }

        console.log("Fetching Google Maps API key...")
        const { data, error } = await supabase.functions.invoke('get-google-maps-key')
        
        if (error) {
          console.error('Error fetching Google Maps API key:', error)
          toast({
            title: "Error",
            description: "No se pudo cargar el autocompletado de direcciones",
            variant: "destructive",
          })
          return
        }

        const GOOGLE_MAPS_API_KEY = data?.GOOGLE_MAPS_API_KEY
        if (!GOOGLE_MAPS_API_KEY) {
          console.error('Google Maps API key not found in response')
          return
        }

        console.log("Loading Google Maps script...")
        scriptElement = document.createElement('script')
        scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
        scriptElement.async = true
        
        // Usar Promise para manejar la carga del script
        await new Promise<void>((resolve, reject) => {
          scriptElement!.onload = () => {
            console.log('Google Maps API loaded successfully')
            scriptLoadedRef.current = true
            resolve()
          }
          scriptElement!.onerror = () => {
            console.error('Error loading Google Maps script')
            reject(new Error('Failed to load Google Maps script'))
          }
          document.head.appendChild(scriptElement!)
        })

        initializeAutocomplete()
      } catch (error) {
        console.error('Error in Google Maps initialization:', error)
        toast({
          title: "Error",
          description: "Hubo un problema al inicializar el autocompletado",
          variant: "destructive",
        })
      }
    }

    const initializeAutocomplete = () => {
      if (!inputRef.current || !window.google?.maps || autocompleteRef.current) return;
      
      console.log("Initializing autocomplete...")
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "mx" },
        fields: ["address_components", "formatted_address"],
      })

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace()
        if (place) {
          console.log("Place selected:", place)
          onChange(place.formatted_address || "")
          onAddressSelect(place)
        }
      })
    }

    loadGoogleMapsScript()

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
      // Limpiar el script si existe
      if (scriptElement && document.head.contains(scriptElement)) {
        document.head.removeChild(scriptElement)
      }
    }
  }, [onAddressSelect, onChange, toast])

  return (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Dirección
      </FormLabel>
      <FormControl>
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Comienza a escribir tu dirección"
          className="transition-all duration-200 focus:scale-[1.01] pl-10"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}