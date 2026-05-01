'use client';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, getPersister } from '@/lib/queryClient';
import { useEffect, useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [persister, setPersister] = useState<any>(null);

  useEffect(() => {
    setPersister(getPersister());
  }, []);

  if (!persister) {
    // Render standard provider before hydration
    return (
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: undefined as any }}>
        {children}
      </PersistQueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
