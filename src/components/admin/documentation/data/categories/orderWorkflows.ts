import { WorkflowCategory } from "../../types/WorkflowTypes"
import { orderCreationFlow } from "./orders/orderCreationFlow"
import { orderStatusFlow } from "./orders/orderStatusFlow"
import { orderPaymentFlow } from "./orders/orderPaymentFlow"
import { orderDocumentationFlow } from "./orders/orderDocumentationFlow"
import { orderEmailFlow } from "./orders/orderEmailFlow"
import { orderNotesFlow } from "./orders/orderNotesFlow"

export const orderWorkflows: WorkflowItem[] = [
  orderCreationFlow,
  orderStatusFlow,
  orderPaymentFlow,
  orderDocumentationFlow,
  orderEmailFlow,
  orderNotesFlow
]