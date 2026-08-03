import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
    CatalogCategorySummary,
    CatalogParameter,
    CatalogProduct,
    CatalogSubcategory,
} from './catalog.types';

export interface CatalogState {
    initialProducts: CatalogProduct[];
    areFiltersOpen: boolean;
    parameters: CatalogParameter[];
    subcategories: CatalogSubcategory[];
    category: CatalogCategorySummary;
    productSum: number;
    page: number;
    pageSize: number;
}

const initialState: CatalogState = {
    initialProducts: [],
    areFiltersOpen: false,
    parameters: [],
    subcategories: [],
    category: {
        id: '',
        name: '',
        slug: '',
        parentId: null,
    },
    productSum: 0,
    page: 1,
    pageSize: 1,
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setAreFiltersOpen(state, action: PayloadAction<boolean>) {
            state.areFiltersOpen = action.payload;
        },
        toggleFilters(state) {
            state.areFiltersOpen = !state.areFiltersOpen;
        },
        setParameters(state, action: PayloadAction<CatalogParameter[]>) {
            state.parameters = action.payload;
        },
        setSubcategories(state, action: PayloadAction<CatalogSubcategory[]>) {
            state.subcategories = action.payload;
        },
        setCategory(state, action: PayloadAction<CatalogCategorySummary>) {
            state.category = action.payload;
        },
        setProductSum(state, action: PayloadAction<number>) {
            state.productSum = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPageSize(state, action: PayloadAction<number>) {
            state.pageSize = action.payload;
        },
    },
});

export const {
    setAreFiltersOpen,
    setCategory,
    setPage,
    setPageSize,
    setParameters,
    setProductSum,
    setSubcategories,
    toggleFilters,
} = catalogSlice.actions;

export default catalogSlice.reducer;
