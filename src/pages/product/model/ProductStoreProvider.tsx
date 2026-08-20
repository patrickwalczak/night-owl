'use client';

import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { ProductStoreContext } from './client';
import { makeProductStore } from './store';

interface ProductStoreProviderProps {
    children: ReactNode;
    slug: string;
}

export default function ProductStoreProvider({ children, slug }: ProductStoreProviderProps) {
    const [store] = useState(() =>
        makeProductStore({
            product: {
                slug,
                quantity: 1,
                notes: '',
            },
        }),
    );

    return (
        <Provider store={store} context={ProductStoreContext}>
            {children}
        </Provider>
    );
}
