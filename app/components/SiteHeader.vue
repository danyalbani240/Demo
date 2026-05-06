<template>
  <header
    class="bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300"
  >
    <UContainer class="flex items-center justify-between h-16">
      <div class="flex items-center gap-3">
        <USelectMenu
          style="direction: rtl"
          v-model="locale"
          :items="items"
          value-key="value"
          label-key="label"
          class="w-28 rtl"
          @update:model-value="switchLang"
        />

        <NuxtLink
          to="/"
          class="flex items-center gap-2 group hover:opacity-80 transition-opacity duration-300"
        >
          <UIcon
            name="heroicons:sparkles"
            class="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:animate-spin transition-all"
          />
          <span class="font-extrabold text-slate-900 dark:text-slate-50">
            {{ $t("header.brand") }}
          </span>
        </NuxtLink>

        <UBadge
          color="neutral"
          variant="soft"
          class="hidden sm:inline-flex dark:bg-slate-800 dark:text-slate-300 animate-fade-in"
        >
          {{ $t("header.badge.safe_payment") }}
        </UBadge>
      </div>

      <nav class="hidden md:flex items-center gap-4 text-sm">
        <NuxtLink
          to="/search"
          class="text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 relative group"
        >
          {{ $t("header.nav.search") }}
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"
          ></span>
        </NuxtLink>

        <NuxtLink
          to="/help"
          class="text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 relative group"
        >
          {{ $t("header.nav.help") }}
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"
          ></span>
        </NuxtLink>

        <NuxtLink
          to="/contact"
          class="text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 relative group"
        >
          {{ $t("header.nav.contact") }}
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"
          ></span>
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <UButton
          icon="i-heroicons-moon-20-solid"
          variant="ghost"
          color="neutral"
          @click="toggleDarkMode"
          class="dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300"
          :title="$t('header.theme.toggle')"
        />

        <div class="md:flex items-center gap-2">
          <UButton class="cursor-pointer" color="primary" to="/auth">
            {{ $t("header.auth.login_register") }}
          </UButton>

          <UButton
            class="cursor-pointer hidden md:block"
            variant="soft"
            :to="siteConfig.providerJoinPath"
          >
            {{ $t("header.auth.provider_register") }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import { useDarkMode } from "~/composables/useDarkMode";
import { siteConfig } from "~/constants/site";
const { toggleDarkMode } = useDarkMode();

const { locale, locales, setLocale, loadLocaleMessages } = useI18n();
async function switchLang(code: "fa" | "en" | "ku") {
  const loader = useLoader();
  loader.show();
  await loadLocaleMessages(code); // forces fetch of messages
  await setLocale(code);
  loader.hide();
}

const items = computed(() =>
  locales.value.map((l) => ({
    label: l.code.toUpperCase(),
    value: l.code,
  })),
);
</script>

<style>
.dir-rtl {
  direction: rtl;
}
.dir-ltr {
  direction: ltr;
}
</style>
