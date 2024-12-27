import { Check, X, Database, ArrowRight, CreditCard, Package, Mail, User } from "lucide-react"
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const initialNodes = [
  // Cliente y Selección
  {
    id: 'customer-1',
    type: 'default',
    data: { 
      label: 'Cliente selecciona producto',
      icon: <User className="h-4 w-4 text-blue-500" />,
      details: 'Inicio del proceso de compra',
      status: 'working'
    },
    position: { x: 50, y: 50 },
    className: 'shadow-md bg-white rounded-lg border border-gray-200'
  },
  {
    id: 'products-db',
    type: 'default',
    data: { 
      label: 'Base de Datos: Products',
      icon: <Database className="h-4 w-4 text-primary" />,
      details: 'Tabla: products\nCampos principales:\n- id\n- type (physical/esim)\n- price\n- stock',
      status: 'working'
    },
    position: { x: 50, y: 150 },
    className: 'shadow-md bg-white rounded-lg border border-primary'
  },

  // Proceso de Pago
  {
    id: 'payment-1',
    type: 'default',
    data: { 
      label: 'Inicio de Pago',
      icon: <CreditCard className="h-4 w-4 text-green-500" />,
      details: 'Cliente ingresa datos de pago',
      status: 'working'
    },
    position: { x: 300, y: 50 },
    className: 'shadow-md bg-white rounded-lg border border-gray-200'
  },
  {
    id: 'stripe-1',
    type: 'default',
    data: { 
      label: 'Stripe: Crear Intent',
      icon: <CreditCard className="h-4 w-4 text-purple-500" />,
      details: 'Proceso:\n1. Crear Payment Intent\n2. Validar tarjeta\n3. Procesar pago',
      status: 'working'
    },
    position: { x: 300, y: 150 },
    className: 'shadow-md bg-white rounded-lg border border-purple-200'
  },
  {
    id: 'orders-db',
    type: 'default',
    data: { 
      label: 'Base de Datos: Orders',
      icon: <Database className="h-4 w-4 text-primary" />,
      details: 'Tabla: orders\nCampos principales:\n- id\n- customer_id\n- status\n- payment_status\n- stripe_payment_intent_id',
      status: 'working'
    },
    position: { x: 300, y: 250 },
    className: 'shadow-md bg-white rounded-lg border border-primary'
  },

  // Proceso Post-Pago
  {
    id: 'payment-success',
    type: 'default',
    data: { 
      label: 'Pago Exitoso',
      icon: <Check className="h-4 w-4 text-green-500" />,
      details: 'Webhook de Stripe confirma pago',
      status: 'working'
    },
    position: { x: 550, y: 50 },
    className: 'shadow-md bg-white rounded-lg border border-green-200'
  },
  {
    id: 'order-processing',
    type: 'default',
    data: { 
      label: 'Procesamiento de Orden',
      icon: <Package className="h-4 w-4 text-orange-500" />,
      details: 'Acciones:\n1. Actualizar estado\n2. Verificar stock\n3. Preparar envío/activación',
      status: 'working'
    },
    position: { x: 550, y: 150 },
    className: 'shadow-md bg-white rounded-lg border border-orange-200'
  },

  // Notificaciones
  {
    id: 'email-notification',
    type: 'default',
    data: { 
      label: 'Envío de Emails',
      icon: <Mail className="h-4 w-4 text-blue-500" />,
      details: 'Emails:\n1. Confirmación de pago\n2. Detalles de envío/activación\n3. Instrucciones',
      status: 'pending'
    },
    position: { x: 550, y: 250 },
    className: 'shadow-md bg-white rounded-lg border border-blue-200'
  },
  {
    id: 'customers-db',
    type: 'default',
    data: { 
      label: 'Base de Datos: Customers',
      icon: <Database className="h-4 w-4 text-primary" />,
      details: 'Tabla: customers\nCampos principales:\n- id\n- email\n- shipping_address\n- stripe_customer_id',
      status: 'working'
    },
    position: { x: 800, y: 150 },
    className: 'shadow-md bg-white rounded-lg border border-primary'
  }
]

const initialEdges = [
  // Conexiones de selección de producto
  { 
    id: 'e1-2', 
    source: 'customer-1', 
    target: 'products-db', 
    animated: true,
    label: '1. Consulta productos'
  },
  { 
    id: 'e2-3', 
    source: 'customer-1', 
    target: 'payment-1', 
    animated: true,
    label: '2. Procede al pago'
  },

  // Conexiones de proceso de pago
  { 
    id: 'e3-4', 
    source: 'payment-1', 
    target: 'stripe-1', 
    animated: true,
    label: '3. Inicia pago'
  },
  { 
    id: 'e4-5', 
    source: 'stripe-1', 
    target: 'orders-db', 
    animated: true,
    label: '4. Crea orden'
  },

  // Conexiones post-pago
  { 
    id: 'e5-6', 
    source: 'stripe-1', 
    target: 'payment-success', 
    animated: true,
    label: '5. Confirma pago'
  },
  { 
    id: 'e6-7', 
    source: 'payment-success', 
    target: 'order-processing', 
    animated: true,
    label: '6. Procesa orden'
  },
  { 
    id: 'e7-8', 
    source: 'order-processing', 
    target: 'email-notification', 
    animated: true,
    label: '7. Notifica'
  },
  { 
    id: 'e8-9', 
    source: 'email-notification', 
    target: 'customers-db', 
    animated: true,
    label: '8. Actualiza cliente'
  }
]

const CustomNode = ({ data }: { data: any }) => {
  return (
    <div className="px-4 py-2 min-w-[200px]">
      <div className="flex items-center gap-2 justify-between mb-2">
        <div className="flex items-center gap-2">
          {data.icon}
          <span className="font-medium">{data.label}</span>
        </div>
        {data.status === 'working' ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-red-500" />
        )}
      </div>
      {data.details && (
        <div className="text-xs text-gray-600 whitespace-pre-line">
          {data.details}
        </div>
      )}
    </div>
  )
}

const nodeTypes = {
  default: CustomNode,
}

export function ProjectWorkflow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds))

  return (
    <div className="space-y-6">
      <div className="h-[800px] border rounded-lg bg-gray-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              switch (node.type) {
                case 'input': return '#e6f7ff';
                case 'default': return '#fff';
                case 'output': return '#e6fffb';
                default: return '#fff';
              }
            }}
            nodeStrokeWidth={3}
            nodeBorderRadius={2}
          />
        </ReactFlow>
      </div>

      <div className="bg-white p-4 rounded-lg border space-y-4">
        <h3 className="font-medium">Leyenda</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <span>Base de datos</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Componente funcionando</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="h-4 w-4 text-red-500" />
            <span>Pendiente de implementar</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            <span>Flujo de datos</span>
          </div>
        </div>
      </div>
    </div>
  )
}