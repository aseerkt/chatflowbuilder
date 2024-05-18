import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { TextNode } from '@/components/TextNode'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import useStore from '@/stores'
import { useCallback } from 'react'
import ReactFlow, { Background, NodeTypes } from 'reactflow'
import { useShallow } from 'zustand/react/shallow'
import { baseSelector } from './stores/selectors'

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
    isSingleConnected,
  } = useStore(useShallow(baseSelector))

  const { toast } = useToast()

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const handleSave = useCallback(() => {
    const isConnected = isSingleConnected()

    if (isConnected) {
      toast({ variant: 'success', title: 'Flow Saved' })
    } else {
      toast({ variant: 'destructive', title: 'Cannot save flow' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='h-full'>
      <Header>
        <Button variant='outline' onClick={handleSave}>
          Save Changes
        </Button>
      </Header>
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
