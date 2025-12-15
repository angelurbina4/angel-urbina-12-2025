export interface PokemonSummary {
  id: number;
  name: string;
  image: string;
}

export interface Stat {
  name: string;
  value: number;
}

export interface PokemonDetails extends PokemonSummary {
  types: string[];
  stats: Stat[];
  cries?: {
    latest?: string;
    legacy?: string;
  };
  height: number;
  weight: number;
}

export interface PokemonSpecies {
  description: string;
  evolutionChainId: number;
}

export interface EvolutionNode {
  id: number;
  name: string;
  image: string;
  evolvesTo: EvolutionNode[];
}
