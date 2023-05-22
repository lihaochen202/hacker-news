import { formatDistanceToNowStrict, fromUnixTime } from 'date-fns'
import type { StoryClassMaps } from '~/types'

export const storyClassMaps: StoryClassMaps = {
  news: 'topstories',
  newest: 'newstories',
  ask: 'askstories',
  show: 'showstories',
  jobs: 'jobstories',
}

export function formatStoryTimeDistance(time: number) {
  return formatDistanceToNowStrict(fromUnixTime(time))
}
