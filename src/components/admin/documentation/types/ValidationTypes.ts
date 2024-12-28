export interface ValidationResult {
  field: string;
  dbType: string;
  tsType: string;
  isValid: boolean;
  message?: string;
}

export interface TableInfo {
  name: string;
  description: string;
  fields: string[];
  path: string;
  content: string;
  isConnected: boolean;
}