import useStore from '@/stores'
import { IconBrandWhatsapp, IconMessage } from '@tabler/icons-react'
import { useMemo } from 'react'
import {
  Handle,
  HandleProps,
  NodeProps,
  Position,
  getConnectedEdges,
  useNodeId,
} from 'reactflow'

type TextNodeData = {
  message: string
}

type CustomHandleProps = Omit<HandleProps, 'isConnectable'>

const SourceHandle = ({ ...props }: CustomHandleProps) => {
  const nodeId = useNodeId()
  const { node, edges } = useStore((state) => ({
    edges: state.edges,
    node: state.nodes.find((node) => node.id === nodeId)!,
  }))

  const isHandleConnectable = useMemo(() => {
    return getConnectedEdges([node], edges).every(
      (edge) => edge.sourceHandle !== props.id,
    )
  }, [edges])

  return <Handle {...props} type='source' isConnectable={isHandleConnectable} />
}

export default function TextNode(props: NodeProps<TextNodeData>) {
  const selectNode = useStore((state) => state.selectNode)

  const handleNodeSelect = () => {
    selectNode(props)
  }

  const targetHandleId = `target_${props.id}`
  const sourceHandleId = `target_${props.id}`

  return (
    <>
      <Handle
        id={targetHandleId}
        type='target'
        position={Position.Left}
        isConnectableStart={false}
      />
      <SourceHandle
        id={sourceHandleId}
        type='source'
        position={Position.Right}
        isConnectableEnd={false}
      />
      <div
        className='min-w-[250px] overflow-hidden rounded-md text-gray-900 shadow-lg'
        role='button'
        onClick={handleNodeSelect}
      >
        <header className='flex items-center justify-between bg-green-500 px-3 py-2 text-sm '>
          <div className='flex items-center gap-x-2'>
            <IconMessage />
            <span>Send message</span>
          </div>
          <IconBrandWhatsapp />
        </header>
        <div className='bg-green-50 p-3'>
          <p>{props.data.message}</p>
        </div>
      </div>
    </>
  )
}
