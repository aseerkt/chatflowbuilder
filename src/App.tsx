import { Sidebar } from '@/components/Sidebar'
import { TextNode } from '@/components/TextNode'
import useStore, { defaultSelector } from '@/stores'
import { useCallback } from 'react'
import ReactFlow, { Background, NodeTypes } from 'reactflow'
import { useShallow } from 'zustand/react/shallow'
import { Button } from './components/ui/button'
import { useToast } from './components/ui/use-toast'

const nodeTypes: NodeTypes = { textNode: TextNode }

function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    setReactFlowInstance,
  } = useStore(useShallow(defaultSelector))

  const { toast } = useToast()

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const handleSave = () => {
    const graph: Record<string, string[]> = {}
    nodes.forEach((node) => {
      graph[node.id] = []
    })
    edges.forEach((edge) => {
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

    if (nodes.length === 0) {
      return
    }
    dfs(nodes[0].id)

    // Check if all nodes are visited
    if (visited.size === nodes.length) {
      toast({ variant: 'success', title: 'Flow Saved' })
    } else {
      toast({ variant: 'destructive', title: 'Cannot save flow' })
    }
  }

  return (
    <div className='h-full'>
      <header className='flex h-[90px] items-center justify-between border-b bg-orange-50 px-6'>
        <h2 className='text-2xl font-bold'>Chat Flow Builder</h2>
        <Button variant='outline' onClick={handleSave}>
          Save Changes
        </Button>
      </header>
      <div className='flex h-[calc(100%-90px)]'>
        <main className='grow'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onConnect={onConnect}
            onDrop={onDrop}
            fitView
          >
            <Background color='green' />
          </ReactFlow>
        </main>
        <Sidebar />
      </div>
    </div>
  )
}

export default App
