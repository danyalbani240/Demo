<template>
  <section
    class="py-12 bg-gray-50 dark:bg-slate-950 transition-colors duration-300"
  >
    <UContainer>
      <UCard
        class="bg-gradient-to-l from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-600 text-white hover:shadow-2xl transition-all duration-300 animate-scale-in"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 class="text-2xl font-extrabold">{{ $t("home.cta.title") }}</h3>
            <p class="text-white/90 mt-1">{{ $t("home.cta.subtitle") }}</p>
          </div>

          <div class="flex gap-3">
            <UButton
              size="lg"
              color="neutral"
              class="hover:scale-105 active:scale-95 transition-all duration-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              to="/auth/?role=customer"
            >
              {{ $t("home.cta.customer_signup") }}
            </UButton>

            <UButton
              size="lg"
              variant="outline"
              color="neutral"
              class="hover:scale-105 active:scale-95 transition-all duration-300 dark:border-slate-200 dark:text-white dark:hover:bg-white/10"
              to="/auth/?role=provider"
            >
              {{ $t("home.cta.provider_signup") }}
            </UButton>
          </div>
        </div>
      </UCard>
    </UContainer>
  </section>
</template>
