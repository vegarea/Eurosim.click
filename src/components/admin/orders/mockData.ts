import { Order, OrderEvent } from "../../../types";

export const mockOrders: Order[] = [
  {
    id: "order-001",
    created_at: "2024-01-25T10:30:00Z",
    customer_id: "cust-001",
    product_id: "prod-001",
    total_amount: 10000,
    status: "payment_pending",
    type: "physical",
    quantity: 1,
    payment_method: "stripe",
    payment_status: "pending",
    notes: [],
    events: [
      {
        id: "evt-001",
        order_id: "order-001",
        type: "created",
        description: "Pedido creado",
        created_at: "2024-01-25T10:30:00Z",
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
    customer_id: "cust-002",
    product_id: "prod-002",
    total_amount: 15000,
    status: "processing",
    type: "physical",
    quantity: 1,
    payment_method: "paypal",
    payment_status: "pending",
    notes: [],
    events: []
  },
  {
    id: "order-003",
    created_at: "2024-01-27T15:30:00Z",
    customer_id: "cust-003",
    product_id: "prod-003",
    total_amount: 20000,
    status: "shipped",
    type: "physical",
    quantity: 1,
    payment_method: "stripe",
    payment_status: "completed",
    notes: [],
    events: [
      {
        id: "evt-003",
        order_id: "order-003",
        type: "status_changed",
        description: "Pedido enviado",
        created_at: "2024-01-27T15:30:00Z",
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
    customer_id: "cust-004",
    product_id: "prod-004",
    total_amount: 17500,
    status: "delivered",
    type: "physical",
    quantity: 1,
    payment_method: "stripe",
    payment_status: "completed",
    notes: [],
    events: [
      {
        id: "evt-004",
        order_id: "order-004",
        type: "status_changed",
        description: "Pedido entregado",
        created_at: "2024-01-26T14:20:00Z",
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
    customer_id: "cust-005",
    product_id: "prod-005",
    total_amount: 12500,
    status: "processing",
    type: "physical",
    quantity: 1,
    payment_method: "paypal",
    payment_status: "pending",
    notes: [],
    events: []
  }
];
