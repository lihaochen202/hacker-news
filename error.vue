<script setup lang="ts">
import DefaultLayout from '~/layouts/default.vue'

useHead({
  title: useHeadTitle('Error'),
})
</script>

<template>
  <div>
    <DefaultLayout>
      <div min-h="lg sm:2xl" rounded bg-white flex="~ col justify-center items-center">
        <p mb-10 text-gray-600>
          Oops! Something went wrong.
        </p>
        <ButtonBack />
      </div>
    </DefaultLayout>
  </div>
</template>
