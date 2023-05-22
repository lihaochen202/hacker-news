<script setup lang="ts">
definePageMeta({
  middleware: 'effective',
})

const route = useRoute()
const id = computed(() => route.params.id as string)
const { data } = await useFetch(`/api/story/${id.value}`)

const title = useHeadTitle(computed(() => data.value?.title))
useHead({ title })
</script>

<template>
  <div>
    <div rounded bg-white px-10 py-2.5>
      <StoryDescription
        :id="data!.id"
        :title="data!.title"
        :url="data!.url"
        :points="data!.points"
        :author="data!.author"
        :time="data!.time"
        :comments="data!.comments"
        large
      />
    </div>
    <ul v-if="data!.children.length" mt-3 rounded bg-white px-10>
      <li
        v-for="(item, index) in data!.children"
        :key="index"
        py-4
        b="t first:t-none"
      >
        <CommentDescription v-bind="item" />
      </li>
    </ul>
  </div>
</template>
