<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useAsyncState } from "@/shared/composables/useAsyncState";
import { usePokemonStore } from "@/stores/pokemon.store";
import type { EvolutionNode, PokemonDetails, PokemonSpecies } from "@/shared/types/domain";
import { formatHeightDmToM, formatWeightHgToKg } from "@/shared/utils/format";
import BaseSpinner from "@/shared/components/ui/BaseSpinner.vue";
import BaseEmptyState from "@/shared/components/ui/BaseEmptyState.vue";
import BaseCard from "@/shared/components/ui/BaseCard.vue";
import BaseBadge from "@/shared/components/ui/BaseBadge.vue";
import PokemonTypes from "@/features/team/components/PokemonTypes.vue";
import StatsChart from "@/features/team/components/StatsChart.vue";
import CryPlayer from "@/features/team/components/CryPlayer.vue";
import EvolutionChain from "@/features/team/components/EvolutionChain.vue";

const route = useRoute();
const pokemonStore = usePokemonStore();

const pokemonState = useAsyncState<PokemonDetails>();
const speciesState = useAsyncState<PokemonSpecies>();
const evolutionState = useAsyncState<EvolutionNode | null>();

const load = async () => {
  const id = Number(route.params.id);
  if (!Number.isFinite(id) || id <= 0) {
    throw new Error("Invalid id");
  }
  await pokemonState.run(() => pokemonStore.fetchPokemon(id));
  const species = await speciesState.run(() => pokemonStore.fetchSpecies(id));
  if (species.evolutionChainId > 0) {
    await evolutionState.run(() => pokemonStore.fetchEvolutionChain(species.evolutionChainId));
  } else {
    evolutionState.data.value = null;
  }
};

const safeLoad = async () => {
  try {
    await load();
  } catch {
    // el error ya queda en los estados correspondientes
  }
};

onMounted(() => {
  void safeLoad();
});

watch(
  () => route.params.id,
  () => {
    void safeLoad();
  }
);

const isLoading = computed(
  () =>
    pokemonState.loading.value ||
    speciesState.loading.value ||
    evolutionState.loading.value
);

const anyError = computed(() =>
  Boolean(
    pokemonState.error.value ||
      speciesState.error.value ||
      evolutionState.error.value
  )
);

const pokemon = computed(() => pokemonState.data.value);
const species = computed(() => speciesState.data.value);
const evolution = computed(() => evolutionState.data.value);
</script>

<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between gap-4">
      <div>
        <p class="text-sm text-slate-500">Ruta /team/{{ route.params.id }}</p>
        <h1 class="text-2xl font-bold text-slate-900">Detalle del Pokémon</h1>
        <p class="text-slate-600">
          Nombre, imagen, tipos, stats (gráfico), sonido (cries), altura, peso, descripción y cadena evolutiva.
        </p>
      </div>
      <RouterLink
        to="/team"
        class="rounded-lg border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        ← Volver al equipo
      </RouterLink>
    </header>

    <div v-if="isLoading" class="flex justify-center py-10">
      <BaseSpinner />
    </div>

    <div v-else-if="anyError" class="py-6">
      <BaseEmptyState
        title="Error al cargar el detalle"
        description="No pudimos obtener la información. Intenta de nuevo."
      >
        <button
          class="text-sm font-semibold text-indigo-600 hover:underline"
          type="button"
          @click="load"
        >
          Reintentar
        </button>
      </BaseEmptyState>
    </div>

    <div v-else-if="!pokemon">
      <BaseEmptyState title="Pokémon no encontrado" description="Verifica el ID en la URL." />
    </div>

    <div v-else class="space-y-6">
      <BaseCard class="p-4">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <img
            :src="pokemon.image"
            :alt="pokemon.name"
            loading="lazy"
            class="h-32 w-32 object-contain md:h-40 md:w-40"
          />
          <div class="flex-1 space-y-2">
            <div class="flex items-center gap-2">
              <BaseBadge tone="muted">#{{ pokemon.id }}</BaseBadge>
              <PokemonTypes :types="pokemon.types" />
            </div>
            <h2 class="text-2xl font-bold text-slate-900">{{ pokemon.name }}</h2>
            <div class="flex flex-wrap gap-4 text-sm text-slate-600">
              <span>Altura: <strong>{{ formatHeightDmToM(pokemon.height) }}</strong></span>
              <span>Peso: <strong>{{ formatWeightHgToKg(pokemon.weight) }}</strong></span>
            </div>
            <CryPlayer :cries="pokemon.cries" />
          </div>
        </div>
      </BaseCard>

      <div class="grid gap-4 md:grid-cols-2">
        <BaseCard class="p-4">
          <h3 class="text-lg font-semibold text-slate-900">Descripción</h3>
          <p class="mt-2 text-slate-700">
            {{ species?.description || "Sin descripción disponible." }}
          </p>
        </BaseCard>

        <BaseCard class="p-4">
          <h3 class="text-lg font-semibold text-slate-900">Stats</h3>
          <StatsChart class="mt-3" :stats="pokemon.stats" />
        </BaseCard>
      </div>

      <EvolutionChain :root="evolution ?? null" />
    </div>
  </section>
</template>
