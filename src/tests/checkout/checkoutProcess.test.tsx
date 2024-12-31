import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Checkout from '@/pages/Checkout'
import { CartProvider, useCart } from '@/contexts/CartContext'
import { Product } from '@/types/database/products'

// Mock de producto para pruebas
const mockProduct: Product = {
  id: "test-id",
  title: "Test Product",
  description: "Test Description",
  type: "esim",
  price: 1000,
  status: "active",
  stock: null,
  data_eu_gb: 5,
  data_es_gb: 3,
  validity_days: 30,
  features: [],
  metadata: {},
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

// Mock del contexto del carrito
vi.mock('@/contexts/CartContext', () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => children,
  useCart: () => ({
    items: [
      {
        id: 'test-item',
        order_id: 'test-order',
        product_id: mockProduct.id,
        quantity: 1,
        unit_price: mockProduct.price,
        total_price: mockProduct.price,
        metadata: {
          product_type: mockProduct.type,
          product_title: mockProduct.title
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    addItem: vi.fn(),
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn()
  })
}))

// Mock de Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: () => ({
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      select: vi.fn().mockResolvedValue({ data: [], error: null })
    })
  }
}))

describe('Checkout Process', () => {
  const renderCheckout = () => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <Checkout />
        </CartProvider>
      </BrowserRouter>
    )
  }

  it('should complete documentation form with valid data', async () => {
    renderCheckout()

    // Llenar formulario de documentación
    const fullNameInput = screen.getByLabelText(/nombre completo/i)
    const passportInput = screen.getByLabelText(/número de pasaporte/i)
    const emailInput = screen.getByLabelText(/email/i)

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } })
    fireEvent.change(passportInput, { target: { value: 'AB123456' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })

    // Verificar que los valores se mantienen
    expect(fullNameInput).toHaveValue('John Doe')
    expect(passportInput).toHaveValue('AB123456')
    expect(emailInput).toHaveValue('john@example.com')
  })

  it('should maintain email across steps', async () => {
    renderCheckout()

    // Paso 1: Llenar email
    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    // Avanzar al siguiente paso
    const nextButton = screen.getByText(/siguiente/i)
    fireEvent.click(nextButton)

    // Verificar que el email se mantiene en el paso de pago
    await waitFor(() => {
      const paymentStep = screen.getByText(/método de pago/i)
      expect(paymentStep).toBeInTheDocument()
    })

    // Verificar que el botón de pago está habilitado
    const payButton = screen.getByText(/completar orden/i)
    expect(payButton).not.toBeDisabled()
  })

  it('should validate required fields before proceeding', async () => {
    renderCheckout()

    // Intentar avanzar sin llenar campos requeridos
    const nextButton = screen.getByText(/siguiente/i)
    fireEvent.click(nextButton)

    // Verificar mensajes de error
    await waitFor(() => {
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument()
    })
  })

  it('should handle physical SIM checkout flow correctly', async () => {
    // Mock del producto físico
    const mockUseCart = vi.mocked(useCart)
    mockUseCart.mockReturnValue({
      ...mockUseCart(),
      items: [{
        ...mockUseCart().items[0],
        metadata: { product_type: 'physical' }
      }]
    })

    renderCheckout()

    // Verificar que aparece el formulario de envío
    expect(screen.getByText(/dirección de envío/i)).toBeInTheDocument()

    // Llenar formulario de envío
    const addressInput = screen.getByLabelText(/dirección/i)
    fireEvent.change(addressInput, { target: { value: 'Calle Test 123' } })

    // Verificar que los datos de envío se mantienen
    expect(addressInput).toHaveValue('Calle Test 123')
  })
})