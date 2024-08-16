import { StoryFn as Story, Meta } from '@storybook/react'
import { LayoutBox } from '@e1011/es-kit'

import { Comment } from 'components/molecules/comments/view/comment/Comment'
import type { CommentProps } from 'components/molecules/comments/view/comment/comment.types'


export default {
  title: 'e1011/molecules/comments/view/comment/Comment',
  component: Comment,
} as Meta


const CommentTemplate: Story<CommentProps> = (args) => (
  <LayoutBox width='100%' height='100%' justify='center' align='center'>
    <Comment {...args}>or with some content...</Comment>
  </LayoutBox>
)

export const CommentBase = CommentTemplate.bind({})
CommentBase.args = {}
