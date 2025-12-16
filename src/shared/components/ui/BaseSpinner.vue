<script setup lang="ts">
const props = defineProps<{
  size?: "sm" | "md";
}>();

const sizeClass = props.size === "sm" ? "h-4 w-4 border-2" : "h-6 w-6 border-2";
</script>

<template>
  <span
    class="inline-block animate-spin rounded-full border-current border-r-transparent text-indigo-600"
    :class="sizeClass"
    role="status"
    aria-label="Loading"
  />
</template>
