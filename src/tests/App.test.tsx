import App from '@/App'
import { Toaster } from '@/components/ui/toaster'
import useStore from '@/stores'
import { act, fireEvent, render } from '@testing-library/react'

describe('<App /> tests', () => {
  it('should match snapshot', () => {
    const { baseElement } = render(<App />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should give success toast if nodes are singly connected', () => {
    const spy = vi.fn().mockReturnValue(true)

    useStore.setState({
      isSinglyConnected: spy,
    })

    const { getByRole, getByText } = render(
      <>
        <App />
        <Toaster />
      </>,
    )
    const saveButton = getByRole('button', { name: /Save Changes/i })

    act(() => {
      fireEvent.click(saveButton)
    })

    expect(spy).toBeCalled()
    expect(getByText(/Flow Saved/i)).toBeInTheDocument()
  })

  it('should give error toast if nodes are not singly connected', () => {
    const spy = vi.fn().mockReturnValue(false)

    useStore.setState({
      isSinglyConnected: spy,
    })

    const { getByRole, getByText } = render(
      <>
        <App />
        <Toaster />
      </>,
    )
    const saveButton = getByRole('button', { name: /Save Changes/i })

    act(() => {
      fireEvent.click(saveButton)
    })

    expect(spy).toBeCalled()
    expect(getByText(/Cannot save flow/i)).toBeInTheDocument()
  })
})
