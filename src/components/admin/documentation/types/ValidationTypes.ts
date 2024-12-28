export interface ValidationResult {
  field: string;
  dbType: string;
  tsType: string;
  isValid: boolean;
  message?: string;
}

export interface TableValidation {
  tableName: string;
  validations: ValidationResult[];
  isValid: boolean;
}