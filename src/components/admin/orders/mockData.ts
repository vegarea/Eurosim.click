import { Order } from "./types"

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-03-20",
    customer: "Juan Pérez",
    total: 299.99,
    status: "payment_pending",
    type: "physical"
  },
  {
    id: "ORD-002",
    date: "2024-03-19",
    customer: "María García",
    total: 159.50,
    status: "processing",
    type: "esim",
    paymentMethod: "stripe"
  },
  {
    id: "ORD-003",
    date: "2024-03-18",
    customer: "Carlos López",
    total: 499.99,
    status: "delivered",
    type: "physical",
    paymentMethod: "paypal"
  },
  {
    id: "ORD-004",
    date: "2024-03-17",
    customer: "Ana Martínez",
    total: 89.99,
    status: "payment_failed",
    type: "esim"
  },
]