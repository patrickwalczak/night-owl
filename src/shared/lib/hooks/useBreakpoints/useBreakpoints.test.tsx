import { act, cleanup, render, renderHook } from '@testing-library/react';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BREAKPOINTS } from '@/shared/config/breakpoints';

import { breakpointsStore } from './model/store';
import { useBreakpoints, type BreakpointsSnapshot } from './useBreakpoints';

function mockViewport(initialWidth: number) {
    let width = initialWidth;
    const entries: { query: MediaQueryList; threshold: number; listeners: Set<EventListenerOrEventListenerObject> }[] = [];

    const matchMedia = vi.fn((media: string): MediaQueryList => {
        const threshold = Number(media.match(/min-width:\s*([\d.]+)px/)?.[1]);
        const listeners = new Set<EventListenerOrEventListenerObject>();
        const query = {
            media,
            get matches() { return width >= threshold; },
            onchange: null,
            addEventListener: vi.fn((_type, listener) => listeners.add(listener)),
            removeEventListener: vi.fn((_type, listener) => listeners.delete(listener)),
        } as unknown as MediaQueryList;

        entries.push({ query, threshold, listeners });

        return query;
    });

    vi.stubGlobal('matchMedia', matchMedia);

    return {
        entries,
        matchMedia,
        setWidth(nextWidth: number) {
            const changed = entries.filter(({ threshold }) => (width >= threshold) !== (nextWidth >= threshold));

            width = nextWidth;
            changed.forEach(({ query, listeners }) => {
                const event = Object.assign(new Event('change'), { matches: query.matches, media: query.media });

                listeners.forEach((listener) => {
                    if (typeof listener === 'function') listener(event);
                    else listener.handleEvent(event);
                });
            });
        },
    };
}

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

describe('useBreakpoints', () => {
    let viewport: ReturnType<typeof mockViewport>;

    beforeEach(() => {
        viewport = mockViewport(800);
    });

    it('exposes precise thresholds and derived layout flags', () => {
        const { result } = renderHook(() => useBreakpoints());

        expect(result.current).toEqual({
            atLeast: { 480: true, 768: true, 1024: false, 1280: false, 1536: false, 1920: false },
            isCompact: true,
            isWide: false,
        });
    });

    it('shares queries and snapshots between consumers and removes listeners after the last unmount', () => {
        const first = renderHook(() => useBreakpoints());
        const second = renderHook(() => useBreakpoints());

        expect(viewport.matchMedia).toHaveBeenCalledTimes(BREAKPOINTS.length);
        expect(first.result.current).toBe(second.result.current);
        viewport.entries.forEach(({ query, listeners }) => {
            expect(query.addEventListener).toHaveBeenCalledTimes(1);
            expect(listeners.size).toBe(1);
        });

        first.unmount();
        expect(viewport.entries.every(({ listeners }) => listeners.size === 1)).toBe(true);

        act(() => viewport.setWidth(1280));
        expect(second.result.current.isWide).toBe(true);
        expect(second.result.current.atLeast[1280]).toBe(true);

        second.unmount();
        viewport.entries.forEach(({ query, listeners }) => {
            expect(query.removeEventListener).toHaveBeenCalledTimes(1);
            expect(listeners.size).toBe(0);
        });
    });

    it('switches at exactly 1024px, including fractional widths below the boundary', () => {
        const first = renderHook(() => useBreakpoints());
        const second = renderHook(() => useBreakpoints());

        act(() => viewport.setWidth(1023.5));
        expect(first.result.current.isCompact).toBe(true);

        act(() => viewport.setWidth(1024));
        expect(first.result.current.isWide).toBe(true);
        expect(first.result.current.isCompact).toBe(false);
        expect(first.result.current).toBe(second.result.current);

        act(() => viewport.setWidth(1023.5));
        expect(first.result.current.isCompact).toBe(true);
        expect(first.result.current.isWide).toBe(false);
    });

    it('keeps the same snapshot and avoids rerendering within a breakpoint range', () => {
        const renders = vi.fn();
        const { result, rerender } = renderHook(() => {
            renders();
            return useBreakpoints();
        });
        const previous = result.current;
        const renderCount = renders.mock.calls.length;

        act(() => viewport.setWidth(900));

        expect(result.current).toBe(previous);
        expect(renders).toHaveBeenCalledTimes(renderCount);

        rerender();
        expect(result.current).toBe(previous);
        expect(viewport.matchMedia).toHaveBeenCalledTimes(BREAKPOINTS.length);
    });

    it('reads the current width after all subscribers have unmounted', () => {
        const first = renderHook(() => useBreakpoints());

        first.unmount();
        viewport.setWidth(1600);

        const second = renderHook(() => useBreakpoints());

        expect(second.result.current.isWide).toBe(true);
        expect(second.result.current.atLeast[1536]).toBe(true);
        expect(second.result.current.atLeast[1920]).toBe(false);
    });

    it('keeps a single active listener per query in Strict Mode', () => {
        const { unmount } = renderHook(() => useBreakpoints(), { wrapper: StrictMode });
        const activeEntries = viewport.entries.filter(({ listeners }) => listeners.size > 0);

        expect(activeEntries).toHaveLength(BREAKPOINTS.length);
        expect(activeEntries.every(({ listeners }) => listeners.size === 1)).toBe(true);

        unmount();
        expect(viewport.entries.every(({ listeners }) => listeners.size === 0)).toBe(true);
    });

    it('uses unknown matches for SSR and initial hydration, then reads the actual width', () => {
        viewport.setWidth(1400);
        const subscribe = vi.spyOn(breakpointsStore, 'subscribe');
        const getSnapshot = vi.spyOn(breakpointsStore, 'getSnapshot');
        const snapshots: BreakpointsSnapshot[] = [];
        const onRecoverableError = vi.fn();
        const Probe = () => {
            const snapshot = useBreakpoints();

            snapshots.push(snapshot);
            return <output>{JSON.stringify(snapshot)}</output>;
        };
        const element = <Probe />;
        const html = renderToString(element);

        expect(subscribe).not.toHaveBeenCalled();
        expect(getSnapshot).not.toHaveBeenCalled();
        expect(viewport.matchMedia).not.toHaveBeenCalled();
        expect(snapshots[0].isWide).toBeNull();
        expect(snapshots[0].isCompact).toBeNull();
        expect(Object.values(snapshots[0].atLeast).every(value => value === null)).toBe(true);

        const container = document.createElement('div');

        container.innerHTML = html;
        document.body.append(container);
        render(element, { container, hydrate: true, onRecoverableError });

        expect(snapshots[1]).toBe(snapshots[0]);
        expect(snapshots.at(-1)?.isWide).toBe(true);
        expect(onRecoverableError).not.toHaveBeenCalled();
    });
});
