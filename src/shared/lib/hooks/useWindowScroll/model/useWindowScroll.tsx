'use client';

import { useSyncExternalStore } from 'react';

import { scrollStore, type ScrollDirection } from './store';

export interface ScrollState {
    scrollY: number;
    direction: ScrollDirection;
    delta: number;
}

export function useWindowScroll(): ScrollState {
    return useSyncExternalStore(
        scrollStore.subscribe,
        scrollStore.getSnapshot,
        scrollStore.getServerSnapshot,
    );
}

export type { ScrollDirection };
