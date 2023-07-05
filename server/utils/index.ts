import type { CompleteStory, Story, StoryComment, StoryRaw } from '~/types'

export async function fetchStory(id: number | string) {
  const raw = await fetchStoryRaw(id)
  return {
    id: raw.id,
    title: raw.title,
    url: raw.url,
    points: raw.score,
    author: raw.by,
    time: raw.time,
    comments: raw.descendants ?? 0,
  } as Story
}

export async function fetchCompleteStory(id: number | string) {
  const raw = await fetchStoryRaw(id)
  const children = await fetchStoryComments(raw.kids)
  return {
    id: raw.id,
    title: raw.title,
    url: raw.url,
    points: raw.score,
    author: raw.by,
    time: raw.time,
    comments: raw.descendants ?? 0,
    children,
  } as unknown as CompleteStory
}

async function fetchStoryRaw(id: number | string) {
  return $fetch<StoryRaw>(`/item/${id}.json`, { baseURL: useAppConfig().apiBaseURL })
}

async function fetchStoryComments(ids?: number[]): Promise<StoryComment[]> {
  if (!ids)
    return []

  const comments = await Promise.all(ids.map(id => fetchStoryComment(id)))
  return comments.filter(item => item.text)
}

async function fetchStoryComment(id: number | string) {
  const raw = await fetchStoryRaw(id)
  const chidren = await fetchStoryComments(raw.kids)
  return {
    author: raw.by,
    time: raw.time,
    text: raw.text,
    chidren,
  } as unknown as StoryComment
}
