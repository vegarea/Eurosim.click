import { Order } from "./types"

export const mockOrders: Order[] = [
  {
    id: "order-001",
    date: "2024-01-25T10:30:00Z",
    customer: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "1234567890",
    total: 100.0,
    status: "payment_pending",
    type: "physical",
    paymentMethod: "stripe",
    notes: [],
    events: [
      {
        id: "evt-001",
        type: "created",
        description: "Pedido creado",
        createdAt: "2024-01-25T10:30:00Z",
        metadata: {
          automated: true
        }
      },
      {
        id: "evt-002",
        type: "payment_processed",
        description: "Pago procesado correctamente vía Stripe",
        createdAt: "2024-01-25T10:31:00Z",
        metadata: {
          automated: true,
          paymentMethod: "stripe"
        }
      }
    ]
  },
  {
    id: "order-002",
    date: "2024-01-26T12:00:00Z",
    customer: "María López",
    email: "maria.lopez@example.com",
    phone: "0987654321",
    total: 150.0,
    status: "processing",
    type: "physical",
    paymentMethod: "paypal",
    notes: [],
    events: []
  },
  {
    id: "order-003",
    date: "2024-01-27T15:30:00Z",
    customer: "Carlos Ruiz",
    email: "carlos.ruiz@example.com",
    phone: "5544332211",
    total: 200.0,
    status: "shipped",
    type: "physical",
    paymentMethod: "stripe",
    notes: [],
    events: [
      {
        id: "evt-003",
        type: "status_changed",
        description: "Pedido enviado",
        userId: "usr-001",
        userName: "Admin",
        createdAt: "2024-01-27T15:30:00Z",
        metadata: {
          oldStatus: "processing",
          newStatus: "shipped"
        }
      }
    ]
  },
  {
    id: "order-004",
    date: "2024-01-24T09:15:00Z",
    customer: "Ana García",
    email: "ana.garcia@example.com",
    phone: "6677889900",
    total: 175.0,
    status: "delivered",
    type: "physical",
    paymentMethod: "stripe",
    notes: [],
    events: [
      {
        id: "evt-004",
        type: "status_changed",
        description: "Pedido entregado",
        userId: "usr-001",
        userName: "Admin",
        createdAt: "2024-01-26T14:20:00Z",
        metadata: {
          oldStatus: "shipped",
          newStatus: "delivered"
        }
      }
    ]
  },
  {
    id: "order-005",
    date: "2024-01-28T11:45:00Z",
    customer: "Roberto Méndez",
    email: "roberto.mendez@example.com",
    phone: "3322114455",
    total: 125.0,
    status: "processing",
    type: "physical",
    paymentMethod: "paypal",
    notes: [],
    events: []
  }
]