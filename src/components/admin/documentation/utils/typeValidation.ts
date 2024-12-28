import { ValidationResult } from '../types/ValidationTypes';

type DbType = string;
type TsType = string;

export function getTypeScriptType(dbType: DbType): TsType {
  const typeMap: Record<DbType, TsType> = {
    'uuid': 'string',
    'text': 'string',
    'varchar': 'string',
    'integer': 'number',
    'bigint': 'number',
    'decimal': 'number',
    'boolean': 'boolean',
    'jsonb': 'Record<string, any>',
    'timestamp': 'string',
    'date': 'string',
    'time': 'string',
    'USER-DEFINED': 'string', // Para enums
    'ARRAY': 'any[]'
  };

  return typeMap[dbType.toLowerCase()] || 'any';
}

export function isValidTypeMapping(dbType: DbType, tsType: TsType): boolean {
  const expectedType = getTypeScriptType(dbType);
  return expectedType === tsType;
}

export function getValidationMessage(dbType: DbType, tsType: TsType): string {
  if (isValidTypeMapping(dbType, tsType)) {
    return 'Tipos coinciden correctamente';
  }

  return `El tipo de BD "${dbType}" debería mapearse a "${getTypeScriptType(dbType)}" en TypeScript`;
}

export function validateTableTypes(tableFields: string[]): ValidationResult[] {
  return tableFields.map(field => {
    const [name, type] = field.split('|').map(s => s.trim());
    const tsType = getTypeScriptType(type);
    
    return {
      field: name,
      dbType: type,
      tsType,
      isValid: isValidTypeMapping(type, tsType),
      message: getValidationMessage(type, tsType)
    };
  });
}