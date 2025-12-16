<script setup lang="ts">
import { RouterLink } from "vue-router";
import BaseCard from "@/shared/components/ui/BaseCard.vue";
import BaseButton from "@/shared/components/ui/BaseButton.vue";
import PokemonTypes from "./PokemonTypes.vue";
import StatsChart from "./StatsChart.vue";
import CryPlayer from "./CryPlayer.vue";
import type { PokemonDetails } from "@/shared/types/domain";

const props = defineProps<{
  pokemon: PokemonDetails;
}>();

const emit = defineEmits<{
  (e: "remove", id: number): void;
}>();
</script>

<template>
  <BaseCard class="flex flex-col gap-3 p-4 md:flex-row md:items-start">
    <div class="flex items-center gap-3 md:w-48">
      <img
        :src="pokemon.image"
        :alt="pokemon.name"
        loading="lazy"
        class="h-24 w-24 object-contain"
      />
      <div>
        <p class="text-xs text-slate-500">#{{ pokemon.id }}</p>
        <RouterLink
          :to="`/team/${pokemon.id}`"
          class="text-lg font-semibold text-indigo-700 hover:underline"
        >
          {{ pokemon.name }}
        </RouterLink>
        <PokemonTypes class="mt-2" :types="pokemon.types" />
      </div>
    </div>

    <div class="flex-1">
      <StatsChart :stats="pokemon.stats" />
    </div>

    <div class="flex flex-col gap-2 md:w-36">
      <CryPlayer :cries="pokemon.cries" />
      <BaseButton
        size="sm"
        variant="secondary"
        :aria-label="`Eliminar ${pokemon.name} del equipo`"
        @click="emit('remove', pokemon.id)"
      >
        Eliminar
      </BaseButton>
    </div>
  </BaseCard>
</template>
