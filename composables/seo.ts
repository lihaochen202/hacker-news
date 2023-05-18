import type { MaybeRefOrGetter } from 'vue'

export function useHeadTitle(name?: MaybeRefOrGetter<string>) {
  const appConfig = useAppConfig()
  const title = computed(() =>
    name ? `${appConfig.title} | ${toValue(name)}` : appConfig.title,
  )
  return title
}
