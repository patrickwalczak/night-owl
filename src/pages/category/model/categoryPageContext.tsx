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
    selectedFilters: ParsedFilters;
    areFiltersOpen: boolean;
}

const CategoryPageContext = createContext<CategoryPageContextType | null>(null);

export const useCategoryPageContext = () => useSafeContext(CategoryPageContext);

export const CategoryPageProvider = ({
    children,
    category,
    parameters,
    productSum,
    selectedFilters,
    areFiltersOpen: initiallyOpen,
}: CategoryPageProviderType) => {
    const [areFiltersOpen, setAreFiltersOpen] = useState(initiallyOpen);
    const source = JSON.stringify([
        category.id,
        Object.keys(selectedFilters).sort().map(key => [key, [...selectedFilters[key]].sort()]),
    ]);
    const [filterSelection, setFilterSelection] = useState({ source, filters: selectedFilters });

    if (filterSelection.source !== source) setFilterSelection({ source, filters: selectedFilters });

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
