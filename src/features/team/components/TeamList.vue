<script setup lang="ts">
import TeamMemberCard from "./TeamMemberCard.vue";
import type { PokemonDetails } from "@/shared/types/domain";

const props = defineProps<{
  pokemons: PokemonDetails[];
}>();

const emit = defineEmits<{
  (e: "remove", id: number): void;
}>();
</script>

<template>
  <div class="space-y-3">
    <TeamMemberCard
      v-for="pokemon in props.pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      @remove="emit('remove', $event)"
    />
  </div>
</template>
