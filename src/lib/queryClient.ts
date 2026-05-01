'use client';

import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

// Default export is the client with persistence configured
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 60 * 1000,
    },
  },
});

export function getPersister() {
  if (typeof window !== 'undefined') {
    return createSyncStoragePersister({
      storage: window.localStorage,
    });
  }
  return undefined;
}
