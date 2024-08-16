import { StoryFn as Story, Meta } from '@storybook/react'
import { LayoutBox } from '@e1011/es-kit'

import { Editor } from 'components/molecules/comments/edit/Editor'
import type { EditorProps } from 'components/molecules/comments/edit/editor.types'


export default {
  title: 'e1011/molecules/comments/edit/Editor',
  component: Editor,
} as Meta


const EditorTemplate: Story<EditorProps> = (args) => (
  <LayoutBox width='100%' height='100%' justify='center' align='center'>
    <Editor {...args}>or with some content...</Editor>
  </LayoutBox>
)

export const EditorBase = EditorTemplate.bind({})
EditorBase.args = {}
