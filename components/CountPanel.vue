<script setup lang="ts">
const { count = 0 } = defineProps<{ count?: number }>()
const doubleCount = computed(() => count * 2)
</script>

<template>
  <div>{{ doubleCount }}</div>
</template>
