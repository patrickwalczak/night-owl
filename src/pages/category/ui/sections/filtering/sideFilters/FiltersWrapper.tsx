'use client';

import type React from 'react';

import { useEffect, useRef } from 'react';

import { useNavigationTopOffset } from '@/shared/lib/hooks/useNavigationLayout/client';
import { cn } from '@/shared/lib/utils';

import { useCategoryPageContext } from '../../../../model/categoryPageContext';
import styles from './sideFiltersDesktop.module.scss';

const STICKY_CATEGORY_BAR_HEIGHT_PX = 58;

const FiltersWrapper = ({ children }: { children: React.ReactNode }) => {
    const navigationTopOffset = useNavigationTopOffset();
    const filtersTopOffset = navigationTopOffset + STICKY_CATEGORY_BAR_HEIGHT_PX;
    const { areFiltersOpen } = useCategoryPageContext();
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
            className={cn(styles.filtersContainer, { [styles.open]: areFiltersOpen })}
            style={{
                width: areFiltersOpen ? '300px' : '0px',
                top: `${filtersTopOffset}px`,
            }}
        >
            {children}
        </div>
    );
};

export default FiltersWrapper;
