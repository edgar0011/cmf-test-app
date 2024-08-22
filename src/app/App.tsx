import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { ErrorBoundary, LayoutBox, useThemePreference, useToggle } from '@e1011/es-kit'
import '@e1011/es-kit/dist/ui/index.css'

import classes from './app.module.scss'

import { CommentsUI } from 'components/molecules/comments/view/CommentsUI'
import { CommentType, mockDataAPI } from 'components/molecules/comments/types'
import { Headline } from 'components/atoms/text'


export const App = (): ReactNode => {
  useThemePreference()
  return <MainComponent />
}

export const MainComponent = (): ReactNode => {
  const [comments, setComments] = useState<CommentType[]>()
  const [loading, setLoading] = useToggle(false)


  const stateChangeHandler = useCallback(async () => {
    setLoading(mockDataAPI.loading)

    setComments(mockDataAPI.getComments())
  }, [])

  useEffect(() => {
    const unsubscriber = mockDataAPI.subscribe(stateChangeHandler)

    mockDataAPI.fetchComments()

    return (): void => {
      unsubscriber()
    }
  }, [stateChangeHandler])

  const loadingAffectdStyle = useMemo(() => ({
    userEvents: loading ? 'none' : 'auto',
    opacity: loading ? '0.8' : '1',
  }), [loading])

  return (
    <ErrorBoundary>

      <LayoutBox
        width='100%'
        align='center'
        direction='column'
        gap='1rem'
        padding='1rem'
        className={classes['app-container']}
        style={loadingAffectdStyle}
      >
        {loading && (
          <LayoutBox
            position='absolute'
            zIndex='1'
            width='100%'
            height='100%'
            justify='center'
            align='center'
          >
            <Headline>Loading...</Headline>
          </LayoutBox>
        )}
        {comments && <CommentsUI comments={comments} user={mockDataAPI.user} dataAPI={mockDataAPI} />}
      </LayoutBox>
    </ErrorBoundary>
  )
}

