<script setup lang="ts">
import type { CSSProperties } from 'vue'

// @ts-expect-error virtual file
import { globalMiddleware } from '#build/middleware'

const {
  throttle = 200,
  duration = 2000,
  height = 3,
  color = 'repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)',
} = defineProps<{
  throttle?: number
  duration?: number
  height?: number
  color?: string | false
}>()

const { progress, loading, start, finish, clear } = useLoadingIndicator(throttle, duration)
const style = computed<CSSProperties>(() => ({
  height: `${height}px`,
  opacity: loading.value ? 1 : 0,
  background: color || undefined,
  backgroundSize: `${100 / progress.value * 100}% auto`,
  transform: `scaleX(${progress.value}%)`,
  transition: 'transform 0.1s, height 0.4s, opacity 0.4s',
}))

globalMiddleware.unshift(start)
onBeforeUnmount(() => {
  const index = globalMiddleware.indexOf(start)
  ~index && globalMiddleware.splice(index, 1)
  clear()
})

const router = useRouter()
router.onError(finish)
router.beforeResolve((to, from) => {
  to === from && finish()
})
router.afterEach((_to, _from, failure) => {
  failure && finish()
})

const nuxtApp = useNuxtApp()
nuxtApp.hook('page:finish', finish)
nuxtApp.hook('vue:error', finish)

function useLoadingIndicator(throttle: number, duration: number) {
  const progress = ref(0)
  const loading = ref(false)
  const step = computed(() => 10000 / duration)

  let _timer: any = null
  let _throttle: any = null

  function start() {
    clear()
    progress.value = 0
    if (process.client) {
      const handler = () => {
        loading.value = true
        _timer = _startTimer()
      }
      throttle ? (_throttle = setTimeout(handler, throttle)) : handler()
    }
  }
  function finish() {
    progress.value = 100
    _hide()
  }

  function clear() {
    clearInterval(_timer)
    clearTimeout(_throttle)
    _timer = null
    _throttle = null
  }

  function _startTimer() {
    return setInterval(() => _increase(step.value), 100)
  }

  function _increase(num: number) {
    progress.value = Math.min(progress.value + num, 100)
  }

  function _hide() {
    clear()
    if (process.client) {
      setTimeout(() => {
        loading.value = false
        setTimeout(() => progress.value = 0, 400)
      }, 500)
    }
  }

  return {
    progress,
    loading,
    start,
    finish,
    clear,
  }
}
</script>

<template>
  <div
    pointer-events-none
    fixed left-0 right-0 top-0 z-999999
    w-auto
    origin-left
    :style="style"
  >
    <slot />
  </div>
</template>
