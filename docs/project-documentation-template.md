# Plantilla de Documentación de Proyecto

## Estructura de Carpetas
```
docs/
├── database/          # Documentación de tablas
│   ├── README.md     # Índice de tablas
│   └── [tabla].md    # Una archivo MD por tabla
├── types/            # Tipos TypeScript
│   ├── README.md     # Índice de tipos
│   └── [tipo].md     # Un archivo MD por tipo
└── workflows/        # Documentación de flujos
    ├── categories/   # Categorías de flujos
    └── types/        # Tipos y interfaces
```

## Formato para Documentar Tablas

```markdown
# Tabla: [Nombre]

[Descripción breve de la tabla]

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único | ✅ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Última actualización | ✅ |

## Tipo TypeScript

```typescript
interface [Nombre]Table {
  id: string;
  created_at: string;
  updated_at: string;
}

// Tipo para operaciones de inserción
interface [Nombre]Insert {
  // Campos requeridos para crear
}

// Tipo para operaciones de actualización
interface [Nombre]Update {
  // Campos permitidos para actualizar
}

// Tipo para la UI (puede incluir campos calculados)
interface [Nombre]UI extends [Nombre]Table {
  // Campos adicionales para la UI
}
```

## Índices

1. Índice primario en `id`
2. [Otros índices relevantes]

## Políticas de Seguridad (RLS)

### Lectura
- Admin: [permisos]
- Usuario: [permisos]

### Escritura
- Admin: [permisos]
- Usuario: [permisos]

## Relaciones

- Relación con [otra_tabla]
- [Otras relaciones]

## Validaciones

1. Validaciones de base de datos
2. Validaciones de TypeScript
3. Validaciones de UI

## Transformaciones

Documentar transformaciones necesarias entre:
1. Base de datos -> API
2. API -> UI
3. UI -> API
4. API -> Base de datos

## Notas Adicionales

- [Notas importantes]
- [Consideraciones]
```

## Formato para Documentar Flujos de Trabajo

```typescript
interface WorkflowItem {
  id: string;              // Formato: FL-[número]
  title: string;           // Título descriptivo
  description: string;     // Descripción breve
  status: 'working' | 'pending' | 'reviewed';  // Estado actual
  components?: string[];   // Componentes relacionados
  database?: string[];     // Tablas relacionadas
  types?: string[];        // Tipos TypeScript relacionados
  validations?: string[];  // Validaciones requeridas
  details?: string;        // Detalles técnicos
}

interface WorkflowCategory {
  id: string;             // ID único de categoría
  title: string;          // Nombre de la categoría
  items: WorkflowItem[];  // Flujos en esta categoría
}
```

## Estados de Flujos

- `working`: Implementado y funcionando completamente
- `reviewed`: Revisado - Pendiente conexión con Supabase
- `pending`: Pendiente de implementación

## Categorías Base Recomendadas

1. Autenticación y Usuarios
2. Gestión de Contenido
3. Configuración del Sistema
4. Integraciones Externas
5. [Otras categorías específicas del proyecto]

## Proceso de Validación

1. Documentación de tabla/tipo
2. Implementación de tipos TypeScript
3. Validación de consistencia
4. Implementación de componentes
5. Pruebas de integración

## Lista de Verificación

- [ ] Documentación completa
- [ ] Tipos TypeScript definidos
- [ ] Validaciones implementadas
- [ ] Transformaciones documentadas
- [ ] Pruebas escritas
- [ ] RLS configurado
- [ ] Índices creados

## Instrucciones para Lovable

Lovable, cuando implementes esta documentación en un nuevo proyecto:

1. Crea la estructura de carpetas en `/docs`
2. Implementa el componente `ProjectWorkflow` para visualizar flujos
3. Crea los tipos necesarios en `types/WorkflowTypes.ts`
4. Mantén la documentación actualizada al hacer cambios
5. Usa los estados de flujo correctamente
6. Divide los flujos grandes en archivos separados por categoría
7. Valida la consistencia entre documentación y tipos
8. Verifica las transformaciones de datos

## Notas de Implementación

- Mantener archivos pequeños y enfocados
- Documentar cambios en tiempo real
- Actualizar estados según la implementación
- Usar Markdown para mejor legibilidad
- Mantener consistencia en el formato
- Validar tipos antes de implementar
- Documentar transformaciones de datos
```

<lov-write file_path="src/components/admin/documentation/components/TypeValidation.tsx">
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ValidationResult {
  field: string
  dbType: string
  tsType: string
  isValid: boolean
  message?: string
}

interface TypeValidationProps {
  tableName: string
  validations: ValidationResult[]
}

export function TypeValidation({ tableName, validations }: TypeValidationProps) {
  const allValid = validations.every(v => v.isValid)
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Validación de Tipos: {tableName}</h3>
        {allValid ? (
          <div className="flex items-center text-green-600">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            <span>Todos los tipos válidos</span>
          </div>
        ) : (
          <div className="flex items-center text-yellow-600">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>Hay discrepancias</span>
          </div>
        )}
      </div>

      <ScrollArea className="h-[300px] rounded-md border">
        <div className="p-4 space-y-2">
          {validations.map((validation, index) => (
            <Alert key={index} variant={validation.isValid ? "default" : "destructive"}>
              <div className="flex items-start">
                {validation.isValid ? (
                  <CheckCircle2 className="h-4 w-4 mt-1" />
                ) : (
                  <XCircle className="h-4 w-4 mt-1" />
                )}
                <div className="ml-2">
                  <AlertTitle>Campo: {validation.field}</AlertTitle>
                  <AlertDescription>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>Tipo BD: <code className="bg-muted px-1 rounded">{validation.dbType}</code></p>
                      <p>Tipo TS: <code className="bg-muted px-1 rounded">{validation.tsType}</code></p>
                      {validation.message && (
                        <p className="text-muted-foreground">{validation.message}</p>
                      )}
                    </div>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}