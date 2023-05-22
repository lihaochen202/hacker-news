export type StoryClassVisually =
  | 'news'
  | 'newest'
  | 'ask'
  | 'show'
  | 'jobs'

export type StoryClass =
  | 'topstories'
  | 'newstories'
  | 'askstories'
  | 'showstories'
  | 'jobstories'

export type StoryClassMaps = Record<StoryClassVisually, StoryClass>

export type StoryType =
  | 'job'
  | 'story'
  | 'comment'
  | 'poll'
  | 'pollopt'

export type UnixTime = number

export type HTMLString = string

export interface StoryRaw {
  id: number
  deleted: boolean
  type: StoryType
  by: string
  time: UnixTime
  text: HTMLString
  dead: boolean
  parent: number
  poll: number
  kids?: number[]
  url?: string
  score: number
  title: HTMLString
  parts: number[]
  descendants?: number
}

export interface Story {
  id: number
  title: HTMLString
  url?: string
  points: number
  author: string
  time: number
  comments: number
}

export type CompleteStory = Story & { children: StoryComment[] }

export interface StoryComment {
  author: string
  time: number
  text: HTMLString
  chidren: StoryComment[]
}

export interface Pagination {
  page: number
  size: number
  total: number
}

export type FetchStoriesReturn = Pagination & { list: Story[] }

export interface UserRaw {
  id: string
  created: UnixTime
  karma: number
  about?: HTMLString
  submitted: number[]
}

export interface User {
  name: string
  created: UnixTime
  karma: number
  about?: HTMLString
}
