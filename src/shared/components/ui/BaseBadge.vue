<script setup lang="ts">
const props = defineProps<{
  tone?: "default" | "muted";
}>();
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
    :class="
      props.tone === 'muted'
        ? 'bg-slate-100 text-slate-600'
        : 'bg-indigo-50 text-indigo-700'
    "
  >
    <slot />
  </span>
</template>
