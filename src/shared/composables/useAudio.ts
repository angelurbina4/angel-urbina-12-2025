import { ref } from "vue";

let audio: HTMLAudioElement | null = null;

export function useAudio() {
  const isPlaying = ref(false);
  const currentUrl = ref<string | null>(null);

  const stop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    isPlaying.value = false;
  };

  const play = async (url?: string | null) => {
    if (!url) return;
    if (!audio) {
      audio = new Audio();
    }

    if (currentUrl.value === url && isPlaying.value) {
      stop();
      return;
    }

    stop();
    currentUrl.value = url;
    audio.src = url;

    try {
      await audio.play();
      isPlaying.value = true;
    } catch (err) {
      isPlaying.value = false;
      throw err;
    }
  };

  return {
    isPlaying,
    currentUrl,
    play,
    stop,
  };
}
