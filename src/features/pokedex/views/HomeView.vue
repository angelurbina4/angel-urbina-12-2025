<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { listPokemon } from "@/shared/api/pokeapi";
import { useAsyncState } from "@/shared/composables/useAsyncState";
import { usePagination } from "@/shared/composables/usePagination";
import { useTeamStore } from "@/stores/team.store";
import BaseSpinner from "@/shared/components/ui/BaseSpinner.vue";
import BaseEmptyState from "@/shared/components/ui/BaseEmptyState.vue";
import { extractIdFromUrl } from "@/shared/utils/id";
import { pokemonOfficialArtworkUrl } from "@/shared/utils/image";
import type { PokemonSummary } from "@/shared/types/domain";
import PokemonGrid from "../components/PokemonGrid.vue";
import TeamPickerBar from "../components/TeamPickerBar.vue";

const teamStore = useTeamStore();
const selectedIds = ref<number[]>([]);

const { loading, error, data, run } = useAsyncState<PokemonSummary[]>();
const pagination = usePagination({ pageSize: 25 });

const paginatedPokemons = computed(() => {
  const list = data.value ?? [];
  return pagination.slice(list);
});

const newSelectionCount = computed(() =>
  selectedIds.value.filter((id) => !teamStore.has(id)).length
);

const freeSlots = computed(() => Math.max(0, 6 - teamStore.count));

const canSelectMore = computed(() => newSelectionCount.value < freeSlots.value);
const selectionLimitReached = computed(() => freeSlots.value === 0 || !canSelectMore.value);


const isSelectionFull = computed(() => freeSlots.value === 0 || newSelectionCount.value >= freeSlots.value);
const totalSelected = computed(() => selectedIds.value.length);

const toggleSelect = (id: number) => {
  if (teamStore.has(id)) return;
  const exists = selectedIds.value.includes(id);
  if (!exists && !canSelectMore.value) return;
  if (exists) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id);
    return;
  }
  if (isSelectionFull.value) return;
  selectedIds.value = [...selectedIds.value, id];
};

const handleAdd = () => {
  if (!selectedIds.value.length) return;
  teamStore.addMany(selectedIds.value);
  selectedIds.value = [];
};

const handleClear = () => {
  selectedIds.value = [];
};

const load = async () => {
  await run(async () => {
    const res = await listPokemon(151, 0);
    const mapped: PokemonSummary[] = res.results.map((item) => {
      const id = extractIdFromUrl(item.url);
      return {
        id,
        name: item.name,
        image: pokemonOfficialArtworkUrl(id),
      };
    });
    pagination.setTotal(mapped.length);
    return mapped;
  });
};

const safeLoad = async () => {
  try {
    await load();
  } catch {
  }
};

onMounted(() => {
  console.log("HomeView mounted, loading pokemons");
  void safeLoad();
});
</script>

<template>
  <section class="space-y-6">
    <header class="space-y-1">
      <h1 class="text-2xl font-bold text-slate-900">Pokédex</h1>
      <p class="text-slate-600">
        Lista inicial de 151 Pokémon con paginación local (25 por página) y selección para tu equipo.
      </p>
    </header>

    <div v-if="loading" class="flex justify-center py-10">
      <BaseSpinner />
    </div>
    <div v-else-if="error" class="py-6">
      <BaseEmptyState
        title="Error al cargar"
        description="No pudimos obtener la lista. Intenta de nuevo."
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
    <div v-else>
      <div class="flex items-center justify-between text-sm text-slate-600">
        <span>Página {{ pagination.page }} de {{ pagination.totalPages }}</span>
        <div class="flex items-center gap-2">
          <button
            class="rounded-lg border border-slate-200 px-3 py-1 hover:bg-slate-50 disabled:opacity-50"
            type="button"
            :disabled="!pagination.canPrev"
            @click="pagination.prev"
          >
            Anterior
          </button>
          <button
            class="rounded-lg border border-slate-200 px-3 py-1 hover:bg-slate-50 disabled:opacity-50"
            type="button"
            :disabled="!pagination.canNext"
            @click="pagination.next"
          >
            Siguiente
          </button>
        </div>
      </div>

      <PokemonGrid
        class="mt-4"
        :pokemons="paginatedPokemons"
        :selected-ids="selectedIds"
        :team-ids="teamStore.teamIds"
        :is-full="selectionLimitReached"
        @toggle="toggleSelect"
      />
    </div>

    <TeamPickerBar
      v-if="!loading && !error"
      :selected-count="totalSelected"
      :team-count="teamStore.count"
      :is-full="teamStore.isFull"
      :max="6"
      @add="handleAdd"
      @clear="handleClear"
    />
  </section>
</template>
