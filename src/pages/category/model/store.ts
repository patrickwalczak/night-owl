import { combineReducers, configureStore } from '@reduxjs/toolkit';

import categoryListingReducer, { type CategoryListingState } from './categoryListingSlice';
import categoryUiReducer, { type CategoryUiState } from './categoryUiSlice';

const rootReducer = combineReducers({
    categoryListing: categoryListingReducer,
    categoryUi: categoryUiReducer,
});

export interface CategoryPageStoreInitialState {
    categoryListing: CategoryListingState;
    categoryUi: CategoryUiState;
}

export const makeCategoryPageStore = (preloadedState: CategoryPageStoreInitialState) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    });

export type CategoryPageStore = ReturnType<typeof makeCategoryPageStore>;
export type CategoryPageRootState = ReturnType<CategoryPageStore['getState']>;
export type CategoryPageDispatch = CategoryPageStore['dispatch'];
