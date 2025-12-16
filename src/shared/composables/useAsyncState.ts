import { ref } from "vue";

export function useAsyncState<T>() {
  const loading = ref(false);
  const error = ref<unknown>(null);
  const data = ref<T | null>(null);

  const run = async (fn: () => Promise<T>) => {
    loading.value = true;
    error.value = null;
    try {
      const result = await fn();
      data.value = result;
      return result;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    data,
    run,
  };
}
