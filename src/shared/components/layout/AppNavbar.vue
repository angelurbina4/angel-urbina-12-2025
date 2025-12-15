<script setup lang="ts">
import { RouterLink } from "vue-router";
import AppNavLink from "@/shared/components/layout/AppNavLink.vue";
import { navLinks } from "@/shared/components/layout/navLinks";
</script>

<template>
  <header class="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="h-8 w-8 rounded-lg bg-indigo-600" aria-hidden="true"></div>
        <span class="text-sm font-semibold text-slate-900">Pokémon App</span>
      </RouterLink>

      <nav class="flex items-center gap-2 md:hidden" aria-label="Navegación">
        <AppNavLink v-for="link in navLinks" :key="link.to" :to="link.to" :label="link.label" />
      </nav>
    </div>
  </header>
</template>
