<script setup lang="ts">
import type { Pagination, StoryClassVisually } from '~/types'

const { page, size, total, story } = defineProps<Pagination & { story: StoryClassVisually }>()

const pageCount = computed(() => Math.ceil(total / size))

const prevEnabled = computed(() => page > 1)
const prevURL = computed(() => resolveURL(page - 1))

const nextEnabled = computed(() => page < pageCount.value)
const nextURL = computed(() => resolveURL(page + 1))

function resolveURL(page: number) {
  return `/${story}/${page}`
}
</script>

<template>
  <div flex="~ justify-center items-center">
    <StoryPaginationLink :enabled="prevEnabled" :to="prevURL">
      <span mr-1>&lt;</span>Prev
    </StoryPaginationLink>
    <span mx-10>
      {{ page }}
      <span mx-0.5>/</span>
      {{ pageCount }}
    </span>
    <StoryPaginationLink :enabled="nextEnabled" :to="nextURL">
      Next<span ml-1>&gt;</span>
    </StoryPaginationLink>
  </div>
</template>
