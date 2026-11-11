'use client';

import { useSyncExternalStore } from 'react';

import { breakpointsStore, type BreakpointsSnapshot } from './model/store';

/** Breakpoint matches are null during SSR and hydration until the client snapshot is read. */
export function useBreakpoints(): BreakpointsSnapshot {
    return useSyncExternalStore(
        breakpointsStore.subscribe,
        breakpointsStore.getSnapshot,
        breakpointsStore.getServerSnapshot,
    );
}

export type { BreakpointsSnapshot };
export type { Breakpoint } from '@/shared/config/breakpoints';
