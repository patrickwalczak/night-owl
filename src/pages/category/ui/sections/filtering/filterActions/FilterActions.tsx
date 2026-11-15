'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { cn } from '@/shared/lib/utils';

import type { ParsedFilters } from '../../../../model/params/searchParams.types';

import { SEARCH_PARAMS_KEYS } from '../../../../config/searchParams';
import { isSearchParamsKey, normalizeSearchParams } from '../../../../lib/url';
import { useCategoryPageContext } from '../../../../model/categoryPageContext';
import styles from './filterActions.module.scss';

interface FilterActionsType {
    className?: string;
    onApply?: () => void;
}

export const FilterActions = ({ className, onApply }: FilterActionsType) => {
    const router = useRouter();
    const pathname = usePathname();
    const { setSelectedFilters, selectedFilters } = useCategoryPageContext();
    const [isPending, startTransition] = useTransition();

    const updateFilters = (filters: ParsedFilters) => {
        const searchParams = new URLSearchParams(window.location.search);

        for (const key of Array.from(searchParams.keys())) {
            if (!isSearchParamsKey(key) || key === SEARCH_PARAMS_KEYS.PAGE) searchParams.delete(key);
        }

        normalizeSearchParams(filters).forEach((value, key) => searchParams.append(key, value));

        const query = searchParams.toString();

        startTransition(() => {
            router.push(`${pathname}${query ? `?${query}` : ''}`);
        });
    };

    const applyFilters = () => {
        updateFilters(selectedFilters);
        onApply?.();
    };

    const clearFilters = () => {
        setSelectedFilters({});
        updateFilters({});
    };

    return (
        <div className={cn(styles.actions, className)} aria-busy={isPending}>
            <button
                className={cn(styles.button, styles.apply)}
                onClick={applyFilters}
                disabled={isPending}
            >
                {isPending ? 'Updating…' : 'Apply filters'}
            </button>
            <button
                className={cn(styles.button, styles.clear)}
                onClick={clearFilters}
                disabled={isPending}
            >
                {'Clear filters'}
            </button>
        </div>
    );
};
