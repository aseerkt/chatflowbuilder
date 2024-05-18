import useStore from '@/stores'
import { render } from '@testing-library/react'
import Sidebar from '../Sidebar'

describe('<Sidebar /> tests', () => {
  it('should render <NodePanel />', () => {
    const { baseElement } = render(<Sidebar />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render <SettingsPanel />', () => {
    useStore.setState({
      nodeId: 'node_1',
      nodeType: 'textNode',
      nodes: [
        {
          id: 'node_1',
          data: {
            message: 'message 1',
          },
          position: {
            x: 150,
            y: 100,
          },
        },
      ],
    })
    const { baseElement } = render(<Sidebar />)
    expect(baseElement).toMatchSnapshot()
  })
})
