import { combineReducers, configureStore } from '@reduxjs/toolkit';

import categoryListingReducer, { type CategoryListingState } from './categoryListingSlice';

const rootReducer = combineReducers({
    categoryListing: categoryListingReducer,
});

export interface CategoryPageStoreInitialState {
    categoryListing: CategoryListingState;
}

export const makeCategoryPageStore = (preloadedState: CategoryPageStoreInitialState) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    });

export type CategoryPageStore = ReturnType<typeof makeCategoryPageStore>;
export type CategoryPageRootState = ReturnType<CategoryPageStore['getState']>;
export type CategoryPageDispatch = CategoryPageStore['dispatch'];
