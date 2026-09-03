'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
    callback: (entry: IntersectionObserverEntry) => void;
    options?: IntersectionObserverInit;
    enabled?: boolean;
}

export const useIntersectionObserver = <T extends Element>({
    options,
    callback,
    enabled = true,
}: UseIntersectionObserverOptions) => {
    const [target, setTarget] = useState<T | null>(null);

    const callbackRef = useRef(callback);

    const ref = useCallback((node: T | null) => {
        setTarget(node);
    }, []);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (enabled === false || !target || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => callbackRef.current(entry));
        }, options);

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [enabled, options, target]);

    return ref;
};
