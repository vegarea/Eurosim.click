import { Check, X, Database, ArrowRight } from "lucide-react"
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
  // Proceso de Compra
  {
    id: '1',
    type: 'default',
    data: { 
      label: 'Selección de Producto',
      status: 'working',
    },
    position: { x: 100, y: 50 },
    className: 'shadow-md bg-white rounded-lg border border-gray-200'
  },
  {
    id: '2',
    type: 'default',
    data: { 
      label: 'Carrito de Compra',
      status: 'working'
    },
    position: { x: 300, y: 50 },
    className: 'shadow-md bg-white rounded-lg border border-gray-200'
  },
  {
    id: '3',
    type: 'default',
    data: { 
      label: 'Proceso de Pago',
      status: 'working'
    },
    position: { x: 500, y: 50 },
    className: 'shadow-md bg-white rounded-lg border border-gray-200'
  },
  {
    id: '4',
    type: 'default',
    data: { 
      label: 'Base de Datos: Orders',
      icon: <Database className="h-4 w-4 text-primary" />,
      status: 'working'
    },
    position: { x: 300, y: 150 },
    className: 'shadow-md bg-white rounded-lg border border-primary'
  },
  {
    id: '5',
    type: 'default',
    data: { 
      label: 'Envío/Activación',
      status: 'pending'
    },
    position: { x: 700, y: 50 },
    className: 'shadow-md bg-white rounded-lg border border-gray-200'
  },
  {
    id: '6',
    type: 'default',
    data: { 
      label: 'Base de Datos: Products',
      icon: <Database className="h-4 w-4 text-primary" />,
      status: 'working'
    },
    position: { x: 100, y: 150 },
    className: 'shadow-md bg-white rounded-lg border border-primary'
  },
  {
    id: '7',
    type: 'default',
    data: { 
      label: 'Base de Datos: Customers',
      icon: <Database className="h-4 w-4 text-primary" />,
      status: 'working'
    },
    position: { x: 500, y: 150 },
    className: 'shadow-md bg-white rounded-lg border border-primary'
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e6-1', source: '6', target: '1', animated: true },
  { id: 'e4-3', source: '4', target: '3', animated: true },
  { id: 'e7-3', source: '7', target: '3', animated: true },
]

const CustomNode = ({ data }: { data: any }) => {
  return (
    <div className="px-4 py-2 min-w-[150px]">
      <div className="flex items-center gap-2 justify-center">
        {data.icon}
        <span>{data.label}</span>
        {data.status === 'working' ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-red-500" />
        )}
      </div>
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
      <div className="h-[600px] border rounded-lg bg-gray-50">
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
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  )
}