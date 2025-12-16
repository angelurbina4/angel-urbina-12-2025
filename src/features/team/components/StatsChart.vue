<script setup lang="ts">
import { computed } from "vue";
import type { Stat } from "@/shared/types/domain";

const props = defineProps<{
  stats: Stat[];
  max?: number;
}>();

const maxValue = computed(() => {
  const provided = props.max ?? 255;
  const maxStat = Math.max(...props.stats.map((s) => s.value), provided);
  return maxStat || provided;
});

const widthPercent = (value: number) => `${Math.min((value / maxValue.value) * 100, 100).toFixed(0)}%`;
</script>

<template>
  <div class="space-y-2" role="img" aria-label="Estadísticas base">
    <div
      v-for="stat in props.stats"
      :key="stat.name"
      class="flex items-center gap-3"
    >
      <div class="w-20 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {{ stat.name }}
      </div>
      <div class="flex-1 rounded-full bg-slate-100">
        <div
          class="h-2.5 rounded-full bg-indigo-500"
          :style="{ width: widthPercent(stat.value) }"
          :aria-label="`${stat.name}: ${stat.value}`"
        />
      </div>
      <div class="w-10 text-right text-xs font-semibold text-slate-700">
        {{ stat.value }}
      </div>
    </div>
  </div>
</template>
