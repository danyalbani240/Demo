<template>
  <!-- 
     v-for="c in categories"
		:key="props.category.slug" -->
  <UCard
    class="hover:shadow-lg min-h-full dark:hover:shadow-primary-500/20 cursor-pointer transition-all duration-300 dark:bg-slate-800/50 dark:border-slate-700 group"
    @click="goToCategory"
  >
    <div class="flex h-full items-center gap-4">
      <UIcon
        :name="'heroicons:' + props.category.icon"
        class="w-10 h-10 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300"
      />
      <div>
        <p class="font-semibold text-slate-900 dark:text-white">
          {{ props.category.title }}
        </p>
        <p class="text-sm text-justify text-gray-600 dark:text-slate-400">
          {{ props.category.desc }}
        </p>
      </div>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

function goToCategory() {
  useSearchNavigation().searchByCategory(props.category.slug);
}
</script>
