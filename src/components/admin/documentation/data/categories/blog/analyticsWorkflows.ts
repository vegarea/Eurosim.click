import { WorkflowItem } from "../../../types/WorkflowTypes"

export const analyticsWorkflows: WorkflowItem[] = [
  {
    id: "FL-406",
    title: "Análisis y estadísticas",
    description: "Sistema de análisis y métricas del blog",
    status: "working",
    components: [
      "BlogAnalytics.tsx",
      "PostMetrics.tsx",
      "PerformanceChart.tsx"
    ],
    database: [
      "blog_metrics (tabla)",
      "post_views (tabla)",
      "user_interactions (tabla)"
    ],
    details: `
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ UI de métricas implementada
✓ Gráficos funcionando
✓ Vista de interacciones implementada

Pendiente integración:
- Tracking de vistas
- Almacenamiento de métricas
- Generación de reportes`
  }
]