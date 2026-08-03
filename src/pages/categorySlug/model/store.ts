import { combineReducers, configureStore } from '@reduxjs/toolkit';

import catalogReducer, { type CatalogState } from './catalogSlice';

const rootReducer = combineReducers({
    catalog: catalogReducer,
});

export interface CatalogStoreInitialState {
    catalog: CatalogState;
}

export const makeCatalogStore = (preloadedState: CatalogStoreInitialState) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    });

export type CatalogStore = ReturnType<typeof makeCatalogStore>;
export type CatalogRootState = ReturnType<CatalogStore['getState']>;
export type CatalogDispatch = CatalogStore['dispatch'];
