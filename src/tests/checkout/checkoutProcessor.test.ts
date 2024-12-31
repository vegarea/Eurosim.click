import { describe, it, expect, vi } from 'vitest'
import { CheckoutProcessor } from '@/components/checkout/utils/checkoutProcessor'
import { OrderItem } from '@/types/database/orderItems'

describe('CheckoutProcessor', () => {
  const mockFormData = {
    email: 'test@example.com',
    name: 'Test User',
    passport_number: 'AB123456',
    birth_date: new Date().toISOString(),
  }

  const mockCartItems: OrderItem[] = [{
    id: 'test-item',
    order_id: 'test-order',
    product_id: 'test-product',
    quantity: 1,
    unit_price: 1000,
    total_price: 1000,
    metadata: {
      product_type: 'esim',
      product_title: 'Test Product'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }]

  const mockTotalAmount = 1000

  it('should process checkout with valid data', async () => {
    const processor = new CheckoutProcessor(mockFormData, mockCartItems, mockTotalAmount)
    const result = await processor.process()
    
    expect(result.success).toBe(true)
    expect(result.orderId).toBeDefined()
  })

  it('should validate required fields', async () => {
    const invalidFormData = { ...mockFormData, email: '' }
    const processor = new CheckoutProcessor(invalidFormData, mockCartItems, mockTotalAmount)
    
    await expect(processor.process()).rejects.toThrow('El email es requerido')
  })

  it('should handle empty cart', async () => {
    const processor = new CheckoutProcessor(mockFormData, [], mockTotalAmount)
    
    await expect(processor.process()).rejects.toThrow('El carrito está vacío')
  })
})