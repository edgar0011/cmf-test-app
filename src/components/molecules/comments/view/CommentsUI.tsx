import { memo, FC, useMemo, useCallback } from 'react'
import { classNames, LayoutBox } from '@e1011/es-kit'

import { CommentType } from '../types'
import { Editor } from '../edit/Editor'

import { Comment } from './comment/Comment'

import classes from 'components/molecules/comments/view/commentsUI.module.scss'
import type { CommentsUIProps } from 'components/molecules/comments/view/commentsUI.types'


export const CommentsUI: FC<CommentsUIProps> = memo<CommentsUIProps>(({
  comments,
  user,
  dataAPI,
  className,
}: CommentsUIProps) => {
  const editorComment = useMemo(() => ({ message: '', author: user }), [user])

  const createDeleteCommentHandler = useCallback(
    (comment: CommentType) => (): Promise<boolean> => dataAPI.deleteComment(comment.id),
    [dataAPI],
  )

  const editCommentHandler = useCallback((id: string, data: Partial<CommentType>) => {
    dataAPI.updateComment(id, data)
    return true
  }, [])

  const createCommentHandler = useCallback((comment: CommentType) => {
    dataAPI.createComment(comment)
    return true
  }, [])

  return (
    <LayoutBox column className={classNames(classes.commentsUI, className)}>
      <LayoutBox column width='100%'>
        {comments?.map((comment: CommentType) => (
          <Comment
            key={comment.id}
            comment={comment}
            canEdit={comment.author.id === user.id}
            deleteHandler={createDeleteCommentHandler(comment)}
            editHandler={editCommentHandler}
          />
        ))}
      </LayoutBox>

      <Editor comment={editorComment} createHandler={createCommentHandler} user={dataAPI.user} />
    </LayoutBox>
  )
})

export type CommentsUIType = typeof CommentsUI

// Set display name for the component.
CommentsUI.displayName = 'CommentsUI'
