import type { User, UserRaw } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') as string
  const userRaw = await $fetch<UserRaw>(`/user/${id}.json`, { baseURL: useAppConfig().apiBaseURL })
  return {
    name: userRaw.id,
    created: userRaw.created,
    karma: userRaw.karma,
    about: userRaw.about,
  } as User
})
