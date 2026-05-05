<template>
  <div
    dir="rtl"
    class="bg-gray-50 min-h-screen text-gray-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300"
  >
    <UContainer class="py-8 animate-slide-up">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-extrabold">
          {{ $t("faq.title") }}
        </h1>
        <p class="text-gray-600 mt-2">
          {{ $t("faq.subtitle") }}
        </p>
      </div>

      <!-- Search -->
      <UCard
        class="p-4 bg-white dark:bg-slate-800/50 dark:border-slate-700 shadow-lg transition-colors duration-300 animate-scale-in"
      >
        <div class="grid sm:grid-cols-3 gap-3">
          <UInput
            v-model="q"
            icon="i-heroicons-magnifying-glass-20-solid"
            :placeholder="$t('faq.search')"
            class="sm:col-span-2"
          />
          <UButton color="primary" @click="navigateTo('/contact')">
            {{ $t("faq.contact_support") }}
          </UButton>
        </div>
      </UCard>

      <!-- Quick links -->
      <div class="grid md:grid-cols-3 gap-4 mt-6">
        <UCard
          class="hover:shadow transition dark:bg-slate-800/50 dark:border-slate-700"
        >
          <div class="flex items-start gap-3">
            <UIcon
              name="i-heroicons-user-plus"
              class="w-6 h-6 text-primary-600"
            />
            <div>
              <p class="font-semibold">{{ $t("faq.quick.acc.title") }}</p>
              <p class="text-sm text-gray-600">
                {{ $t("faq.quick.acc.desc") }}
              </p>
              <UButton variant="link" @click="scrollTo('acc')">
                {{ $t("faq.go_to") }}
              </UButton>
            </div>
          </div>
        </UCard>

        <UCard
          class="hover:shadow transition dark:bg-slate-800/50 dark:border-slate-700"
        >
          <div class="flex items-start gap-3">
            <UIcon
              name="i-heroicons-calendar"
              class="w-6 h-6 text-primary-600"
            />
            <div>
              <p class="font-semibold">{{ $t("faq.quick.booking.title") }}</p>
              <p class="text-sm text-gray-600">
                {{ $t("faq.quick.booking.desc") }}
              </p>
              <UButton variant="link" @click="scrollTo('booking')">
                {{ $t("faq.go_to") }}
              </UButton>
            </div>
          </div>
        </UCard>

        <UCard
          class="hover:shadow transition dark:bg-slate-800/50 dark:border-slate-700"
        >
          <div class="flex items-start gap-3">
            <UIcon
              name="i-heroicons-shield-check"
              class="w-6 h-6 text-primary-600"
            />
            <div>
              <p class="font-semibold">{{ $t("faq.quick.trust.title") }}</p>
              <p class="text-sm text-gray-600">
                {{ $t("faq.quick.trust.desc") }}
              </p>
              <UButton variant="link" @click="scrollTo('trust')">
                {{ $t("faq.go_to") }}
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <!-- FAQs -->
      <!-- <div class="mt-8 space-y-10">
        <section :id="'acc'">
          <h2 class="text-xl font-bold mb-3">{{ $t("faq.sections.acc") }}</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <details
              v-for="f in filteredFaqs('acc')"
              :key="f.q"
              class="group rounded-lg border border-slate-200 bg-white p-4"
            >
              <summary
                class="cursor-pointer font-semibold flex items-center gap-2"
              >
                <UIcon
                  name="i-heroicons-question-mark-circle"
                  class="w-5 h-5"
                />
                {{ f.q.body.static }}
              </summary>
              <p class="text-sm dark:text-white text-gray-700 leading-7 mt-2">
                {{ f.a.loc.source }}
              </p>
            </details>
          </div>
        </section>

        <section :id="'booking'">
          <h2 class="text-xl font-bold mb-3">
            {{ $t("faq.sections.booking") }}
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <details
              v-for="f in filteredFaqs('booking')"
              :key="f.q"
              class="group rounded-lg border border-slate-200 bg-white p-4"
            >
              <summary
                class="cursor-pointer font-semibold flex items-center gap-2"
              >
                <UIcon name="i-heroicons-credit-card" class="w-5 h-5" />
                {{ f.q.body.static }}
              </summary>
              <p class="text-sm dark:text-white text-gray-700 leading-7 mt-2">
                {{ f.a.loc.source }}
              </p>
            </details>
          </div>
        </section>

        <section :id="'trust'">
          <h2 class="text-xl font-bold mb-3">{{ $t("faq.sections.trust") }}</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <details
              v-for="f in filteredFaqs('trust')"
              :key="f.q"
              class="group rounded-lg border border-slate-200 bg-white p-4"
            >
              <summary
                class="cursor-pointer font-semibold flex items-center gap-2"
              >
                <UIcon name="i-heroicons-shield-check" class="w-5 h-5" />
                {{ f.q }}
              </summary>
              <p class="text-sm dark:text-white text-gray-700 leading-7 mt-2">
                {{ f.a }}
              </p>
            </details>
          </div>
        </section>
      </div> -->

      <!-- Bottom -->
      <UCard
        class="mt-10 p-6 bg-white dark:bg-slate-800/50 dark:border-slate-700 shadow-lg"
      >
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div>
            <p class="font-bold">{{ $t("faq.help.title") }}</p>
            <p class="text-sm text-gray-600">
              {{ siteCopy.supportHours }} {{ $t("faq.and") }}
              {{ siteCopy.supportResponseSla }}
            </p>
          </div>
          <div class="flex gap-2">
            <UButton color="primary" @click="navigateTo('/contact')">
              {{ $t("faq.help.contact") }}
            </UButton>
            <UButton variant="outline" @click="navigateTo('/policies')">
              {{ $t("faq.help.policies") }}
            </UButton>
          </div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
<script setup lang="ts">
import { siteCopy } from "~/constants/site";

const q = ref("");

type Cat = "acc" | "booking" | "trust";
type FAQ = { q: string; a: string; c: Cat };

/**
 * SCROLL
 */
function scrollTo(id: string) {
  if (process.client) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

useHead({ title: "راهنما و سوالات پرتکرار" });
</script>
