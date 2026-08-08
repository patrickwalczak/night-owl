'use client';

import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import type { CatalogData } from './catalog.types';

import { CatalogStoreContext } from './client';
import { makeCatalogStore } from './store';

interface CatalogStoreProviderProps {
    children: ReactNode;
    initialData: CatalogData;
}

export default function CatalogStoreProvider({
    children,
    initialData,
}: CatalogStoreProviderProps) {
    const [store] = useState(() =>
        makeCatalogStore({
            catalog: initialData,
        }),
    );

    return (
        <Provider store={store} context={CatalogStoreContext}>
            {children}
        </Provider>
    );
}
