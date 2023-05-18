<script setup lang="ts">
import type { Story } from '~/types'

defineProps<{ order: number } & Story >()
</script>

<template>
  <div rounded bg-white p-2.5 flex="~ items-center">
    <div mr-2 w-10 flex-shrink-0 text-center>
      {{ order }}
    </div>
    <StoryDescription
      :id="id"
      :title="title"
      :url="url"
      :points="points"
      :author="author"
      :time="time"
      :comments="comments"
    />
  </div>
</template>
