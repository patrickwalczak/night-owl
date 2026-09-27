'use client';

import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import type { CategoryPageCategory, CategoryParameter, CategoryProductsPage } from '../categoryPage.types';

import { useSyncSelectedFilters } from '../../lib/hooks/useSyncSelectedFilters';
import { type ParsedFilters } from '../params/searchParams.types';
import { CategoryPageStoreContext } from './client';
import { makeCategoryPageStore } from './store';

interface CategoryPageStoreProviderProps {
    children: ReactNode;
    areFiltersOpen: boolean;
    parameters: CategoryParameter[];
    category: CategoryPageCategory;
    initialProducts: CategoryProductsPage;
    selectedFilters: ParsedFilters;
}

export default function CategoryPageStoreProvider({
    children,
    areFiltersOpen,
    initialProducts,
    parameters,
    category,
    selectedFilters,
}: CategoryPageStoreProviderProps) {
    const [store] = useState(() =>
        makeCategoryPageStore({
            categoryListing: {
                initialProducts: initialProducts.items,
                parameters,
                subcategories: category.children,
                category: {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId ?? null,
                },
                productSum: initialProducts.total,
                page: initialProducts.page,
                pageSize: initialProducts.pageSize,
                totalPages: initialProducts.totalPages,
                selectedFilters,
            },
            categoryUi: {
                areFiltersOpen,
            },
        }),
    );

    useSyncSelectedFilters(store, category.id, selectedFilters);

    return (
        <Provider store={store} context={CategoryPageStoreContext}>
            {children}
        </Provider>
    );
}
