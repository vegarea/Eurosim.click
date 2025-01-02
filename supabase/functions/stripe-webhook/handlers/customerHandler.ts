import { CustomerGender } from '../types/enums.ts'

function validateGender(gender: string | null): CustomerGender | null {
  if (!gender) return null
  console.log('🔍 Validating gender:', gender)
  const validGender = gender.toUpperCase() as CustomerGender
  const isValid = validGender === 'M' || validGender === 'F'
  console.log('Gender validation result:', isValid ? 'valid' : 'invalid')
  return isValid ? validGender : null
}

function formatDate(dateString: string | null): string | null {
  if (!dateString) return null
  console.log('🔍 Formatting date:', dateString)
  try {
    const date = new Date(dateString)
    const formattedDate = date.toISOString().split('T')[0]
    console.log('Formatted date:', formattedDate)
    return formattedDate
  } catch (error) {
    console.error('❌ Error parsing date:', dateString, error)
    return null
  }
}

function parseShippingAddress(addressString: string | null): any {
  if (!addressString) return null
  console.log('🔍 Parsing shipping address:', addressString)
  try {
    // Si ya es un objeto, lo retornamos directamente
    if (typeof addressString === 'object') return addressString
    // Si es un string, intentamos parsearlo
    const parsedAddress = JSON.parse(addressString)
    console.log('✅ Successfully parsed shipping address:', parsedAddress)
    return parsedAddress
  } catch (error) {
    console.error('❌ Error parsing shipping address:', error)
    return null
  }
}

function parseJsonMetadata(jsonString: string | null): any {
  if (!jsonString) return null
  try {
    return typeof jsonString === 'object' ? jsonString : JSON.parse(jsonString)
  } catch (error) {
    console.error('❌ Error parsing JSON metadata:', error)
    return null
  }
}

export async function handleCustomerCreation(session: any, supabase: any) {
  console.log('👤 Starting customer creation with metadata:', session.metadata)

  try {
    // Buscar cliente existente
    const { data: existingCustomer, error: searchError } = await supabase
      .from('customers')
      .select()
      .eq('email', session.customer_email)
      .maybeSingle()

    if (searchError) {
      console.error('❌ Error searching for existing customer:', searchError)
      throw searchError
    }

    if (existingCustomer) {
      console.log('✅ Customer already exists:', existingCustomer)
      return existingCustomer
    }

    // Parsear la dirección de envío de la metadata
    const shippingAddress = parseShippingAddress(session.metadata.shipping_address)
    console.log('📦 Parsed shipping address:', shippingAddress)

    // Preparar datos del cliente
    const customerData = {
      name: session.metadata.customer_name,
      email: session.customer_email,
      phone: session.metadata.customer_phone || null,
      passport_number: session.metadata.customer_passport || null,
      birth_date: formatDate(session.metadata.customer_birth_date),
      gender: validateGender(session.metadata.customer_gender),
      default_shipping_address: shippingAddress,
      stripe_customer_id: session.customer,
      metadata: {
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
        created_from: 'stripe_webhook',
        original_metadata: session.metadata
      }
    }

    console.log('📝 Attempting to create new customer with data:', customerData)

    const { data: customer, error: insertError } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single()

    if (insertError) {
      console.error('❌ Error inserting customer:', insertError)
      console.error('Insert error details:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      })
      throw insertError
    }

    console.log('✅ New customer created successfully:', customer)
    return customer
  } catch (error) {
    console.error('❌ Error in customer creation:', error)
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      details: error.details || 'No additional details'
    })
    throw error
  }
}