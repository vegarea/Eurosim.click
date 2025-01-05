import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MapPin } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { UseFormReturn } from "react-hook-form"
import { ShippingFormValues } from "./types"

interface AddressAutocompleteProps {
  form: UseFormReturn<ShippingFormValues>;
}

export function AddressAutocomplete({ form }: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const scriptLoadedRef = useRef(false)
  const { toast } = useToast()

  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const loadGoogleMapsScript = async () => {
      try {
        console.log("AddressAutocomplete - Fetching Google Maps API key...")
        const { data, error } = await supabase.functions.invoke('get-google-maps-key')
        
        if (error) {
          console.error('AddressAutocomplete - Error fetching Google Maps API key:', error)
          toast({
            title: "Error",
            description: "No se pudo cargar el autocompletado de direcciones",
            variant: "destructive",
          })
          return
        }

        const GOOGLE_MAPS_API_KEY = data?.GOOGLE_MAPS_API_KEY
        if (!GOOGLE_MAPS_API_KEY) {
          console.error('AddressAutocomplete - Google Maps API key not found in response')
          return
        }

        if (!window.google) {
          console.log("AddressAutocomplete - Loading Google Maps script...")
          const script = document.createElement('script')
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMaps`
          script.async = true
          script.defer = true
          
          window.initGoogleMaps = () => {
            console.log('AddressAutocomplete - Google Maps API loaded successfully')
            scriptLoadedRef.current = true
            initializeAutocomplete()
          }

          document.head.appendChild(script)
        } else {
          scriptLoadedRef.current = true
          initializeAutocomplete()
        }
      } catch (error) {
        console.error('AddressAutocomplete - Error in Google Maps initialization:', error)
        toast({
          title: "Error",
          description: "Hubo un problema al inicializar el autocompletado",
          variant: "destructive",
        })
      }
    }

    const initializeAutocomplete = () => {
      if (!inputRef.current || !window.google || autocompleteRef.current) return;
      
      console.log("AddressAutocomplete - Initializing autocomplete...")
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "mx" },
        fields: ["address_components", "formatted_address", "geometry"],
      })

      autocompleteRef.current.addListener("place_changed", () => {
        if (!autocompleteRef.current) return;
        
        const place = autocompleteRef.current.getPlace()
        console.log("AddressAutocomplete - Place selected:", place)
        
        if (place && place.address_components) {
          let address = {
            street: '',
            city: '',
            state: '',
            country: 'Mexico',
            postal_code: '',
            phone: form.getValues('shipping_address.phone') || ''
          }

          place.address_components.forEach(component => {
            const types = component.types

            if (types.includes('street_number')) {
              address.street = component.long_name + ' ' + address.street
            } else if (types.includes('route')) {
              address.street = address.street + ' ' + component.long_name
            } else if (types.includes('locality') || types.includes('sublocality')) {
              address.city = component.long_name
            } else if (types.includes('administrative_area_level_1')) {
              address.state = component.long_name
            } else if (types.includes('postal_code')) {
              address.postal_code = component.long_name
            }
          })

          // Limpiar la dirección
          address.street = address.street.trim()
          
          console.log("AddressAutocomplete - Setting address:", address)
          
          // Actualizar todo el objeto shipping_address de una vez
          form.setValue('shipping_address', address, { 
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
          })
          
          console.log("AddressAutocomplete - Form values after update:", form.getValues())
        }
      })
    }

    loadGoogleMapsScript()

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [form, toast])

  return (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Dirección
      </FormLabel>
      <FormControl>
        <Input
          ref={inputRef}
          value={form.watch('shipping_address.street')}
          onChange={(e) => form.setValue('shipping_address.street', e.target.value, { shouldValidate: true })}
          placeholder="Comienza a escribir tu dirección"
          className="transition-all duration-200 focus:scale-[1.01] pl-10"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
