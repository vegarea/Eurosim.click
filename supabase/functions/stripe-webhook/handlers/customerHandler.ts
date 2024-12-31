import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

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

    if (searchError) throw searchError

    if (existingCustomer) {
      console.log('Customer already exists:', existingCustomer)
      return existingCustomer
    }

    // Crear nuevo cliente
    const customerData = {
      name: session.metadata.customer_name,
      email: session.customer_email,
      phone: session.metadata.customer_phone,
      passport_number: session.metadata.customer_passport,
      birth_date: session.metadata.customer_birth_date,
      gender: session.metadata.customer_gender,
      default_shipping_address: session.metadata.shipping_address ? JSON.parse(session.metadata.shipping_address) : null,
      stripe_customer_id: session.customer,
    }

    const { data: customer, error: insertError } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single()

    if (insertError) throw insertError

    console.log('New customer created:', customer)
    return customer
  } catch (error) {
    console.error('Error in customer creation:', error)
    throw error
  }
}