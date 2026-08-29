import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
    CategoryParameter,
    CategoryProduct,
    CategorySubcategory,
    CategorySummary,
} from './categoryPage.types';

export interface CategoryListingState {
    initialProducts: CategoryProduct[];
    parameters: CategoryParameter[];
    subcategories: CategorySubcategory[];
    category: CategorySummary;
    productSum: number;
    page: number;
    pageSize: number;
}

const initialState: CategoryListingState = {
    initialProducts: [],
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

const categoryListingSlice = createSlice({
    name: 'categoryListing',
    initialState,
    reducers: {
        setParameters(state, action: PayloadAction<CategoryParameter[]>) {
            state.parameters = action.payload;
        },
        setSubcategories(state, action: PayloadAction<CategorySubcategory[]>) {
            state.subcategories = action.payload;
        },
        setCategory(state, action: PayloadAction<CategorySummary>) {
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
    setCategory,
    setPage,
    setPageSize,
    setParameters,
    setProductSum,
    setSubcategories,
} = categoryListingSlice.actions;

export default categoryListingSlice.reducer;
