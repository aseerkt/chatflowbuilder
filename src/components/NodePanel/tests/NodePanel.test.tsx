import { render } from '@testing-library/react'
import NodePanel from '../NodePanel'

describe('<NodePanel /> tests', () => {
  it('should allow drag of message node', () => {
    const { getByText } = render(<NodePanel />)
    const draggable = getByText('Message').closest('div')
    expect(draggable).toBeTruthy()
    expect(draggable).toHaveAttribute('draggable', 'true')

    const dataTransfer = {
      setData: vi.fn(),
      effectAllowed: 'none',
    } as unknown as DataTransfer

    const dragStartEvent = new Event('dragstart', {
      bubbles: true,
      cancelable: true,
    }) as DragEvent
    Object.defineProperty(dragStartEvent, 'dataTransfer', {
      value: dataTransfer,
    })
    draggable!.dispatchEvent(dragStartEvent)

    expect(dataTransfer.setData).toHaveBeenCalledWith(
      'application/reactflow',
      'textNode',
    )
    expect(dataTransfer.effectAllowed).toBe('move')
  })
})
