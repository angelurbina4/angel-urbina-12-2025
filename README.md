# Pokémon Team App (Vue 3 + Vite + TS)

Pokédex (151 Pokémon con paginación de 25), armado de equipo (máx 6) y detalle con stats, cries, descripción y cadena evolutiva usando PokeAPI.

## Stack
- Vue 3 + Vite
- TypeScript
- Pinia (estado)
- Vue Router
- Axios (HTTP)
- TailwindCSS (UI)

## Estructura de carpetas
```
.
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ tailwind.config.js
├─ postcss.config.js
├─ README.md
└─ src
   ├─ main.ts
   ├─ App.vue
   ├─ assets/
   ├─ styles/
   │  └─ tailwind.css
   ├─ app/
   │  ├─ router/
   │  │  └─ index.ts
   │  ├─ layouts/
   │  │  └─ AppShell.vue
   │  └─ providers/
   │     └─ pinia.ts
   ├─ shared/
   │  ├─ api/
   │  │  ├─ http.ts
   │  │  └─ pokeapi.ts
   │  ├─ components/
   │  │  ├─ ui/
   │  │  │  ├─ BaseButton.vue
   │  │  │  ├─ BaseCard.vue
   │  │  │  ├─ BaseSpinner.vue
   │  │  │  ├─ BaseBadge.vue
   │  │  │  └─ BaseEmptyState.vue
   │  │  └─ layout/
   │  │     ├─ AppNavbar.vue
   │  │     └─ AppNavLink.vue
   │  ├─ composables/
   │  │  ├─ useAsyncState.ts
   │  │  ├─ usePagination.ts
   │  │  └─ useAudio.ts
   │  ├─ types/
   │  │  ├─ pokeapi.dto.ts
   │  │  └─ domain.ts
   │  └─ utils/
   │     ├─ format.ts
   │     ├─ image.ts
   │     └─ id.ts
   ├─ stores/
   │  ├─ team.store.ts
   │  └─ pokemon.store.ts
   └─ features/
      ├─ pokedex/
      │  ├─ views/
      │  │  └─ HomeView.vue
      │  └─ components/
      │     ├─ PokemonGrid.vue
      │     ├─ PokemonCard.vue
      │     └─ TeamPickerBar.vue
      └─ team/
         ├─ views/
         │  ├─ TeamView.vue
         │  └─ TeamDetailView.vue
         └─ components/
            ├─ TeamList.vue
            ├─ TeamMemberCard.vue
            ├─ PokemonTypes.vue
            ├─ StatsChart.vue
            ├─ CryPlayer.vue
            └─ EvolutionChain.vue
```

## Funcionalidades
### `/` — Pokédex
- Lista inicial de **151** Pokémon (1 request) usando `GET /pokemon?limit=151`
- Paginación local de **25** por página
- Selección de Pokémon y agregar a equipo (máx **6**)

### `/team` — Equipo
- Lista del equipo desde Pinia (máx 6)
- Muestra: nombre, imagen, tipos, stats (con gráfico), sonido (cries) que se puede escuchar
- Eliminar individualmente del equipo y limpiar equipo
- Link a detalle `/team/:id`
- Prefetch de detalles vía cache store (evita refetch)

### `/team/:id` — Detalle
- Carga: pokemon, species (descripción ES con fallback EN)
- Muestra: imagen, tipos, altura/peso, stats (con gráfico), sonido (cries) que se
pueda escucha, descripción y cadena evolutiva

## Decisiones técnicas

- Home (Pokédex): se evita pedir 151 detalles. Se lista limit=151 y se construye `PokemonSummary` con `extractIdFromUrl(url)` + `pokemonImageByIdUrl(id)`
- Cache: `pokemon.store` guarda `pokemonById`, `speciesById`, `evolutionByChainId` y usa `inFlight` para deduplicar requests concurrentes
- UI desacoplada: los componentes no hacen fetch directo; la orquestación se hace en `views + stores`
- Accesibilidad: `aria-label` en acciones (play/delete), `loading="lazy"` en imágenes, responsive vía clases Tailwind

## Instalación
Requisitos: **Node "^24.10.1"**

### Clonar repositorio
`git clone git@github.com:angelurbina4/angel-urbina-12-2025.git`

### Correr desde la terminal en la root del proyecto
```bash
npm install
npm run dev
```
### Abrir
`http://localhost:5173/`

## Cómo probar rápido

- Ir a `/` y navegar páginas (25 por página).
- Seleccionar algunos Pokémon y agregarlos al equipo.
- Ir a `/team`, reproducir cries, ver stats, eliminar y limpiar equipo.
- Entrar a `/team/:id` desde una card y verificar descripción + evolución.

> Nota: no se incluyeron tests automatizados en esta version, pero la lógica está desacoplada (stores/composables puros) para facilitar su cobertura.

