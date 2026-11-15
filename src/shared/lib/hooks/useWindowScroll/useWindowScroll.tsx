import { useSyncExternalStore } from 'react';

import { scrollStore, type ScrollDirection } from './store';

export interface ScrollState {
    scrollY: number;
    direction: ScrollDirection;
    delta: number;
}

export const useWindowScroll = (): ScrollState => {
    return useSyncExternalStore(
        scrollStore.subscribe,
        scrollStore.getSnapshot,
        scrollStore.getServerSnapshot,
    );
};

// Primitive snapshots let React skip renders when the selected value has not changed.
export const useWindowScrollSelector = <T extends string | number | boolean | null>(
    selector: (state: ScrollState) => T,
): T => useSyncExternalStore(
    scrollStore.subscribe,
    () => selector(scrollStore.getSnapshot()),
    () => selector(scrollStore.getServerSnapshot()),
);

export type { ScrollDirection };
