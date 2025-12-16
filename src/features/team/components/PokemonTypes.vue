<script setup lang="ts">
import BaseBadge from "@/shared/components/ui/BaseBadge.vue";

const props = defineProps<{
  types: string[];
}>();

const toneByType: Record<string, string> = {
  fire: "bg-orange-100 text-orange-700",
  water: "bg-blue-100 text-blue-700",
  grass: "bg-green-100 text-green-700",
  electric: "bg-yellow-100 text-yellow-700",
  poison: "bg-purple-100 text-purple-700",
  psychic: "bg-pink-100 text-pink-700",
  ice: "bg-cyan-100 text-cyan-700",
  dragon: "bg-indigo-100 text-indigo-700",
  dark: "bg-slate-800 text-white",
  fairy: "bg-rose-100 text-rose-700",
  rock: "bg-amber-100 text-amber-700",
  ground: "bg-orange-50 text-orange-700",
  bug: "bg-lime-100 text-lime-700",
  fighting: "bg-red-100 text-red-700",
  ghost: "bg-violet-100 text-violet-700",
  steel: "bg-gray-200 text-gray-800",
  normal: "bg-slate-100 text-slate-700",
  flying: "bg-sky-100 text-sky-700",
};

const classesForType = (type: string) => toneByType[type] ?? "bg-slate-100 text-slate-700";
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <BaseBadge v-for="type in props.types" :key="type" :class="classesForType(type)">
      {{ type }}
    </BaseBadge>
  </div>
</template>
