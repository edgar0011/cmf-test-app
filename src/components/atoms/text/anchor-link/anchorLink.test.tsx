/**
 * @jest-environment jsdom
 */

import { AnchorLink } from 'components/atoms/text/anchor-link/AnchorLink'
import { render } from 'utils/test/test-utils'

describe('components/atoms/button/anchor-link/AnchorLink', () => {
  it('renders AnchorLink with classes', async () => {
    const rendered = render(<AnchorLink className='anotherClass' />)

    const elements = rendered?.container.querySelectorAll('.anotherClass')

    const element = elements[0] as HTMLElement

    expect(rendered?.container).toBeDefined()
    expect(elements?.length).toEqual(1)
    expect(element?.getAttribute('class')?.includes('anotherClass')).toEqual(true)
  })
})
