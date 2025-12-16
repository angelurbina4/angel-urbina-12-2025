<script setup lang="ts">
type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const props = defineProps<{
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}>();

const variantClass: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:ring-indigo-500 disabled:bg-indigo-300",
  secondary:
    "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus-visible:ring-indigo-500 disabled:text-slate-400",
  ghost:
    "text-slate-700 hover:bg-slate-100 focus-visible:ring-indigo-500 disabled:text-slate-400",
};

const sizeClass: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
};
</script>

<template>
  <button
    :type="props.type ?? 'button'"
    :disabled="props.disabled"
    class="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed"
    :class="[variantClass[props.variant ?? 'primary'], sizeClass[props.size ?? 'md']]"
  >
    <slot />
  </button>
</template>
