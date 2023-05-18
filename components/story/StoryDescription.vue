<script setup lang="ts">
import { formatDistanceToNowStrict, fromUnixTime } from 'date-fns'
import type { Story } from '~/types'

const { url, id, author, time } = defineProps<Story>()

const simplifiedURL = computed(() => {
  if (!url)
    return ''
  const [,raw] = url.split('//')
  let [domain, path] = raw.split('/')
  if (domain.slice(0, 3) === 'www')
    domain = domain.slice(4)
  return domain.includes('github.com') ? `${domain}/${path}` : domain
})
const internalURL = computed(() => `/story/${id}`)
const userURL = computed(() => `/user/${author}`)

const formattedTime = computed(() => formatDistanceToNowStrict(fromUnixTime(time)))
</script>

<template>
  <div>
    <h2>
      <template v-if="url">
        <a :href="url" target="_blank" rel="noopener noreferrer" v-html="title" />
        <span ml-1 text="xs zinc-500">({{ simplifiedURL }})</span>
      </template>
      <NuxtLink v-else :to="internalURL" v-html="title" />
    </h2>
    <p mt-1 text="xs zinc-500">
      {{ points }} points by
      <NuxtLink link :to="userURL">
        {{ author }}
      </NuxtLink>
      {{ formattedTime }} ago
      <template v-if="comments">
        |
        <NuxtLink link :to="internalURL">
          {{ comments }} comments
        </NuxtLink>
      </template>
    </p>
  </div>
</template>
