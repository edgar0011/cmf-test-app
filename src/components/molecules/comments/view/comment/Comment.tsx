import { memo, FC, useCallback } from 'react'
import { LayoutBox, classNames, useToggle } from '@e1011/es-kit'
import dayjs from 'dayjs'

import { Editor } from '../../edit/Editor'
import { CommentType as ComType } from '../../types'

import type { CommentProps } from 'components/molecules/comments/view/comment/comment.types'
import classes from 'components/molecules/comments/view/comment/comment.module.scss'
import { HeadlineSecondary, HeadlineTertiary } from 'components/atoms/text'
import { Button } from 'components/atoms/button/Button'
import { DATE_TIME_FORMAT } from 'utils/date'



export const Comment: FC<CommentProps> = memo<CommentProps>(({
  comment,
  className,
  editHandler,
  deleteHandler,
  canEdit,
}: CommentProps) => {
  const [editMode, toggleEditMode] = useToggle(false)

  const createHandlerAsEditHandler = useCallback(async (comment: ComType) => {
    const result = await editHandler(comment.id, comment)

    if (result) {
      toggleEditMode(false)
    }
  }, [editHandler, toggleEditMode])

  const delteButtonClickHandler = useCallback(() => {
    deleteHandler()
  }, [deleteHandler])

  return (
    <LayoutBox
      direction='column'
      width='100%'
      gap='1rem'
      padding='1rem'
      // eslint-disable-next-line dot-notation
      className={classNames(classes['comment'], className)}
      column
    >
      {!editMode && (
        <>
          <HeadlineSecondary>{comment.author.displayName}</HeadlineSecondary>
          <HeadlineTertiary>{dayjs(comment.updated || comment.posted).format(DATE_TIME_FORMAT)}</HeadlineTertiary>

          {comment.message}

          {/* TODO better authorization check */}
          {canEdit && (
            <LayoutBox gap='2rem'>
              <Button onClick={toggleEditMode}>Edit</Button>
              <Button onClick={delteButtonClickHandler}>Delete</Button>
            </LayoutBox>
          )}
        </>
      )}
      {editMode && (
        <Editor
          comment={comment}
          createHandler={createHandlerAsEditHandler}
          mode='edit'
          resetHandler={toggleEditMode}
        />
      )}
    </LayoutBox>
  )
})

export type CommentType = typeof Comment

// Set display name for the component.
Comment.displayName = 'Comment'
