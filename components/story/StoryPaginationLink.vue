<script setup lang="ts">
defineProps<{
  enabled: boolean
  to: string
}>()
</script>

<template>
  <NuxtLink v-if="enabled" :to="to" link>
    <slot />
  </NuxtLink>
  <span v-else cursor-default text-zinc-500>
    <slot />
  </span>
</template>
