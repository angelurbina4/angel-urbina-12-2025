import { computed, ref } from "vue";

interface PaginationOptions {
  pageSize?: number;
  total?: number;
}

export function usePagination(options: PaginationOptions = {}) {
  const pageSize = ref(options.pageSize ?? 25);
  const total = ref(options.total ?? 0);
  const page = ref(1);

  const totalPages = computed(() => {
    if (!total.value || !pageSize.value) return 1;
    return Math.max(1, Math.ceil(total.value / pageSize.value));
  });

  const canPrev = computed(() => page.value > 1);
  const canNext = computed(() => page.value < totalPages.value);

  const setTotal = (value: number) => {
    total.value = value;
    if (page.value > totalPages.value) {
      page.value = totalPages.value;
    }
  };

  const next = () => {
    if (canNext.value) page.value += 1;
  };

  const prev = () => {
    if (canPrev.value) page.value -= 1;
  };

  const slice = <T>(list: T[]): T[] => {
    const start = (page.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return list.slice(start, end);
  };

  return {
    page,
    pageSize,
    total,
    totalPages,
    canPrev,
    canNext,
    setTotal,
    next,
    prev,
    slice,
  };
}
