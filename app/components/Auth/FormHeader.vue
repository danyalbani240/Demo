<template>
  <div class="text-center">
    <div
      class="mx-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[12px] text-zinc-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
    >
      <span
        class="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,.14)]"
      />
      <span
        >ServiceHub • {{ $t("auth.login") }} / {{ $t("auth.register") }}</span
      >
    </div>

    <h1 class="mt-3 text-[26px] font-black tracking-tight">
      {{ mode === "login" ? $t("auth.welcome") : $t("auth.start") }}
    </h1>

    <p class="mt-2 text-[13px] leading-7 text-zinc-600 dark:text-zinc-300/80">
      {{ introText }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { siteCopy } from "~/constants/site";

const props = defineProps<{ mode: string; role: string }>();
const route = useRoute();
const introText = computed(() => {
  if (props.mode === "login") {
    return returnTo.value ? siteCopy.authMethod : siteCopy.authMethod;
  }

  return props.role === "provider"
    ? $t("auth.intro_provider")
    : $t("auth.intro_customer");
});
const returnTo = computed(() => {
  const q = route.query.redirect;
  if (typeof q === "string" && q.startsWith("/")) return q;
  return "";
});
</script>
