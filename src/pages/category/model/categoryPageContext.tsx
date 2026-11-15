'use client';
import 'client-only';
import { createContext, useCallback, useState, type ReactNode } from 'react';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext/client';

import type { CategoryPageCategory, CategoryParameter, SelectedFilter } from './categoryPage.types';
import type { ParsedFilters } from './params/searchParams.types';

import { updateSelectedFilters } from './updateSelectedFilters';

interface CategoryPageContextType {
    category: CategoryPageCategory;
    parameters: CategoryParameter[];
    productSum: number;
    selectedFilters: ParsedFilters;
    setSelectedFilters: (filters: ParsedFilters) => void;
    setFilterValue: (filter: SelectedFilter) => void;
    areFiltersOpen: boolean;
    toggleFilters: () => void;
}

interface CategoryPageProviderType {
    children: ReactNode;
    category: CategoryPageCategory;
    parameters: CategoryParameter[];
    productSum: number;
    appliedFilters: ParsedFilters;
    areFiltersOpen: boolean;
}

const CategoryPageContext = createContext<CategoryPageContextType | null>(null);

export const useCategoryPageContext = () => useSafeContext(CategoryPageContext);

export const CategoryPageProvider = ({
    children,
    category,
    parameters,
    productSum,
    appliedFilters,
    areFiltersOpen: initiallyOpen,
}: CategoryPageProviderType) => {
    const [areFiltersOpen, setAreFiltersOpen] = useState(initiallyOpen);
    const source = JSON.stringify([
        category.id,
        Object.keys(appliedFilters).sort().map(key => [key, [...appliedFilters[key]].sort()]),
    ]);
    const [filterSelection, setFilterSelection] = useState({ source, filters: appliedFilters });

    // Sync checkboxes when URL filters change (e.g. Back/Forward) or the category changes.
    // Preserve unapplied selections when only pagination or unrelated server props change.
    if (filterSelection.source !== source) {
        setFilterSelection({ source, filters: appliedFilters });
    }

    const setSelectedFilters = useCallback((filters: ParsedFilters) => {
        setFilterSelection(current => ({ ...current, filters }));
    }, []);

    const setFilterValue = useCallback((filter: SelectedFilter) => {
        setFilterSelection((current) => {
            const filters = updateSelectedFilters(current.filters, filter);
            return filters === current.filters ? current : { ...current, filters };
        });
    }, []);

    const toggleFilters = useCallback(() => setAreFiltersOpen(current => !current), []);

    return (
        <CategoryPageContext.Provider value={{
            category,
            parameters,
            productSum,
            selectedFilters: filterSelection.filters,
            setSelectedFilters,
            setFilterValue,
            areFiltersOpen,
            toggleFilters,
        }}
        >
            {children}
        </CategoryPageContext.Provider>
    );
};
