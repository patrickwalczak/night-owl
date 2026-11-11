import { BREAKPOINTS, WIDE_BREAKPOINT, type Breakpoint } from '@/shared/config/breakpoints';

export interface BreakpointsSnapshot {
    readonly atLeast: Readonly<Record<Breakpoint, boolean | null>>;
    readonly isCompact: boolean | null;
    readonly isWide: boolean | null;
}

type Listener = () => void;
interface QueryEntry {
    breakpoint: Breakpoint;
    query: MediaQueryList;
}

const serverSnapshot: BreakpointsSnapshot = {
    atLeast: Object.fromEntries(BREAKPOINTS.map(width => [width, null])) as Record<Breakpoint, null>,
    isCompact: null,
    isWide: null,
};

const listeners = new Set<Listener>();
let snapshot = serverSnapshot;
let queries: QueryEntry[] | null = null;

const getQueries = () => {
    if (!queries) {
        queries = BREAKPOINTS.map(breakpoint => ({
            breakpoint,
            query: window.matchMedia(`(min-width: ${breakpoint}px)`),
        }));
    }

    return queries;
};

const getSnapshot = (): BreakpointsSnapshot => {
    const entries = getQueries();

    if (entries.every(({ breakpoint, query }) => snapshot.atLeast[breakpoint] === query.matches)) return snapshot;

    const atLeast = Object.fromEntries(
        entries.map(({ breakpoint, query }) => [breakpoint, query.matches]),
    ) as Record<Breakpoint, boolean>;
    const isWide = atLeast[WIDE_BREAKPOINT];

    snapshot = { atLeast, isWide, isCompact: !isWide };

    return snapshot;
};

const handleChange = () => {
    listeners.forEach(listener => listener());
};

export const breakpointsStore = {
    subscribe(listener: Listener) {
        listeners.add(listener);

        if (listeners.size === 1) {
            getQueries().forEach(({ query }) => query.addEventListener('change', handleChange));
        }

        return () => {
            listeners.delete(listener);

            if (listeners.size === 0) {
                queries?.forEach(({ query }) => query.removeEventListener('change', handleChange));
                queries = null;
                snapshot = serverSnapshot;
            }
        };
    },
    getSnapshot,
    getServerSnapshot: () => serverSnapshot,
};
