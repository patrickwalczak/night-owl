import { combineReducers, configureStore } from '@reduxjs/toolkit';

import productReducer, { type ProductState } from './productSlice';

const rootReducer = combineReducers({
    product: productReducer,
});

export interface ProductStoreInitialState {
    product: ProductState;
}

export const makeProductStore = (preloadedState: ProductStoreInitialState) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    });

export type ProductStore = ReturnType<typeof makeProductStore>;
export type ProductRootState = ReturnType<ProductStore['getState']>;
export type ProductDispatch = ProductStore['dispatch'];
