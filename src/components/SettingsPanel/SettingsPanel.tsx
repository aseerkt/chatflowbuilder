import { TextNodeEditor } from '../TextNodeEditor'

type SettingsPanelProps = {
  nodeId: string
  nodeType: string
}

export default function SettingsPanel({
  nodeId,
  nodeType,
}: SettingsPanelProps) {
  switch (nodeType) {
    case 'textNode':
      return <TextNodeEditor nodeId={nodeId} />
    default:
      return null
  }
}
