'use client';

import {
    useCallback,
    useEffect,
    useEffectEvent,
    useState,
    type RefCallback,
} from 'react';

export interface ElementSize {
    blockSize: number;
    inlineSize: number;
}

export interface UseResizeObserverOptions {
    /**
     * The box model whose size changes should trigger the observer.
     */
    box?: ResizeObserverBoxOptions;
    /**
     * Temporarily disables observation without conditionally calling the hook.
     */
    disabled?: boolean;
    /**
     * An optional callback invoked directly by the observer.
     */
    onResize?: (entry: ResizeObserverEntry) => void;
}

export interface UseResizeObserverResult<T extends Element> {
    /**
     * A callback ref to attach to the element that should be observed.
     */
    ref: RefCallback<T>;
    /**
     * The element currently being observed.
     */
    element: T | null;
    /**
     * The complete ResizeObserver entry, providing access to the target,
     * contentRect, and the sizes of all supported box models.
     */
    entry: ResizeObserverEntry | null;
    /**
     * The dimensions for the selected `box`, expressed using logical axes
     * according to the element's writing mode.
     */
    size: ElementSize | null;
}

const getFirstBoxSize = (
    boxSizes: readonly ResizeObserverSize[] | undefined,
) => boxSizes?.[0] ?? null;

const getObservedSize = (
    entry: ResizeObserverEntry,
    box: ResizeObserverBoxOptions,
): ElementSize => {
    if (box === 'device-pixel-content-box') {
        const size = getFirstBoxSize(entry.devicePixelContentBoxSize);
        if (size) return size;
    }

    if (box === 'border-box') {
        const size = getFirstBoxSize(entry.borderBoxSize);
        if (size) return size;

        const { height, width } = entry.target.getBoundingClientRect();
        return { blockSize: height, inlineSize: width };
    }

    const size = getFirstBoxSize(entry.contentBoxSize);
    if (size) return size;

    return {
        blockSize: entry.contentRect.height,
        inlineSize: entry.contentRect.width,
    };
};

export function useResizeObserver<T extends Element>({
    box = 'border-box',
    disabled = false,
    onResize,
}: UseResizeObserverOptions = {}): UseResizeObserverResult<T> {
    const [element, setElement] = useState<T | null>(null);
    const [entry, setEntry] = useState<ResizeObserverEntry | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);

    const handleResize = useEffectEvent((nextEntry: ResizeObserverEntry) => {
        onResize?.(nextEntry);
    });

    const ref = useCallback<RefCallback<T>>((node) => {
        setElement(node);
    }, []);

    useEffect(() => {
        if (!element || disabled) return;

        const resizeObserver = new ResizeObserver(([nextEntry]) => {
            const nextSize = getObservedSize(nextEntry, box);

            setEntry(nextEntry);
            setSize((currentSize) => {
                if (
                    currentSize?.blockSize === nextSize.blockSize
                    && currentSize.inlineSize === nextSize.inlineSize
                ) {
                    return currentSize;
                }

                return nextSize;
            });
            handleResize(nextEntry);
        });

        resizeObserver.observe(element, { box });

        return () => resizeObserver.disconnect();
    }, [box, disabled, element]);

    return {
        ref,
        element,
        entry,
        size,
    };
}
