<script setup lang="ts">
import type { Story } from '~/types'

const { large, url, id, author, time } = defineProps<Story & { large?: boolean }>()

const textSize = computed(() => large ? 'text-sm' : 'text-xs')

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

const formattedTime = computed(() => formatStoryTimeDistance(time))
</script>

<template>
  <div>
    <h2 :class="{ 'text-xl': large }">
      <template v-if="url">
        <a :href="url" target="_blank" rel="noopener noreferrer" v-html="title" />
        <span ml-1 text-zinc-500 :class="textSize">({{ simplifiedURL }})</span>
      </template>
      <NuxtLink v-else :to="internalURL">
        <span v-html="title" />
      </NuxtLink>
    </h2>
    <p :mt="large ? '2' : '1'" text-zinc-500 :class="textSize">
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
