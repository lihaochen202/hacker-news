<script setup lang="ts">
useHead({
  title: useHeadTitle('404'),
})
</script>

<template>
  <div min-h="lg sm:2xl" rounded bg-white flex="~ col justify-center items-center">
    <div flex skew-x--12 text-5xl>
      <div class="i-ri-number-4" />
      <div class="i-ri-number-0" />
      <div class="i-ri-number-4" />
    </div>
    <p my-10 text-gray-600>
      The page you are looking for can't be found.
    </p>
    <ButtonBack />
  </div>
</template>
