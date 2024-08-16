import { PropsWithChildren } from 'react'
import { CommonProps } from '@e1011/es-kit'

import { Author, CommentType, DataAPI } from '../types'



export type CommentsUIProps = PropsWithChildren & CommonProps & {

  className?: string
  comments: CommentType[]
  user: Author
  dataAPI: DataAPI
}
