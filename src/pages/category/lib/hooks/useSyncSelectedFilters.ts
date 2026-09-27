'use client';

import { useEffect, useRef } from 'react';

import type { CategoryPageCategory } from '../../model/categoryPage.types';
import type { ParsedFilters } from '../../model/params/searchParams.types';
import type { CategoryPageStore } from '../../model/store/store';

import { setSelectedFilters } from '../../model/store/categoryListingSlice';

/**
 * Synchronizes Redux selections with the parsed URL filters passed to the provider.
 * The store is initialized once, so later filter or category changes need an explicit update.
 * Equivalent filters preserve unapplied checkbox changes during pagination or rerenders.
 * Initial selections are already supplied when creating the store.
 */
export const useSyncSelectedFilters = (
    store: CategoryPageStore,
    categoryId: CategoryPageCategory['id'],
    selectedFilters: ParsedFilters,
) => {
    // Compare contents regardless of object identity or ordering, without mutating prop arrays.
    const filtersKey = JSON.stringify(
        Object.keys(selectedFilters).sort().map(key => [key, [...selectedFilters[key]].sort()]),
    );
    const previousFilterSource = useRef({ categoryId, filtersKey });

    useEffect(() => {
        const previous = previousFilterSource.current;

        if (previous.categoryId === categoryId && previous.filtersKey === filtersKey) return;

        previousFilterSource.current = { categoryId, filtersKey };
        store.dispatch(setSelectedFilters(selectedFilters));
    }, [categoryId, filtersKey, selectedFilters, store]);
};
