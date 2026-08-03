'use client';

import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import type { CatalogCategory, CatalogParameter, CatalogProductsPage } from './catalog.types';

import { CatalogStoreContext } from './client';
import { makeCatalogStore } from './store';

interface CatalogStoreProviderProps {
    children: ReactNode;
    areFiltersOpen: boolean;
    parameters: CatalogParameter[];
    category: CatalogCategory;
    initialProducts: CatalogProductsPage;
}

export default function CatalogStoreProvider({
    children,
    areFiltersOpen,
    initialProducts,
    parameters,
    category,
}: CatalogStoreProviderProps) {
    const [store] = useState(() =>
        makeCatalogStore({
            catalog: {
                initialProducts: initialProducts.items,
                areFiltersOpen,
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
            },
        }),
    );

    return (
        <Provider store={store} context={CatalogStoreContext}>
            {children}
        </Provider>
    );
}
