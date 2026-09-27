import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
    CategoryPageData,
    CategoryParameter,
    CategoryProduct,
    CategorySubcategory,
    CategorySummary,
    SelectedFilter,
} from '../categoryPage.types';

import { type ParsedFilters } from '../params/searchParams.types';

export interface CategoryListingState {
    initialProducts: CategoryProduct[];
    parameters: CategoryParameter[];
    subcategories: CategorySubcategory[];
    selectedFilters: ParsedFilters;
    category: CategorySummary;
    productSum: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

const initialState: CategoryListingState = {
    initialProducts: [],
    parameters: [],
    subcategories: [],
    selectedFilters: {},
    category: {
        id: '',
        name: '',
        slug: '',
        parentId: null,
    },
    productSum: 0,
    page: 1,
    pageSize: 1,
    totalPages: 1,
};

const categoryListingSlice = createSlice({
    name: 'categoryListing',
    initialState,
    reducers: {
        setListingData(state, action: PayloadAction<Pick<CategoryPageData, 'products' | 'parameters'>>) {
            const { products, parameters } = action.payload;

            state.initialProducts = products.items;
            state.parameters = parameters;
            state.productSum = products.total;
            state.page = products.page;
            state.pageSize = products.pageSize;
            state.totalPages = products.totalPages;
        },
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
        setSelectedFilters(state, action: PayloadAction<ParsedFilters>) {
            state.selectedFilters = action.payload;
        },
        setFilterValue(state, action: PayloadAction<SelectedFilter>) {
            const { parameterSlug, parameterValueSlug, checked } = action.payload;
            const values = state.selectedFilters[parameterSlug] ?? [];

            if (checked) {
                if (!values.includes(parameterValueSlug)) {
                    state.selectedFilters[parameterSlug] = [...values, parameterValueSlug];
                }

                return;
            }

            if (!values.includes(parameterValueSlug)) return;

            const remainingValues = values.filter(value => value !== parameterValueSlug);

            if (remainingValues.length > 0) {
                state.selectedFilters[parameterSlug] = remainingValues;
            }
            else {
                delete state.selectedFilters[parameterSlug];
            }
        },
    },
});

export const {
    setCategory,
    setFilterValue,
    setListingData,
    setPage,
    setPageSize,
    setParameters,
    setProductSum,
    setSubcategories,
    setSelectedFilters,
} = categoryListingSlice.actions;

export default categoryListingSlice.reducer;
