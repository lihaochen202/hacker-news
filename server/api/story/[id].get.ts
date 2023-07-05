import { fetchCompleteStory } from '../../utils'

export default defineEventHandler(event => fetchCompleteStory(getRouterParam(event, 'id')!))
