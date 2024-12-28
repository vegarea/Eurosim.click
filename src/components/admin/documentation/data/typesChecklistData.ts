import { ChecklistCategory } from "../types/ChecklistTypes"
import { orderTypes } from "./categories/types/orderTypes"
import { productTypes } from "./categories/types/productTypes"
import { customerTypes } from "./categories/types/customerTypes"
import { blogTypes } from "./categories/types/blogTypes"
import { emailTypes } from "./categories/types/emailTypes"
import { workflowTypes } from "./categories/types/workflowTypes"
import { authTypes } from "./categories/types/authTypes"

export const typesChecklistData: ChecklistCategory[] = [
  orderTypes,
  productTypes,
  customerTypes,
  blogTypes,
  emailTypes,
  workflowTypes,
  authTypes
]