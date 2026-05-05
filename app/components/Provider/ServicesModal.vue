<template>
  <UModal
    v-model:open="open"
    :title="derived.title"
    description="لیست خدمات قابل رزرو"
    :ui="{
      overlay:
        'bg-black/50 dark:bg-black/70 backdrop-blur-md transition-opacity',
      content:
        'p-0 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 flex flex-col max-h-[90vh] h-full',
      wrapper: 'max-w-2xl mx-auto',
    }"
    :transition="false"
  >
    <template #content>
      <div class="bg-white dark:bg-slate-950 flex flex-col h-full">
        <!-- Header -->
        <div
          class="relative p-5 sm:p-6 border-b border-slate-200/70 dark:border-slate-800"
        >
          <div class="flex items-start gap-3">
            <UAvatar :src="provider?.avatar || undefined" size="lg" />

            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <h2 class="font-extrabold text-base sm:text-lg truncate">
                  {{ derived.title }}
                </h2>

                <span
                  v-if="provider?.is_verified"
                  class="rounded-full px-1 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200 text-nowrap"
                >
                  {{ $t("provider.verified") }}
                </span>
              </div>

              <div
                class="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <span>📍 {{ provider?.cityTitle || "—" }}</span>
                <span class="opacity-50">•</span>
                <span>⭐ {{ derived.rating }}</span>
                <span class="opacity-50">•</span>
                <span class="truncate"
                  >🏷️ {{ provider?.categoryTitle || "—" }}</span
                >
              </div>
            </div>

            <button
              type="button"
              class="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              @click="open = false"
            >
              <UIcon name="i-heroicons-x-mark-20-solid" class="w-5 h-5" />
            </button>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span
              class="rounded-full px-3 py-1 text-xs bg-slate-100 dark:bg-slate-800 dark:text-slate-200"
            >
              لیست خدمات این متخصص
            </span>

            <span
              v-if="derived.minPrice != null"
              class="rounded-full px-3 py-1 text-xs bg-slate-100 dark:bg-slate-800 dark:text-slate-200"
            >
              شروع از {{ formatPrice(derived.minPrice) }} تومان
            </span>
          </div>
        </div>

        <!-- Body -->
        <div class="p-5 sm:p-6 overflow-y-scroll flex-1 min-h-0">
          <div v-if="pending" class="space-y-3">
            <div class="h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 lead" />
            <div class="h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 lead" />
            <div class="h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 lead" />
          </div>

          <div
            v-else-if="errorMsg"
            class="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200"
          >
            <p class="font-semibold">خطا در دریافت خدمات</p>
            <p class="text-sm mt-1">{{ errorMsg }}</p>

            <div class="mt-3 flex gap-2">
              <UButton @click="fetchServices">تلاش دوباره</UButton>
              <UButton variant="outline" @click="open = false">بستن</UButton>
            </div>
          </div>

          <div v-else-if="!items.length" class="text-center py-10">
            <UIcon
              name="i-heroicons-rectangle-stack"
              class="w-10 h-10 mx-auto text-slate-400"
            />
            <p class="mt-3 font-semibold">فعلاً سرویسی ثبت نشده</p>
          </div>

          <div v-else class="space-y-3">
            <article
              v-for="s in items"
              :key="s.id"
              class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <div class="flex justify-between">
                <p class="font-extrabold truncate">{{ s.title }}</p>
                <p class="font-extrabold">
                  {{ formatPrice(parsePrice(s.price)) }} تومان
                </p>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-2">
                <UButton class="flex justify-center" @click="selectAndBook(s)"
                  >انتخاب و رزرو</UButton
                >
                <UButton
                  class="flex justify-center"
                  variant="outline"
                  @click="
                    () => {
                      const id = provider?.id ?? provider?._id;
                      if (!id) return;
                      goProvider(id);
                    }
                  "
                  >پروفایل متخصص</UButton
                >
              </div>
            </article>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t">
          <div class="flex justify-between">
            <UButton variant="ghost" @click="open = false">بستن</UButton>
            <UButton @click="startBookingProvider">انتخاب نوبت</UButton>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { ServiceItem } from "~/types";
import { parsePrice, formatPrice } from "#imports";
import { useProviderModalStore } from "~/stores/providerServicesModal";
import { useProviderNavigation } from "~/composables/useNavigation";

import { storeToRefs } from "pinia";

const modal = useProviderModalStore();
const { provider, isOpen } = storeToRefs(modal);

const open = computed({
  get: () => modal.isOpen,
  set: (v) => !v && modal.close(),
});
let { startBooking, goProvider } = useProviderNavigation();
const items = ref<ServiceItem[]>([]);
const pending = ref(false);
const errorMsg = ref<string | null>(null);

// 🔥 optimized single computed
const derived = computed(() => {
  const p = provider.value;
  if (!p) return { title: "خدمات", rating: "0.0", minPrice: null };

  const name = (p.full_name || "").trim();
  const biz = (p.business_name || "").trim();

  let min = null;
  if (p.minPrice != null) {
    const n =
      typeof p.minPrice === "number"
        ? p.minPrice
        : Number(String(p.minPrice).replace(/[^\d]/g, ""));
    if (Number.isFinite(n)) min = n;
  }

  return {
    title: [name, biz].filter(Boolean).join(" — ") || "خدمات",
    rating: Number(p.rating || 0).toFixed(1),
    minPrice: min,
  };
});

async function fetchServices() {
  const p = provider.value;
  console.log(p);
  const id = p?._id || p?.id;
  if (!id) return;

  const cached = modal.getServices(id);
  if (cached !== undefined) {
    items.value = cached;
    return;
  }

  pending.value = true;
  errorMsg.value = null;

  try {
    const res: any = await $fetch(`/api/providers/${id}/services`);
    const services = res.data?.services ?? [];

    items.value = services;
    modal.setServices(id, services);
  } catch (e: any) {
    errorMsg.value = e?.message || "خطا";
    items.value = [];
  } finally {
    pending.value = false;
  }
}

watch(isOpen, (v) => {
  if (v) fetchServices();
});
onBeforeRouteLeave(() => {
  modal.close();
});

watch(
  () => provider.value?.id,
  () => {
    items.value = [];
    errorMsg.value = null;
  },
);

function startBookingProvider() {
  if (!provider.value?.id) return;
  startBooking(provider.value.id);
}

function selectAndBook(s: ServiceItem) {
  const id = provider.value?.id || provider.value?._id;
  if (!id) return;
  startBooking(id);
}
</script>

<style scoped>
.lead {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.04),
    rgba(0, 0, 0, 0.08),
    rgba(0, 0, 0, 0.04)
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
