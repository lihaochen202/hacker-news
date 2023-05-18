export default defineNuxtRouteMiddleware((to) => {
  const story = to.params.story as string
  if (story && !(story in storyClassMaps))
    return navigateTo('/404', { redirectCode: 301 })

  const numericalKey = story ? 'page' : 'id'
  const numericalValue = +to.params[numericalKey]
  if (isNaN(numericalValue) || numericalValue < 1)
    return navigateTo('/404', { redirectCode: 301 })
})
