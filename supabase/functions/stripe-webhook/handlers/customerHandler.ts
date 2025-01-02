import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { CustomerGender } from '../types/enums.ts'

// Función auxiliar para validar el género según el ENUM de la base de datos
function validateGender(gender: string | null): CustomerGender | null {
  if (!gender) return null
  // Validamos exactamente contra los valores del ENUM de la base de datos
  const validGender = gender.toUpperCase() as CustomerGender
  return validGender === 'M' || validGender === 'F' ? validGender : null
}

// Función auxiliar para convertir fecha al formato exacto de PostgreSQL
function formatDate(dateString: string | null): string | null {
  if (!dateString) return null
  try {
    const date = new Date(dateString)
    // Formato YYYY-MM-DD que espera PostgreSQL
    return date.toISOString().slice(0, 10)
  } catch (error) {
    console.error('Error parsing date:', dateString, error)
    return null
  }
}

// Función auxiliar para parsear dirección de envío
function parseShippingAddress(addressString: string | null): any {
  if (!addressString) return null
  try {
    // Si ya es un objeto, lo retornamos directamente
    if (typeof addressString === 'object') return addressString
    // Si es string vacío o {}, retornamos null
    if (addressString === '{}' || addressString === '') return null
    // Intentamos parsear el string
    return JSON.parse(addressString)
  } catch (error) {
    console.error('Error parsing shipping address:', addressString, error)
    return null
  }
}

export async function handleCustomerCreation(session: any, supabase: any) {
  console.log('Creating/updating customer with data:', {
    email: session.customer_email,
    metadata: session.metadata
  })

  try {
    // Buscar cliente existente
    const { data: existingCustomer, error: searchError } = await supabase
      .from('customers')
      .select()
      .eq('email', session.customer_email)
      .maybeSingle()

    if (searchError) {
      console.error('Error searching for existing customer:', searchError)
      throw searchError
    }

    if (existingCustomer) {
      console.log('Customer already exists:', existingCustomer)
      return existingCustomer
    }

    // Preparar datos del cliente con validaciones mejoradas
    const customerData = {
      name: session.metadata.customer_name,
      email: session.customer_email,
      phone: session.metadata.customer_phone || null,
      passport_number: session.metadata.customer_passport || null,
      birth_date: formatDate(session.metadata.customer_birth_date),
      gender: validateGender(session.metadata.customer_gender),
      default_shipping_address: parseShippingAddress(session.metadata.shipping_address),
      stripe_customer_id: session.customer,
      metadata: {
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
        created_from: 'stripe_webhook'
      }
    }

    console.log('Attempting to create new customer with transformed data:', customerData)

    const { data: customer, error: insertError } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting customer:', insertError)
      throw insertError
    }

    console.log('New customer created successfully:', customer)
    return customer
  } catch (error) {
    console.error('Error in customer creation:', error)
    throw error
  }
}