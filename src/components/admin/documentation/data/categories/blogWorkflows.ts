import { WorkflowItem } from "../../types/WorkflowTypes"
import { contentWorkflows } from "./blog/contentWorkflows"
import { mediaWorkflows } from "./blog/mediaWorkflows"
import { seoWorkflows } from "./blog/seoWorkflows"
import { taxonomyWorkflows } from "./blog/taxonomyWorkflows"
import { analyticsWorkflows } from "./blog/analyticsWorkflows"

export const blogWorkflows: WorkflowItem[] = [
  ...contentWorkflows,
  ...mediaWorkflows,
  ...seoWorkflows,
  ...taxonomyWorkflows,
  ...analyticsWorkflows
]