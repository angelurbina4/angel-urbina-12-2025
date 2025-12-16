<script setup lang="ts">
import { computed } from "vue";
import BaseCard from "@/shared/components/ui/BaseCard.vue";
import BaseBadge from "@/shared/components/ui/BaseBadge.vue";
import BaseButton from "@/shared/components/ui/BaseButton.vue";
import type { PokemonSummary } from "@/shared/types/domain";

const props = defineProps<{
  pokemon: PokemonSummary;
  selected?: boolean;
  inTeam?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle", id: number): void;
}>();

const buttonLabel = computed(() => (props.selected ? "Quitar" : "Seleccionar"));
</script>

<template>
  <BaseCard class="flex flex-col gap-4 p-4">
    <div class="flex items-start justify-between">
      <BaseBadge tone="muted">#{{ pokemon.id }}</BaseBadge>
      <BaseBadge v-if="inTeam" tone="default">En equipo</BaseBadge>
      <BaseBadge v-else-if="selected" tone="default">Seleccionado</BaseBadge>
    </div>
    <div class="flex flex-col items-center gap-3 text-center">
      <img
        :src="pokemon.image"
        :alt="pokemon.name"
        loading="lazy"
        class="h-24 w-24"
      />
      <p class="text-lg font-semibold text-slate-900">
        {{ pokemon.name }}
      </p>
    </div>
    <BaseButton
      size="sm"
      :variant="selected ? 'secondary' : 'primary'"
      :disabled="(disabled && !selected) || inTeam"
      class="w-full"
      @click="emit('toggle', pokemon.id)"
    >
      <span v-if="inTeam">En equipo</span>
      <span v-else>{{ buttonLabel }}</span>
    </BaseButton>
  </BaseCard>
</template>
