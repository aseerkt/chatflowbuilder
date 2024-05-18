import { render } from '@testing-library/react'
import Header from '../Header'

describe('<Header /> tests', () => {
  it('should match snapshot', () => {
    const { baseElement } = render(<Header>Hello World</Header>)
    expect(baseElement).toMatchSnapshot()
  })
})
