import useStore from '@/stores'
import { IconArrowLeft } from '@tabler/icons-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type TextNodeEditorProps = {
  nodeId: string
}

export default function TextNodeEditor({ nodeId }: TextNodeEditorProps) {
  const node = useStore((state) =>
    state.nodes.find((node) => node.id === nodeId),
  )
  const updateNode = useStore((state) => state.updateNode)
  const deselectNode = useStore((state) => state.deselectNode)

  if (!node) return null

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNode({
      ...node,
      data: {
        ...node.data,
        message: e.target.value,
      },
    })
  }

  return (
    <div>
      <header className='flex items-center gap-x-4 border-b px-4 py-2'>
        <Button
          variant='link'
          className='rounded-full p-0'
          aria-label='Back to node panel'
          onClick={deselectNode}
        >
          <IconArrowLeft />
        </Button>
        <span className='font-semibold'>Message</span>
      </header>
      <div className='flex flex-col gap-y-2 p-4'>
        <Label htmlFor='message'>Text</Label>
        <Textarea
          id='message'
          onChange={onChange}
          value={node.data.message || ''}
          rows={4}
        />
      </div>
    </div>
  )
}
