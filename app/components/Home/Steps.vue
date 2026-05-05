<template>
  <section
    class="py-10 bg-white dark:bg-slate-900/50 border-y border-gray-200 dark:border-slate-800 transition-colors duration-300"
  >
    <UContainer>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white animate-slide-up">
        {{ $t('home.howItWorks.title') }}
      </h2>

      <div class="grid md:grid-cols-3 gap-6 mt-6">
        <div class="animate-slide-up" style="animation-delay: 0ms">
          <UCard class="h-full dark:bg-slate-800/50 dark:border-slate-700 group">
            <div class="flex items-start gap-3">
              <span class="step-indicator">1</span>
              <div>
                <p class="font-semibold text-slate-900 dark:text-white">
                  {{ $t('home.howItWorks.step1.title') }}
                </p>
                <p class="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  {{ $t('home.howItWorks.step1.desc') }}
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <div class="animate-slide-up" style="animation-delay: 150ms">
          <UCard class="h-full dark:bg-slate-800/50 dark:border-slate-700 group">
            <div class="flex items-start gap-3">
              <span class="step-indicator">2</span>
              <div>
                <p class="font-semibold text-slate-900 dark:text-white">
                  {{ $t('home.howItWorks.step2.title') }}
                </p>
                <p class="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  {{ $t('home.howItWorks.step2.desc') }}
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <div class="animate-slide-up" style="animation-delay: 300ms">
          <UCard class="h-full dark:bg-slate-800/50 dark:border-slate-700 group">
            <div class="flex items-start gap-3">
              <span class="step-indicator">3</span>
              <div>
                <p class="font-semibold text-slate-900 dark:text-white">
                  {{ $t('home.howItWorks.step3.title') }}
                </p>
                <p class="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  {{ $t('home.howItWorks.step3.desc') }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
