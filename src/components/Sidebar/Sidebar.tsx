import useStore from '@/stores'
import { nodeSelector } from '@/stores/selectors'
import { NodePanel } from '../NodePanel'
import { SettingsPanel } from '../SettingsPanel'

export default function Sidebar() {
  const { nodeId, nodeType } = useStore(nodeSelector)

  return (
    <aside className='w-[350px] border-l'>
      {nodeId && nodeType ? (
        <SettingsPanel nodeId={nodeId} nodeType={nodeType} />
      ) : (
        <NodePanel />
      )}
    </aside>
  )
}
