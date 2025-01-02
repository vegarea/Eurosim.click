import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
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
  console.log('🔍 Parsing shipping address:', addressString)
  if (!addressString) {
    console.log('No shipping address provided')
    return null
  }
  try {
    if (typeof addressString === 'object') {
      console.log('Address is already an object')
      return Object.keys(addressString).length === 0 ? null : addressString
    }
    if (addressString === '{}' || addressString === '') {
      console.log('Empty address string')
      return null
    }
    const address = JSON.parse(addressString)
    console.log('Parsed address:', address)
    return Object.keys(address).length === 0 ? null : address
  } catch (error) {
    console.error('❌ Error parsing shipping address:', error)
    return null
  }
}

export async function handleCustomerCreation(session: any, supabase: any) {
  console.log('👤 Creating/updating customer with data:', {
    email: session.customer_email,
    metadata: session.metadata
  })

  try {
    // Buscar cliente existente
    console.log('🔍 Searching for existing customer with email:', session.customer_email)
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

    console.log('📝 Attempting to create new customer with data:', customerData)

    const { data: customer, error: insertError } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single()

    if (insertError) {
      console.error('❌ Error inserting customer:', insertError)
      throw insertError
    }

    console.log('✅ New customer created successfully:', customer)
    return customer
  } catch (error) {
    console.error('❌ Error in customer creation:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      details: error.details || 'No additional details'
    })
    throw error
  }
}