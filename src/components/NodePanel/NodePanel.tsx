import { IconMessage } from '@tabler/icons-react'

export default function NodePanel() {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className='p-3' role='listbox'>
      <div
        className='flex w-[200px] cursor-grab flex-col items-center gap-y-3 rounded-md border-2 border-green-600 p-3 text-green-600 shadow-sm'
        role='option'
        draggable
        onDragStart={(event) => onDragStart(event, 'textNode')}
      >
        <IconMessage size={56} strokeWidth={2} />
        <span>Message</span>
      </div>
    </div>
  )
}
