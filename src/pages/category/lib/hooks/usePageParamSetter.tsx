'use client';

import { useCallback, useEffect, useState } from 'react';

import { setPageParamInUrl } from '../url';

export type Target = HTMLElement;

export type PageType = number;

export type RegisterTarget = (page: PageType, target: Target) => void;
export type UnregisterTarget = (page: PageType) => void;

export const usePageParamSetter = () => {
    const [targets, setTargets] = useState<Map<PageType, Target>>(() => new Map());

    useEffect(() => {
        if (targets.size === 0) return;

        const pagesByTarget = new Map<Element, PageType>(Array.from(targets, ([page, target]) => [target, page]));
        let observer: IntersectionObserver | null = null;

        const observeTargets = () => {
            observer?.disconnect();

            const visiblePages = new Set<PageType>();

            const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
            const topMargin = Math.floor(viewportHeight / 2);
            const bottomMargin = viewportHeight - topMargin - 1;

            const nextObserver = new IntersectionObserver((entries) => {
                if (observer !== nextObserver) return;

                entries.forEach((entry) => {
                    const page = pagesByTarget.get(entry.target);

                    if (!page) return;

                    if (entry.isIntersecting) visiblePages.add(page);
                    else visiblePages.delete(page);
                });

                if (visiblePages.size > 0) setPageParamInUrl(Math.max(...visiblePages));
            }, {
                rootMargin: `-${topMargin}px 0px -${bottomMargin}px 0px`,
                threshold: 0,
            });

            observer = nextObserver;
            targets.forEach(target => nextObserver.observe(target));
        };

        observeTargets();
        window.addEventListener('resize', observeTargets);

        return () => {
            window.removeEventListener('resize', observeTargets);
            observer?.disconnect();
            observer = null;
        };
    }, [targets]);

    const registerTarget: RegisterTarget = useCallback((page, target) => {
        setTargets((current) => {
            if (current.get(page) === target) return current;

            const newMap = new Map(current);

            newMap.set(page, target);

            return newMap;
        });
    }, []);

    const unregisterTarget: UnregisterTarget = useCallback((page) => {
        setTargets((current) => {
            if (!current.has(page)) return current;

            const newTargets = new Map(current);

            newTargets.delete(page);

            return newTargets;
        });
    }, []);

    return {
        registerTarget,
        unregisterTarget,
    };
};
