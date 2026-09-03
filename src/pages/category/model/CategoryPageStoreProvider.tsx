'use client';

import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import type { CategoryPageCategory, CategoryParameter, CategoryProductsPage } from './categoryPage.types';

import { CategoryPageStoreContext } from './client';
import { makeCategoryPageStore } from './store';

interface CategoryPageStoreProviderProps {
    children: ReactNode;
    areFiltersOpen: boolean;
    parameters: CategoryParameter[];
    category: CategoryPageCategory;
    initialProducts: CategoryProductsPage;
}

export default function CategoryPageStoreProvider({
    children,
    areFiltersOpen,
    initialProducts,
    parameters,
    category,
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
            },
            categoryUi: {
                areFiltersOpen,
            },
        }),
    );

    return (
        <Provider store={store} context={CategoryPageStoreContext}>
            {children}
        </Provider>
    );
}
