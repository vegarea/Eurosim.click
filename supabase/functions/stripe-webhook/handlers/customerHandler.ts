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

function formatShippingAddress(session: any): any {
  console.log('📦 Formatting shipping address from session:', session.shipping_details)
  
  if (!session.shipping_details?.address) {
    console.log('⚠️ No shipping details found in session')
    return null
  }

  const address = session.shipping_details.address
  const formattedAddress = {
    street: address.line1 + (address.line2 ? ` ${address.line2}` : ''),
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postal_code,
    phone: session.customer_details?.phone || null
  }

  console.log('📦 Formatted address:', formattedAddress)
  return formattedAddress
}

export async function handleCustomerCreation(session: any, supabase: any) {
  console.log('👤 Starting customer creation with metadata:', session.metadata)
  console.log('Shipping details:', session.shipping_details)

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

    const shippingAddress = formatShippingAddress(session)
    console.log('📦 Shipping address for customer:', shippingAddress)

    if (existingCustomer) {
      console.log('✅ Customer already exists:', existingCustomer)
      
      // Actualizar dirección si existe
      if (shippingAddress) {
        console.log('📦 Updating shipping address for existing customer')
        
        const { error: updateError } = await supabase
          .from('customers')
          .update({ default_shipping_address: shippingAddress })
          .eq('id', existingCustomer.id)

        if (updateError) {
          console.error('❌ Error updating customer shipping address:', updateError)
          throw updateError
        }
      }
      
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
      default_shipping_address: shippingAddress,
      stripe_customer_id: session.customer,
      metadata: {
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
        created_from: 'stripe_webhook',
        original_metadata: session.metadata
      }
    }

    console.log('📝 Creating new customer with data:', customerData)

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
    throw error
  }
}