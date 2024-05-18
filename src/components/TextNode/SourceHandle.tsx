import useStore from '@/stores'
import { useMemo } from 'react'
import { Handle, HandleProps, getConnectedEdges, useNodeId } from 'reactflow'

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

export default SourceHandle
