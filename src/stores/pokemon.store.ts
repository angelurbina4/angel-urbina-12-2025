import { markRaw } from "vue";
import { defineStore } from "pinia";
import { getEvolutionChain, getPokemon, getSpecies } from "@/shared/api/pokeapi";
import type { EvolutionChainDto, PokemonDto, PokemonSpeciesDto } from "@/shared/types/pokeapi.dto";
import type { EvolutionNode, PokemonDetails, PokemonSpecies } from "@/shared/types/domain";
import { extractIdFromUrl } from "@/shared/utils/id";
import { capitalize, normalizeFlavorText } from "@/shared/utils/format";
import { pokemonOfficialArtworkUrl } from "@/shared/utils/image";

interface PokemonState {
  pokemonById: Record<number, PokemonDetails>;
  speciesById: Record<number, PokemonSpecies>;
  evolutionByChainId: Record<number, EvolutionNode>;
  inFlight: Map<string, Promise<unknown>>;
}

export const usePokemonStore = defineStore("pokemon", {
  state: (): PokemonState => ({
    pokemonById: {},
    speciesById: {},
    evolutionByChainId: {},
    inFlight: markRaw(new Map<string, Promise<unknown>>()),
  }),
  getters: {
    getPokemon:
      (state) =>
      (id: number): PokemonDetails | undefined =>
        state.pokemonById[id],
    getSpecies:
      (state) =>
      (id: number): PokemonSpecies | undefined =>
        state.speciesById[id],
    getEvolution:
      (state) =>
      (chainId: number): EvolutionNode | undefined =>
        state.evolutionByChainId[chainId],
  },
  actions: {
    async fetchPokemon(id: number): Promise<PokemonDetails> {
      if (!Number.isFinite(id) || id <= 0) {
        throw new Error("Invalid pokemon id");
      }
      const cached = this.pokemonById[id];
      if (cached) return cached;

      const key = `pokemon-${id}`;
      const existing = this.inFlight.get(key);
      if (existing) return existing as Promise<PokemonDetails>;

      const promise = getPokemon(id)
        .then((dto) => {
          const mapped = mapPokemonDtoToDetails(dto);
          this.pokemonById[id] = mapped;
          return mapped;
        })
        .finally(() => {
          this.inFlight.delete(key);
        });

      this.inFlight.set(key, promise);
      return promise;
    },

    async fetchSpecies(id: number): Promise<PokemonSpecies> {
      if (!Number.isFinite(id) || id <= 0) {
        throw new Error("Invalid species id");
      }
      const cached = this.speciesById[id];
      if (cached) return cached;

      const key = `species-${id}`;
      const existing = this.inFlight.get(key);
      if (existing) return existing as Promise<PokemonSpecies>;

      const promise = getSpecies(id)
        .then((dto) => {
          const mapped = mapSpeciesDto(dto);
          this.speciesById[id] = mapped;
          return mapped;
        })
        .finally(() => {
          this.inFlight.delete(key);
        });

      this.inFlight.set(key, promise);
      return promise;
    },

    async fetchEvolutionChain(chainId: number): Promise<EvolutionNode> {
      if (!Number.isFinite(chainId) || chainId <= 0) {
        throw new Error("Invalid evolution chain id");
      }
      const cached = this.evolutionByChainId[chainId];
      if (cached) return cached;

      const key = `evolution-${chainId}`;
      const existing = this.inFlight.get(key);
      if (existing) return existing as Promise<EvolutionNode>;

      const promise = getEvolutionChain(chainId)
        .then((dto) => {
          const mapped = mapEvolutionChainDto(dto.chain);
          this.evolutionByChainId[chainId] = mapped;
          return mapped;
        })
        .finally(() => {
          this.inFlight.delete(key);
        });

      this.inFlight.set(key, promise);
      return promise;
    },

    async ensureTeamDetails(ids: number[]): Promise<void> {
      await Promise.all(ids.map((id) => this.fetchPokemon(id)));
    },
  },
});

function mapPokemonDtoToDetails(dto: PokemonDto): PokemonDetails {
  const imageFromDto =
    dto.sprites.other?.["official-artwork"]?.front_default ??
    dto.sprites.front_default ??
    null;

  return {
    id: dto.id,
    name: capitalize(dto.name),
    image: imageFromDto ?? pokemonOfficialArtworkUrl(dto.id),
    types: [...dto.types]
      .sort((a, b) => a.slot - b.slot)
      .map((t) => t.type.name),
    stats: dto.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    cries: dto.cries
      ? {
          latest: dto.cries.latest ?? undefined,
          legacy: dto.cries.legacy ?? undefined,
        }
      : undefined,
    height: dto.height,
    weight: dto.weight,
  };
}

function mapSpeciesDto(dto: PokemonSpeciesDto): PokemonSpecies {
  console.log("DTO Species:", dto);
  const preferred = dto.flavor_text_entries.find((entry) => entry.language.name === "es");
  const fallback = dto.flavor_text_entries.find((entry) => entry.language.name === "en");
  const description = normalizeFlavorText(preferred?.flavor_text ?? fallback?.flavor_text ?? "");

  const evolutionChainId = extractIdFromUrl(dto.evolution_chain.url);
  if (evolutionChainId <= 0) {
    throw new Error("Invalid evolution chain url");
  }

  return {
    description,
    evolutionChainId,
  };
}

function mapEvolutionChainDto(node: EvolutionChainDto["chain"]): EvolutionNode {
  const id = extractIdFromUrl(node.species.url);
  return {
    id,
    name: capitalize(node.species.name),
    image: pokemonOfficialArtworkUrl(id),
    evolvesTo: node.evolves_to.map((child) => mapEvolutionChainDto(child)),
  };
}
