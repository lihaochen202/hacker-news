import type { MaybeRefOrGetter } from 'vue'

export function useHeadTitle(name?: MaybeRefOrGetter<string | null | undefined>) {
  const appConfig = useAppConfig()
  const title = computed(() => {
    if (!name)
      return appConfig.title

    const _name = toValue(name)
    return _name ? `${appConfig.title} | ${_name}` : appConfig.title
  })
  return title
}
