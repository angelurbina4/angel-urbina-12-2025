<script setup lang="ts">
import BaseEmptyState from "@/shared/components/ui/BaseEmptyState.vue";
import type { PokemonSummary } from "@/shared/types/domain";
import PokemonCard from "./PokemonCard.vue";

const props = defineProps<{
  pokemons: PokemonSummary[];
  selectedIds: number[];
  teamIds: number[];
  isFull: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle", id: number): void;
}>();
</script>

<template>
  <div v-if="!pokemons.length" class="mt-4">
    <BaseEmptyState title="Sin resultados" description="No hay Pokémon para mostrar." />
  </div>
  <div v-else class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      :selected="selectedIds.includes(pokemon.id)"
      :in-team="teamIds.includes(pokemon.id)"
      :disabled="isFull"
      @toggle="emit('toggle', $event)"
    />
  </div>
</template>
