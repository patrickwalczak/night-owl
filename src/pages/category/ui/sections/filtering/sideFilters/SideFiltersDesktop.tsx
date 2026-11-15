'use client';

import { useEffect, useRef, useState } from 'react';

import { useCategoryPageSelector } from '@/pages/category/model/store/client';
import { cn } from '@/shared/lib/utils';

import { FilterActions } from '../filterActions/FilterActions';
import { ParameterBox } from '../parameterBox/ParameterBox';
import FiltersWrapper from './FiltersWrapper';
import styles from './sideFiltersDesktop.module.scss';
import { Subcategories } from './Subcategories';

const SideFiltersDesktop = () => {
    const filtersRef = useRef<HTMLDivElement | null>(null);
    const [scrollableHeight, setScrollableHeight] = useState('100vh');
    const parameters = useCategoryPageSelector(
        state => state.categoryListing.parameters,
    );

    useEffect(() => {
        const updateHeight = () => {
            if (!filtersRef.current) return;
            const rect = filtersRef.current.getBoundingClientRect();
            setScrollableHeight(`${Math.max(0, window.innerHeight - rect.y)}px`);
        };

        const frame = window.requestAnimationFrame(updateHeight);
        window.addEventListener('scroll', updateHeight, { passive: true });
        window.addEventListener('resize', updateHeight);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', updateHeight);
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    return (
        <FiltersWrapper>
            <div ref={filtersRef} style={{ height: scrollableHeight }} className={cn(styles.filters, 'flex', 'flex-col')}>
                <div className={cn(styles.scrollArea, 'flex', 'flex-col')}>
                    <Subcategories />
                    <div className={cn(styles.content, 'flex', 'flex-col')}>
                        {parameters.map(parameter => (
                            <ParameterBox key={parameter.id} parameter={parameter} />
                        ))}
                    </div>
                </div>
                <FilterActions />
            </div>
        </FiltersWrapper>
    );
};

export default SideFiltersDesktop;
