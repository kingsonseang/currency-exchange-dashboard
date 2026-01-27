<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Currency Exchange Dashboard'
const description = 'Simple currency exchange dashboard (will be a dasboard sometime in the future for now just a simple card component to display data :)'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
})
</script>

<template>
  <UApp>
    <UMain class="flex flex-col justify-center">
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton to="https://github.com/kingsonseang/currency-exchange-dashboard" target="_blank"
          icon="i-simple-icons-github" aria-label="GitHub" color="neutral" variant="ghost" />
      </template>
    </UFooter>
  </UApp>
</template>
