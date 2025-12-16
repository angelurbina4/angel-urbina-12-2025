<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useAsyncState } from "@/shared/composables/useAsyncState";
import BaseEmptyState from "@/shared/components/ui/BaseEmptyState.vue";
import BaseSpinner from "@/shared/components/ui/BaseSpinner.vue";
import BaseButton from "@/shared/components/ui/BaseButton.vue";
import TeamList from "@/features/team/components/TeamList.vue";
import { useTeamStore } from "@/stores/team.store";
import { usePokemonStore } from "@/stores/pokemon.store";
import type { PokemonDetails } from "@/shared/types/domain";

const teamStore = useTeamStore();
const pokemonStore = usePokemonStore();

const { loading, error, data, run } = useAsyncState<PokemonDetails[]>();

const load = async () => {
  await run(async () => {
    const ids = [...teamStore.teamIds];
    if (!ids.length) return [];
    await pokemonStore.ensureTeamDetails(ids);
    return ids
      .map((id) => pokemonStore.getPokemon(id))
      .filter(Boolean) as PokemonDetails[];
  });
};

const safeLoad = async () => {
  try {
    await load();
  } catch {
  }
};

onMounted(() => {
  void safeLoad();
});
watch(
  () => [...teamStore.teamIds],
  () => {
    void safeLoad();
  }
);

const handleRemove = (id: number) => {
  teamStore.remove(id);
};

const handleClear = () => {
  teamStore.clear();
};

const hasTeam = computed(() => teamStore.count > 0);
</script>

<template>
  <section class="space-y-6">
    <header class="space-y-1">
      <div class="flex items-center justify-between gap-2">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Equipo</h1>
          <p class="text-slate-600">
            Lista de Pokémon agregados con tipos, stats (gráfico) y cries. Puedes eliminarlos o ver su detalle.
          </p>
        </div>
        <BaseButton
          variant="secondary"
          size="sm"
          :disabled="teamStore.count === 0"
          @click="handleClear"
        >
          Limpiar equipo
        </BaseButton>
      </div>
      <p class="text-sm text-slate-500">
        {{ teamStore.count }}/6 seleccionados
      </p>
    </header>

    <div v-if="loading" class="flex justify-center py-10">
      <BaseSpinner />
    </div>

    <div v-else-if="error" class="py-6">
      <BaseEmptyState
        title="Error al cargar equipo"
        description="No pudimos obtener los detalles. Intenta de nuevo."
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

    <div v-else-if="!hasTeam">
      <BaseEmptyState
        title="Aún no tienes Pokémon en tu equipo"
        description="Vuelve a la Pokédex y agrega hasta 6."
      />
    </div>

    <div v-else>
      <TeamList :pokemons="data ?? []" @remove="handleRemove" />
    </div>
  </section>
</template>
