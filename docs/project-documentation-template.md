# Plantilla de Documentación de Proyecto

## Estructura de Carpetas
```
docs/
├── database/          # Documentación de tablas
│   ├── README.md     # Índice de tablas
│   └── [tabla].md    # Una archivo MD por tabla
└── workflows/         # Documentación de flujos
    ├── categories/    # Categorías de flujos
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

## Triggers

1. [Trigger 1]
2. [Trigger 2]

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

## Instrucciones para Lovable

Lovable, cuando implementes esta documentación en un nuevo proyecto:

1. Crea la estructura de carpetas en `/docs`
2. Implementa el componente `ProjectWorkflow` para visualizar flujos
3. Crea los tipos necesarios en `types/WorkflowTypes.ts`
4. Mantén la documentación actualizada al hacer cambios
5. Usa los estados de flujo correctamente
6. Divide los flujos grandes en archivos separados por categoría

## Notas de Implementación

- Mantener archivos pequeños y enfocados
- Documentar cambios en tiempo real
- Actualizar estados según la implementación
- Usar Markdown para mejor legibilidad
- Mantener consistencia en el formato