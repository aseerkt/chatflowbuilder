import useStore from '@/stores'
import { IconBrandWhatsapp, IconMessage } from '@tabler/icons-react'
import { Handle, NodeProps, Position } from 'reactflow'
import SourceHandle from './SourceHandle'

export type TextNodeData = {
  message: string
}

export default function TextNode(props: NodeProps<TextNodeData>) {
  const selectNode = useStore((state) => state.selectNode)

  const handleNodeSelect = () => {
    selectNode(props)
  }

  const targetHandleId = `target_${props.id}`
  const sourceHandleId = `source_${props.id}`

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
