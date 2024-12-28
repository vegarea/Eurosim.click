import { Order, OrderEvent } from "./types";

export const mockOrders: Order[] = [
  {
    id: "order-001",
    customer_id: "user-001",
    product_id: "prod-001",
    status: "payment_pending",
    type: "physical",
    total_amount: 10000, // $100.00 en centavos
    quantity: 1,
    payment_method: "stripe",
    payment_status: "pending",
    created_at: "2024-01-25T10:30:00Z",
    updated_at: "2024-01-25T10:30:00Z",
    // Campos UI
    customer_name: "Juan Pérez",
    product_title: "SIM Card Europa",
    events: [
      {
        id: "evt-001",
        type: "created",
        description: "Pedido creado",
        created_at: "2024-01-25T10:30:00Z",
        metadata: {
          automated: true
        }
      },
      {
        id: "evt-002",
        type: "payment_processed",
        description: "Pago procesado correctamente vía Stripe",
        created_at: "2024-01-25T10:31:00Z",
        metadata: {
          automated: true,
          paymentMethod: "stripe"
        }
      }
    ]
  },
  {
    id: "order-002",
    customer_id: "user-002",
    product_id: "prod-002",
    status: "processing",
    type: "physical",
    total_amount: 15000, // $150.00 en centavos
    quantity: 1,
    payment_method: "paypal",
    payment_status: "pending",
    created_at: "2024-01-26T12:00:00Z",
    updated_at: "2024-01-26T12:00:00Z",
    customer_name: "María López",
    product_title: "SIM Card Europa",
    events: []
  },
  {
    id: "order-003",
    customer_id: "user-003",
    product_id: "prod-003",
    status: "shipped",
    type: "physical",
    total_amount: 20000, // $200.00 en centavos
    quantity: 1,
    payment_method: "stripe",
    payment_status: "completed",
    created_at: "2024-01-27T15:30:00Z",
    updated_at: "2024-01-27T15:30:00Z",
    customer_name: "Carlos Ruiz",
    product_title: "SIM Card Europa",
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
  },
  {
    id: "order-004",
    customer_id: "user-004",
    product_id: "prod-004",
    status: "delivered",
    type: "physical",
    total_amount: 17500, // $175.00 en centavos
    quantity: 1,
    payment_method: "stripe",
    payment_status: "completed",
    created_at: "2024-01-24T09:15:00Z",
    updated_at: "2024-01-26T14:20:00Z",
    customer_name: "Ana García",
    product_title: "SIM Card Europa",
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
  },
  {
    id: "order-005",
    customer_id: "user-005",
    product_id: "prod-005",
    status: "processing",
    type: "physical",
    total_amount: 12500, // $125.00 en centavos
    quantity: 1,
    payment_method: "paypal",
    payment_status: "pending",
    created_at: "2024-01-28T11:45:00Z",
    updated_at: "2024-01-28T11:45:00Z",
    customer_name: "Roberto Méndez",
    product_title: "SIM Card Europa",
    events: []
  }
];
