export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
  ],

  pinia: {
    autoImports: [
      ['defineStore', 'definePiniaStore'],
      ['acceptHMRUpdate', 'acceptPiniaHMRUpdate'],
    ],
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/global.css',
  ],

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
})
