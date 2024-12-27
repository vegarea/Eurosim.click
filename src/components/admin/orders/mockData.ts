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
      },
      {
        id: "evt-003",
        type: "status_changed",
        description: "Estado actualizado a 'processing'",
        userId: "usr-001",
        userName: "Admin",
        createdAt: "2024-01-25T11:00:00Z",
        metadata: {
          oldStatus: "payment_pending",
          newStatus: "processing"
        }
      },
      {
        id: "evt-004",
        type: "note_added",
        description: "Nota añadida al pedido",
        userId: "usr-001",
        userName: "Admin",
        createdAt: "2024-01-25T11:30:00Z"
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
    type: "esim",
    paymentMethod: "paypal",
    notes: [],
    events: []
  }
]
