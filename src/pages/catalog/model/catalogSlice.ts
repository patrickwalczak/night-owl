import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
    CatalogCategory,
    CatalogData,
    CatalogParameter,
    CatalogProduct,
} from './catalog.types';

export type CatalogState = CatalogData;

export const initialCatalogState: CatalogState = {
    products: [],
    categories: [],
    parameters: [],
};

const catalogSlice = createSlice({
    name: 'demoCatalog',
    initialState: initialCatalogState,
    reducers: {
        setProducts(state, action: PayloadAction<CatalogProduct[]>) {
            state.products = action.payload;
        },
        setCategories(state, action: PayloadAction<CatalogCategory[]>) {
            state.categories = action.payload;
        },
        setParameters(state, action: PayloadAction<CatalogParameter[]>) {
            state.parameters = action.payload;
        },
        replaceCatalog(_state, action: PayloadAction<CatalogData>) {
            return action.payload;
        },
        resetCatalog() {
            return initialCatalogState;
        },
    },
});

export const {
    replaceCatalog,
    resetCatalog,
    setCategories,
    setParameters,
    setProducts,
} = catalogSlice.actions;

export default catalogSlice.reducer;
