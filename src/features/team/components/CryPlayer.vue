<script setup lang="ts">
import { computed } from "vue";
import BaseButton from "@/shared/components/ui/BaseButton.vue";
import { useAudio } from "@/shared/composables/useAudio";

const props = defineProps<{
  cries?: {
    latest?: string;
    legacy?: string;
  };
}>();

const { isPlaying, currentUrl, play, stop } = useAudio();
const source = computed(() => props.cries?.latest ?? props.cries?.legacy ?? null);

const toggle = async () => {
  const url = source.value;
  if (!url) return;
  if (isPlaying.value && currentUrl.value === url) {
    stop();
    return;
  }
  try {
    await play(url);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error reproduciendo cry", err);
  }
};
</script>

<template>
  <BaseButton
    size="sm"
    variant="ghost"
    :disabled="!source"
    :aria-label="source ? 'Reproducir sonido' : 'Sin sonido disponible'"
    @click="toggle"
  >
    <span v-if="isPlaying && source && currentUrl === source">Detener</span>
    <span v-else>Reproducir sonido</span>
  </BaseButton>
</template>
