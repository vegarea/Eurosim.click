import { OrderUI } from '@/types/order.types';

export const mockOrders: OrderUI[] = [
  {
    id: "order-001",
    created_at: "2024-01-25T10:30:00Z",
    updated_at: "2024-01-25T10:30:00Z",
    customer_id: "cust-001",
    product_id: "prod-001",
    total_amount: 10000,
    status: "payment_pending",
    type: "physical",
    quantity: 1,
    payment_method: "stripe",
    payment_status: "pending",
    notes: [],
    customer: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    date: "2024-01-25T10:30:00Z",
    total: 100.00,
    events: [
      {
        id: "evt-001",
        order_id: "order-001",
        type: "created",
        description: "Pedido creado",
        created_at: "2024-01-25T10:30:00Z",
        user_name: "Sistema",
        metadata: {
          automated: true
        }
      },
      {
        id: "evt-002",
        order_id: "order-001",
        type: "payment_processed",
        description: "Pago procesado correctamente vía Stripe",
        created_at: "2024-01-25T10:31:00Z",
        user_name: "Sistema",
        metadata: {
          automated: true,
          paymentMethod: "stripe"
        }
      }
    ]
  },
  {
    id: "order-002",
    created_at: "2024-01-26T12:00:00Z",
    updated_at: "2024-01-26T12:00:00Z",
    customer_id: "cust-002",
    product_id: "prod-002",
    total_amount: 15000,
    status: "processing",
    type: "physical",
    quantity: 1,
    payment_method: "paypal",
    payment_status: "pending",
    notes: [],
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "+0987654321",
    date: "2024-01-26T12:00:00Z",
    total: 150.00,
    events: []
  },
  {
    id: "order-003",
    created_at: "2024-01-27T15:30:00Z",
    updated_at: "2024-01-27T15:30:00Z",
    customer_id: "cust-003",
    product_id: "prod-003",
    total_amount: 20000,
    status: "shipped",
    type: "physical",
    quantity: 1,
    payment_method: "stripe",
    payment_status: "completed",
    notes: [],
    customer: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1122334455",
    date: "2024-01-27T15:30:00Z",
    total: 200.00,
    events: [
      {
        id: "evt-003",
        order_id: "order-003",
        type: "status_changed",
        description: "Pedido enviado",
        created_at: "2024-01-27T15:30:00Z",
        user_name: "Sistema",
        metadata: {
          oldStatus: "processing",
          newStatus: "shipped"
        }
      }
    ]
  },
  {
    id: "order-004",
    created_at: "2024-01-24T09:15:00Z",
    updated_at: "2024-01-24T09:15:00Z",
    customer_id: "cust-004",
    product_id: "prod-004",
    total_amount: 17500,
    status: "delivered",
    type: "physical",
    quantity: 1,
    payment_method: "stripe",
    payment_status: "completed",
    notes: [],
    customer: "Bob Brown",
    email: "bob@example.com",
    phone: "+2233445566",
    date: "2024-01-24T09:15:00Z",
    total: 175.00,
    events: [
      {
        id: "evt-004",
        order_id: "order-004",
        type: "status_changed",
        description: "Pedido entregado",
        created_at: "2024-01-26T14:20:00Z",
        user_name: "Sistema",
        metadata: {
          oldStatus: "shipped",
          newStatus: "delivered"
        }
      }
    ]
  },
  {
    id: "order-005",
    created_at: "2024-01-28T11:45:00Z",
    updated_at: "2024-01-28T11:45:00Z",
    customer_id: "cust-005",
    product_id: "prod-005",
    total_amount: 12500,
    status: "processing",
    type: "physical",
    quantity: 1,
    payment_method: "paypal",
    payment_status: "pending",
    notes: [],
    customer: "Charlie Davis",
    email: "charlie@example.com",
    phone: "+3344556677",
    date: "2024-01-28T11:45:00Z",
    total: 125.00,
    events: []
  }
];
