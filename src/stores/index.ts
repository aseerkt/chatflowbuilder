import { randstr } from '@/utils/stringUtils'
import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow'
import { create } from 'zustand'

type RFState = {
  nodes: Node[]
  edges: Edge[]
  reactFlowInstance?: ReactFlowInstance
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  onDrop: (event: React.DragEvent) => void
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  setReactFlowInstance: (instance: ReactFlowInstance) => void

  nodeId?: string
  nodeType?: string
  updateNode: (node: Node) => void
  selectNode: (node: { id: string; type: string }) => void
  deselectNode: () => void
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },
  onDrop(event) {
    event.preventDefault()

    const type = event.dataTransfer.getData('application/reactflow')
    const reactFlowInstance = get().reactFlowInstance

    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type || !reactFlowInstance) {
      return
    }

    // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
    // and you don't need to subtract the reactFlowBounds.left/top anymore
    // details: https://reactflow.dev/whats-new/2023-11-10
    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    })
    const newNode = {
      id: randstr(type),
      type,
      position,
      data: { message: 'test message' },
    }

    set((state) => ({ nodes: [...state.nodes, newNode] }))
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes })
  },
  setEdges: (edges: Edge[]) => {
    set({ edges })
  },
  setReactFlowInstance(instance) {
    set({ reactFlowInstance: instance })
  },
  updateNode(newNode) {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === newNode.id) {
          return { ...node, ...newNode }
        }
        return node
      }),
    }))
  },
  selectNode(node) {
    set({ nodeId: node.id, nodeType: node.type })
  },
  deselectNode() {
    set({ nodeId: undefined, nodeType: undefined })
  },
}))

export const defaultSelector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setReactFlowInstance: state.setReactFlowInstance,
  onDrop: state.onDrop,
})

export const nodeSelector = (state: RFState) => ({
  nodeId: state.nodeId,
  nodeType: state.nodeType,
})

export default useStore
