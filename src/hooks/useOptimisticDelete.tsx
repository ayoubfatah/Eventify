"use client";

import { useOptimistic, useState, useTransition } from "react";

type UseOptimisticDeleteOptions<T> = {
  items: T[];
  getId: (item: T) => string | number;
  deleteFn: (id: string | number) => Promise<void>;
};

export function useOptimisticDelete<T>({
  items,
  getId,
  deleteFn,
}: UseOptimisticDeleteOptions<T>) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [optimisticItems, removeOptimistic] = useOptimistic(
    items,
    (currentItems: T[], id: string | number) => {
      return currentItems.filter((item) => getId(item) !== id);
    },
  );

  function remove(id: string | number) {
    setError(null);

    startTransition(async () => {
      // Immediately remove from UI
      removeOptimistic(id);

      try {
        // Actually delete from server
        await deleteFn(id);

        // Server succeeded
      } catch (error) {
        // Server failed
        setError(
          error instanceof Error ? error.message : "Failed to delete item",
        );
      }
    });
  }

  return {
    items: optimisticItems,
    remove,
    error,
    isPending,
  };
}
