<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps<{
  to: string;
  label: string;
}>();

const route = useRoute();

const isActive = computed(() => {
  if (props.to === "/") return route.path === "/";
  return route.path.startsWith(props.to);
});
</script>

<template>
  <RouterLink
    :to="to"
    class="block rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    :class="
      isActive
        ? 'bg-indigo-50 text-indigo-700'
        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
    "
    :aria-current="isActive ? 'page' : undefined"
  >
    {{ label }}
  </RouterLink>
</template>
