<script setup lang="ts">
const props = defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="flex flex-col items-start gap-2 rounded-xl border border-dashed border-slate-200 bg-white p-6 text-slate-600">
    <div>
      <h3 class="text-lg font-semibold text-slate-900">{{ props.title }}</h3>
      <p v-if="props.description" class="text-sm text-slate-500">
        {{ props.description }}
      </p>
    </div>
    <slot />
  </div>
</template>
