import { render } from '@testing-library/react'
import SettingsPanel from '../SettingsPanel'

describe('<SettingsPanel /> tests', () => {
  it('should match snapshot', () => {
    const { baseElement } = render(
      <SettingsPanel nodeId='1' nodeType='unknownType' />,
    )
    expect(baseElement).toMatchSnapshot()
  })
})
