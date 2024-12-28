import { ChecklistCategory } from "../types/ChecklistTypes"
import { blogTypes } from "../components/types/BlogTypes"
import { settingsTypes } from "../components/types/SettingsTypes"
import { orderTypes } from "../components/types/OrderTypes"
import { formTypes } from "../components/types/FormTypes"
import { adminTypes } from "../components/types/AdminTypes"
import { emailTypes } from "../data/categories/types/emailTypes"
import { customerTypes } from "../data/categories/types/customerTypes"
import { workflowTypes } from "../data/categories/types/workflowTypes"

interface TypeAnalysis {
  total: number
  reviewed: number
  components: number
  forms: number
  contexts: number
  hooks: number
}

function countTypesByCategory(types: any[]): { [key: string]: number } {
  return types.reduce((acc, type) => {
    const category = type.category || 'unknown';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
}

export function scanProjectTypes(): TypeAnalysis {
  // Combine all type definitions from different modules
  const allTypes = [
    ...orderTypes,
    ...formTypes,
    ...adminTypes,
    ...blogTypes.items,
    ...settingsTypes.items,
    ...emailTypes.items,
    ...customerTypes.items,
    ...workflowTypes.items
  ];

  // Count types by their categories
  const categoryCounts = countTypesByCategory(allTypes);

  // Count reviewed types
  const reviewedTypes = allTypes.filter(type => 
    type.status === "reviewed" || type.status === "completed"
  ).length;

  return {
    total: allTypes.length,
    reviewed: reviewedTypes,
    components: categoryCounts['component'] || 0,
    forms: categoryCounts['form'] || 0,
    contexts: categoryCounts['context'] || 0,
    hooks: categoryCounts['hook'] || 0
  }
}

export function analyzeTypeCompatibility(
  currentType: string, 
  supabaseType: string
): boolean {
  // Basic implementation - can be enhanced later
  return true;
}

export function findTypeLocations(typeName: string): string[] {
  // Get all defined locations for this type from our type definitions
  const allTypes = [
    ...orderTypes,
    ...formTypes,
    ...adminTypes,
    ...blogTypes.items,
    ...settingsTypes.items,
    ...emailTypes.items,
    ...customerTypes.items,
    ...workflowTypes.items
  ];

  const typeDefinition = allTypes.find(type => type.name === typeName);
  return typeDefinition?.locations || [];
}