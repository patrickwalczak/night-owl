'use client';

import { createContext } from 'react';
import {
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    type ReactReduxContextValue,
} from 'react-redux';

import type { CatalogDispatch, CatalogRootState, CatalogStore } from './store';

export const CatalogStoreContext
    = createContext<ReactReduxContextValue<CatalogRootState> | null>(null);

export const useCatalogDispatch
    = createDispatchHook(CatalogStoreContext).withTypes<CatalogDispatch>();

export const useCatalogSelector
    = createSelectorHook(CatalogStoreContext).withTypes<CatalogRootState>();

export const useCatalogStore
    = createStoreHook(CatalogStoreContext).withTypes<CatalogStore>();
