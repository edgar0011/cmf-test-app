import { StoryFn as Story, Meta } from '@storybook/react'
import { LayoutBox } from '@e1011/es-kit'

import { CommentsUI } from 'components/molecules/comments/view/CommentsUI'
import type { CommentsUIProps } from 'components/molecules/comments/view/commentsUI.types'


export default {
  title: 'e1011/molecules/comments/view/CommentsUI',
  component: CommentsUI,
} as Meta


const CommentsUITemplate: Story<CommentsUIProps> = (args) => (
  <LayoutBox width='100%' height='100%' justify='center' align='center'>
    <CommentsUI {...args}>or with some content...</CommentsUI>
  </LayoutBox>
)

export const CommentsUIBase = CommentsUITemplate.bind({})
CommentsUIBase.args = {}
