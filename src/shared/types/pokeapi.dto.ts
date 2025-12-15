export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: NamedAPIResource[];
}

export interface PokemonTypeSlot {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonStatDto {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonSpritesDto {
  front_default?: string | null;
  other?: {
    ["official-artwork"]?: {
      front_default?: string | null;
    };
  };
}

export interface PokemonCriesDto {
  latest?: string | null;
  legacy?: string | null;
}

export interface PokemonDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeSlot[];
  stats: PokemonStatDto[];
  sprites: PokemonSpritesDto;
  cries?: PokemonCriesDto;
}

export interface PokemonSpeciesDto {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: NamedAPIResource;
  }>;
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChainDto {
  id: number;
  chain: EvolutionChainLinkDto;
}

export interface EvolutionChainLinkDto {
  species: NamedAPIResource;
  evolves_to: EvolutionChainLinkDto[];
}
