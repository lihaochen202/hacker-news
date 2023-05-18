<script setup lang="ts">
const navigations = [
  { name: 'News', path: '/news/1' },
  { name: 'Newest', path: '/newest/1' },
  { name: 'Ask', path: '/ask/1' },
  { name: 'Show', path: '/show/1' },
  { name: 'Jobs', path: '/jobs/1' },
]

const route = useRoute()
function isActive(name: string) {
  return name.toLocaleLowerCase() === route.params.story
}

const appConfig = useAppConfig()
</script>

<template>
  <header flex="~ justify-center" bg-slate-950 font-300 text-white>
    <nav
      flex="~ items-center" h-14
      w="full lg:250 xl:250 2xl:250"
      p="x-5 lg:x-0 xl:x-0 2xl:x-0"
    >
      <NuxtLink
        flex="shrink-0"
        m="r-6 sm:r-8 md:r-8 lg:r-8 xl:r-8 2xl:r-8"
        to="/"
      >
        <img h-7 w-7 src="/logo.svg" alt="Logo">
      </NuxtLink>

      <ul flex gap="5 sm:7 md:7 lg:7 xl:7 2xl:7">
        <li v-for="item in navigations" :key="item.name">
          <NuxtLink
            link
            :class="{ 'text-sky': isActive(item.name) }"
            :to="item.path"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>

      <a m-l-auto :href="appConfig.repo" target="_blank" rel="noopener noreferrer">
        <i block="sm:~ md:~ lg:~ xl:~ 2xl:~" text-6 class="i-ri:github-fill" />
      </a>
    </nav>
  </header>

  <main flex="~ justify-center" p="x-5 lg:x-0 xl:x-0 2xl:x-0">
    <div w="full lg:250 xl:250 2xl:250">
      <slot />
    </div>
  </main>
</template>
