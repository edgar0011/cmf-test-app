/**
 * @jest-environment jsdom
 */

import { mockDataAPI } from '../types'

import { Editor } from 'components/molecules/comments/edit/Editor'
import classes from 'components/molecules/comments/edit/editor.module.scss'
import { render } from 'utils/test/test-utils'


describe('components/molecules/comments/edit/Editor', () => {
  it('renders Editor with classes', async () => {
    const rendered = render(<Editor
      className='anotherClass'
      comment={mockDataAPI.getComments()[0]}
      user={mockDataAPI.user}
      createHandler={mockDataAPI.createComment}
    />)

    const elements = rendered?.container.querySelectorAll('.anotherClass')

    const element = elements[0] as HTMLElement

    expect(rendered?.container).toBeDefined()
    expect(elements?.length).toEqual(1)
    expect(element?.getAttribute('class')?.includes('anotherClass')).toEqual(true)
    expect(element?.getAttribute('class')?.includes(classes.editor)).toEqual(true)
  })
})
