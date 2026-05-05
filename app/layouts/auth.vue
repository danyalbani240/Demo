<template>
  <!-- Force theme class here so Tailwind dark: and CSS both work -->
  <SiteHeader />
  <div class="min-h-[100dvh]">
    <!-- Page background must change with theme -->
    <div class="min-h-[100dvh] bg-white dark:bg-zinc-950">
      <NuxtPage />
    </div>
  </div>
</template>
