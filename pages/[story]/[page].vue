<script setup lang="ts">
import type { FetchStoriesReturn, StoryClassVisually } from '~/types'

definePageMeta({
  middleware: 'effective',
})

const route = useRoute()
const story = computed(() => route.params.story as StoryClassVisually)

const name = computed(() => `${story.value[0].toLocaleUpperCase()}${story.value.slice(1)}`)
const title = useHeadTitle(name)
useHead({ title })

const page = computed(() => +route.params.page)
const size = 10
const url = computed(() => `/api/${story.value}?page=${page.value}&size=${size}`)
const { data } = await useFetch<FetchStoriesReturn>(url)

function orderCalculator(index: number) {
  return (page.value - 1) * size + index + 1
}
</script>

<template>
  <div py-4>
    <ul mb-4>
      <li v-for="(item, index) in data!.list" :key="item.id" mb-2.5 last:mb-0>
        <StoryCard v-bind="item" :order="orderCalculator(index)" />
      </li>
    </ul>
    <StoryPagination
      :story="story"
      :page="page"
      :size="size"
      :total="data!.total"
    />
  </div>
</template>
