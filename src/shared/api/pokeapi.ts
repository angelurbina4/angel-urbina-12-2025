import http from "./http";
import type {
  EvolutionChainDto,
  PokemonDto,
  PokemonListResponse,
  PokemonSpeciesDto,
} from "@/shared/types/pokeapi.dto";

export async function listPokemon(limit = 151, offset = 0): Promise<PokemonListResponse> {
  const { data } = await http.get<PokemonListResponse>("/pokemon", {
    params: { limit, offset },
  });
  return data;
}

export async function getPokemon(idOrName: number | string): Promise<PokemonDto> {
  const { data } = await http.get<PokemonDto>(`/pokemon/${idOrName}`);
  return data;
}

export async function getSpecies(idOrName: number | string): Promise<PokemonSpeciesDto> {
  const { data } = await http.get<PokemonSpeciesDto>(`/pokemon-species/${idOrName}`);
  return data;
}

export async function getEvolutionChain(chainId: number): Promise<EvolutionChainDto> {
  const { data } = await http.get<EvolutionChainDto>(`/evolution-chain/${chainId}`);
  return data;
}

export async function getEvolutionChainByUrl(url: string): Promise<EvolutionChainDto> {
  const { data } = await http.get<EvolutionChainDto>(url);
  return data;
}
