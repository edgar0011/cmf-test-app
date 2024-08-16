import { PropsWithChildren } from 'react'
import { CommonProps } from '@e1011/es-kit'

import { CommentType, DataAPI } from '../../types'


export type CommentProps = PropsWithChildren & CommonProps & {
  comment: CommentType
  canEdit: boolean
  editHandler: DataAPI['updateComment']
  deleteHandler: () => void
}
