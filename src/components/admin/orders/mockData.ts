import { Order } from "@/types/database/orders";

export const mockOrders: Order[] = [
  {
    id: "order-001",
    customer_id: "user-001",
    product_id: "prod-001",
    status: "payment_pending",
    type: "physical",
    total_amount: 10000,
    quantity: 1,
    payment_method: "stripe",
    payment_status: "pending",
    stripe_payment_intent_id: null,
    stripe_receipt_url: null,
    paypal_order_id: null,
    paypal_receipt_url: null,
    shipping_address: null,
    tracking_number: null,
    carrier: null,
    activation_date: null,
    notes: [],
    metadata: {
      customer_name: "Juan Pérez",
      customer_email: "juan@example.com",
      customer_phone: "+1234567890",
      events: [
        {
          id: "evt-001",
          type: "created",
          description: "Pedido creado",
          created_at: "2024-01-25T10:30:00Z",
          metadata: {
            automated: true
          }
        }
      ]
    },
    created_at: "2024-01-25T10:30:00Z",
    updated_at: "2024-01-25T10:30:00Z",
    customer_name: "Juan Pérez",
    customer_email: "juan@example.com",
    customer_phone: "+1234567890",
  },
  {
    id: "order-002",
    customer_id: "user-002",
    product_id: "prod-002",
    status: "processing",
    type: "physical",
    total_amount: 15000,
    quantity: 1,
    payment_method: "paypal",
    payment_status: "pending",
    stripe_payment_intent_id: null,
    stripe_receipt_url: null,
    paypal_order_id: null,
    paypal_receipt_url: null,
    shipping_address: null,
    tracking_number: null,
    carrier: null,
    activation_date: null,
    created_at: "2024-01-26T12:00:00Z",
    updated_at: "2024-01-26T12:00:00Z",
    customer_name: "María López",
    customer_email: "maria@example.com",
    customer_phone: "+1234567891",
    notes: [],
    metadata: {
      events: []
    }
  },
  {
    id: "order-003",
    customer_id: "user-003",
    product_id: "prod-003",
    status: "shipped",
    type: "physical",
    total_amount: 20000,
    quantity: 1,
    payment_method: "stripe",
    payment_status: "completed",
    stripe_payment_intent_id: "pi_123",
    stripe_receipt_url: "https://stripe.com/receipts/123",
    paypal_order_id: null,
    paypal_receipt_url: null,
    shipping_address: null,
    tracking_number: "1Z999AA1234567890",
    carrier: "UPS",
    activation_date: null,
    created_at: "2024-01-27T15:30:00Z",
    updated_at: "2024-01-27T15:30:00Z",
    customer_name: "Carlos Ruiz",
    customer_email: "carlos@example.com",
    customer_phone: "+1234567892",
    notes: [],
    metadata: {
      events: [
        {
          id: "evt-003",
          type: "status_changed",
          description: "Pedido enviado",
          created_at: "2024-01-27T15:30:00Z",
          metadata: {
            automated: true,
            oldStatus: "processing",
            newStatus: "shipped"
          }
        }
      ]
    }
  },
  {
    id: "order-004",
    customer_id: "user-004",
    product_id: "prod-004",
    status: "delivered",
    type: "physical",
    total_amount: 17500,
    quantity: 1,
    payment_method: "stripe",
    payment_status: "completed",
    stripe_payment_intent_id: "pi_456",
    stripe_receipt_url: "https://stripe.com/receipts/456",
    paypal_order_id: null,
    paypal_receipt_url: null,
    shipping_address: null,
    tracking_number: "1Z999AA0987654321",
    carrier: "UPS",
    activation_date: null,
    created_at: "2024-01-24T09:15:00Z",
    updated_at: "2024-01-26T14:20:00Z",
    customer_name: "Ana García",
    customer_email: "ana@example.com",
    customer_phone: "+1234567893",
    notes: [],
    metadata: {
      events: [
        {
          id: "evt-004",
          type: "status_changed",
          description: "Pedido entregado",
          created_at: "2024-01-26T14:20:00Z",
          metadata: {
            automated: true,
            oldStatus: "shipped",
            newStatus: "delivered"
          }
        }
      ]
    }
  },
  {
    id: "order-005",
    customer_id: "user-005",
    product_id: "prod-005",
    status: "processing",
    type: "physical",
    total_amount: 12500,
    quantity: 1,
    payment_method: "paypal",
    payment_status: "pending",
    stripe_payment_intent_id: null,
    stripe_receipt_url: null,
    paypal_order_id: "PAY-123ABC",
    paypal_receipt_url: "https://paypal.com/receipts/123",
    shipping_address: null,
    tracking_number: null,
    carrier: null,
    activation_date: null,
    created_at: "2024-01-28T11:45:00Z",
    updated_at: "2024-01-28T11:45:00Z",
    customer_name: "Roberto Méndez",
    customer_email: "roberto@example.com",
    customer_phone: "+1234567894",
    notes: [],
    metadata: {
      events: []
    }
  }
];