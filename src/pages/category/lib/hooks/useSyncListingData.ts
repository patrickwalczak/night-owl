'use client';

import { useEffect } from 'react';

import type { CategoryParameter, CategoryProductsPage } from '../../model/categoryPage.types';
import type { CategoryPageStore } from '../../model/store/store';

import { setListingData } from '../../model/store/categoryListingSlice';

/**
 * Updates listing data when the provider receives new server props.
 * Store initialization runs only on mount, so later data needs an explicit dispatch.
 */
export const useSyncListingData = (
    store: CategoryPageStore,
    products: CategoryProductsPage,
    parameters: CategoryParameter[],
) => {
    useEffect(() => {
        store.dispatch(setListingData({ products, parameters }));
    }, [store, products, parameters]);
};
