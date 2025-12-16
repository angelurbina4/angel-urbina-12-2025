<script setup lang="ts">
import BaseCard from "@/shared/components/ui/BaseCard.vue";
import type { EvolutionNode } from "@/shared/types/domain";

const props = defineProps<{
  root?: EvolutionNode | null;
}>();

const flatten = (node: EvolutionNode | null | undefined): EvolutionNode[] => {
  if (!node) return [];
  const acc: EvolutionNode[] = [];
  const walk = (n: EvolutionNode) => {
    acc.push(n);
    n.evolvesTo.forEach(walk);
  };
  walk(node);
  return acc;
};
</script>

<template>
  <BaseCard class="p-4">
    <h3 class="text-lg font-semibold text-slate-900">Cadena evolutiva</h3>
    <p class="text-sm text-slate-500">Pokémon base y sus evoluciones.</p>
    <div class="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="node in flatten(root)"
        :key="node.id"
        class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2"
      >
        <img
          :src="node.image"
          :alt="node.name"
          loading="lazy"
          class="h-14 w-14 object-contain"
        />
        <div>
          <p class="text-xs text-slate-500">#{{ node.id }}</p>
          <p class="font-semibold text-slate-900">{{ node.name }}</p>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
