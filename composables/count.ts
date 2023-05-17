export const useCountStore = definePiniaStore('count', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return {
    count,
    doubleCount,
    increment,
  }
})

import.meta.hot?.accept(acceptPiniaHMRUpdate(useCountStore, import.meta.hot))
