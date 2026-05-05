<template>
  <div
    dir="rtl"
    class="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300"
  >
    <UContainer class="py-8">
      <!-- Hero -->
      <section
        class="relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-slate-900/40"
      >
        <div class="absolute inset-0 pointer-events-none">
          <div
            class="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-500/10"
          ></div>
          <div
            class="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-200/40 blur-3xl dark:bg-fuchsia-500/10"
          ></div>
        </div>

        <div class="relative p-5 sm:p-8">
          <div
            class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            <div class="max-w-2xl">
              <h1 class="text-2xl sm:text-3xl font-black tracking-tight">
                تماس با ما
              </h1>
              <p
                class="mt-2 text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-7"
              >
                پرسش، پیشنهاد یا گزارش مشکل دارید؟ پیام شما مستقیم برای تیم ما
                ارسال می‌شود.
                <span class="font-bold text-gray-800 dark:text-white">{{
                  siteCopy.supportHours
                }}</span>
                و {{ siteCopy.supportResponseSla }}
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  پاسخ‌گویی سریع
                </span>
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                  پیام امن
                </span>
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                  پیگیری‌پذیر
                </span>
              </div>
            </div>

            <div class="w-full lg:w-[380px]">
              <div
                class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 p-4"
              >
                <p class="text-xs text-gray-500 dark:text-slate-400">
                  می‌خوای سریع‌تر؟
                </p>
                <div class="mt-3 grid grid-cols-1 gap-2">
                  <a
                    :href="`mailto:${targetEmail}`"
                    class="rounded-xl px-3 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                  >
                    <div class="text-sm font-bold">ارسال ایمیل مستقیم</div>
                    <div class="text-xs opacity-80 mt-1">{{ targetEmail }}</div>
                  </a>

                  <a
                    href="#form"
                    class="rounded-xl px-3 py-3 border border-primary-200/70 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-200"
                  >
                    <div class="text-sm font-bold">ارسال پیام از فرم</div>
                    <div class="text-xs opacity-80 mt-1">
                      همین‌جا، سریع و مرتب
                    </div>
                  </a>
                </div>

                <div class="mt-4">
                  <p class="text-xs text-gray-500 dark:text-slate-400">
                    کانال‌های سریع
                  </p>
                  <div
                    class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1"
                  >
                    <component
                      :is="channel.href ? 'a' : 'div'"
                      v-for="channel in fastChannels"
                      :key="channel.key"
                      :href="channel.href || undefined"
                      :target="channel.href ? '_blank' : undefined"
                      :rel="channel.href ? 'noopener' : undefined"
                      class="rounded-xl border px-3 py-3 transition"
                      :class="
                        channel.href
                          ? 'border-gray-200 bg-white hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10'
                          : 'border-dashed border-gray-200 bg-gray-50/80 dark:border-white/10 dark:bg-white/5'
                      "
                    >
                      <div class="text-sm font-bold">{{ channel.label }}</div>
                      <div class="mt-1 text-xs opacity-80">
                        {{ channel.handle || "به‌زودی" }}
                      </div>
                    </component>
                  </div>
                </div>

                <div
                  v-if="cooldownLeft > 0"
                  class="mt-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3"
                >
                  <div class="text-xs text-gray-600 dark:text-slate-300">
                    برای جلوگیری از اسپم، لطفاً
                    <span class="font-bold">{{ cooldownLeft }}</span>
                    ثانیه صبر کنید و دوباره ارسال کنید.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-6 grid lg:grid-cols-3 gap-6">
        <!-- Form -->
        <UCard
          id="form"
          class="lg:col-span-2 overflow-hidden p-0 bg-white dark:bg-slate-900/40 dark:border-white/10 border border-gray-200/70 shadow-sm"
        >
          <div class="p-5 sm:p-7">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h2 class="text-lg sm:text-xl font-black">فرم تماس</h2>
                <p class="mt-1 text-sm text-gray-600 dark:text-slate-300">
                  لطفاً اطلاعات را دقیق وارد کنید تا سریع‌تر پاسخ بدهیم.
                </p>
              </div>

              <span
                class="shrink-0 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-slate-200"
              >
                <span
                  class="h-2 w-2 rounded-full"
                  :class="
                    sent ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-slate-600'
                  "
                ></span>
                {{
                  sent
                    ? "ارسال شد"
                    : loading
                      ? "در حال ارسال..."
                      : "آماده ارسال"
                }}
              </span>
            </div>

            <!-- SUCCESS PREMIUM OVERLAY -->
            <Transition name="success-pop">
              <div
                v-if="showSuccessOverlay"
                class="mt-5 rounded-3xl border border-emerald-200/70 dark:border-emerald-400/20 bg-emerald-50/70 dark:bg-emerald-500/10 p-5 sm:p-6"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="relative h-12 w-12 rounded-2xl bg-white dark:bg-slate-950/50 border border-emerald-200/70 dark:border-emerald-400/20 grid place-items-center"
                  >
                    <svg
                      class="h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span
                      class="absolute inset-0 rounded-2xl ring-8 ring-emerald-500/10 dark:ring-emerald-400/10 animate-pulse"
                    ></span>
                  </div>

                  <div class="flex-1">
                    <div class="font-black text-base sm:text-lg">
                      پیامت رسید ✅
                    </div>
                    <div
                      class="mt-1 text-sm text-gray-700 dark:text-slate-200 leading-6"
                    >
                      با موفقیت ارسال شد. اگر نیاز به پیگیری بود، از همین ایمیل
                      به شما پاسخ می‌دهیم.
                    </div>
                  </div>

                  <UButton
                    variant="outline"
                    class="rounded-xl"
                    @click="showSuccessOverlay = false"
                  >
                    بستن
                  </UButton>
                </div>
              </div>
            </Transition>

            <form class="mt-5 space-y-4" @submit.prevent="submit">
              <div class="grid sm:grid-cols-2 gap-3">
                <UInput
                  v-model="form.name"
                  placeholder="نام و نام خانوادگی *"
                  size="lg"
                />
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="ایمیل *"
                  size="lg"
                />
              </div>

              <div class="grid sm:grid-cols-2 gap-3">
                <UInput
                  v-model="form.phone"
                  inputmode="tel"
                  placeholder="موبایل (اختیاری)"
                  size="lg"
                />
                <USelect
                  v-model="form.topic"
                  :items="topics"
                  placeholder="موضوع پیام *"
                  size="lg"
                />
              </div>

              <!-- Honeypot: hidden for bots -->
              <div class="sr-only" aria-hidden="true">
                <label>website</label>
                <input
                  v-model="form.website"
                  type="text"
                  autocomplete="off"
                  tabindex="-1"
                />
              </div>

              <div class="space-y-2">
                <UTextarea
                  v-model="form.message"
                  :rows="7"
                  class="w-full"
                  placeholder="متن پیام شما *"
                  size="lg"
                />

                <!-- Character counter + progress -->
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-600 dark:text-slate-300">
                    حداقل {{ minMsg }} و حداکثر {{ maxMsg }} کاراکتر
                  </span>
                  <span
                    class="font-bold"
                    :class="
                      msgLen > maxMsg
                        ? 'text-rose-600 dark:text-rose-400'
                        : msgLen < minMsg
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-emerald-700 dark:text-emerald-300'
                    "
                  >
                    {{ msgLen }} / {{ maxMsg }}
                  </span>
                </div>
                <div
                  class="h-2 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden"
                >
                  <div
                    class="h-full rounded-full transition-all duration-300"
                    :style="{ width: progressWidth + '%' }"
                    :class="progressBarClass"
                  ></div>
                </div>
              </div>

              <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1"
              >
                <UCheckbox
                  v-model="form.agree"
                  label="قوانین و حریم خصوصی را مطالعه کردم و موافقم."
                />

                <div class="flex items-center justify-end gap-2">
                  <UButton
                    variant="outline"
                    type="button"
                    class="rounded-xl"
                    @click="reset"
                  >
                    پاک‌کردن
                  </UButton>

                  <UButton
                    color="primary"
                    type="submit"
                    class="rounded-xl"
                    :loading="loading"
                    :disabled="!canSubmit"
                  >
                    ارسال پیام
                  </UButton>
                </div>
              </div>

              <UAlert
                v-if="error"
                color="warning"
                variant="soft"
                :title="error"
                class="mt-2"
              />
            </form>

            <transition name="fade">
              <div v-if="sent" class="mt-5">
                <UAlert
                  color="success"
                  variant="soft"
                  title="پیام شما با موفقیت ارسال شد."
                />
              </div>
            </transition>
          </div>

          <div
            class="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4 text-xs text-gray-600 dark:text-slate-300"
          >
            با ارسال پیام، شما موافقت می‌کنید که برای پیگیری، از اطلاعات تماس
            شما استفاده شود.
          </div>
        </UCard>

        <!-- Info + Map -->
        <div class="space-y-6">
          <UCard
            class="p-6 bg-white dark:bg-slate-900/40 dark:border-white/10 border border-gray-200/70"
          >
            <p class="font-black mb-3">اطلاعات تماس</p>

            <ul class="space-y-2 text-sm text-gray-700 dark:text-slate-200">
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-envelope" class="w-5 h-5 opacity-80" />
                <span>{{ targetEmail }}</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 opacity-80" />
                <span>{{ siteConfig.contact.cityLabel }}</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-clock" class="w-5 h-5 opacity-80" />
                <span>{{ siteCopy.supportHours }}</span>
              </li>
            </ul>

            <div
              class="mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="text-sm font-bold">راه‌های ارتباط سریع</div>
              <div
                class="mt-3 space-y-2 text-sm text-gray-700 dark:text-slate-200"
              >
                <div
                  v-for="channel in fastChannels"
                  :key="`summary-${channel.key}`"
                  class="flex items-center justify-between gap-3"
                >
                  <span>{{ channel.label }}</span>
                  <span class="text-xs text-gray-500 dark:text-slate-400">
                    {{ channel.handle || "به‌زودی" }}
                  </span>
                </div>
              </div>
            </div>

            <div
              class="mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="text-sm font-bold">لوکیشن دقیق</div>
              <p class="mt-1 text-xs text-gray-600 dark:text-slate-300">
                {{ lat }}, {{ lng }}
              </p>

              <div class="mt-3 flex flex-col sm:flex-row gap-2">
                <a
                  :href="googleMapsLink"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                >
                  باز کردن در Google Maps
                </a>

                <UButton
                  variant="outline"
                  class="rounded-xl justify-center"
                  @click="copyLocation"
                >
                  کپی کردن مختصات
                </UButton>
              </div>
            </div>
          </UCard>

          <UCard
            class="p-0 overflow-hidden bg-white dark:bg-slate-900/40 dark:border-white/10 border border-gray-200/70"
          >
            <div class="h-64 w-full">
              <iframe
                class="h-full w-full"
                :src="osmEmbedUrl"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="نقشه سرویس‌هاب"
              />
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { siteConfig, siteCopy } from "~/constants/site";

const toast = useToast();

const loading = ref(false);
const sent = ref(false);
const error = ref("");
const showSuccessOverlay = ref(false);

const targetEmail = siteConfig.contact.email;
const fastChannels = siteConfig.contact.fastChannels;

const lat = siteConfig.contact.lat;
const lng = siteConfig.contact.lng;

// map embed around point (OSM)
const delta = 0.01;
const left = lng - delta;
const right = lng + delta;
const top = lat + delta;
const bottom = lat - delta;

const osmEmbedUrl = computed(() => {
  const marker = `${lat},${lng}`;
  const bbox = `${left},${bottom},${right},${top}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`;
});
const googleMapsLink = computed(
  () => `https://www.google.com/maps?q=${lat},${lng}`,
);

const topics = [
  { label: "پشتیبانی رزرو", value: "booking" },
  { label: "گزارش تخلف", value: "abuse" },
  { label: "پیشنهاد ویژگی", value: "feature" },
  { label: "سایر موارد", value: "other" },
];

// Anti-bot: require user to spend at least N ms before submit
const mountedAt = ref<number>(Date.now());
const minFillMs = 2500;

// Client cooldown to avoid double submit
const cooldownLeft = ref(0);
let cooldownTimer: any = null;
function startCooldown(seconds: number) {
  cooldownLeft.value = seconds;
  if (cooldownTimer) clearInterval(cooldownTimer);
  cooldownTimer = setInterval(() => {
    cooldownLeft.value = Math.max(0, cooldownLeft.value - 1);
    if (cooldownLeft.value === 0) clearInterval(cooldownTimer);
  }, 1000);
}

const minMsg = 20;
const maxMsg = 1200;

const form = reactive({
  name: "",
  email: "",
  phone: "",
  topic: "" as string | null,
  message: "",
  agree: false,
  // honeypot (bots tend to fill it)
  website: "",
});

const msgLen = computed(() => (form.message || "").length);
const progressWidth = computed(() =>
  Math.min(100, Math.round((msgLen.value / maxMsg) * 100)),
);

const progressBarClass = computed(() => {
  if (msgLen.value > maxMsg) return "bg-rose-500";
  if (msgLen.value < minMsg) return "bg-amber-500";
  return "bg-emerald-500";
});

const canSubmit = computed(() => {
  if (loading.value) return false;
  if (cooldownLeft.value > 0) return false;
  if (!form.agree) return false;
  if (msgLen.value > maxMsg) return false;
  return true;
});

function reset() {
  Object.assign(form, {
    name: "",
    email: "",
    phone: "",
    topic: null,
    message: "",
    agree: false,
    website: "",
  });
  error.value = "";
  sent.value = false;
}

function validate(): string {
  // honeypot
  if (form.website?.trim()) return "ارسال نامعتبر است.";

  if (!form.name.trim()) return "نام را وارد کنید.";
  if (!/.+@.+\..+/.test(form.email)) return "ایمیل معتبر نیست.";
  if (!form.topic) return "موضوع پیام را انتخاب کنید.";
  if (!form.message.trim()) return "متن پیام را بنویسید.";

  if (msgLen.value < minMsg)
    return `متن پیام خیلی کوتاه است (حداقل ${minMsg} کاراکتر).`;
  if (msgLen.value > maxMsg)
    return `متن پیام خیلی طولانی است (حداکثر ${maxMsg} کاراکتر).`;

  if (!form.agree) return "با قوانین موافقت کنید.";

  const spent = Date.now() - mountedAt.value;
  if (spent < minFillMs) return "لطفاً چند لحظه صبر کنید و دوباره ارسال کنید.";

  return "";
}

async function copyLocation() {
  try {
    await navigator.clipboard.writeText(`${lat}, ${lng}`);
    toast.add({ title: "مختصات کپی شد.", color: "success" });
  } catch {
    toast.add({ title: "کپی کردن ناموفق بود.", color: "warning" });
  }
}

async function submit() {
  error.value = validate();
  if (error.value) return;

  loading.value = true;
  sent.value = false;

  try {
    const res = await $fetch<{ ok: true } | { ok: false; message?: string }>(
      "/api/contact",
      {
        method: "POST",
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          topic: form.topic,
          message: form.message,
          website: form.website, // honeypot
          clientMeta: {
            page: "contact",
            lat,
            lng,
            // anti-bot meta
            spentMs: Date.now() - mountedAt.value,
          },
        },
      },
    );

    if (!res || (res as any).ok !== true) {
      throw createError({
        statusCode: 400,
        statusMessage: (res as any)?.message || "ارسال ناموفق بود.",
      });
    }

    sent.value = true;
    showSuccessOverlay.value = true;

    toast.add({ title: "پیام ارسال شد. ممنون!", color: "success" });

    // cooldown after a success
    startCooldown(20);

    reset();
    // reset timer baseline for next message
    mountedAt.value = Date.now();
  } catch (e: any) {
    const msg =
      e?.data?.statusMessage ||
      e?.statusMessage ||
      "خطا در ارسال پیام. کمی بعد دوباره تلاش کنید.";
    error.value = msg;

    // if server says rate limited, add a short cooldown anyway
    if (
      String(msg).includes("429") ||
      String(msg).includes("زیاد") ||
      String(msg).includes("محدود")
    ) {
      startCooldown(30);
    }
  } finally {
    loading.value = false;
  }
}

useSeoMeta({
  title: "تماس با ما | سرویس‌هاب",
  description:
    "تماس با سرویس‌هاب: ارسال پیام، پیشنهاد یا گزارش مشکل. پاسخ‌گویی در ساعات کاری و ارائه کانال‌های تماس سریع.",
});

onMounted(() => {
  mountedAt.value = Date.now();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.success-pop-enter-active {
  transition:
    transform 220ms ease,
    opacity 220ms ease;
}
.success-pop-enter-from {
  transform: translateY(10px) scale(0.98);
  opacity: 0;
}
.success-pop-enter-to {
  transform: translateY(0) scale(1);
  opacity: 1;
}
</style>
