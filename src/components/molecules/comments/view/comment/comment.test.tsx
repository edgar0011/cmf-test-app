/**
 * @jest-environment jsdom
 */

import { mockDataAPI } from '../../types'

import { Comment } from 'components/molecules/comments/view/comment/Comment'
import classes from 'components/molecules/comments/view/comment/comment.module.scss'
import { render } from 'utils/test/test-utils'


const mockComment = mockDataAPI.getComments()[0]

const editHandler
  = (): ReturnType<typeof mockDataAPI.updateComment> => mockDataAPI.updateComment(mockComment.id, mockComment)

const deleteHandler
  = (): ReturnType<typeof mockDataAPI.deleteComment> => mockDataAPI.deleteComment(mockComment.id)

describe('components/molecules/comments/view/comment/Comment', () => {
  it('renders Comment with classes', async () => {
    const rendered = render(
      <Comment
        className='anotherClass'
        comment={mockDataAPI.getComments()[0]}
        canEdit={false}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />,
    )

    const elements = rendered?.container.querySelectorAll('.anotherClass')

    const element = elements[0] as HTMLElement

    expect(rendered?.container).toBeDefined()
    expect(elements?.length).toEqual(1)
    expect(element?.getAttribute('class')?.includes('anotherClass')).toEqual(true)
    expect(element?.getAttribute('class')?.includes(classes.comment)).toEqual(true)
  })
})
