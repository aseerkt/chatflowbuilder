import useStore from '@/stores'
import { fireEvent, render } from '@testing-library/react'
import { describe, it } from 'vitest'
import TextNodeEditor from '../TextNodeEditor'

describe('<TextNodeEditor /> tests', () => {
  const nodeId = 'node_1'
  const initialMessage = 'message 1'
  beforeEach(() => {
    useStore.setState({
      nodes: [
        {
          id: nodeId,
          type: 'textNode',
          data: { message: initialMessage },
          position: { x: 100, y: 100 },
        },
      ],
      nodeId: nodeId,
      nodeType: 'textNode',
    })
  })

  it('should match snapshot', () => {
    const { baseElement } = render(<TextNodeEditor nodeId={nodeId} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should update node message', () => {
    const { getByText } = render(<TextNodeEditor nodeId={nodeId} />)
    const textareaElement = getByText(initialMessage)
    fireEvent.input(textareaElement, { target: { value: 'message 2' } })
    expect(textareaElement).toHaveValue('message 2')
  })
})
