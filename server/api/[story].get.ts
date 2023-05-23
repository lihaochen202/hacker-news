import type { QueryObject } from 'ufo'
import { storyClassMaps } from '../../composables/story'
import type { StoryClass } from '../../types'
import { fetchStory } from '../utils'

const cachedFetchStoriesID = cachedFunction(fetchStoriesID, {
  maxAge: useAppConfig().apiCacheMaxAge,
  getKey: (story: StoryClass) => story,
})

export default defineEventHandler(async (event) => {
  const story = getRouterParam(event, 'story') as string
  if (!(story in storyClassMaps))
    return createError({ status: 404 })

  const { page, size } = normalizeQuery(getQuery(event))
  const ids = await cachedFetchStoriesID(storyClassMaps[story])
  if (!ids)
    return { page, size, total: 0, list: [] }

  const slice = ids.slice((page - 1) * size, page * size)
  const stories = await fetchStories(slice)
  return { page, size, total: ids.length, list: stories }
})

function normalizeQuery(query: QueryObject) {
  return {
    page: toNumber(query.page) || 1,
    size: toNumber(query.size) || 10,
  }
}

function toNumber(val: any) {
  const _val = +val
  return isNaN(_val) ? 0 : _val
}

function fetchStoriesID(story: StoryClass) {
  return $fetch<number[]>(`/${story}.json`, { baseURL: useAppConfig().apiBaseURL })
}

function fetchStories(ids: number[]) {
  return Promise.all(ids.map(id => fetchStory(id)))
}
