<script setup lang="ts">
import { format, fromUnixTime } from 'date-fns'
import type { User } from '~/types'

const route = useRoute()
const name = computed(() => route.params.name as string)
const title = useHeadTitle(name)
useHead({ title })

const url = computed(() => `/api/user/${name.value}`)
const { data } = await useFetch<User>(url)
const formattedTime = computed(() => {
  if (!data.value?.created)
    return ''
  return format(fromUnixTime(data.value.created), 'MMMM dd yyyy')
})

const appConfig = useAppConfig()
const externalLinks = computed(() => {
  const links = [
    { text: 'submissions', path: 'submitted' },
    { text: 'comments', path: 'threads' },
    { text: 'favorites', path: 'favorites' },
  ]
  links.forEach((link) => {
    link.path = `${appConfig.websiteBaseURL}/${link.path}?id=${name.value}`
  })
  return links
})
</script>

<template>
  <div rounded bg-white px-10 py-2.5>
    <div grid="~ cols-[68px_auto] gap-x-2">
      <div text-lg font-600>
        User:
      </div>
      <div text-lg font-600>
        {{ data!.name }}
      </div>

      <div>Created:</div>
      <div>{{ formattedTime }}</div>

      <div>Karma:</div>
      <div>{{ data!.karma }}</div>
    </div>

    <section my-2.5 text-base prose="~ gray" v-html="data!.about" />

    <ul flex gap-x-4>
      <li v-for="item in externalLinks" :key="item.text">
        <a :href="item.path" link target="_blank" rel="noopener noreferrer">
          {{ item.text }}
        </a>
      </li>
    </ul>
  </div>
</template>
