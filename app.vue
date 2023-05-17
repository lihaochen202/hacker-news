<script setup lang="ts">
const countStore = useCountStore()
const { x, y } = useMouse()
</script>

<template>
  <div bg="white">
    <i block class="i-ri-github-fill" />
    <CountPanel :count="countStore.count" />
    <div @click="countStore.increment">
      count: {{ countStore.count }}, doubleCount: {{ countStore.doubleCount }}
    </div>
    <div>
      Mouse: x {{ x }}, y {{ y }}
    </div>
    <NuxtWelcome />
  </div>
</template>
