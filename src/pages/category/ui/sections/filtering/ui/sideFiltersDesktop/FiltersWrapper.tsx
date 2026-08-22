'use client';

import type React from 'react';

import { useEffect, useRef } from 'react';

import { useIsNavigationOpen } from '@/features/appState/client';
import { cn } from '@/shared/lib/utils';

import { useCategoryPageSelector } from '../../../../../model/client';
import styles from './sideFiltersDesktop.module.scss';

const FiltersWrapper = ({ children }: { children: React.ReactNode }) => {
    const isNavigationOpen = useIsNavigationOpen();
    const areFiltersOpen = useCategoryPageSelector(state => state.categoryListing.areFiltersOpen);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.toggleAttribute('inert', !areFiltersOpen);
        el.setAttribute('aria-hidden', String(!areFiltersOpen));
    }, [areFiltersOpen]);

    return (
        <div
            ref={containerRef}
            data-open={areFiltersOpen}
            className={cn(styles.filtersContainer, 'transition-200', areFiltersOpen && styles.opened)}
            style={{
                width: areFiltersOpen ? '300px' : '0px',
                top: isNavigationOpen ? '58px' : '100px',
            }}
        >
            {children}
        </div>
    );
};

export default FiltersWrapper;
