<script setup lang="ts">
import AppNavbar from "@/shared/components/layout/AppNavbar.vue";
import AppNavLink from "@/shared/components/layout/AppNavLink.vue";
import { navLinks } from "@/shared/components/layout/navLinks";
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <AppNavbar />

    <div class="mx-auto flex max-w-6xl gap-6 px-4 py-6">
      <aside class="hidden w-56 shrink-0 md:block">
        <nav class="flex flex-col gap-2" aria-label="Secciones">
          <AppNavLink v-for="link in navLinks" :key="link.to" :to="link.to" :label="link.label" />
        </nav>
      </aside>
      <main class="min-w-0 flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>
