/* eslint-disable max-len */
import { delay } from '@e1011/es-kit'

export type Author = {
  id: string
  displayName: string
}

export type CommentType = {
  id: string
  author: Author
  authorAlias?: string
  posted: Date
  updated?: Date
  message: string
}


export type DataAPI = {
  fetchComments: () => Promise<CommentType[]>
  createComment: (comment: CommentType) => Promise<boolean>
  updateComment: (id: string, data: Partial<CommentType>) => Promise<boolean>
  deleteComment: (id: string) => Promise<boolean>
  subscribe: (callback: () => void) => () => void
  publish: () => void
  subscribers: Set<() => void>
  user: Author
  loading: boolean
  getComments: () => CommentType[]
}


let mockComments: CommentType[] = [
  {
    id: '1',
    posted: new Date(),
    author: { id: '1', displayName: 'Bob' },
    message: 'error eum quia voluptates alias repudiandae\naccusantium veritatis maiores assumenda\nquod impedit animi tempore veritatis\nanimi et et officiis labore impedit blanditiis repudiandae',
  },

  {
    id: '2',
    posted: new Date(),
    author: { id: '2', displayName: 'Alice' },
    message: 'umque molestiae officia aut fugiat nemo autem\nvero alias atque sed qui ratione quia\nrepellat vel earum\nea laudantium mollitia',
  },

]

export const mockDataAPI: DataAPI = {
  async fetchComments () {
    this.loading = true
    this.publish()

    await delay(500)

    this.loading = false
    this.publish()

    return mockComments
  },
  async createComment(comment: CommentType) {
    this.loading = true
    this.publish()
    await delay(500)

    mockComments = [...mockComments, { ...comment, id: `${mockComments.length + 1}` }]

    this.loading = false
    this.publish()

    return true
  },
  async updateComment(id: string, data: Partial<CommentType>) {
    this.loading = true
    this.publish()
    await delay(500)

    mockComments = mockComments?.map((comment: CommentType) => {
      if (comment.id === id) {
        return {
          ...comment,
          ...data,
        }
      }
      return comment
    })

    this.loading = false
    this.publish()
    return true
  },
  async deleteComment(id: string) {
    this.loading = true
    this.publish()
    await delay(500)

    mockComments = mockComments?.filter((comment: CommentType) => comment.id !== id)

    this.loading = false
    this.publish()
    return true
  },

  subscribers: new Set(),

  subscribe(callback: () => void) {
    this.subscribers.add(callback)

    return () => {
      this.subscribers.delete(callback)
    }
  },

  publish() {
    // eslint-disable-next-line no-restricted-syntax
    for (const subscriber of this.subscribers) {
      subscriber()
    }
  },

  user: {
    id: '11',
    displayName: 'Edgar',
  },

  getComments() {
    return mockComments
  },

  loading: false,
}


// eslint-disable-next-line no-restricted-syntax
for (const [prop, value] of Object.entries(mockDataAPI)) {
  if (typeof value === 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockDataAPI[prop] = value.bind(mockDataAPI)
  }
}
