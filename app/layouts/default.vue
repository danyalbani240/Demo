<template>
  <div
    :dir="$i18n.locale === 'en' ? 'ltr' : 'rtl'"
    class="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-slate-50 transition-colors duration-300"
  >
    <SiteHeader />

    <main class="min-h-[70vh]">
      <UContainer class="py-4">
        <div class="page-canvas page-canvas--fade">
          <NuxtPage :debug="true" />
        </div>
      </UContainer>
    </main>

    <SiteFooter />
  </div>
</template>
