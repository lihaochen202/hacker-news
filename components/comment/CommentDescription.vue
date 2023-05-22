<script setup lang="ts">
import type { StoryComment } from '~/types'

const { author, time } = defineProps<StoryComment>()
const userURL = computed(() => `/user/${author}`)
const formattedTime = computed(() => formatStoryTimeDistance(time))

const [collapsed, toggleCollapsed] = useToggle()
const collapsedIcon = computed(() => collapsed.value ? '+' : '-')
</script>

<template>
  <div text="sm slate-900">
    <div font-500>
      <NuxtLink link :to="userURL">
        {{ author }}
      </NuxtLink>
      {{ formattedTime }} ago
    </div>
    <div
      class="prose prose-gray" style="max-width: 100%;" break-words
      :class="chidren.length ? 'my-4' : 'mt-4'"
      v-html="text"
    />

    <template v-if="chidren.length">
      <div relative>
        <div v-if="collapsed" rounded-sm bg-sky-100 px-1 py-0.5>
          <span cursor-pointer @click="toggleCollapsed()">
            [{{ collapsedIcon }}]
            {{ chidren.length }} replies collapsed
          </span>
        </div>
        <span
          v-else
          absolute
          translate-y="-1/2"
          cursor-pointer
          @click="toggleCollapsed()"
        >
          [{{ collapsedIcon }}]
        </span>
      </div>
      <ul v-show="!collapsed" pl-6>
        <li v-for="(item, index) in chidren" :key="index" b-t p="y-4 last:b-0">
          <CommentDescription v-bind="item" />
        </li>
      </ul>
    </template>
  </div>
</template>
