'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib/utils/cn';

import FiltersWrapper from './FiltersWrapper';
import styles from './sideFiltersDesktop.module.scss';
import { Subcategories } from './Subcategories';

const SideFiltersDesktop = () => {
    const filtersRef = useRef<HTMLDivElement | null>(null);
    const [scrollableHeight, setScrollableHeight] = useState('100vh');

    useEffect(() => {
        const onScroll = () => {
            if (!filtersRef.current) return;
            const rect = filtersRef.current.getBoundingClientRect();
            setScrollableHeight(`${window.innerHeight - rect.y}px`);
        };

        onScroll();
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <FiltersWrapper>
            <div ref={filtersRef} style={{ height: scrollableHeight }} className={cn(styles.filters, 'flex', 'flex-col')}>
                <Subcategories />

                <div className={cn(styles.content, 'flex', 'flex-col')} />
            </div>
        </FiltersWrapper>
    );
};

export default SideFiltersDesktop;
