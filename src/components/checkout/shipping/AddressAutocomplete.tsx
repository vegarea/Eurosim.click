import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MapPin } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onAddressSelect: (address: google.maps.places.PlaceResult) => void
}

export function AddressAutocomplete({ value, onChange, onAddressSelect }: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    const loadGoogleMapsScript = async () => {
      const { data: { GOOGLE_MAPS_API_KEY } } = await supabase.functions.invoke('get-google-maps-key')
      
      if (!window.google) {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
        
        return new Promise<void>((resolve) => {
          script.onload = () => resolve()
        })
      }
    }

    loadGoogleMapsScript().then(() => {
      if (inputRef.current && window.google) {
        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "mx" },
          fields: ["address_components", "formatted_address"],
        })

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace()
          if (place) {
            onAddressSelect(place)
          }
        })
      }
    })

    return () => {
      // Cleanup if needed
    }
  }, [onAddressSelect])

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