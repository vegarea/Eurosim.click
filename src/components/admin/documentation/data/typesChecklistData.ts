import { ChecklistCategory } from "../types/ChecklistTypes"
import { orderTypes } from "./categories/types/orderTypes"
import { productTypes } from "./categories/types/productTypes"
import { customerTypes } from "./categories/types/customerTypes"
import { blogTypes } from "../components/types/BlogTypes"
import { emailTypes } from "./categories/types/emailTypes"
import { workflowTypes } from "./categories/types/workflowTypes"
import { authTypes } from "./categories/types/authTypes"
import { settingsTypes } from "../components/types/SettingsTypes"

// Ensure all imported types follow the ChecklistCategory interface structure
export const typesChecklistData: ChecklistCategory[] = [
  orderTypes,
  productTypes,
  customerTypes,
  blogTypes,
  emailTypes,
  workflowTypes,
  authTypes,
  settingsTypes
]