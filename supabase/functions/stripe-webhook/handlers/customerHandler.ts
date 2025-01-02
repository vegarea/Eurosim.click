import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { CustomerGender } from '../types/enums.ts'

function validateGender(gender: string | null): CustomerGender | null {
  if (!gender) return null
  console.log('🔍 Validando género:', gender)
  const validGender = gender.toUpperCase() as CustomerGender
  const isValid = validGender === 'M' || validGender === 'F'
  console.log('Resultado validación género:', isValid ? 'válido' : 'inválido')
  return isValid ? validGender : null
}

function formatDate(dateString: string | null): string | null {
  if (!dateString) return null
  console.log('🔍 Formateando fecha:', dateString)
  try {
    const date = new Date(dateString)
    const formattedDate = date.toISOString().split('T')[0]
    console.log('Fecha formateada:', formattedDate)
    return formattedDate
  } catch (error) {
    console.error('❌ Error parseando fecha:', dateString, error)
    return null
  }
}

function parseShippingAddress(addressString: string | null): any {
  console.log('🔍 Parseando dirección de envío:', addressString)
  if (!addressString) {
    console.log('No se proporcionó dirección')
    return null
  }
  try {
    if (typeof addressString === 'object') {
      console.log('La dirección ya es un objeto:', addressString)
      return Object.keys(addressString).length === 0 ? null : addressString
    }
    if (addressString === '{}' || addressString === '') {
      console.log('String de dirección vacío detectado')
      return null
    }
    const address = JSON.parse(addressString)
    console.log('Resultado del parseo de dirección:', address)
    return Object.keys(address).length === 0 ? null : address
  } catch (error) {
    console.error('❌ Error parseando dirección:', error)
    console.error('String de dirección original:', addressString)
    return null
  }
}

export async function handleCustomerCreation(session: any, supabase: any) {
  console.log('👤 Iniciando creación de cliente con datos:', {
    email: session.customer_email,
    metadata: session.metadata
  })

  try {
    // Buscar cliente existente
    console.log('🔍 Buscando cliente existente con email:', session.customer_email)
    const { data: existingCustomer, error: searchError } = await supabase
      .from('customers')
      .select()
      .eq('email', session.customer_email)
      .maybeSingle()

    if (searchError) {
      console.error('❌ Error buscando cliente existente:', searchError)
      throw searchError
    }

    if (existingCustomer) {
      console.log('✅ Cliente ya existe:', existingCustomer)
      return existingCustomer
    }

    // Preparar datos del cliente
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

    console.log('📝 Intentando crear nuevo cliente con datos:', customerData)

    const { data: customer, error: insertError } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single()

    if (insertError) {
      console.error('❌ Error insertando cliente:', insertError)
      console.error('Detalles del error de inserción:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      })
      throw insertError
    }

    console.log('✅ Nuevo cliente creado exitosamente:', customer)
    return customer
  } catch (error) {
    console.error('❌ Error en creación de cliente:', error)
    console.error('Detalles del error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      details: error.details || 'Sin detalles adicionales'
    })
    throw error
  }
}