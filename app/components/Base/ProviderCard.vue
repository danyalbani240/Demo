<template>
  <article
    class="group w-full max-w-[560px] rounded-3xl border border-slate-200/70 bg-white/75 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/40"
  >
    <div class="flex items-start gap-3">
      <UAvatar :src="provider.avatar || undefined" size="lg" />

      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <p class="font-extrabold truncate text-base sm:text-[15px]">
            {{
              (provider.full_name || "—") +
              (provider.business_name ? " - " + provider.business_name : "")
            }}
          </p>

          <span
            v-if="provider.is_verified"
            class="rounded-full whitespace-nowrap px-2 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
          >
            {{ $t("provider.verified") }}
          </span>
        </div>

        <div
          class="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
        >
          <span>📍 {{ provider?.cityTitle || "—" }}</span>
          <span class="opacity-50">•</span>
          <span>⭐ {{ Number(provider?.rating || 0).toFixed(1) }}</span>
          <span class="opacity-50">•</span>
          <span class="truncate">
            🏷️ {{ provider?.categoryTitle || "-" }}
          </span>
        </div>
      </div>
    </div>

    <!-- services -->
    <div
      v-if="provider.preview_services?.length"
      class="mt-3 flex flex-wrap gap-2"
    >
      <span
        v-for="(s, idx) in provider.preview_services.slice(0, 2)"
        :key="idx"
        class="rounded-full px-3 py-1 text-xs bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-200"
      >
        {{ s }}
      </span>
    </div>

    <!-- meta -->
    <div class="mt-3 flex items-center justify-between">
      <div class="flex flex-wrap gap-2">
        <span
          v-if="provider.immediate_24h"
          class="rounded-full px-3 py-1 text-xs font-semibold bg-sky-50 text-sky-800 dark:bg-sky-500/15 dark:text-sky-200 animate-soft-pulse"
        >
          {{ $t("provider.instant_booking") }}
        </span>

        <span
          v-if="provider.is_active === false"
          class="rounded-full px-3 py-1 text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200"
        >
          {{ $t("provider.inactive_booking") }}
        </span>
      </div>

      <div class="text-left">
        <p class="text-[11px] text-slate-500 dark:text-slate-400">
          {{ $t("provider.start_from") }}
        </p>
        <p class="text-base font-extrabold">
          {{ formatPrice(provider.minPrice ?? 0) }}
          {{ $t("currency.toman") }}
        </p>
      </div>
    </div>

    <!-- buttons -->
    <div class="mt-4 grid grid-cols-3 gap-2">
      <button
        class="btn-secondary"
        @click="openServices(provider)"
        type="button"
      >
        {{ $t("actions.services") }}
      </button>

      <button
        class="btn-secondary"
        :disabled="provider.is_active === false"
        @click="go(provider)"
        type="button"
      >
        {{ $t("actions.profile") }}
      </button>

      <button
        class="btn-primary"
        :disabled="provider.is_active === false"
        @click="book(provider)"
        type="button"
      >
        {{ $t("actions.book") }}
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Provider } from "~/types";
import { formatPrice } from "~/utils/number";
import { useProviderNavigation } from "~/composables/useNavigation";
import { useProviderModalStore } from "~/stores/providerServicesModal";

const props = defineProps<{ provider: Provider }>();

const { goProvider, startBooking } = useProviderNavigation();
const modal = useProviderModalStore();

function openServices(provider: Provider) {
  modal.open(provider);
}

function go(provider: Provider) {
  const id = provider?.id ?? provider?._id;
  if (!id) return;
  goProvider(id);
}

function book(provider: Provider) {
  const id = provider?.id ?? provider?._id;
  if (!id) return;
  startBooking(id);
}
</script>
