import { createSelector } from '@reduxjs/toolkit';

import type { CatalogRootState } from './store';

export const selectCatalog = (state: CatalogRootState) => state.catalog;

export const selectCatalogProducts = createSelector(
    [selectCatalog],
    catalog => catalog.products,
);

export const selectCatalogCategories = createSelector(
    [selectCatalog],
    catalog => catalog.categories,
);

export const selectCatalogParameters = createSelector(
    [selectCatalog],
    catalog => catalog.parameters,
);
