import { PropsWithChildren } from 'react'
import { CommonProps } from '@e1011/es-kit'

import { Author, CommentType } from '../types'



export type EditorProps = PropsWithChildren & CommonProps & {
  user?: Author
  comment: Partial<CommentType>
  createHandler: (comment: CommentType) => Promise<boolean>
  mode?: 'edit' | 'create'
  resetHandler?: () => void
}
