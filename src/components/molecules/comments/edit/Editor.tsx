import { memo, FC, useCallback, useState, ChangeEvent, useEffect } from 'react'
import { LayoutBox, classNames } from '@e1011/es-kit'

import { CommentType } from '../types'

import type { EditorProps } from 'components/molecules/comments/edit/editor.types'
import classes from 'components/molecules/comments/edit/editor.module.scss'
import { HeadlineSecondary } from 'components/atoms/text'
import { Button } from 'components/atoms/button/Button'


export const Editor: FC<EditorProps> = memo<EditorProps>(({
  user,
  comment,
  createHandler,
  resetHandler,
  className,
  mode = 'create',
}: EditorProps) => {
  const [commentState, setCommentState] = useState<Partial<CommentType>>({
    ...comment,
    author: mode === 'create' ? user : comment.author,
  })

  const postMessageHandler = useCallback(async () => {
    try {
      const result = await createHandler({ ...commentState, posted: new Date() } as CommentType)

      if (result) {
        setCommentState({
          author: user,
          message: '',
        } as CommentType)
      }
    } catch {
      // todo show error messages
    }
  }, [commentState, createHandler, user])

  const inputChangeHandler = useCallback((event: ChangeEvent) => {
    setCommentState((prevComment: Partial<CommentType>) => ({
      ...prevComment,
      [event.target.id]: (event.target as HTMLTextAreaElement).value,
    }))
  }, [])


  useEffect(() => {
    setCommentState({
      ...comment,
      author: mode === 'create' ? user : comment.author,
      message: mode === 'create' ? '' : comment.message,
    })
  }, [user, comment, mode])


  return (
    <LayoutBox
      direction='column'
      width='100%'
      gap='1rem'
      padding='1rem'
      // eslint-disable-next-line dot-notation
      className={classNames(classes['editor'], className)}
    >
      <HeadlineSecondary>{commentState.author?.displayName}</HeadlineSecondary>
      <textarea id='message' onChange={inputChangeHandler} value={commentState?.message}>{commentState?.message}</textarea>

      <LayoutBox gap='2rem'>
        {/* TODO use i18n */}
        <Button onClick={postMessageHandler} disabled={!commentState.message}>{mode === 'create' ? 'Post message' : 'Edit'}</Button>
        {resetHandler && <Button onClick={resetHandler}>Reset</Button>}
      </LayoutBox>
    </LayoutBox>
  )
})

export type EditorType = typeof Editor

// Set display name for the component.
Editor.displayName = 'Editor'
