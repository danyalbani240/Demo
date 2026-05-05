<template>
  <footer
    class="bg-white dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-800 mt-10 transition-colors duration-300"
  >
    <UContainer class="py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

      <!-- درباره ما -->
      <div>
        <p class="font-bold mb-3 text-slate-900 dark:text-white">
          {{ $t('footer.about_title') }}
        </p>

        <p class="text-sm text-gray-600 dark:text-slate-400 leading-7">
          {{ $t('footer.about_description') }}
        </p>

        <p class="mt-3 text-sm text-gray-600 dark:text-slate-400">
          {{ siteCopy.supportHours }}
        </p>
      </div>

      <!-- راهنما -->
      <div>
        <p class="font-bold mb-3 text-slate-900 dark:text-white">
          {{ $t('footer.help_title') }}
        </p>

        <ul class="space-y-2 text-sm">
          <li>
            <NuxtLink
              to="/help"
              class="text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            >
              {{ $t('footer.help_faq') }}
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/search"
              class="text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            >
              {{ $t('footer.help_specialists') }}
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/policies"
              class="text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            >
              {{ $t('footer.help_policies') }}
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/contact"
              class="text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            >
              {{ $t('footer.help_contact') }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- اعتماد و شفافیت -->
      <div>
        <p class="font-bold mb-3 text-slate-900 dark:text-white">
          {{ $t('footer.trust_title') }}
        </p>

        <ul class="space-y-2 text-sm text-gray-600 dark:text-slate-400">

          <li>
            <NuxtLink to="/trust/provider-verification">
              {{ $t('footer.trust_verification') }}
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/trust/ratings-feedback">
              {{ $t('footer.trust_ratings') }}
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/trust/refund-guarantee">
              {{ $t('footer.trust_refund') }}
            </NuxtLink>
          </li>
        </ul>

   
      </div>

      <!-- خبرنامه -->
      <div>
        <p class="font-bold mb-3 text-slate-900 dark:text-white">
          {{ $t('footer.newsletter_title') }}
        </p>

        <div class="flex gap-2">
          <UInput
            v-model="email"
            :placeholder="$t('footer.newsletter_placeholder')"
            class="w-full dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />

          <UButton
            color="primary"
            @click="subscribe"
            class="hover:scale-105 transition-transform duration-300"
          >
            {{ $t('footer.newsletter_submit') }}
          </UButton>
        </div>
      </div>
    </UContainer>

    <!-- bottom -->
    <div
      class="border-t border-gray-200 dark:border-slate-800 py-4 text-center text-sm text-gray-600 dark:text-slate-400 transition-colors duration-300"
    >
      <p class="mb-2">
        {{ $t('footer.bottom_product') }}
      </p>

      <p>
        © {{ new Date().getFullYear() }} {{ $t('footer.bottom_rights') }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { siteCopy } from "~/constants/site";

const email = ref("");
const toast = useToast();


function subscribe(): void {
  if (!/.+@.+\..+/.test(email.value)) {
    toast.add({ title: "ایمیل نامعتبر است", color: "warning" });
    return;
  }
  toast.add({ title: "عضویت با موفقیت انجام شد", color: "success" });
  email.value = "";
}
</script>
