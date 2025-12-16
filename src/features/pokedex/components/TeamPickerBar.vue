<script setup lang="ts">
import BaseButton from "@/shared/components/ui/BaseButton.vue";

const props = defineProps<{
  selectedCount: number;
  teamCount: number;
  max?: number;
  isFull: boolean;
}>();

const emit = defineEmits<{
  (e: "add"): void;
  (e: "clear"): void;
}>();
</script>

<template>
  <div class="sticky bottom-4 z-10">
    <div class="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-200/60 sm:flex-row sm:items-center sm:justify-between">
      <div class="text-sm text-slate-700">
        Seleccionados: <span class="font-semibold">{{ selectedCount }}</span> / {{ props.max ?? 6 }}
        <span class="ml-2 text-slate-500">(Equipo actual: {{ teamCount }}/{{ props.max ?? 6 }})</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <BaseButton
          size="sm"
          variant="secondary"
          :disabled="selectedCount === 0"
          @click="emit('clear')"
        >
          Limpiar selección
        </BaseButton>
        <BaseButton
          size="sm"
          :disabled="selectedCount === 0 || isFull"
          @click="emit('add')"
        >
          Agregar al equipo
        </BaseButton>
      </div>
    </div>
  </div>
</template>
