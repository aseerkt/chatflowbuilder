import { randstr } from '@/lib/utils'
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

export type RFState = {
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

  isSinglyConnected: () => boolean

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
  isSinglyConnected() {
    const graph: Record<string, string[]> = {}
    get().nodes.forEach((node) => {
      graph[node.id] = []
    })
    get().edges.forEach((edge) => {
      const { source, target } = edge
      graph[source].push(target)
      graph[target].push(source)
    })

    // Use a set to keep track of visited nodes
    const visited = new Set<string>()

    function dfs(node: string) {
      // If the node is already visited, return
      if (visited.has(node)) {
        return
      }
      // Mark the node as visited
      visited.add(node)
      // Visit all the neighbors
      graph[node].forEach((neighbor) => {
        dfs(neighbor)
      })
    }

    if (get().nodes.length === 0) {
      return true
    }
    dfs(get().nodes[0].id)

    return get().nodes.length === visited.size
  },
}))

export default useStore
