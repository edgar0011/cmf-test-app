/**
 * @jest-environment jsdom
 */

import { mockDataAPI } from '../types'

import { CommentsUI } from 'components/molecules/comments/view/CommentsUI'
import classes from 'components/molecules/comments/view/commentsUI.module.scss'
import { render } from 'utils/test/test-utils'

describe('components/molecules/comments/view/CommentsUI', () => {
  it('renders CommentsUI with classes', async () => {
    const rendered = render(
      <CommentsUI
        className='anotherClass'
        comments={mockDataAPI.getComments()}
        user={mockDataAPI.user}
        dataAPI={mockDataAPI}
      />,
    )

    const elements = rendered?.container.querySelectorAll('.anotherClass')

    const element = elements[0] as HTMLElement

    expect(rendered?.container).toBeDefined()
    expect(elements?.length).toEqual(1)
    expect(element?.getAttribute('class')?.includes('anotherClass')).toEqual(true)
    expect(element?.getAttribute('class')?.includes(classes.commentsUI)).toEqual(true)
  })
})
