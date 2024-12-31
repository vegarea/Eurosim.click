import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MapPin } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

declare global {
  interface Window {
    google: typeof google;
    initGoogleMaps: () => void;
  }
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect: (address: google.maps.places.PlaceResult) => void;
}

export function AddressAutocomplete({ value, onChange, onAddressSelect }: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const loadGoogleMapsScript = async () => {
      try {
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

        if (!window.google) {
          console.log("Loading Google Maps script...")
          window.initGoogleMaps = () => {
            console.log('Google Maps API loaded successfully')
            initializeAutocomplete()
          }

          const script = document.createElement('script')
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMaps`
          script.async = true
          script.defer = true
          document.head.appendChild(script)

          script.onerror = () => {
            console.error('Error loading Google Maps script')
            toast({
              title: "Error",
              description: "No se pudo cargar el mapa de Google",
              variant: "destructive",
            })
          }
        } else {
          initializeAutocomplete()
        }
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
      if (inputRef.current && window.google) {
        console.log("Initializing autocomplete...")
        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "mx" },
          fields: ["address_components", "formatted_address"],
        })

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace()
          if (place) {
            console.log("Place selected:", place)
            // Asegurarse de que el valor no sea undefined
            onChange(place.formatted_address || "")
            onAddressSelect(place)
          }
        })
      }
    }

    loadGoogleMapsScript()
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
          value={value || ""} // Asegurarse de que el valor no sea undefined
          onChange={(e) => onChange(e.target.value)}
          placeholder="Comienza a escribir tu dirección"
          className="transition-all duration-200 focus:scale-[1.01] pl-10"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}